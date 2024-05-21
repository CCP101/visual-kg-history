package com.example.lishidatiapp.activity;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import androidx.appcompat.app.ActionBar;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;

import com.example.lishidatiapp.R;


public class SetAccountActivity extends AppCompatActivity {

    private EditText usernameEditText;
    private EditText passwordEditText;
    private EditText rePasswordEditText;
    private Button confirmButton;
    private Button cancelButton;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_set_account);

        ActionBar actionBar = getSupportActionBar();
        if (actionBar != null) {
            actionBar.hide();
        }

        Toolbar toolbar = findViewById(R.id.toolbar);

        // 设置Toolbar的导航图标点击事件
        toolbar.setNavigationOnClickListener(v -> {
            onBackPressed(); // 执行返回上一个界面操作
        });

        // 找到布局中的视图元素
        usernameEditText = findViewById(R.id.setting_username);
        passwordEditText = findViewById(R.id.setting_password);
        rePasswordEditText = findViewById(R.id.setting_rePassword);
        confirmButton = findViewById(R.id.setting_btnPopConfirm);
        cancelButton = findViewById(R.id.setting_btnPopCancel);

        // 设置确认按钮的点击事件
        confirmButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // 在这里执行密码修改逻辑
                String username = usernameEditText.getText().toString();
                String password = passwordEditText.getText().toString();
                String rePassword = rePasswordEditText.getText().toString();

                // 检查密码是否匹配
                if (password.equals(rePassword)) {
                    // 执行密码修改操作
                    // 这里可以调用修改密码的方法
                    changePassword(username, password);
                } else {
                    // 密码不匹配，显示错误信息
                    Toast.makeText(SetAccountActivity.this, "密码不匹配", Toast.LENGTH_SHORT).show();
                }
            }
        });

        // 设置取消按钮的点击事件
        cancelButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // 点击取消按钮时执行取消操作
                cancelPasswordChange();
            }
        });
    }

    // 修改密码的方法
    private void changePassword(String username, String password) {
        // 在这里执行密码修改逻辑
        // 这里可以调用修改密码的接口或方法

        // 修改密码成功后的操作
        Toast.makeText(SetAccountActivity.this, "密码修改成功", Toast.LENGTH_SHORT).show();
        finish(); // 关闭当前界面
    }

    // 取消修改密码的方法
    private void cancelPasswordChange() {
        // 在这里执行取消密码修改的逻辑
        finish(); // 关闭当前界面
    }
}
