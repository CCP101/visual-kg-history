package com.example.lishidatiapp;

import android.content.Intent;
import android.os.Bundle;
import android.text.TextUtils;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.example.lishidatiapp.bean.Const;
import com.example.lishidatiapp.bean.UserInfoModel;
import com.example.lishidatiapp.httpinfo.OkHttpUtils;
import com.example.lishidatiapp.interfaces.OnCallBack;
import com.example.lishidatiapp.util.JsonUtils;
import com.example.lishidatiapp.util.SharedPreferencesUtils;
import com.example.lishidatiapp.util.ToastUtils;

import java.util.HashMap;


public class LoginActivity extends AppCompatActivity {
    private EditText etAccount;
    private EditText etPassword;
    private Button btnLogin;
    private TextView tvRegister;

    SharedPreferencesUtils sharedPreferencesUtils;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);
        sharedPreferencesUtils = new SharedPreferencesUtils(this);
        //dbHelper = MydatabaseHelper.getInstance(this);
        etAccount = findViewById(R.id.etAccount);
        etPassword = findViewById(R.id.etPassword);
        btnLogin = findViewById(R.id.btnLogin);
        tvRegister = findViewById(R.id.tvGoToRegister);
        //创建
        String loginJson = (String) sharedPreferencesUtils.getParam("loginJson", "");
        if (!TextUtils.isEmpty(loginJson)) {
            UserInfoModel loginInfo = (UserInfoModel) JsonUtils.fromJson(loginJson, UserInfoModel.class);
           /* etAccount.setText(loginInfo.getUname());
            etPassword.setText(loginInfo.getUpass());*/
        }
        btnLogin.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                //1.是否为空检测
                String phone = etAccount.getText().toString().trim();
                String password = etPassword.getText().toString().trim();
                UserInfoModel userInfoEntity = new UserInfoModel();
               /* userInfoEntity.setUname(phone);
                userInfoEntity.setUpass(password);*/
                login(phone, password);
            }
        });

        tvRegister.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(LoginActivity.this, RegisterActivity.class);
                startActivity(intent);
            }
        });
    }
    private void login(String phone, String pws) {
        OkHttpUtils okHttpUtils = OkHttpUtils.getInstance();
        HashMap<String, Object> map = new HashMap();
//        map.put("username",20240117);
        map.put("username", phone);
//        map.put("password","PkanxKmAwnoSs3DUPKojaaXggeJqliZuILJgPxzx92wsTNIjb0bV4zvwuGD0V7VjTl1H174SsBsFH9B/3g5Ahw==");
        map.put("password", pws);
        okHttpUtils.rquestDataFromePostStr(Const.getHttpUrl(Const.LOGIN), map, null);
        okHttpUtils.setOnCallBack(new OnCallBack() {
            @Override
            public void callSuccessBack(String json) {
                try {
                    if (json.equals("200")) {
                        Intent intent = new Intent(LoginActivity.this, MainActivity.class);
                        startActivity(intent);
                    } else {
                        ToastUtils.showToast(LoginActivity.this, "登陆失败");
                    }

                } catch (Exception e) {
                    e.printStackTrace();
                    //链接错误信息
                    ToastUtils.showToast(LoginActivity.this, e.toString());
                }
            }

            @Override
            public void callErrorBack(String json) {
                //链接错误信息
                ToastUtils.showToast(LoginActivity.this, json);
            }
        });

    }
}