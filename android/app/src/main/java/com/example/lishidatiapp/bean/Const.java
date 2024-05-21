package com.example.lishidatiapp.bean;

public class Const {

    //    注册
    public static final String REGISTER = "/register";
    public static final String userCheck = "/userCheck";
    public static final String sql = "/sql";
    public static final String examGet = "/examGet";
    //    登录
    public static final String LOGIN = "/login";

    public static final String examSubmit = "/examSubmit";

    public static final String userSql = "/userSql";

    public static final String examReview = "/examReview";

    public static final String selectorderlist = "/selectorderlist";

    public static final String selectuser = "/selectuser";

    public static final String UploadFile = "/upload";

    public static final String updateuser = "/updateuser";

    public static String getHttpUrl(String address) {
        return "http://172.20.10.5:3000" + address;
//        return "https://sklpserver.nichijou-lab.com" + address;
    }
}
