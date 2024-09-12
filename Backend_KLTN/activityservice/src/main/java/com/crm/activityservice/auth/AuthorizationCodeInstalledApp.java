package com.crm.activityservice.auth;

import com.google.api.client.auth.oauth2.AuthorizationCodeFlow;
import com.google.api.client.auth.oauth2.AuthorizationCodeRequestUrl;
import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.auth.oauth2.TokenResponse;
import com.google.api.client.extensions.java6.auth.oauth2.VerificationCodeReceiver;
import com.google.api.client.util.Preconditions;
import java.io.IOException;
import java.io.PrintStream;
import java.net.URI;
import java.net.URISyntaxException;

public class AuthorizationCodeInstalledApp {
    private final AuthorizationCodeFlow flow;
    private final VerificationCodeReceiver receiver;

    public AuthorizationCodeInstalledApp(AuthorizationCodeFlow flow, VerificationCodeReceiver receiver) {
        this.flow = (AuthorizationCodeFlow) Preconditions.checkNotNull(flow);
        this.receiver = (VerificationCodeReceiver) Preconditions.checkNotNull(receiver);
    }

    public Credential authorize(String userId) throws IOException {
        Credential var7;
        try {
            Credential credential = this.flow.loadCredential(userId);
            if (credential != null
                    && (credential.getRefreshToken() != null || credential.getExpiresInSeconds() > 60L)) {
                Credential var11 = credential;
                return var11;
            }

            String redirectUri = this.receiver.getRedirectUri();
            AuthorizationCodeRequestUrl authorizationUrl = this.flow.newAuthorizationUrl().setRedirectUri(redirectUri);
            this.onAuthorization(authorizationUrl);
            String code = this.receiver.waitForCode();
            TokenResponse response = this.flow.newTokenRequest(code).setRedirectUri(redirectUri).execute();
            var7 = this.flow.createAndStoreCredential(response, userId);
        } finally {
            this.receiver.stop();
        }

        return var7;
    }

    protected void onAuthorization(AuthorizationCodeRequestUrl authorizationUrl) throws IOException {
        browse(authorizationUrl.build());
    }

    public static void browse(String url) {
        Preconditions.checkNotNull(url);
        System.out.println("Please open the following address in your browser:");
        PrintStream var10000 = System.out;
        String var10002 = String.valueOf(url);
        String var10001;
        if (var10002.length() != 0) {
            var10001 = "  ".concat(var10002);
        } else {
            String var10003 = " ";
            var10001 = var10003;
        }

        var10000.println(var10001);

        var10001 = var10001.replaceAll(" ", "");
        URI uri = null;
        try {
            uri = new URI(var10001);
        } catch (URISyntaxException e) {
            e.printStackTrace();
        }
        if (uri != null) {
            try {
                Runtime.getRuntime().exec("rundll32 url.dll,FileProtocolHandler " + uri.toString());
            } catch (IOException e) {
                e.printStackTrace();
            }
        }        
    }

    public final AuthorizationCodeFlow getFlow() {
        return this.flow;
    }

    public final VerificationCodeReceiver getReceiver() {
        return this.receiver;
    }
}
