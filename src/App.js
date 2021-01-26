import React from 'react';
import GlobalStyle from './components/GlobalStyle';

import HomeContainer from './containers/HomeContainer';
import AboutContainer from './containers/AboutContainer';
import ContactContainer from './containers/ContactContainer';




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
          <Route path="/om-oss" component={AboutContainer} />
          <Route path="/kontakt" component={ContactContainer} />
          <Route path="/homepage" component={HomePageContainer}/>
          <Route path="/" component={HomeContainer} exact/> 
        </Switch>

     </Router>
    </>
  );
}

export default App;