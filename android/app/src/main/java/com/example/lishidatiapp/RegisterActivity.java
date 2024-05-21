package com.example.lishidatiapp;

import android.os.Bundle;
import android.text.TextUtils;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.example.lishidatiapp.bean.Const;
import com.example.lishidatiapp.bean.UserInfoModel;
import com.example.lishidatiapp.httpinfo.OkHttpUtils;
import com.example.lishidatiapp.interfaces.OnCallBack;
import com.example.lishidatiapp.util.JsonUtils;
import com.example.lishidatiapp.util.ToastUtils;

import java.util.HashMap;


public class RegisterActivity extends AppCompatActivity {

    private EditText etNickName;
    private EditText etAccount;
    private EditText etPassword;
    private EditText etPasswordAgain;
    private Button btnRegister;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_register);

        etNickName = findViewById(R.id.etNickName);
        etAccount = findViewById(R.id.etAccount);
        etPassword = findViewById(R.id.etPassword);
        etPasswordAgain = findViewById(R.id.etPasswordAgain);
        btnRegister = findViewById(R.id.btnRegister);

        btnRegister.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                //1.是否为空检测
                String nickName = etNickName.getText().toString().trim();
                String password = etPassword.getText().toString().trim();
                String passwordAgain = etPasswordAgain.getText().toString().trim();

                if (nickName.isEmpty()
                        || password.isEmpty() || passwordAgain.isEmpty()) {
                    Toast.makeText(RegisterActivity.this, "手机号、密码不能为空", Toast.LENGTH_LONG).show();
                    return;
                }

                if (!password.equals(passwordAgain)) {
                    Toast.makeText(RegisterActivity.this, "两次密码输入不一致", Toast.LENGTH_LONG).show();
                    return;
                }

                Toregister(nickName, password);

            }
        });

    }

    private void Toregister(String phone, String pws) {
        OkHttpUtils okHttpUtils = OkHttpUtils.getInstance();
        okHttpUtils.requestDataFromeGet(Const.getHttpUrl(Const.userCheck) + "?query=" + phone + "&key=username");
        okHttpUtils.setOnCallBack(new OnCallBack() {
            @Override
            public void callSuccessBack(String json) {
                try {
                    register(phone, pws);
                    ToastUtils.showToast(RegisterActivity.this, "该账户已经注册成功");
//                    if (TextUtils.isEmpty(json)) {
//                        register(phone, pws);
//                    } else {
//                        ToastUtils.showToast(RegisterActivity.this, "该账户已经注册成功");
//                    }

                } catch (Exception e) {
                    e.printStackTrace();
                    //链接错误信息
                    ToastUtils.showToast(RegisterActivity.this, e.toString());
                }
            }

            @Override
            public void callErrorBack(String json) {
                //链接错误信息
                ToastUtils.showToast(RegisterActivity.this, json);
            }
        });

    }

    private void register(String phone, String pws) {
        OkHttpUtils okHttpUtils = OkHttpUtils.getInstance();
        HashMap<String, Object> map = new HashMap();
//        map.put("username",20240117);
//        map.put("password","PkanxKmAwnoSs3DUPKojaaXggeJqliZuILJgPxzx92wsTNIjb0bV4zvwuGD0V7VjTl1H174SsBsFH9B/3g5Ahw==");
        map.put("username", phone);
        map.put("password", pws);
        okHttpUtils.rquestDataFromePostStr(Const.getHttpUrl(Const.REGISTER), map, null);
        okHttpUtils.setOnCallBack(new OnCallBack() {
            @Override
            public void callSuccessBack(String json) {

                try {
                    ToastUtils.showToast(RegisterActivity.this, "注册成功");
                    finish();
                } catch (Exception e) {
                    e.printStackTrace();
                    //链接错误信息
                    ToastUtils.showToast(RegisterActivity.this, e.toString());
                }
            }

            @Override
            public void callErrorBack(String json) {
                //链接错误信息
                ToastUtils.showToast(RegisterActivity.this, json);
            }
        });

    }
}