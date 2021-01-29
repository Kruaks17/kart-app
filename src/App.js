import React from 'react';
import GlobalStyle from './components/GlobalStyle';
import Mapbox from 'mapbox-gl';


import HomeContainer from './containers/HomeContainer';
import AboutContainer from './containers/AboutContainer';
import ContactContainer from './containers/ContactContainer';
import BryggerierContainer from './containers/BryggerierContainer';


import {
BrowserRouter as Router,
Switch,
Route
} from 'react-router-dom';

import HomePageContainer from './containers/HomePageContainer';

function App() {
  return (
    <>
     <GlobalStyle/>
     <Router>
        <Switch> 
          <Route path="/homepage" component={HomePageContainer}/>
          <Route path="/om-oss" component={AboutContainer} />
          <Route path="/kontakt/:slug" component={ContactContainer} />
          <Route path="/bryggerier" component={BryggerierContainer} />
          
          <Route path="/" component={HomeContainer} exact/> 
        </Switch>

     </Router>
    </>
  );
}

export default App;