import React from 'react';
import ReactDOM from 'react-dom';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';

// import pages';
import TopChannelsPage from './pages/TopChannelsPage';
import TrendingVideosPage from './pages/TrendingVideosPage';
import VideoPage from './pages/VideoPage';
// import LoginPage from './pages/LoginPage';

import 'antd/dist/antd.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"


ReactDOM.render(
  <div>
    <Router>
      <Switch>
        {/* <Route exact
							path="/login"
							render={() => (
								<LoginPage />
							)}/> */}
		<Route exact
							path="/video"
							render={() => (
								<VideoPage />
							)}/>
        <Route exact
							path="/topchannels"
							render={() => (
								<TopChannelsPage />
							)}/>
        <Route exact
							path="/trendingvideos"
							render={() => (
								<TrendingVideosPage />
							)}/>
      </Switch>
    </Router>
  </div>,
  document.getElementById('root')
);