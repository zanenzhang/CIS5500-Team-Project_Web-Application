import React from 'react';
import { GoogleLogin } from 'react-google-login';


const clientId = "1034575332123-8tgla9079nd652nlfttj4lmub58up4ke.apps.googleusercontent.com"

function Login() {


    const onSuccess = (googleData) => {

        console.log(googleData.profileObj);

    }

    const onFailure = (result) => {

        alert(result);
    }

    return(
        <div id ="signInButton">
            <GoogleLogin
                clientId={clientId}
                buttonText="Login"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
            />
        </div>

    )


}

export default Login;