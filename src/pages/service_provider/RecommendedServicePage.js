import React from 'react';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import RecommendedServiceComponent from '../../components/service_provider/RecommendedServiceComponent';
import ls from 'local-storage';
import ServiceProviderMenu from '../../components/service_provider/ServiceProviderMenu';

var jsonPayLoad=ls.get('jsonPayLoad');
class RecommendedServicePage extends React.Component {
     
        render() {
                return (
                        <div>
                
                                <Header />
                                <ServiceProviderMenu/>
                                <RecommendedServiceComponent/>
                                <Footer/>
                        </div>
               )
        }
}


export default RecommendedServicePage;

  
  
