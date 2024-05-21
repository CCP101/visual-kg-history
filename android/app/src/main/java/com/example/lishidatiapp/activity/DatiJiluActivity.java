package com.example.lishidatiapp.activity;

import android.app.Activity;
import android.os.Bundle;

import androidx.annotation.Nullable;
import androidx.appcompat.widget.Toolbar;
import androidx.recyclerview.widget.DefaultItemAnimator;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.example.lishidatiapp.R;
import com.example.lishidatiapp.adapter.ExamLogAdapter;
import com.example.lishidatiapp.adapter.TestAdapter;
import com.example.lishidatiapp.bean.Const;
import com.example.lishidatiapp.bean.ExamlogBean;
import com.example.lishidatiapp.bean.TestBean;
import com.example.lishidatiapp.httpinfo.OkHttpUtils;
import com.example.lishidatiapp.interfaces.OnCallBack;
import com.example.lishidatiapp.util.ToastUtils;

import org.json.JSONArray;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

public class DatiJiluActivity extends Activity {
    ExamLogAdapter testAdapter;
    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_datijilu);
        Toolbar toolbar = findViewById(R.id.toolbar);
        // 设置Toolbar的导航图标点击事件
        toolbar.setNavigationOnClickListener(v -> {
            onBackPressed(); // 执行返回上一个界面操作
        });

        initData();
    }
    private final List<ExamlogBean> testsList = new ArrayList<>();
    private void initData() {
        OkHttpUtils okHttpUtils = new OkHttpUtils();
        okHttpUtils.requestDataFromeGet(Const.getHttpUrl(Const.userSql)+"?query=getExamLog&key=exam");
        okHttpUtils.setOnCallBack(new OnCallBack() {
            @Override
            public void callSuccessBack(String json) {

                try {
                    JSONArray jsonArray = new JSONArray(json);

                    int length = jsonArray.length();
                    int[] array = new int[length];

                    for (int i = 0; i < length; i++) {
                        JSONObject object= (JSONObject) jsonArray.get(i);
                        String log_id=object.getString("log_id");
                        String user_id=object.getString("user_id");
                        String exam_id=object.getString("exam_id");
                        String submit_time=object.getString("submit_time");
                        String score=object.getString("score");
                        ExamlogBean event=new ExamlogBean();
                        event.setLog_id(log_id);
                        event.setUser_id(user_id);
                        event.setExam_id(exam_id);
                        event.setSubmit_time(submit_time);
                        event.setScore(score);
                        testsList.add(event);
                    }
                    RecyclerView recyclerView = findViewById(R.id.test_recycle);
                    LinearLayoutManager layoutManager = new LinearLayoutManager(DatiJiluActivity.this);
                    layoutManager.setOrientation(LinearLayoutManager.VERTICAL);
                    testAdapter = new ExamLogAdapter(DatiJiluActivity.this, testsList);
                    recyclerView.setAdapter(testAdapter);
                    recyclerView.setItemAnimator(new DefaultItemAnimator());
                    recyclerView.setLayoutManager(layoutManager);
                }catch (Exception e){
                    e.printStackTrace();
                    //链接错误信息
                    ToastUtils.showToast(DatiJiluActivity.this, e.toString());
                }
            }
            @Override
            public void callErrorBack(String json) {
                //链接错误信息
                ToastUtils.showToast(DatiJiluActivity.this, json);
            }
        });
    }
}
