package com.example.lishidatiapp.adapter;

import android.content.Context;
import android.content.Intent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.example.lishidatiapp.R;
import com.example.lishidatiapp.activity.QuizActivity;
import com.example.lishidatiapp.activity.ResultActivity;
import com.example.lishidatiapp.bean.ExamlogBean;
import com.example.lishidatiapp.bean.TestBean;

import java.util.List;

public class ExamLogAdapter extends RecyclerView.Adapter<ExamLogAdapter.MyViewHolder> {

    private final Context context;
    private final List<ExamlogBean> testList;

    public ExamLogAdapter(Context context, List<ExamlogBean> testList) {
        this.context = context;
        this.testList = testList;
    }

    @NonNull
    @Override
    public ExamLogAdapter.MyViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(context).inflate(R.layout.examlog_test, parent, false);
        return new ExamLogAdapter.MyViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ExamLogAdapter.MyViewHolder holder, int position) {
        ExamlogBean test = testList.get(position);
        holder.test_name.setText("试卷编号:"+test.getExam_id());
        holder.test_time.setText("测试时间:"+test.getSubmit_time());
        holder.test_bianhao.setText("测试编号:"+test.getLog_id());
        holder.test_score.setText("分数:"+test.getScore());
        holder.take_test.setOnClickListener( v -> {
            Intent intent = new Intent(context, ResultActivity.class);
            intent.putExtra("isQuiz", true);
            intent.putExtra("exam_uuid", test.getLog_id());
            context.startActivity(intent);
        });
    }

    @Override
    public int getItemCount() {
        return testList.size();
    }

    static class MyViewHolder extends RecyclerView.ViewHolder {
        private final TextView test_name;
        private final TextView test_time;
        private final TextView test_bianhao;
        private final TextView test_score;
        private final Button take_test;


        public MyViewHolder(@NonNull View itemView) {
            super(itemView);
            test_name = itemView.findViewById(R.id.test_name);
            test_time = itemView.findViewById(R.id.test_time);
            test_bianhao = itemView.findViewById(R.id.test_bianhao);
            take_test = itemView.findViewById(R.id.take_test);
            test_score= itemView.findViewById(R.id.test_score);
        }
    }
}
