package com.example.lishidatiapp.activity;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.bumptech.glide.Glide;
import com.example.lishidatiapp.R;
import com.example.lishidatiapp.bean.BigEvent;
import com.example.lishidatiapp.bean.Const;

import java.util.List;

//public class EventsAdapter extends RecyclerView.Adapter<EventsAdapter.MyViewHolder> {
//
//    Context context;
//    List<BigEvent> bigEventList;
//    String TAG = "EventsAdapter";
//
//    public EventsAdapter(Context context, List<BigEvent> bigEventList) {
//        this.context = context;
//        this.bigEventList = bigEventList;
//    }
//
//    @NonNull
//    @Override
//    public MyViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
//        View view = LayoutInflater.from(context).inflate(R.layout.item_event, parent, false);
//        return new MyViewHolder(view);
//    }
//
//    @Override
//    public void onBindViewHolder(@NonNull MyViewHolder holder, int position) {
//        BigEvent bigEvent = bigEventList.get(position);
//        holder.content.setText(bigEvent.getIntroduce());
//        holder.name.setText(bigEvent.getShortname());
//        Glide.with(context).load("https://tust.nichijou-lab.com/"+bigEvent.getPhoto()).into(holder.imageView);
//
//    }
//
//    @Override
//    public int getItemCount() {
//        return bigEventList.size();
//    }
//
//    static class MyViewHolder extends RecyclerView.ViewHolder {
//        //layout里面控件的对象
//        private final TextView name;
//        private final TextView date;
//        private final TextView content;
//        private final ImageView imageView;
//
//        public MyViewHolder(@NonNull View itemView) {
//            super(itemView);
//            name = itemView.findViewById(R.id.test_name);
//            date = itemView.findViewById(R.id.test_duration);
//            content = itemView.findViewById(R.id.event_content);
//            imageView = itemView.findViewById(R.id.event_view);
//        }
//    }
//
//}
public class EventsAdapter extends RecyclerView.Adapter<EventsAdapter.MyViewHolder> {

    Context context;
    List<BigEvent> bigEventList;
    String TAG = "EventsAdapter";

    public EventsAdapter(Context context, List<BigEvent> bigEventList) {
        this.context = context;
        this.bigEventList = bigEventList;
    }

    @NonNull
    @Override
    public MyViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(context).inflate(R.layout.item_event, parent, false);
        return new MyViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull MyViewHolder holder, int position) {
        BigEvent bigEvent = bigEventList.get(position);
        holder.content.setText(bigEvent.getContent());
        holder.name.setText(bigEvent.getName());
        holder.date.setText(bigEvent.getDate());
        holder.imageView.setImageDrawable(bigEvent.getImageView());
    }

    @Override
    public int getItemCount() {
        return bigEventList.size();
    }

    static class MyViewHolder extends RecyclerView.ViewHolder {
        //layout里面控件的对象
        private final TextView name;
        private final TextView date;
        private final TextView content;
        private final ImageView imageView;

        public MyViewHolder(@NonNull View itemView) {
            super(itemView);
            name = itemView.findViewById(R.id.test_name);
            date = itemView.findViewById(R.id.test_duration);
            content = itemView.findViewById(R.id.event_content);
            imageView = itemView.findViewById(R.id.event_view);
        }
    }

}
