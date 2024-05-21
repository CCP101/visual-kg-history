package com.example.lishidatiapp.activity;

import android.os.Bundle;
import android.widget.TextView;

import androidx.appcompat.app.ActionBar;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;

import com.example.lishidatiapp.R;


public class AboutUsActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_about_us);

        ActionBar actionBar = getSupportActionBar();
        if (actionBar != null) {
            actionBar.hide();
        }

        Toolbar toolbar = findViewById(R.id.toolbar);

        // 设置Toolbar的导航图标点击事件
        toolbar.setNavigationOnClickListener(v -> {
            onBackPressed(); // 执行返回上一个界面操作
        });

        // 找到布局中的 TextView
        TextView aboutTextView = findViewById(R.id.about_text);
        TextView teamMembersTextView = findViewById(R.id.team_members_text);

        // 设置项目介绍和团队成员信息
        String aboutText = "教育信息化进入了以人工智能为主要特征的2.0时代，知识图谱推动了智慧教育的创新发展。" +
                "通过构建教育知识图谱从事教育服务， 是人工智能与教育深度融合的前提和基础。" +
                "基于认知诊断的学科知识图谱学习平台系统拟将深度知识追踪技术与知识图谱技术有机结合，" +
                "不同于现有系统，使得知识图谱的展现更符合人类认知规律，打造千人千面的动态教育知识图谱，" +
                "开启“数据+知识”联合驱动的智慧教育新范式。";

        String teamMembersText = "团队成员：\n" +
                "梁琨老师（指导老师）\n" +
                "明了\n" +
                "junwu_zhai\n" +
                "genius（后端开发）\n" +
                "Thunder129（前端开发）\n" +
                "CPP101（后端开发）\n" +
                "郭（前端开发）\n" +
                "_Real丶Me（后端开发）\n" +
                "hyy6560\n" +
                "Anticipate｀\n" +
                "火皿阳平";

        // 设置文本
        aboutTextView.setText(aboutText);
        teamMembersTextView.setText(teamMembersText);
    }
}
