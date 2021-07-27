
import React, { Component } from 'react'
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import ServiceProviderMenu from '../../components/service_provider/ServiceProviderMenu';


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
