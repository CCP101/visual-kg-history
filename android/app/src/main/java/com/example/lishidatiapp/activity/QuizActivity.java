package com.example.lishidatiapp.activity;

import android.content.Intent;
import android.os.Bundle;
import android.os.CountDownTimer;
import android.text.TextUtils;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.RadioButton;
import android.widget.RadioGroup;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.appcompat.app.ActionBar;
import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.DefaultItemAnimator;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.example.lishidatiapp.LoginActivity;
import com.example.lishidatiapp.MainActivity;
import com.example.lishidatiapp.R;
import com.example.lishidatiapp.adapter.TestAdapter;
import com.example.lishidatiapp.bean.Const;
import com.example.lishidatiapp.bean.QuizBean;
import com.example.lishidatiapp.bean.TestBean;
import com.example.lishidatiapp.bean.TiJiaoBean;
import com.example.lishidatiapp.httpinfo.OkHttpUtils;
import com.example.lishidatiapp.interfaces.OnCallBack;
import com.example.lishidatiapp.util.ToastUtils;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.nio.Buffer;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

public class QuizActivity extends AppCompatActivity {

    private RecyclerView recyclerView;
    private TextView countdownTimer;
    private CountDownTimer timer;
    private QuestionAdapter adapter;
    private List<Question> questionList;
    private boolean isQuiz; // 标识当前是进行考试还是查看结果
    final static String TAG = "QuizActivity";
    String exam_uuid;
    private final List<QuizBean> testsList = new ArrayList<>();
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_quiz);
        countdownTimer = findViewById(R.id.countdown_timer);

        ActionBar actionBar = getSupportActionBar();
        if (actionBar != null) {
            actionBar.hide();
        }


        // 获取传递过来的参数，用于判断是进行考试还是查看结果
        isQuiz = getIntent().getBooleanExtra("isQuiz", true);

        exam_uuid = getIntent().getStringExtra("exam_uuid");

        // 初始化题目列表
        questionList = new ArrayList<>();
        // 添加题目数据，这里需要根据你的数据源来添加题目数据


        Button submitButton = findViewById(R.id.submit_button);
        if (isQuiz) {
            // 设置倒计时时长为 10 分钟，倒计时间隔为 1 秒，根据考试时间设定
            timer = new CountDownTimer(120 * 60 * 1000, 1000) {
                @Override
                public void onTick(long millisUntilFinished) {
                    // 计算剩余时间并更新 TextView
                    long seconds = millisUntilFinished / 1000;
                    long minutes = seconds / 60;
                    long hours = minutes / 60;

                    String timeString = String.format(Locale.getDefault(), "%02d:%02d:%02d",
                            hours % 24, minutes % 60, seconds % 60);
                    countdownTimer.setText(timeString);
                }

                @Override
                public void onFinish() {
                    // 倒计时结束时的操作
                    countdownTimer.setText("00:00:00");
                    // 可以在这里添加提交试卷的逻辑
                    Toast.makeText(QuizActivity.this, "强制收卷", Toast.LENGTH_SHORT).show();
                    finish();
                }
            };
            // 启动倒计时
            timer.start();

            submitButton.setText("提交试卷");
        } else {
            submitButton.setText("70分");
        }

        submitButton.setOnClickListener(v -> {
            if (isQuiz) {
                // 在此处实现提交试卷的逻辑
                toResult();
//                Toast.makeText(QuizActivity.this, "交卷成功", Toast.LENGTH_SHORT).show();
            }
            // finish();
        });
        initData(exam_uuid);
    }

    private void initData(String query) {
        OkHttpUtils okHttpUtils = new OkHttpUtils();
        okHttpUtils.requestDataFromeGet(Const.getHttpUrl(Const.examGet) + "?query=" + query + "&key=exam");
        okHttpUtils.setOnCallBack(new OnCallBack() {
            @Override
            public void callSuccessBack(String json) {
                try {
                    JSONArray jsonArray = new JSONArray(json);

                    int length = jsonArray.length();
                    int[] array = new int[length];

                    for (int i = 0; i < length; i++) {
                        JSONObject object = (JSONObject) jsonArray.get(i);
                        String quiz_id = object.getString("quiz_id");
                        String quiz_question = object.getString("quiz_question");
                        String quiz_c1 = object.getString("quiz_c1");
                        String quiz_c2 = object.getString("quiz_c2");
                        String quiz_c3 = object.getString("quiz_c3");
                        String quiz_c4 = object.getString("quiz_c4");
                        QuizBean event = new QuizBean();
                        event.setQuiz_id(quiz_id);
                        event.setQuiz_question(quiz_question);
                        event.setQuiz_c1(quiz_c1);
                        event.setQuiz_c2(quiz_c2);
                        event.setQuiz_c3(quiz_c3);
                        event.setQuiz_c4(quiz_c4);
                        testsList.add(event);
                    }
                    // 假设一些题目
                    for (int z = 0; z < testsList.size(); z++) {
                        List<String> options = new ArrayList<>();
                        options.add(testsList.get(z).getQuiz_c1());
                        options.add(testsList.get(z).getQuiz_c2());
                        options.add(testsList.get(z).getQuiz_c3());
                        options.add(testsList.get(z).getQuiz_c4());
                        List<Integer> answerList = new ArrayList<>();
                        answerList.add(0);
                        Question question = new Question(testsList.get(z).getQuiz_question(), options, "三百年", true, answerList,false);
                        questionList.add(question);
                    }
                    // 设置RecyclerView
                    recyclerView = findViewById(R.id.recycler_view);
                    recyclerView.setLayoutManager(new LinearLayoutManager(QuizActivity.this));
                    adapter = new QuestionAdapter(questionList, isQuiz);
                    recyclerView.setAdapter(adapter);
                } catch (Exception e) {
                    e.printStackTrace();
                    //链接错误信息
                    ToastUtils.showToast(QuizActivity.this, e.toString());
                }
            }

            @Override
            public void callErrorBack(String json) {
                //链接错误信息
                ToastUtils.showToast(QuizActivity.this, json);
            }
        });
    }

    private void toResult() {
        // 创建OkHttpClient对象
        OkHttpClient client = new OkHttpClient();

        // 创建JSON对象，用于构造POST请求的请求体
        JSONArray jsonArray = new JSONArray();  // 创建JSON数组，用于存储题目列表
        try {
            for (int z = 0; z < testsList.size(); z++) {
                JSONObject jsonObject = new JSONObject();  // 创建JSON对象，用于存储每个题目的信息
                jsonObject.put("exam_id", exam_uuid);  // 设置考试ID
                jsonObject.put("user_id", "20240117");  // 设置用户ID
                jsonObject.put("quiz_id", testsList.get(z).getQuiz_id());  // 设置题目ID
                jsonObject.put("quiz_answer", testsList.get(z).getQuiz_answer());  // 设置题目答案
                jsonArray.put(jsonObject);  // 将题目信息添加到JSON数组中
            }
        } catch (JSONException e) {
            e.printStackTrace();
        }

        // 创建RequestBody对象，用于设置POST请求的请求体
        RequestBody requestBody = RequestBody.create(MediaType.parse("application/json; charset=utf-8"), String.valueOf(jsonArray));
        Log.i(TAG, "请求体：" + jsonArray);
        // 创建POST请求
        Request request = new Request.Builder()
                .url("http://172.20.10.5:3000/examSubmit")  // 设置请求的URL
                .post(requestBody)  // 设置请求方法为POST，并设置请求体
                .build();
        Log.i(TAG, "请求头："+request);

        // 发送请求并处理响应
        client.newCall(request).enqueue(new Callback() {
            @Override
            public void onResponse(Call call, Response response) throws IOException {
                // 处理响应结果
                String result = response.body().string();
                if (response.isSuccessful()) {
                    Log.i(TAG, "试卷上交成功");
                    // 处理成功响应
                    finish();
                } else {
                    // 处理失败响应
                    Log.i(TAG, "试卷上交失败:" + result);
                }
            }

            @Override
            public void onFailure(Call call, IOException e) {
                // 处理请求失败
            }
        });


//        OkHttpUtils okHttpUtils = OkHttpUtils.getInstance();
//        List<TiJiaoBean> list=new ArrayList<>();
//        for(int z=0;z<testsList.size();z++){
//            TiJiaoBean bean=new TiJiaoBean();
//            bean.setExam_id(exam_uuid);
//            bean.setQuiz_answer(testsList.get(z).getQuiz_answer());
//            bean.setQuiz_id(testsList.get(z).getQuiz_id());
//            list.add(bean);
//        }
//
//
//        okHttpUtils.rquestDataFromePostListStr(Const.getHttpUrl(Const.examSubmit), list, null);
//        okHttpUtils.setOnCallBack(new OnCallBack() {
//            @Override
//            public void callSuccessBack(String json) {
//                try {
//                   finish();
//                }catch (Exception e){
//                    e.printStackTrace();
//                    //链接错误信息
//                    ToastUtils.showToast(QuizActivity.this, e.toString());
//                }
//            }
//            @Override
//            public void callErrorBack(String json) {
//                //链接错误信息
//                ToastUtils.showToast(QuizActivity.this, json);
//            }
//        });

    }


    @Override
    protected void onDestroy() {
        super.onDestroy();
        // 停止倒计时
        if (timer != null) {
            timer.cancel();
        }
    }

    // Question类用于表示题目数据
    private static class Question {
        String questionText;
        List<String> options;
        String answer;
        boolean isSingleChoice; // 标志，表示是否为单选题
        List<Integer> userAnswers; // 记录用户选择的选项索引
        private boolean isClick=false;
        Question(String questionText, List<String> options, String answer, boolean isSingleChoice, List<Integer> userAnswers, boolean isClick) {
            this.questionText = questionText;
            this.options = options;
            this.answer = answer;
            this.isSingleChoice = isSingleChoice;
            this.userAnswers = new ArrayList<>();
            this.userAnswers = userAnswers;
            this.isClick = isClick;
        }

        public boolean isClick() {
            return isClick;
        }

        public void setClick(boolean click) {
            isClick = click;
        }
    }
    // QuestionAdapter用于管理题目列表的视图
    private class QuestionAdapter extends RecyclerView.Adapter<QuestionAdapter.QuestionViewHolder> {

        private List<Question> questionList;
        private boolean isQuiz; // 标志，表示当前是进行考试还是查看结果
        private Map<Integer, Boolean> map = new HashMap<>();
        QuestionAdapter(List<Question> questionList, boolean isQuiz) {
            this.questionList = questionList;
            this.isQuiz = isQuiz;
        }

        @NonNull
        @Override
        public QuestionViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
            View itemView = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_question, parent, false);
            return new QuestionViewHolder(itemView);
        }

        @Override
        public void onBindViewHolder(@NonNull QuestionViewHolder holder, int position) {
            Question question = questionList.get(position);
            int size = position + 1;
            holder.questionText.setText(size + "." + question.questionText);

            holder.optionsGroup.removeAllViews(); // 清空选项，避免重复添加
            // 添加选项
            for (String option : question.options) {
                RadioButton radioButton = new RadioButton(holder.itemView.getContext());
                radioButton.setText(option);
                if(!TextUtils.isEmpty(testsList.get(position).getQuiz_answer())){
                    if(option.equals(testsList.get(position).getQuiz_answer())){
                        radioButton.setChecked(true);
                    }else {
                        radioButton.setChecked(false);
                    }
                }
                holder.optionsGroup.addView(radioButton);
            }

            if (!isQuiz) {
                holder.answerText.setText("正确答案: " + question.answer);
                holder.answerText.setVisibility(View.VISIBLE);

                for (int i = 0; i < question.options.size(); i++) {
                    RadioButton radioButton = (RadioButton) holder.optionsGroup.getChildAt(i);
                    radioButton.setEnabled(false); // 禁用选项
                    if (question.userAnswers.contains(i)) {

                        radioButton.setChecked(true); // 设置已选择的选项
                    } else {
                        radioButton.setChecked(false); // 设置未选择的选项
                    }
                }
            }
            // 如果是单选题，则设置RadioGroup为单选模式
            if (question.isSingleChoice) {
                holder.optionsGroup.setOnCheckedChangeListener(new RadioGroup.OnCheckedChangeListener() {
                    @Override
                    public void onCheckedChanged(RadioGroup group, int checkedId) {
                        // 只允许选择一个选项
                        for (int i = 0; i < group.getChildCount(); i++) {
                            RadioButton radioButton = (RadioButton) group.getChildAt(i);
                            if (radioButton.getId() != checkedId) {
                                radioButton.setChecked(false);
                            } else {
                                testsList.get(position).setQuiz_answer(question.options.get(i));
                                map.put(position,true);
                            }
                        }
                    }
                });
            }
        }

        @Override
        public int getItemCount() {
            return questionList.size();
        }

        // ViewHolder用于缓存视图
        class QuestionViewHolder extends RecyclerView.ViewHolder {
            TextView questionText;
            TextView answerText;
            RadioGroup optionsGroup;

            QuestionViewHolder(@NonNull View itemView) {
                super(itemView);
                questionText = itemView.findViewById(R.id.question_text);
                answerText = itemView.findViewById(R.id.answer_text);
                optionsGroup = itemView.findViewById(R.id.options_group);
            }
        }
    }
}
