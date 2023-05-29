package com.findmeio.SendSMSFirebase;

import android.Manifest;
import android.content.Context;
import android.content.pm.PackageManager;
import android.telephony.TelephonyManager;

import androidx.annotation.NonNull;
import androidx.core.app.ActivityCompat;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.google.firebase.FirebaseException;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.PhoneAuthCredential;
import com.google.firebase.auth.PhoneAuthOptions;
import com.google.firebase.auth.PhoneAuthProvider;

import java.io.IOException;
import java.util.Objects;
import java.util.concurrent.TimeUnit;

public class SendSMSFirebaseModule extends ReactContextBaseJavaModule {
    private ReactApplicationContext ctx;
    private FirebaseAuth mAuth;
    public SendSMSFirebaseModule(ReactApplicationContext parentContext) {
        super(parentContext);
        this.ctx = parentContext;
        this.mAuth = FirebaseAuth.getInstance();
    }

    @NonNull
    @Override
    public String getName() {
        return "SendSMSFirebase";
    }
    @ReactMethod(isBlockingSynchronousMethod = false)
    public void GetPhoneNumber(Promise promise) {
        TelephonyManager tMgr = (TelephonyManager) ctx.getSystemService(Context.TELEPHONY_SERVICE);
        if (ActivityCompat.checkSelfPermission(this.ctx, Manifest.permission.READ_SMS) != PackageManager.PERMISSION_GRANTED
                && ActivityCompat.checkSelfPermission(this.ctx, Manifest.permission.READ_PHONE_NUMBERS) != PackageManager.PERMISSION_GRANTED
                && ActivityCompat.checkSelfPermission(this.ctx, Manifest.permission.READ_PHONE_STATE) != PackageManager.PERMISSION_GRANTED) {
            String mPhoneNumber = tMgr.getLine1Number();
            promise.resolve(mPhoneNumber);
        }
        promise.resolve(null);
    }


    public PhoneAuthProvider.OnVerificationStateChangedCallbacks CallbackFuncStart() {

        return new PhoneAuthProvider.OnVerificationStateChangedCallbacks() {
            @Override
            public void onVerificationCompleted(@NonNull PhoneAuthCredential phoneAuthCredential) {

            }

            @Override
            public void onVerificationFailed(@NonNull FirebaseException e) {

            }
        };
    }

    @ReactMethod(isBlockingSynchronousMethod = false)
    public void StartVerification(String phoneNumber, Promise promise) {
            PhoneAuthOptions options =
                PhoneAuthOptions.newBuilder(mAuth)
                        .setPhoneNumber(phoneNumber)
                        .setTimeout(60L, TimeUnit.SECONDS)
                        .setActivity(Objects.requireNonNull(this.getCurrentActivity()))
                        .setCallbacks(this.CallbackFuncStart())
                        .build();
        PhoneAuthProvider.verifyPhoneNumber(options);
    }

}
