import "./App.css";
import React from "react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import Button from "./components/Button";
import Button2 from "./components/Button2";
import NavItem from "./components/NavItem";
import BrowsingButton from "./components/BrowsingButton";
import BrowsingButton2 from "./components/BrowsingButton2";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/:path(|master)">
          <div className="container-center-horizontal">
            <div className="master screen">
              <div className="overlap-group3">
                <div className="overlap-group2">
                  <img className="albums" src="/img/albums@1x.svg" />
                  <div className="player">
                    <div className="border-top"></div>
                    <div className="right-controls">
                      <Button />
                      <Button2 />
                      <div className="volume">
                        <div className="filled"></div>
                      </div>
                    </div>
                  </div>
                  <div className="border-left"></div>
                  <img className="border-up" src="/img/border-up@1x.svg" />
                  <img className="border-up-1" src="/img/border-up-1@1x.svg" />
                  <div className="over-it sfprodisplay-bold-hint-of-red-16px">Over It</div>
                  <div className="name sfprodisplay-bold-hint-of-red-16px">Dawn FM</div>
                  <div className="meet-the-woo sfprodisplay-bold-hint-of-red-16px">Meet The Woo</div>
                  <div className="queen sfprodisplay-bold-hint-of-red-16px">Queen</div>
                  <div className="issa sfprodisplay-bold-hint-of-red-16px">Issa</div>
                  <p className="plain-jane-remix-fe sfprodisplay-bold-hint-of-red-16px">
                    Plain Jane REMIX (feat. Nicki Minaj) -<br />
                    Single
                  </p>
                  <div className="name-1 sfprodisplay-bold-hint-of-red-16px">Leo Season</div>
                  <div className="amalia-deuxe-version sfprodisplay-bold-hint-of-red-16px">Amalia(Deuxe Version)</div>
                  <div className="fever sfprodisplay-bold-hint-of-red-16px">Fever</div>
                  <div className="certified-lover-boy sfprodisplay-bold-hint-of-red-16px">Certified Lover Boy</div>
                  <div className="name-2 sfprodisplay-bold-pale-sky-16px">Summer Walker</div>
                  <div className="the-weeknd sfprodisplay-bold-pale-sky-16px">The Weeknd</div>
                  <div className="pop-smoke sfprodisplay-bold-pale-sky-16px">Pop Smoke</div>
                  <div className="nicki-minaj sfprodisplay-bold-pale-sky-16px">Nicki Minaj</div>
                  <div className="address sfprodisplay-bold-pale-sky-16px">21 Savage</div>
                  <div className="aap-ferg sfprodisplay-bold-pale-sky-16px">A$AP Ferg</div>
                  <div className="medea-music sfprodisplay-bold-pale-sky-16px">Medea Music</div>
                  <div className="doja-cat sfprodisplay-bold-pale-sky-16px">Doja Cat</div>
                  <div className="name-3 sfprodisplay-bold-pale-sky-16px">megan Thee Stallion</div>
                  <div className="name-4 sfprodisplay-bold-pale-sky-16px">Drake</div>
                </div>
                <div className="left-nav">
                  <div className="left-nav-1">
                    <img className="group-1-1" src="/img/group-1-1@2x.png" />
                    <div className="medea-full-logo">
                      <img className="m" src="/img/m@2x.png" />
                      <div className="overlap-group">
                        <div className="text-1">®</div>
                        <div className="tube-db">Medea</div>
                      </div>
                    </div>
                    <NavItem text="Saved Videos" />
                    <NavItem text="Trending Videos" className="nav-item-1" />
                    <NavItem text="Channels" className="nav-item-2" />
                  </div>
                </div>
                <div className="top-nav">
                  <div className="overlap-group1">
                    <div className="browsing-buttons">
                      <BrowsingButton />
                      <BrowsingButton2 />
                    </div>
                    <img className="chevron-left" src="/img/chevron-left@2x.svg" />
                  </div>
                  <img className="nav-item-3" src="/img/nav-item@1x.png" />
                </div>
                <h1 className="title">Trending Videos</h1>
              </div>
            </div>
          </div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
