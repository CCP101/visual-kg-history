package com.example.lishidatiapp.httpinfo;

import com.google.gson.Gson;

import org.json.JSONException;
import org.json.JSONObject;

public class JsonUtils {
    private static Gson gson = new Gson();

    public static synchronized  boolean isJson(String json) {
        try {
            JSONObject jsonObject = new JSONObject(json);
            return true;
        } catch (JSONException e) {
            e.printStackTrace();
            return false;
        }
    }

    public static synchronized  <T> Object fromJson(String json, Class aClass) {

        Object obj = null;
        if (isJson(json)) {
            try {

                obj = gson.fromJson(json, aClass);

            } catch (Exception e) {
                e.printStackTrace();
            }
            return obj;
        }
        return null;
    }
}
