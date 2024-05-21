package com.example.lishidatiapp.interfaces;

import android.view.View;

public interface OnRecyclerItemClickerListener {

    void onRecyclerItemClick(View view, int position);
    void onRecyclerItemLongClick(View view, int position);
}
