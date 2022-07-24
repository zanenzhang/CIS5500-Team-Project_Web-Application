import React from 'react';
import ReactDOM from 'react-dom';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';

// import HomePage from './pages/HomePage';
import TopChannelsPage from './pages/TopChannelsPage';
import 'antd/dist/antd.css';

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"
// import TrendingVideosPage from './pages/TrendingVideosPage';

ReactDOM.render(
  <div>
    <Router>
      <Switch>
        {/* <Route exact
							path="/"
							render={() => (
								<HomePage />
							)}/> */}
        <Route exact
							path="/topchannels"
							render={() => (
								<TopChannelsPage />
							)}/>
        {/* <Route exact
							path="/trendingvideos"
							render={() => (
								<TrendingVideosPage />
							)}/> */}
      </Switch>
    </Router>
  </div>,
  document.getElementById('root')
);