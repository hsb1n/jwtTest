import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import Auth from './hoc/auth'
function App() {
  return (
    <Router>
    <div className="App">
      <Switch>
        {/* Auth로 컴포넌트를 감싸준다 */}
       <Route exact path="/" component={Auth(LandingPage,null )}/>
        <Route exact path ="/login" component={Auth(LoginPage,false)}/>
        <Route exact path="/register" component={Auth(RegisterPage,false)}/>
      </Switch>
    </div>
    </Router>
  );
}

export default App;
