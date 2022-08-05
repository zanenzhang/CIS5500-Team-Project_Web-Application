import React from 'react';
import { GoogleLogin } from 'react-google-login';

const clientId = "1034575332123-8tgla9079nd652nlfttj4lmub58up4ke.apps.googleusercontent.com"

function Logout() {

    const onSuccess = () => {

        console.log("Logout Successful");
    }

    return(
        <div id ="signInButton">
            <GoogleLogin
                clientId={clientId}
                buttonText="Logout"
                onLogoutSuccess={onSuccess}
            />
        </div>

    )


}

export default Logout;