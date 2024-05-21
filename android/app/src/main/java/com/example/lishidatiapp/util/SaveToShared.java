package com.example.lishidatiapp.util;

import android.content.Context;

import com.example.lishidatiapp.bean.UserInfoModel;
import com.google.gson.Gson;


public class SaveToShared {
    private static SharedPreferencesUtils sharedPreferencesUtils;
    private static Gson gson;
    public static void saveData(Context context, UserInfoModel databeen){
        if(sharedPreferencesUtils==null||gson==null){
            sharedPreferencesUtils = new SharedPreferencesUtils(context);
            gson = new Gson();
        }
        String json = gson.toJson(databeen);
        sharedPreferencesUtils.setParam("loginJson", json);
    }
}
