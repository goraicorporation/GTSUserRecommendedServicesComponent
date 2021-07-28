
import React, { Component } from 'react'
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import ServiceProviderMenu from '../../components/service_provider/ServiceProviderMenu';
import { endpoints_properties } from '../../properties/EndPointsProperties.js';
import { api_properties } from '../../properties/APIProperties.js';


class ServiceProviderProfilePage extends Component {
  render()
  {
    return (
      <div>          
        <Header/>
        <ServiceProviderMenu/>
        <br></br>
        <br></br>
        <Footer /> 
      </div>        
    )
  }
}
export default ServiceProviderProfilePage;
