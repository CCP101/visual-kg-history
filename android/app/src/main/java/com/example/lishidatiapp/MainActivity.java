package com.example.lishidatiapp;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.Fragment;
import androidx.viewpager.widget.ViewPager;

import android.os.Bundle;
import android.view.MenuItem;
import android.view.Window;

import com.example.lishidatiapp.adapter.MainActivityAdapter;
import com.example.lishidatiapp.fragment.DashboardFragment;
import com.example.lishidatiapp.fragment.HomeFragment;
import com.example.lishidatiapp.fragment.MyFragment;
import com.google.android.material.bottomnavigation.BottomNavigationView;

import java.util.ArrayList;
import java.util.List;

public class MainActivity extends AppCompatActivity {

    private ViewPager viewPager;

    List<Fragment> fragmentList = new ArrayList<>();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        supportRequestWindowFeature(Window.FEATURE_NO_TITLE);
        setContentView(R.layout.activity_main);
        final ViewPager viewPager = findViewById(R.id.main_viewpager);
        final BottomNavigationView bottomNavigationView = findViewById(R.id.main_bnv);

        initData();

        MainActivityAdapter adapter = new MainActivityAdapter(getSupportFragmentManager(), fragmentList);
        viewPager.setAdapter(adapter);
//        页面更改监听
        viewPager.setOnPageChangeListener(new ViewPager.OnPageChangeListener() {
            @Override
            public void onPageScrolled(int position, float positionOffset, int positionOffsetPixels) {

            }

            @Override
            public void onPageSelected(int position) {
                switch (position) {
                    case 0:
                        bottomNavigationView.setSelectedItemId(R.id.navigation_home);
                        break;
                    case 1:
                        bottomNavigationView.setSelectedItemId(R.id.navigation_dashboard);
                        break;
                    case 2:
                        bottomNavigationView.setSelectedItemId(R.id.navigation_notifications);
                        break;
                }
            }

            @Override
            public void onPageScrollStateChanged(int state) {

            }
        });
//        图标选择监听
        bottomNavigationView.setOnNavigationItemSelectedListener(new BottomNavigationView.OnNavigationItemSelectedListener() {
            @Override
            public boolean onNavigationItemSelected(@NonNull MenuItem item) {
                switch (item.getItemId()) {
                    case R.id.navigation_home:
                        viewPager.setCurrentItem(0);
                        break;
                    case R.id.navigation_dashboard:
                        viewPager.setCurrentItem(1);
                        break;
                    case R.id.navigation_notifications:
                        viewPager.setCurrentItem(2);
                        break;
                }
                return true;
            }
        });
    }

    private void initData() {
        HomeFragment homeFragment = HomeFragment.newInstance("首页", "");
        fragmentList.add(homeFragment);
        DashboardFragment dashboardFragment = DashboardFragment.newInstance("答题", "");
        fragmentList.add(dashboardFragment);
        MyFragment mineFragment = MyFragment.newInstance("个人中心", "");
        fragmentList.add(mineFragment);
    }

}