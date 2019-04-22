package com.example.mta;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;

public class MainActivity extends AppCompatActivity {

    private RecyclerView recyclerView;
    private RecyclerView.Adapter mAdapter;
    private RecyclerView.LayoutManager layoutManager;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        recyclerView = (RecyclerView) findViewById(R.id.recycler_view);

        // use this setting to improve performance if you know that changes
        // in content do not change the layout size of the RecyclerView
        recyclerView.setHasFixedSize(true);

        // use a linear layout manager
        layoutManager = new LinearLayoutManager(this);
        recyclerView.setLayoutManager(layoutManager);

        String[] trainLines = {"1",
                "2",
                "3",
                "4",
                "5",
                "6",
                "7",
                "A",
                "B",
                "C",
                "D",
                "E",
                "F",
                "G",
                "M",
                "J",
                "Z",
                "L",
                "S",
                "N",
                "Q",
                "R",
                "W"};
        mAdapter = new TrainAdapter(trainLines);
        recyclerView.setAdapter(mAdapter);
    }
}
