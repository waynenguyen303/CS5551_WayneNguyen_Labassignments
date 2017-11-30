package com.example.waynage7.ase_lab5;

import android.app.Activity;
import android.content.DialogInterface;
import android.content.Intent;
import android.graphics.Bitmap;
import android.net.Uri;
import android.os.Bundle;
import android.os.Environment;
import android.provider.MediaStore;
import android.support.design.widget.FloatingActionButton;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.ImageView;
import android.content.pm.PackageManager;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;


import clarifai2.api.ClarifaiBuilder;
import clarifai2.api.ClarifaiClient;
import clarifai2.api.ClarifaiResponse;
import clarifai2.dto.input.ClarifaiInput;


public class MainActivity_addimage extends AppCompatActivity {

    ClarifaiResponse response;
    ImageView chosenImage;
    Integer REQUEST_CAMERA=1, SELECT_FILE = 0;
    String file_path = Environment.getExternalStorageDirectory().getAbsolutePath() + "/StoredPics";


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main_addimage);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);


        chosenImage =(ImageView) findViewById(R.id.chosenImage);

        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
               /* Snackbar.make(view, "Replace with your own action", Snackbar.LENGTH_LONG)
                        .setAction("Action", null).show();*/


                SelectImage();



            }
        });
    }


    private void SelectImage(){

        final CharSequence[] items={"Camera", "Gallery", "Cancel"};

        AlertDialog.Builder builder = new AlertDialog.Builder(MainActivity_addimage.this);
        builder.setTitle("Add Image");
        builder.setItems(items, new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {
                if(items[which].equals("Camera")){
                    Intent intent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
                    startActivityForResult(intent,REQUEST_CAMERA);

                }else if(items[which].equals("Gallery")){

                    Intent intent = new Intent(Intent.ACTION_PICK, MediaStore.Images.Media.EXTERNAL_CONTENT_URI);
                    intent.setType("image/*");
                    startActivityForResult(intent.createChooser(intent, "Select File"), SELECT_FILE);



                }else if(items[which].equals("Cancel")){
                    dialog.dismiss();
                }
            }
        });
        builder.show();
    }

    public void saveToFile(Bitmap image) {
        File dir = new File(file_path);
        FileOutputStream fOut = null;
        try{
            dir.mkdirs();
            if(!dir.isDirectory())
                dir.mkdirs();
            File file = new File(dir, "Photo" + 1 + ".jpg");
            fOut = new FileOutputStream(file);
            image.compress(Bitmap.CompressFormat.JPEG, 100, fOut);
            fOut.flush();
            fOut.close();
        }catch(IOException e){
            System.out.println("File Creation Failed");
            e.printStackTrace();
        }finally{
            try {
                if (fOut != null) {
                    fOut.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }


    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data){
        if(resultCode == Activity.RESULT_OK){

            if(requestCode == REQUEST_CAMERA ){
                Bundle bundle = data.getExtras();
                Bitmap bit = (Bitmap) bundle.get("data");
                chosenImage.setImageBitmap(bit);


                saveToFile(bit);
                Thread thread = new Thread(new Runnable() {

                    @Override
                    public void run() {
                        try  {
                            ClarifaiClient client = new ClarifaiBuilder("fdf29a3cfd224795ac68e9a5fd2e871f").buildSync();
                            response = client.getDefaultModels().generalModel().predict()
                                    .withInputs(ClarifaiInput.forImage(new File(file_path + "/Photo1.jpg")))
                                    .executeSync();

                            System.out.println(response);
                        } catch (Exception e) {
                            e.printStackTrace();
                        }
                    }
                });

                thread.start();




            }else if(requestCode==SELECT_FILE){
                Uri selectedImageUri = data.getData();
                chosenImage.setImageURI(selectedImageUri);

               /* try {

                    Bitmap bit2 = MediaStore.Images.Media.getBitmap(this.getContentResolver(),selectedImageUri);
                    saveToFile(bit2);

                    System.out.println(selectedImageUri.getPath());
                    System.out.println("RRRRRRRRRRRRR");
                    ClarifaiClient client = new ClarifaiBuilder("fdf29a3cfd224795ac68e9a5fd2e871f").buildSync();
                    response = client.getDefaultModels().generalModel().predict()
                            .withInputs(ClarifaiInput.forImage("https://commons.wikimedia.org/wiki/File:Arancia_di_Ribera_byFigiu.JPG")).executeSync();

                    System.out.println(response);

                } catch (IOException e) {
                    e.printStackTrace();
                }*/

            }


        }

    }


    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_main_activity_addimage, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
        if (id == R.id.action_settings) {
            return true;
        }

        return super.onOptionsItemSelected(item);
    }
}
