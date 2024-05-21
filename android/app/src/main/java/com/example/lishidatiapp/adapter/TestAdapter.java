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
import com.example.lishidatiapp.bean.TestBean;

import java.util.List;

public class TestAdapter extends RecyclerView.Adapter<TestAdapter.MyViewHolder> {

    private final Context context;
    private final List<TestBean> testList;

    public TestAdapter(Context context, List<TestBean> testList) {
        this.context = context;
        this.testList = testList;
    }

    @NonNull
    @Override
    public MyViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(context).inflate(R.layout.item_test, parent, false);
        return new MyViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull MyViewHolder holder, int position) {
        TestBean test = testList.get(position);
        holder.name.setText(test.getExam_name());
        holder.testId.setText(test.getExam_save_name());
        holder.take_test.setOnClickListener( v -> {
            Toast.makeText(context, "参加考试"+test.getExam_uuid(), Toast.LENGTH_SHORT).show();
            Intent intent = new Intent(context, QuizActivity.class);
            intent.putExtra("isQuiz", true);
            intent.putExtra("exam_uuid", test.getExam_uuid());
            context.startActivity(intent);
        });
    }

    @Override
    public int getItemCount() {
        return testList.size();
    }

    static class MyViewHolder extends RecyclerView.ViewHolder {
        private final TextView name;
        private final TextView duration;
        private final TextView testId;
        private final Button take_test;


        public MyViewHolder(@NonNull View itemView) {
            super(itemView);
            name = itemView.findViewById(R.id.test_name);
            duration = itemView.findViewById(R.id.test_duration);
            testId = itemView.findViewById(R.id.test_id);
            take_test = itemView.findViewById(R.id.take_test);
        }
    }
}
