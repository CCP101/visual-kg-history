package com.example.lishidatiapp.util;

import android.content.Context;
import android.content.SharedPreferences;

public class SharedPreferencesUtils {
    private Context context;
    private String FILE_NAME = "share_date";

    public SharedPreferencesUtils(String FILE_NAME) {
        this.FILE_NAME = FILE_NAME;
    }

    public SharedPreferencesUtils(Context context) {
        this.context = context;
    }

    public void setParam(String key, Object object) {
        String type = object.getClass().getSimpleName();
        SharedPreferences sp = this.context.getSharedPreferences(this.FILE_NAME, 4);
        SharedPreferences.Editor editor = sp.edit();
        if ("String".equals(type)) {
            editor.putString(key, object.toString());
        } else if ("Integer".equals(type)) {
            editor.putInt(key, (Integer)object);
        } else if ("Boolean".equals(type)) {
            editor.putBoolean(key, (Boolean)object);
        } else if ("Float".equals(type)) {
            editor.putFloat(key, (Float)object);
        } else if ("Long".equals(type)) {
            editor.putLong(key, (Long)object);
        }

        editor.commit();
    }

    public Object getParam(String key, Object defaultObject) {
        String type = defaultObject.getClass().getSimpleName();
        SharedPreferences sp = this.context.getSharedPreferences(this.FILE_NAME, 0);
        if ("String".equals(type)) {
            return sp.getString(key, (String)defaultObject);
        } else if ("Integer".equals(type)) {
            return sp.getInt(key, (Integer)defaultObject);
        } else if ("Boolean".equals(type)) {
            return sp.getBoolean(key, (Boolean)defaultObject);
        } else if ("Float".equals(type)) {
            return sp.getFloat(key, (Float)defaultObject);
        } else {
            return "Long".equals(type) ? sp.getLong(key, (Long)defaultObject) : null;
        }
    }

    public void remove(String key) {
        SharedPreferences sp = this.context.getSharedPreferences(this.FILE_NAME, 0);
        SharedPreferences.Editor editor = sp.edit();
        editor.remove(key);
        editor.apply();
    }

    public void clear() {
        SharedPreferences sp = this.context.getSharedPreferences(this.FILE_NAME, 0);
        SharedPreferences.Editor editor = sp.edit();
        editor.clear();
        editor.apply();
    }
}
