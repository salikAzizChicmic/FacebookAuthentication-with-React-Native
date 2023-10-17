Facebook developers setup

1 -: Goto developers.facebook.com

2 -: Create app > Allow people to login with their  Facebook account > Next

3 -: Enter app name and email and then create app > select password > submit

4 -: Then we need three things  App id , App secret , client token

      For app id and app secret --> App settings > Basic 
      For client token --> App Settings > Advanced > Security > Client token (keep them for further use)

5 -: Now go to -: use cases > Authentication and account creation > Add all permission

6 -: Now from App setting > Basic  > click on Add platform  > Android > Next >Google play >Next

     --> Here you need three things -: Key hashes , package name , Class name
     Step to get them

     a) Key hash
        1-: cd android 
        2-: keytool -exportcert -alias alias_name -keystore sample_keystore.keystore | openssl sha1 -binary | openssl base64
     b) package
        --> copy it from manifest file or Any .java file

Project setup

1-: Install these 

    "@react-native-firebase/app": "^18.5.0",
    "@react-native-firebase/auth": "^18.5.0",
    "react-native-fbsdk-next": "^12.1.0",

2-: Add these lines in strings.xml
    
 
    <string name="facebook_app_id">Your app id</string>
    <string name="facebook_client_token">Your client token</string>

3-: Add this in manifest file inside application tag

     <meta-data android:name="com.facebook.sdk.ApplicationId"
          android:value="@string/facebook_app_id"/>
     <meta-data android:name="com.facebook.sdk.ClientToken" android:value="@string/facebook_client_token"/>

4 -: android/app/build.gradle

     dependencies {
    // Add these lines
    implementation platform('com.google.firebase:firebase-bom:26.3.0')
    implementation 'com.google.firebase:firebase-auth'
     }

5 -: android/build.gradle

    buildscript {
    repositories {
        google()
        jcenter()

        // Add this line
        mavenCentral()
    }
   }

6 -: android/app/build.gradle

    implementation 'com.facebook.android:facebook-android-sdk:[5,6)'


Firebase setup

1-: From your project select authentication > add new provider > facebook 
    --> Enter your App id and secret

2-: download the google-services.json file and place it in the android/app directory

3-: I have also added sha1 and sha256 in firebase app as precautionary Step. 
