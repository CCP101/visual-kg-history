package com.example.lishidatiapp.fragment;

import android.annotation.SuppressLint;
import android.content.Context;
import android.graphics.Rect;
import android.graphics.drawable.Drawable;
import android.os.Bundle;
import android.text.TextUtils;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.DefaultItemAnimator;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.example.lishidatiapp.R;
import com.example.lishidatiapp.RegisterActivity;
import com.example.lishidatiapp.activity.EventsAdapter;
import com.example.lishidatiapp.bean.BigEvent;
import com.example.lishidatiapp.bean.Const;
import com.example.lishidatiapp.httpinfo.OkHttpUtils;
import com.example.lishidatiapp.interfaces.OnCallBack;
import com.example.lishidatiapp.util.JsonUtils;
import com.example.lishidatiapp.util.ToastUtils;

import org.json.JSONArray;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

//public class HomeFragment extends Fragment {
//    EventsAdapter medicationsAdapter;
//    List<BigEvent> bigEventList;
//    RecyclerView recyclerView;
//    View view;
//    public View onCreateView(@NonNull LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
//
//        view = inflater.inflate(R.layout.fragment_home, container, false);
//        bigEventList=new ArrayList<>();
//        // 事件情况
//         recyclerView = view.findViewById(R.id.event_recycle);
//
//        ToLiShiList();
//
//        return view;
//    }
//    private void ToLiShiList() {
//
////        OkHttpUtils okHttpUtils = new OkHttpUtils();
////        okHttpUtils.requestDataFromeGet(Const.getHttpUrl(Const.sql)+"?query=getArticle&key=article");
////        okHttpUtils.setOnCallBack(new OnCallBack() {
////            @Override
////            public void callSuccessBack(String json) {
////
////                try {
////                    JSONArray jsonArray = new JSONArray(json);
////
////                    int length = jsonArray.length();
////                    int[] array = new int[length];
////
////                    for (int i = 0; i < length; i++) {
////                        JSONObject object= (JSONObject) jsonArray.get(i);
////                       int id=object.getInt("id");
////                        String shortname=object.getString("shortname");
////                        String introduce=object.getString("introduce");
////                       String photo=object.getString("photo");
////                        BigEvent event=new BigEvent();
////                        event.setId(id);
////                        event.setIntroduce(introduce);
////                        event.setShortname(shortname);
////                        event.setPhoto(photo);
////                        bigEventList.add(event);
////                    }
////                    LinearLayoutManager manager = new LinearLayoutManager(getContext());
////                    manager.setOrientation(LinearLayoutManager.VERTICAL);
////                    medicationsAdapter = new EventsAdapter(getContext(), bigEventList);
////                    recyclerView.setAdapter(medicationsAdapter);
////                    recyclerView.setItemAnimator(new DefaultItemAnimator());
////                    recyclerView.setLayoutManager(manager);
////                    recyclerView.addItemDecoration(new CustomItemDecoration());
////                }catch (Exception e){
////                    e.printStackTrace();
////                    //链接错误信息
////                    ToastUtils.showToast(getContext(), e.toString());
////                }
////            }
////            @Override
////            public void callErrorBack(String json) {
////                //链接错误信息
////                ToastUtils.showToast(getContext(), json);
////            }
////        });
//
//    }
//    public static class CustomItemDecoration extends RecyclerView.ItemDecoration {
//        @Override
//        public void getItemOffsets(Rect outRect, @NonNull View view, @NonNull RecyclerView parent, @NonNull RecyclerView.State state) {
//            // 设置元素之间的偏移量为0，即去掉分割线
//            outRect.set(0, 0, 0, 0);
//        }
//    }
//    private static final String ARG_PARAM1 = "param1";
//    private static final String ARG_PARAM2 = "param2";
//    public static HomeFragment newInstance( String param1, String param2) {
//        HomeFragment fragment = new HomeFragment();
//        Bundle args = new Bundle();
//        args.putString(ARG_PARAM1, param1);
//        args.putString(ARG_PARAM2, param2);
//        fragment.setArguments(args);
//        return fragment;
//    }
//
//}

public class HomeFragment extends Fragment {
    private final List<BigEvent> bigEventList = new ArrayList<>();
    EventsAdapter medicationsAdapter;
    View view;
    Context context;

    void initData() {
        @SuppressLint("UseCompatLoadingForDrawables") Drawable drawable1 = getResources().getDrawable(R.drawable.mingchao);
        BigEvent bigEvent1 = new BigEvent(1, "明朝", "1368年-1644年", "明朝是中国历史上最后由汉族建立的大一统王朝， 历经12世、16位皇帝，国祚276年。", drawable1);
        bigEventList.add(bigEvent1);

        @SuppressLint("UseCompatLoadingForDrawables") Drawable drawable2 = getResources().getDrawable(R.drawable.jingnan);
        BigEvent bigEvent2 = new BigEvent(2, "靖难之役", "1399年8月6日", "靖难之役又称靖难之变是中国明朝初年建文帝在位时发生的一场因削藩政策引发的争夺皇位的内战。", drawable2);
        bigEventList.add(bigEvent2);

        @SuppressLint("UseCompatLoadingForDrawables") Drawable drawable3 = getResources().getDrawable(R.drawable.nuomandi);
        BigEvent bigEvent3 = new BigEvent(3, "诺曼底登陆", "1944年", "诺曼底登陆，代号海王行动，是第二次世界大战西方盟军在欧洲西线战场发起的一场大规模攻势。", drawable3);
        bigEventList.add(bigEvent3);

        @SuppressLint("UseCompatLoadingForDrawables") Drawable drawable4 = getResources().getDrawable(R.drawable.songlu);
        BigEvent bigEvent4 = new BigEvent(4, "淞沪会战", "1937年11月", "日军占领北平、天津后，在南方又集中兵力约28万人，陆海空三军联合猛烈进攻上海、南京地区。", drawable4);
        bigEventList.add(bigEvent4);

        @SuppressLint("UseCompatLoadingForDrawables") Drawable drawable5 = getResources().getDrawable(R.drawable.zhongtudao);
        BigEvent bigEvent5 = new BigEvent(5, "中途岛海战", "1942年", "中途岛海战是第二次世界大战中美国海军和日本海军在中途岛附近海域进行的一场大规模海战。", drawable5);
        bigEventList.add(bigEvent5);

    }

    public View onCreateView(@NonNull LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {

        view = inflater.inflate(R.layout.fragment_home, container, false);
        context = view.getContext();

        // 事件情况
        RecyclerView recyclerView = view.findViewById(R.id.event_recycle);
        initData();
        LinearLayoutManager manager = new LinearLayoutManager(context);
        manager.setOrientation(LinearLayoutManager.VERTICAL);
        medicationsAdapter = new EventsAdapter(context, bigEventList);
        recyclerView.setAdapter(medicationsAdapter);
        recyclerView.setItemAnimator(new DefaultItemAnimator());
        recyclerView.setLayoutManager(manager);
        recyclerView.addItemDecoration(new CustomItemDecoration());

        return view;
    }

    @Override
    public void onDestroyView() {
        super.onDestroyView();
    }

    public static class CustomItemDecoration extends RecyclerView.ItemDecoration {
        @Override
        public void getItemOffsets(Rect outRect, @NonNull View view, @NonNull RecyclerView parent, @NonNull RecyclerView.State state) {
            // 设置元素之间的偏移量为0，即去掉分割线
            outRect.set(0, 0, 0, 0);
        }
    }

    private static final String ARG_PARAM1 = "param1";
    private static final String ARG_PARAM2 = "param2";

    public static HomeFragment newInstance(String param1, String param2) {
        HomeFragment fragment = new HomeFragment();
        Bundle args = new Bundle();
        args.putString(ARG_PARAM1, param1);
        args.putString(ARG_PARAM2, param2);
        fragment.setArguments(args);
        return fragment;
    }
}