package com.example.mta;

import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

public class TrainAdapter extends RecyclerView.Adapter<TrainAdapter.MyViewHolder> {
        private String[] mDataset;

        public static class MyViewHolder extends RecyclerView.ViewHolder {
            public TextView textView;
            public MyViewHolder(final View itemView) {
                super(itemView);
                textView = itemView.findViewById(R.id.simple_text);
            }
        }

        public TrainAdapter(String[] myDataset) {
            mDataset = myDataset;
        }

        @Override
        public TrainAdapter.MyViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
            View v = LayoutInflater.from(parent.getContext())
                    .inflate(R.layout.my_text_view, parent, false);
            MyViewHolder vh = new MyViewHolder(v);
            return vh;
        }

        @Override
        public void onBindViewHolder(MyViewHolder holder, int position) {
            holder.textView.setText(mDataset[position]);

        }

        @Override
        public int getItemCount() {
            return mDataset.length;
        }
}
