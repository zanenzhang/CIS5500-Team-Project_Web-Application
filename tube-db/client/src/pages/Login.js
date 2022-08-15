import './Login.css';
import {gapi} from 'gapi-script';
import { useReducer, useEffect, useState } from 'react';
import HeaderLogo from '../components/HeaderLogo';
import React from 'react';
import image from '../images/whatsapp2.webp';
import { GoogleLogin } from 'react-google-login';

var clicked = false;//Global Variable

const CLIENT_ID = "1034575332123-8tgla9079nd652nlfttj4lmub58up4ke.apps.googleusercontent.com"
const API_KEY = "AIzaSyCrG2ljgMyqUl9JS-mdHwrKZbbGscficYo"


function Login() {

  const [userName, setUserName] = useState('');
  const [passWord, setPassword] = useState('');

  const onSuccess = (googleData) => {

    sessionStorage.setItem('userInfo', googleData.profileObj.email);
    var user = sessionStorage.getItem('userInfo');

    console.log(user);

    //https://stackoverflow.com/questions/32182532/google-signin-doesnt-redirect-after-sign-out
      var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(function () {
        console.log('User signed in.');
        window.location.href='http://localhost:3000/trendingvideos';
      })

  }

  const onFailure = (result) => {

    alert(result);

  }

  useEffect(() => {

    function start() {

      sessionStorage.removeItem('userInfo');

      gapi.client.init({
        apiKey: API_KEY,
        clientID: CLIENT_ID
      });

    };

    gapi.load('client: auth', start);

  });

  const handleSubmit = event => {

    event.preventDefault();

    //Get input values on Form submit in React
    //https://bobbyhadz.com/blog/react-get-form-input-value-on-submit#:~:text=To%20get%20input%20values%20on,fields%20in%20your%20handleSubmit%20function.
    sessionStorage.setItem('userInfo', userName);
    var user = sessionStorage.getItem('userInfo');

    console.log(user);

    window.location.href='http://localhost:3000/trendingvideos';

  };

  return (
    <div class = "Login">
      <HeaderLogo id="loginLogo" />
      
      <h2 id="startingText" class="white-text">CIS 550 Project: Bug Busters</h2>
      <p class="white-text">(Derek Taylor, Zan Zhang, Sanjeeva Rajapakse, Angela Fan, Fred Qi)</p>
      <h3 class="white-text">Login Page</h3>
      <form onSubmit={handleSubmit}>
      <fieldset>
         <label>
           <h5 class="white-text">Username/Email</h5>
           <input name="Username" onChange={event => setUserName(event.target.value)} />
         </label>
       </fieldset>
       <fieldset>
         <label>
           <h5 class="white-text">Password</h5>
           <input name="Password" onChange={event => setPassword(event.target.value)} />
         </label>
       </fieldset>
       <button id="loginButtonSubmit" type="submit">Submit</button>
      </form>
      <div class='loginGoogle'>
      <GoogleLogin
                id = 'g-login'
                clientId={CLIENT_ID}
                buttonText="Login with Google"
                onSuccess= {onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={false}
            />
        </div>
    </div>
  );
}

export default Login;
