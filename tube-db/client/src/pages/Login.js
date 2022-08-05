import './Login.css';
import LoginButton from '../components/login';
import {gapi} from 'gapi-script';
import { useReducer, useEffect, useState } from 'react';
import React from 'react';
import image from '../images/whatsapp2.webp';


const CLIENT_ID = "1034575332123-8tgla9079nd652nlfttj4lmub58up4ke.apps.googleusercontent.com"
const API_KEY = "AIzaSyCrG2ljgMyqUl9JS-mdHwrKZbbGscficYo"

const formReducer = (state, event) => {
    return {
      ...state,
      [event.target.name]: event.target.value
    }
   }

function Login() {

  const [formData, setFormData] = useReducer(formReducer, {});

  useEffect(() => {
    function start() {
      gapi.client.init({
        apiKey: API_KEY,
        clientID: CLIENT_ID
      })
    };

    gapi.load('client:auth2', start);

  });

  const handleSubmit = event => {
    event.preventDefault();
    alert('You have submitted the form.')
  };

  // const handleFailure = (result) => {

  //   alert(result);
  // };

  // const handleLogin = (response) => {

  //   console.log(response.credential);
  //   setUser(response.credential.profileObj);
  // };

  return (
    <div class = "Login">
      <h2 class="white-text">CIS 550 Project: Bug Busters</h2>
      <p class="white-text">(Derek Taylor, Zan Zhang, Sanjeeva Rajapakse, Angela Fan, Fred Qi)</p>
      <h3 class="white-text">Login Page</h3>
      <form onSubmit={handleSubmit}>
      <fieldset>
         <label>
           <h5 class="white-text">Name</h5>
           <input name="Username" onChange={setFormData} />
         </label>
       </fieldset>
       <fieldset>
         <label>
           <h5 class="white-text">Password</h5>
           <input name="Password" />
         </label>
       </fieldset>
       <button type="submit">Submit</button>
      </form>
      <LoginButton/>
    </div>
  );
}

export default Login;
