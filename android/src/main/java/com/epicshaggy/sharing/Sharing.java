package com.epicshaggy.sharing;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.util.Base64;
import android.util.Log;

import androidx.core.content.FileProvider;

import com.getcapacitor.JSArray;
import com.getcapacitor.JSObject;
import com.getcapacitor.NativePlugin;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;

import org.json.JSONException;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;

@NativePlugin(requestCodes = {Sharing.SHARE})
public class Sharing extends Plugin {

    protected static final int SHARE = 1020;

    @PluginMethod()
    public void share(PluginCall call) throws JSONException {
        JSArray fileNames = call.getArray("fileNames");
        if(fileNames == null || fileNames.length() <= 0){
            call.reject("No file names were provided.");
            return;
        }

        JSArray base64Values = call.getArray("base64Values");
        if(base64Values == null || base64Values.length() <= 0){
            call.reject("No base64 values were provided.");
            return;
        }

        String mimeType = call.getString("mimeType");
        if(mimeType == null){
            mimeType = "*/*";
        }

        String title = call.getString("androidTitle");
        if(title == null || title.isEmpty()){
            title = "Share";
        }

        ArrayList<Uri> files = new ArrayList<>();

        File cacheDir = getCacheDir();

        for(int i = 0; i < fileNames.length(); i++){
            String base64 = base64Values.getString(i);
            String fileName = fileNames.getString(i);

            File file = new File(cacheDir, fileName);

            try (FileOutputStream fos = new FileOutputStream(file)) {
                byte[] decodedData = Base64.decode(base64, Base64.DEFAULT);
                fos.write(decodedData);
                fos.flush();
            } catch (IOException e) {
                Log.e(getLogTag(), e.getMessage());
                call.reject("Failed to cache files.");
                return;
            } catch (IllegalArgumentException e) {
                call.reject("Invalid base64 parameter.");
                return;
            }

            Uri uri = SharingProvider.getUriForFile(getContext(), "com.epicshaggy.sharing.capacitorsharing.fileprovider", file);
            files.add(uri);
        }

        Intent intent;
        if(files.size() > 1){
            intent = new Intent(Intent.ACTION_SEND_MULTIPLE);
            intent.putParcelableArrayListExtra(Intent.EXTRA_STREAM, files);
        }else{
            intent = new Intent(Intent.ACTION_SEND);
            intent.putExtra(Intent.EXTRA_STREAM, files.get(0));
        }
        intent.setTypeAndNormalize(mimeType);
        intent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
        intent.addFlags(Intent.FLAG_GRANT_WRITE_URI_PERMISSION);
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_DOCUMENT);
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);

        saveCall(call);
        startActivityForResult(call, Intent.createChooser(intent, title), SHARE);
    }

    private File getCacheDir() {
        File cacheDir = new File(getContext().getFilesDir(), "sharing_tmp");
        if (!cacheDir.exists()) {
            //noinspection ResultOfMethodCallIgnored
            cacheDir.mkdirs();
        } else {
            for (File f : cacheDir.listFiles()) {
                //noinspection ResultOfMethodCallIgnored
                f.delete();
            }
        }
        return cacheDir;
    }

    @Override
    protected void handleOnActivityResult(int requestCode, int resultCode, Intent data) {
        super.handleOnActivityResult(requestCode, resultCode, data);
        if(requestCode == SHARE) {
                getSavedCall().resolve();
                return;
        }
    }
}
