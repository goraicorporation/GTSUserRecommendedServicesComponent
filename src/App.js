import React from 'react';
// import logo from './logo.svg';
// import './App.css';

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import LoginPage from './pages/common/LoginPage';
import RegistrationPage from './pages/common/RegistrationPage';
import GlobalHomePage from './pages/common/GlobalHomePage';
import RecommendedServicePage from './pages/service_provider/RecommendedServicePage';
import store from './redux/store';
import ServiceProviderProfilePage from './pages/service_provider/ServiceProviderProfilePage';

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Switch>
          <Route path="/" component={GlobalHomePage} exact></Route>
          <Route path="/gts/login" component={LoginPage} exact></Route>
          <Route path="/gts/register" component={RegistrationPage}></Route>
          <Route path="/gts/service-provider-profile" component={ServiceProviderProfilePage}exact></Route>
          <Route path="/gts/recommended-services" component={RecommendedServicePage}exact></Route>
          <Route path="/gts/global-home-page" component={GlobalHomePage}exact></Route>

        </Switch>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
