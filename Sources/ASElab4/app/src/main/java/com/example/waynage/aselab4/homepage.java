package com.example.waynage.aselab4;

import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.support.annotation.NonNull;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.LinearLayoutCompat;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.google.android.youtube.player.YouTubeBaseActivity;
import com.google.android.youtube.player.YouTubeInitializationResult;
import com.google.android.youtube.player.YouTubePlayer;
import com.google.android.youtube.player.YouTubePlayer.ErrorReason;
import com.google.android.youtube.player.YouTubePlayer.PlaybackEventListener;
import com.google.android.youtube.player.YouTubePlayer.PlayerStateChangeListener;
import com.google.android.youtube.player.YouTubePlayer.Provider;
import com.google.android.youtube.player.YouTubePlayerView;

import com.google.android.gms.auth.api.Auth;
import com.google.android.gms.common.api.ResultCallback;
import com.google.android.gms.common.api.Status;
import com.google.android.gms.plus.Plus;

import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.net.URL;

import static com.example.waynage.aselab4.MainActivity.googleApiclient;

public class homepage extends  YouTubeBaseActivity {

    public static final String API_Key = "AIzaSyCyURQPpLNMqkB5emAeZ4FfQCi2z5wlS0I";
    public static final String VIDEO_ID = "zw47_q9wbBE";

    private ImageView dp;
    private TextView name, email;
    private Button Signout;

    YouTubePlayerView myouTubePlayerView;
    Button btnPlay;
    YouTubePlayer.OnInitializedListener monInitializedListener;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_homepage);

        //dp = (ImageView) findViewById(R.id.dp);
        name = (TextView) findViewById(R.id.name);
        email = (TextView) findViewById(R.id.email);
        Signout = (Button) findViewById(R.id.btn_logout);
        btnPlay = (Button) findViewById(R.id.button2);
        myouTubePlayerView = (YouTubePlayerView) findViewById(R.id.youtube_player);

        Intent i = getIntent();
        final String i_name, i_email, i_url;
        i_name = i.getStringExtra("p_name");
        i_email = i.getStringExtra("p_email");
        i_url = i.getStringExtra("p_url");

        name.setText(i_name);
        email.setText(i_email);

        new Thread(new Runnable() {
            @Override
            public void run() { ///trying to get profile image onto app
                try {
                    URL url = new URL(i_url);
                    InputStream is = url.openConnection().getInputStream();
                    final Bitmap bmp = BitmapFactory.decodeStream(is);
                    runOnUiThread(new Runnable() {
                        @Override
                        public void run() {
                            dp.setImageBitmap(bmp);
                        }
                    });


                } catch (MalformedURLException e) {
                    e.printStackTrace();
                }catch (IOException e){
                    e.printStackTrace();
                }
            }
        }).start();

        Signout.setOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View view){
                goTomain();
            }
        });


        monInitializedListener = new YouTubePlayer.OnInitializedListener(){
            @Override
            public void onInitializationSuccess(YouTubePlayer.Provider provider, YouTubePlayer youTubePlayer, boolean b){
                youTubePlayer.loadVideo(VIDEO_ID);
            }
            @Override
            public void onInitializationFailure(YouTubePlayer.Provider provider, YouTubeInitializationResult youTubeInitializationResult){

            }
        };

        btnPlay.setOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View v){
                myouTubePlayerView.initialize(API_Key,monInitializedListener);
            }
        });

    }

    public void goTomain(){
        //This code redirects the from home page to the mainActivity page.
        if(googleApiclient.isConnected()){
            Auth.GoogleSignInApi.signOut(googleApiclient);
            googleApiclient.disconnect();
            googleApiclient.connect();
        }
        Toast.makeText(this,"LogOut Successful",Toast.LENGTH_SHORT).show();
        Intent redirect = new Intent(this, MainActivity.class);
        startActivity(redirect);
        finish();
    }

}


