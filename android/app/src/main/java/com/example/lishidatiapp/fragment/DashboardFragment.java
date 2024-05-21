package com.example.lishidatiapp.fragment;

import android.content.Context;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.DefaultItemAnimator;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.example.lishidatiapp.R;
import com.example.lishidatiapp.adapter.TestAdapter;
import com.example.lishidatiapp.bean.Const;
import com.example.lishidatiapp.bean.TestBean;
import com.example.lishidatiapp.httpinfo.OkHttpUtils;
import com.example.lishidatiapp.interfaces.OnCallBack;
import com.example.lishidatiapp.util.ToastUtils;

import org.json.JSONArray;
import org.json.JSONObject;
import org.w3c.dom.Text;

import java.util.ArrayList;
import java.util.List;

public class DashboardFragment extends Fragment {
    private final List<TestBean> testsList = new ArrayList<>();
    TestAdapter testAdapter;
    View view;
    Context context;

    public View onCreateView(@NonNull LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        view = inflater.inflate(R.layout.fragment_dashboard, container, false);
        context = view.getContext();

        // 初始化测试数据
        initData();

        // 设置 RecyclerView


        return view;
    }

    @Override
    public void onDestroyView() {
        super.onDestroyView();
    }

    private void initData() {
        OkHttpUtils okHttpUtils = new OkHttpUtils();
        okHttpUtils.requestDataFromeGet(Const.getHttpUrl(Const.sql)+"?query=getExamUpload&key=exam");
        okHttpUtils.setOnCallBack(new OnCallBack() {
            @Override
            public void callSuccessBack(String json) {

                try {
                    JSONArray jsonArray = new JSONArray(json);

                    int length = jsonArray.length();
                    int[] array = new int[length];

                    for (int i = 0; i < length; i++) {
                        JSONObject object= (JSONObject) jsonArray.get(i);
                        String exam_name=object.getString("exam_name");
                        String exam_save_name=object.getString("exam_save_name");
                        String exam_uuid=object.getString("exam_uuid");
                        String exam_id_user=object.getString("exam_id_user");
                        String upload_time=object.getString("upload_time");
                        TestBean event=new TestBean();
                        event.setExam_id_user(exam_id_user);
                        event.setExam_name(exam_name);
                        event.setExam_save_name(exam_save_name);
                        event.setExam_uuid(exam_uuid);
                        event.setUpload_time(upload_time);
                        testsList.add(event);
                    }
                    RecyclerView recyclerView = view.findViewById(R.id.test_recycle);
                    LinearLayoutManager layoutManager = new LinearLayoutManager(context);
                    layoutManager.setOrientation(LinearLayoutManager.VERTICAL);
                    testAdapter = new TestAdapter(context, testsList);
                    recyclerView.setAdapter(testAdapter);
                    recyclerView.setItemAnimator(new DefaultItemAnimator());
                    recyclerView.setLayoutManager(layoutManager);
                }catch (Exception e){
                    e.printStackTrace();
                    //链接错误信息
                    ToastUtils.showToast(getContext(), e.toString());
                }
            }
            @Override
            public void callErrorBack(String json) {
                //链接错误信息
                ToastUtils.showToast(getContext(), json);
            }
        });
    }
    private static final String ARG_PARAM1 = "param1";
    private static final String ARG_PARAM2 = "param2";
    public static DashboardFragment newInstance( String param1, String param2) {
        DashboardFragment fragment = new DashboardFragment();
        Bundle args = new Bundle();
        args.putString(ARG_PARAM1, param1);
        args.putString(ARG_PARAM2, param2);
        fragment.setArguments(args);
        return fragment;
    }
}
