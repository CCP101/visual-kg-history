package com.example.lishidatiapp.fragment;

import android.content.Intent;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.LinearLayout;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;

import com.example.lishidatiapp.R;
import com.example.lishidatiapp.activity.AboutUsActivity;
import com.example.lishidatiapp.activity.DatiJiluActivity;
import com.example.lishidatiapp.activity.SetAccountActivity;
import com.example.lishidatiapp.activity.TuPuActivity;

public class MyFragment  extends Fragment {

    View view;
    LinearLayout line_jilu,line_tupu,line_accout,line_about;
    public View onCreateView(@NonNull LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {

        view = inflater.inflate(R.layout.fragment_my, container, false);

        //测试记录
        //https://sklpserver.nichijou-lab.com/sql?query=getAllExam&key=exam

        //https://sklpserver.nichijou-lab.com/userSql?query=getExamLog&key=exam
        //测试列表
        //https://sklpserver.nichijou-lab.com/sql?query=getExamUpload&key=exam
        //测试列表
        //https://sklpserver.nichijou-lab.com/sql?query=getExamUpload&key=exam
        //测试题目
        //https://sklpserver.nichijou-lab.com/examGet?query=b973e590-35b0-11ed-a56c-85410fe0a584&key=exam

        line_jilu=view.findViewById(R.id.line_jilu);
        line_tupu=view.findViewById(R.id.line_tupu);
        line_accout=view.findViewById(R.id.line_accout);
        line_about=view.findViewById(R.id.line_about);
        init();
        return view;
    }

    public void init(){
        line_jilu.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent=new Intent(getContext(), DatiJiluActivity.class);
                startActivity(intent);
            }
        });
        line_tupu.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent=new Intent(getContext(), TuPuActivity.class);
                startActivity(intent);
            }
        });
        line_accout.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent=new Intent(getContext(), SetAccountActivity.class);
                startActivity(intent);
            }
        });
        line_about.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent=new Intent(getContext(), AboutUsActivity.class);
                startActivity(intent);
            }
        });
    }
    private static final String ARG_PARAM1 = "param1";
    private static final String ARG_PARAM2 = "param2";
    public static MyFragment newInstance( String param1, String param2) {
        MyFragment fragment = new MyFragment();
        Bundle args = new Bundle();
        args.putString(ARG_PARAM1, param1);
        args.putString(ARG_PARAM2, param2);
        fragment.setArguments(args);
        return fragment;
    }

}
