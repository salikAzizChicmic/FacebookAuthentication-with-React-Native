import React, { useEffect, useState } from 'react'
import { View,Text,Button, TouchableOpacity,Image, ActivityIndicator } from 'react-native'
import auth from '@react-native-firebase/auth';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';

const Login = () => {

    const[userData,setUserData]=useState(null)
    const[loading,setLoading]=useState(null)

    async function onFacebookButtonPress() {
        // Attempt login with permissions
        setLoading(true)
        const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
       
        if (result.isCancelled) {
          setLoading(false)
          throw 'User cancelled the login process';
          
        }
      
        // Once signed in, get the users AccessToken
        const data = await AccessToken.getCurrentAccessToken();
      
        if (!data) {
          setLoading(false)
          throw 'Something went wrong obtaining access token';
        }
      
        // Create a Firebase credential with the AccessToken
        const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
        
      
        // Sign-in the user with the credential
        return auth().signInWithCredential(facebookCredential);
      }

      const handleSignIn=()=>{
        onFacebookButtonPress().then((res) => {
          setUserData(res.user)
          setLoading(false)
          //console.log(res.user.photoURL)
        })
      }
      const handleLogout=()=>{
        setUserData(null)
        auth().signOut();
      }
      useEffect(()=>{
        const user=auth().currentUser
        setUserData(user)
      },[])
  return (
    <View>
    {userData && <View style={{flexDirection:'column',alignItems:'center',justifyContent:'center',marginVertical:20}}>
       <Image style={{height:130,width:130,borderRadius:50,objectFit:'fill'}} source={{uri:userData.photoURL}} />
       <Text style={{fontSize:20,fontWeight:'bold'}}>{userData.displayName}</Text>
       <Text style={{fontSize:15,fontWeight:'500'}}>{userData.email}</Text>
    </View>}
    {!userData && <View style={{flexDirection:'column',alignItems:'center',justifyContent:'center',marginTop:350}}>
        <TouchableOpacity onPress={handleSignIn}>
        <View style={{flexDirection:'row',borderWidth:1,borderRadius:10}}>
             <Image style={{height:30,width:30,marginHorizontal:10,marginVertical:5 }} source={require('../Assets/Image/facebook.png')} />
            <Text style={{fontSize:15,fontWeight:'bold',marginRight:10,marginTop:8}}>Sign in with facebook</Text>
        </View>
        </TouchableOpacity>
    </View>}

    {userData && <View style={{flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
        <TouchableOpacity onPress={handleLogout}>
        <View style={{flexDirection:'row',borderWidth:1,borderRadius:10}}>
             <Image style={{height:30,width:30,marginHorizontal:10,marginVertical:5 }} source={require('../Assets/Image/lgt.png')} />
            <Text style={{fontSize:15,fontWeight:'bold',marginRight:10,marginTop:8}}>Logout from facebook</Text>
        </View>
        </TouchableOpacity>
    </View>}
    {loading===true && <ActivityIndicator size="large" />}
    </View>
  )
}

export default Login