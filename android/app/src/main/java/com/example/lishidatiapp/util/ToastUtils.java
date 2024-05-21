package com.example.lishidatiapp.util;

import android.content.Context;
import android.widget.Toast;

public class ToastUtils {
    private static Toast mShortToast;
    private static Toast mLongToast;
    private static boolean isshow=true;

    public ToastUtils() {
    }

    public static void showToast(Context context, String message) {

        if(isshow){
            if (mShortToast == null) {
                mShortToast = Toast.makeText(context, message, 1000);
            }
            mShortToast.setText(message);
            mShortToast.show();

        }
    }

    public static void showLongToast(Context context, String message) {
        if (mLongToast == null) {
            mLongToast = Toast.makeText(context, message, 1000);
        }

        mLongToast.setText(message);
        mLongToast.show();
    }
}
