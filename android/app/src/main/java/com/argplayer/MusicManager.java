package com.argplayer;

import android.database.Cursor;
import android.provider.MediaStore;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import org.json.JSONArray;

import java.util.ArrayList;
import java.util.HashMap;


/**
 * Created by meysam on 3/30/18.
 */

public class MusicManager extends ReactContextBaseJavaModule {

    ReactApplicationContext c;

    public MusicManager(ReactApplicationContext reactContext) {
        super(reactContext);

        this.c = reactContext;
    }

    @Override
    public String getName() {
        return "MusicManager";
    }

    @ReactMethod
    public void getAll(Callback callback) {
        callback.invoke(null, (new JSONArray(this.getAudioList())).toString());
    }

    public ArrayList<HashMap<String, String>> getAudioList() {

        ArrayList<HashMap<String, String>> mSongsList = new ArrayList<HashMap<String, String>>();

        Cursor mCursor = c.getContentResolver().query(
                MediaStore.Audio.Media.EXTERNAL_CONTENT_URI,
                new String[]{MediaStore.Audio.Media.DISPLAY_NAME,
                        MediaStore.Audio.Media.DATA},
                null,
                null,
                null
        );

        int count = mCursor.getCount();
        System.out.println("total no of songs are=" + count);
        HashMap<String, String> songMap;

        while (mCursor.moveToNext()) {
            songMap = new HashMap<String, String>();
            songMap.put("songTitle", mCursor.getString(mCursor
                    .getColumnIndexOrThrow(MediaStore.Audio.Media.DISPLAY_NAME)));
            songMap.put("songPath", mCursor.getString(mCursor
                    .getColumnIndexOrThrow(MediaStore.Audio.Media.DATA)));
            mSongsList.add(songMap);
        }
        mCursor.close();

        return mSongsList;
    }
}
