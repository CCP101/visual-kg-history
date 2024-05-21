package com.example.lishidatiapp.activity;

import android.os.Bundle;
import android.os.CountDownTimer;
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
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.example.lishidatiapp.R;
import com.example.lishidatiapp.bean.Const;
import com.example.lishidatiapp.bean.QuizBean;
import com.example.lishidatiapp.bean.TiJiaoBean;
import com.example.lishidatiapp.httpinfo.OkHttpUtils;
import com.example.lishidatiapp.interfaces.OnCallBack;
import com.example.lishidatiapp.util.ToastUtils;

import org.json.JSONArray;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

public class ResultActivity extends AppCompatActivity {

    private RecyclerView recyclerView;
    private QuestionAdapter adapter;
    private List<Question> questionList;
    private boolean isQuiz; // 标识当前是进行考试还是查看结果
    String exam_uuid;
    private final List<QuizBean> testsList = new ArrayList<>();
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_quiz2);

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
        initData(exam_uuid);
    }
    private void initData(String query) {
        OkHttpUtils okHttpUtils = new OkHttpUtils();
        okHttpUtils.requestDataFromeGet(Const.getHttpUrl(Const.examReview)+"?query="+query+"&key=exam");
        okHttpUtils.setOnCallBack(new OnCallBack() {
            @Override
            public void callSuccessBack(String json) {

                try {
                    JSONArray jsonArray = new JSONArray(json);

                    int length = jsonArray.length();
                    int[] array = new int[length];

                    for (int i = 0; i < length; i++) {
                        JSONObject object= (JSONObject) jsonArray.get(i);
                        String quiz_id=object.getString("quiz_id");
                        String quiz_question=object.getString("quiz_question");
                        String quiz_c1=object.getString("quiz_c1");
                        String quiz_c2=object.getString("quiz_c2");
                        String quiz_c3=object.getString("quiz_c3");
                        String quiz_c4=object.getString("quiz_c4");
                        String quiz_A=object.getString("quiz_A");
                        String quiz_answer=object.getString("quiz_answer");
                        QuizBean event=new QuizBean();
                        event.setQuiz_id(quiz_id);
                        event.setQuiz_question(quiz_question);
                        event.setQuiz_c1(quiz_c1);
                        event.setQuiz_c2(quiz_c2);
                        event.setQuiz_c3(quiz_c3);
                        event.setQuiz_c4(quiz_c4);
                        event.setQuiz_A(quiz_A);
                        event.setQuiz_answer(quiz_answer);
                        testsList.add(event);
                    }
                    // 假设一些题目
                    for(int z=0;z<testsList.size();z++){
                        List<String> options = new ArrayList<>();
                        options.add(testsList.get(z).getQuiz_c1());
                        options.add(testsList.get(z).getQuiz_c2());
                        options.add(testsList.get(z).getQuiz_c3());
                        options.add(testsList.get(z).getQuiz_c4());
                        List<Integer> answerList = new ArrayList<>();
                        answerList.add(0);
                        Question question = new Question(testsList.get(z).getQuiz_question(), options, testsList.get(z).getQuiz_A(), true, answerList,testsList.get(z).getQuiz_A(),testsList.get(z).getQuiz_answer());
                        questionList.add(question);
                    }
                    // 设置RecyclerView
                    recyclerView = findViewById(R.id.recycler_view);
                    recyclerView.setLayoutManager(new LinearLayoutManager(ResultActivity.this));
                    adapter = new QuestionAdapter(questionList, isQuiz);
                    recyclerView.setAdapter(adapter);

                }catch (Exception e){
                    e.printStackTrace();
                    //链接错误信息
                    ToastUtils.showToast(ResultActivity.this, e.toString());
                }
            }
            @Override
            public void callErrorBack(String json) {
                //链接错误信息
                ToastUtils.showToast(ResultActivity.this, json);
            }
        });
    }



    @Override
    protected void onDestroy() {
        super.onDestroy();

    }

    // Question类用于表示题目数据
    private static class Question {
        String questionText;
        List<String> options;
        String answer;
        private String quiz_A;
        private String quiz_answer;
        boolean isSingleChoice; // 标志，表示是否为单选题
        List<Integer> userAnswers; // 记录用户选择的选项索引

        Question(String questionText, List<String> options, String answer, boolean isSingleChoice, List<Integer> userAnswers,String quiz_A,String quiz_answer) {
            this.questionText = questionText;
            this.options = options;
            this.answer = answer;
            this.isSingleChoice = isSingleChoice;
            this.userAnswers = new ArrayList<>();
            this.userAnswers = userAnswers;
            this.quiz_A = quiz_A;
            this.quiz_answer = quiz_answer;
        }

    }

    // QuestionAdapter用于管理题目列表的视图
    private class QuestionAdapter extends RecyclerView.Adapter<QuestionAdapter.QuestionViewHolder> {

        private List<Question> questionList;
        private boolean isQuiz; // 标志，表示当前是进行考试还是查看结果

        QuestionAdapter(List<Question> questionList, boolean isQuiz) {
            this.questionList = questionList;
            this.isQuiz = isQuiz;
        }

        @NonNull
        @Override
        public QuestionAdapter.QuestionViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
            View itemView = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_question, parent, false);
            return new QuestionAdapter.QuestionViewHolder(itemView);
        }

        @Override
        public void onBindViewHolder(@NonNull QuestionAdapter.QuestionViewHolder holder, int position) {
            Question question = questionList.get(position);
            int size=position+1;
            holder.questionText.setText(size+"."+question.questionText);

            holder.optionsGroup.removeAllViews(); // 清空选项，避免重复添加

            // 添加选项
            for (String option : question.options) {
                RadioButton radioButton = new RadioButton(holder.itemView.getContext());
                radioButton.setText(option);
                holder.optionsGroup.addView(radioButton);
            }
            holder.answerText.setText("正确答案: " + question.answer);
            holder.answerText.setVisibility(View.VISIBLE);
            for (int i = 0; i < question.options.size(); i++) {
                RadioButton radioButton = (RadioButton) holder.optionsGroup.getChildAt(i);
                radioButton.setEnabled(false); // 禁用选项
                if (question.options.get(i).equals(question.quiz_answer)) {
                    radioButton.setChecked(true); // 设置已选择的选项
                } else {
                    radioButton.setChecked(false); // 设置未选择的选项
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
                            }else {
                                testsList.get(position).setQuiz_answer(question.options.get(i));
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
