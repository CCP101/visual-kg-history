package com.example.lishidatiapp.httpinfo;

import android.annotation.SuppressLint;
import android.os.Handler;
import android.os.Message;
import android.text.TextUtils;
import android.view.View;

import com.example.lishidatiapp.bean.TiJiaoBean;
import com.example.lishidatiapp.interfaces.OnCallBack;
import com.google.gson.Gson;

import java.io.IOException;
import java.net.ConnectException;
import java.net.SocketTimeoutException;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;

import okhttp3.FormBody;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;


public class OkHttpUtils {

    public static final long TIMEOUT = 10*1000;
    public static final TimeUnit TIME_UNIT = TimeUnit.SECONDS;
    private OnCallBack onCallBack;

    public MediaType JSON
            = MediaType.parse("application/json; charset=utf-8");
    //    public static final MediaType JSON
//            = MediaType.parse("application/x-www-form-urlencoded");
    //手机品牌
    public String PHONEBRAND = "phoneBand";
    //手机IMEI
    public String PHONEIMEI = "Client-Deviceid";
    //手机型号
    public String PHONEMODEL = "phoneModel";
    //Android版本
    public String ANDROIDVER = "androidVer";
    //手机系统
    public String PHONESYS = "Client-Platform";
    //app版本
    public String APPCODE = "Client-Version";
    //app版本号
    public String APPVER = "appVerName";
    //app渠道
    public String APPCHANNEL = "channel";
    //token
    public String TOKEN = "token";

    private static final int SUCCESS = 0;
    private static final int EXCEPTION = -1;
    private OkHttpClient client = new OkHttpClient.Builder().addInterceptor(new MyInterceptor()).connectTimeout(TIMEOUT, TIME_UNIT)
            .readTimeout(TIMEOUT, TimeUnit.SECONDS)
            .writeTimeout(TIMEOUT, TimeUnit.SECONDS).build();
    private static OkHttpUtils instance;
    private View mview;

    //单例模式
    public static OkHttpUtils getInstance() {
        if (instance == null) {
            instance = new OkHttpUtils();
        }
        return instance;
    }

    @SuppressLint("HandlerLeak")
    private Handler handler = new Handler() {
        @Override
        public void handleMessage(Message msg) {
            super.handleMessage(msg);
            if (mview != null) {
                mview.setVisibility(View.GONE);
            }
            switch (msg.what) {
                case SUCCESS:
                    String pjson = (String) msg.obj;
                    if (onCallBack != null) {
                        onCallBack.callSuccessBack(pjson);
                    }
                    break;
                case EXCEPTION:
                    String exception = (String) msg.obj;
                    if (onCallBack != null) {
                        onCallBack.callErrorBack(exception);
                    }
                    break;
            }
        }
    };
    @SuppressLint("HandlerLeak")
    private Handler handler1 = new Handler() {
        @Override
        public void handleMessage(Message msg) {
            super.handleMessage(msg);
            switch (msg.what) {
                case SUCCESS:
                    String pjson = (String) msg.obj;
                    if (onCallBack != null) {
                        onCallBack.callSuccessBack(pjson);
                    }
                    break;
                case EXCEPTION:
                    String exception = (String) msg.obj;
                    if (onCallBack != null) {
                        onCallBack.callErrorBack(exception);
                    }
                    break;
            }
        }
    };

    /**
     * @param url 请求地址
     * @return
     * @throws IOException
     */
    private String get(String url) throws IOException {
        Request request = new Request.Builder()
                .url(url)
                .tag(url)
                 .addHeader("withCredentials", "true")
                .addHeader("Cookie", "userLogin=b37d8550-ee56-11ee-9018-53d6a259b0dc; userLogin.sig=PTvhOTpvKLTubh8NvIMapkcOwgc; TUST=eyJhZTg2OWRjMC1lZTU2LTExZWUtOTAxOC01M2Q2YTI1OWIwZGMiOnsibmFtZSI6IjEzMzAifSwiYjM3ZDg1NTAtZWU1Ni0xMWVlLTkwMTgtNTNkNmEyNTliMGRjIjp7Im5hbWUiOiIxMzAifSwiX2V4cGlyZSI6MTcxMTc4Mzg2NDEwMywiX21heEFnZSI6NzIwMDAwMH0=; TUST.sig=aKRGjVSUmawVvFlYEGlF9vRSE18")
                .build();
        Response response = client.newCall(request).execute();
//        Call call  = client.newCall(request);
//        String tag= (String) call.request().tag();
//        if(tag.equals(url)){
//            return response.body().string();
//        }
        //response.body().string()这一句代码在方法体里面只能用一次(包括打印输出的使用)
        return response.body().string();
    }

    /**
     * @param url 请求地址
     * @param map map字符串请求参数，表单体制
     * @return
     * @throws IOException
     */
    private String postForm(String url, Map<String, String> map) throws IOException {

        FormBody formBody = getFormBody(map);

        Request request = new Request.Builder()
                .url(url)
                .post(formBody)
                .addHeader("withCredentials", "true")
                .tag(url)
                .build();
        Response response = client.newCall(request).execute();
        //response.body().string()这一句代码在方法体里面只能用一次(包括打印输出的使用)
//        Call call  = client.newCall(request);
//        String tag= (String) call.request().tag();
//        if(tag.equals(url)){
//            return response.body().string();
//        }
        //response.body().string()这一句代码在方法体里面只能用一次(包括打印输出的使用)
        return response.body().string();
    }

    /**
     * @param url 请求地址
     * @return
     * @throws IOException
     */
    private String postJson(String url, String data) throws IOException {

        RequestBody body = RequestBody.create(JSON, data);
        Request request = new Request.Builder()
                .url(url)
                .post(body)
                .tag(url)
                .addHeader("withCredentials", "true")
                .build();
        Response response = client.newCall(request).execute();
//        Call call  = client.newCall(request);
//        String tag= (String) call.request().tag();
//        if(tag.equals(url)){
//            return response.body().string();
//        }
        //response.body().string()这一句代码在方法体里面只能用一次(包括打印输出的使用)
        return response.body().string();
    }

    private FormBody getFormBody(Map<String, String> map) {
        FormBody.Builder formBodyBuilder = new FormBody.Builder();

        // 添加url参数
        if (map != null) {
            Iterator<String> it = map.keySet().iterator();
            while (it.hasNext()) {
                String key = it.next();
                String value = map.get(key);
                formBodyBuilder.add(key, value);

            }
        }
        return formBodyBuilder.build();
    }


    /**
     * 设置回调监听
     *
     * @param onCallBack 回调接口
     */
    public void setOnCallBack(OnCallBack onCallBack) {
        this.onCallBack = onCallBack;
    }


    /**
     * GET 字符串拼接提交
     *
     * @param url 请求地址
     */
    public void requestDataFromeGet(final String url) {
        new Thread() {
            @Override
            public void run() {
                super.run();
                try {
                    String result = get(url);
                    Message message = Message.obtain();
                    message.what = SUCCESS;
                    message.obj = result;
                    handler.sendMessage(message);
//                    String result = get(url);
//                    if(!TextUtils.isEmpty(result)){
//                        Message message = Message.obtain();
//                        message.what = SUCCESS;
//                        message.obj = result;
//                        handler.sendMessage(message);
//                    }else {
//                        if (mview != null) {
//                            mview.setVisibility(View.GONE);
//                        }
//                    }
                } catch (SocketTimeoutException e) {
                    e.printStackTrace();
                    Message message = Message.obtain();
                    message.what = EXCEPTION;
                    message.obj = "网络请求超时";
                    handler.sendMessage(message);
                } catch (ConnectException e) {
                    e.printStackTrace();
                    Message message = Message.obtain();
                    message.what = EXCEPTION;
                    message.obj = "请检查网络链接";
                    handler.sendMessage(message);
                } catch (Exception e) {
                    e.printStackTrace();
                    Message message = Message.obtain();
                    message.what = EXCEPTION;
                    message.obj = "网络连接已断开";
                    handler.sendMessage(message);
                }
            }
        }.start();
    }


    /**
     * POST 字符串拼接提交
     *
     * @param url 请求地址
     * @param map 请求参数(把map转换成gson)
     */

    public void rquestDataFromePostStr(final String url, final HashMap<String, Object> map, View view) {
        JSON = MediaType.parse("application/json; charset=utf-8");
        this.mview = view;
        if (mview != null) {
            mview.setVisibility(View.VISIBLE);
        }

        new Thread() {
            @Override
            public void run() {
                super.run();
                try {
                    Gson gson = new Gson();
                    String Data = gson.toJson(map);
                    String result = postJson(url, Data);
                    Message message = Message.obtain();
                    message.what = SUCCESS;
                    message.obj = result;
                    handler.sendMessage(message);
//                    Gson gson = new Gson();
//                    String Datas = gson.toJson(map);
//                    String result = postJson(url, Datas);
//                    if(!TextUtils.isEmpty(result)){
//                        Message message = Message.obtain();
//                        message.what = SUCCESS;
//                        message.obj = result;
//                        handler.sendMessage(message);
//                    }else {
//                        if (mview != null) {
//                            mview.setVisibility(View.GONE);
//                        }
//                    }
                } catch (SocketTimeoutException e) {
                    e.printStackTrace();
                    Message message = Message.obtain();
                    message.what = EXCEPTION;
                    message.obj = "网络请求超时";
                    handler.sendMessage(message);
                } catch (ConnectException e) {
                    e.printStackTrace();
                    Message message = Message.obtain();
                    message.what = EXCEPTION;
                    message.obj = "请检查网络链接";
                    handler.sendMessage(message);
                } catch (Exception e) {
                    e.printStackTrace();
                    Message message = Message.obtain();
                    message.what = EXCEPTION;
                    message.obj = "请检查网络链接";
                    handler.sendMessage(message);
                }
            }
        }.start();
    }
    public void rquestDataFromePostListStr(final String url, final List<TiJiaoBean> list, View view) {
        JSON = MediaType.parse("application/json; charset=utf-8");
        this.mview = view;
        if (mview != null) {
            mview.setVisibility(View.VISIBLE);
        }

        new Thread() {
            @Override
            public void run() {
                super.run();
                try {
                    Gson gson = new Gson();
                    String Data = gson.toJson(list);
                    String result = postJson(url, Data);
                    Message message = Message.obtain();
                    message.what = SUCCESS;
                    message.obj = result;
                    handler.sendMessage(message);
//                    Gson gson = new Gson();
//                    String Datas = gson.toJson(map);
//                    String result = postJson(url, Datas);
//                    if(!TextUtils.isEmpty(result)){
//                        Message message = Message.obtain();
//                        message.what = SUCCESS;
//                        message.obj = result;
//                        handler.sendMessage(message);
//                    }else {
//                        if (mview != null) {
//                            mview.setVisibility(View.GONE);
//                        }
//                    }
                } catch (SocketTimeoutException e) {
                    e.printStackTrace();
                    Message message = Message.obtain();
                    message.what = EXCEPTION;
                    message.obj = "网络请求超时";
                    handler.sendMessage(message);
                } catch (ConnectException e) {
                    e.printStackTrace();
                    Message message = Message.obtain();
                    message.what = EXCEPTION;
                    message.obj = "请检查网络链接";
                    handler.sendMessage(message);
                } catch (Exception e) {
                    e.printStackTrace();
                    Message message = Message.obtain();
                    message.what = EXCEPTION;
                    message.obj = "请检查网络链接";
                    handler.sendMessage(message);
                }
            }
        }.start();
    }


    /**
     * POST 字符串拼接提交
     *
     * @param url 请求地址
     * @param map 请求参数(把map转换成gson)
     */

    public void rquestDataFromePostFace(final String url, final HashMap<String, Object> map, View view) {
        JSON = MediaType.parse("application/json; charset=utf-8");
        this.mview = view;
        if (mview != null) {
            mview.setVisibility(View.VISIBLE);
        }
        new Thread() {
            @Override
            public void run() {
                super.run();
                try {
                    Gson gson = new Gson();
                    String Data = gson.toJson(map);
                    String result = postJson(url, Data);
                    Message message = Message.obtain();
                    message.what = SUCCESS;
                    message.obj = result;
                    handler1.sendMessage(message);
//                    Gson gson = new Gson();
//                    String Data = gson.toJson(map);
//                    String result = postJson(url, Data);
//                    if(!TextUtils.isEmpty(result)){
//                        Message message = Message.obtain();
//                        message.what = SUCCESS;
//                        message.obj = result;
//                        handler1.sendMessage(message);
//                    }else {
//                        if (mview != null) {
//                            mview.setVisibility(View.GONE);
//                        }
//                    }
                } catch (SocketTimeoutException e) {
                    e.printStackTrace();
                    Message message = Message.obtain();
                    message.what = EXCEPTION;
                    message.obj = "网络请求超时";
                    handler1.sendMessage(message);
                } catch (ConnectException e) {
                    e.printStackTrace();
                    Message message = Message.obtain();
                    message.what = EXCEPTION;
                    message.obj = "请检查网络链接";
                    handler1.sendMessage(message);
                } catch (Exception e) {
                    e.printStackTrace();
                    Message message = Message.obtain();
                    message.what = EXCEPTION;
                    message.obj = "请检查网络链接";
                    handler1.sendMessage(message);
                }
            }
        }.start();
    }


    /**
     * POST 表单提交
     *
     * @param url 请求地址
     * @param map 请求参数
     */

    public void rquestDataFromePostFrom(final String url, final HashMap<String, String> map) {
        JSON = MediaType.parse("application/x-www-form-urlencoded");
        new Thread() {
            @Override
            public void run() {
                super.run();
                try {
                    String result = postForm(url, map);
                    if(!TextUtils.isEmpty(result)){
                        Message message = Message.obtain();
                        message.what = SUCCESS;
                        message.obj = result;
                        handler.sendMessage(message);
                    }
                } catch (SocketTimeoutException e) {
                    e.printStackTrace();
                    Message message = Message.obtain();
                    message.what = EXCEPTION;
                    message.obj = "网络请求超时";
                    handler.sendMessage(message);
                } catch (ConnectException e) {
                    e.printStackTrace();
                    Message message = Message.obtain();
                    message.what = EXCEPTION;
                    message.obj = "请检查网络链接";
                    handler.sendMessage(message);
                } catch (Exception e) {
                    e.printStackTrace();
                    Message message = Message.obtain();
                    message.what = EXCEPTION;
                    message.obj = "网络连接已断开";
                    handler.sendMessage(message);
                }
            }
        }.start();
    }

}

