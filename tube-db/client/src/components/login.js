import React from 'react';
import { GoogleLogin } from 'react-google-login';


const clientId = "1034575332123-8tgla9079nd652nlfttj4lmub58up4ke.apps.googleusercontent.com"

function Login() {


    const onSuccess = (googleData) => {

        console.log(googleData.profileObj);
        
        //https://stackoverflow.com/questions/32182532/google-signin-doesnt-redirect-after-sign-out
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signIn().then(function () {
        console.log('User signed in.');
        window.location.href='http://localhost:3000/trendingvideos';
        })

    }

    const onFailure = (result) => {

        alert(result);
    }

    return(
            <GoogleLogin
                id = 'glogin'
                clientId={clientId}
                buttonText="Login"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
            />

    )


}

export default Login;