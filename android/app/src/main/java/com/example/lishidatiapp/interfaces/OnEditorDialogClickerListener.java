package com.example.lishidatiapp.interfaces;


import android.app.AlertDialog;
import android.view.View;
import android.widget.EditText;

public interface OnEditorDialogClickerListener {
    void onRightclerItemClick(View view, AlertDialog dialog, EditText content);
    void onLeftRecyclerItemClick(View view, AlertDialog dialog);
}
