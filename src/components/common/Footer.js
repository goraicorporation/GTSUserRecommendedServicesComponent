import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faAppleAlt, faPlay } from '@fortawesome/free-solid-svg-icons'
//import {Link } from 'react-router-dom';
//import jobseeker from '../pages/jobseeker';
//import { BrowserRouter, Switch, Route } from 'react-router-dom';
function Footer() {

  return (
    <FooterContainer className="main-footer">
      <div className="footer-middle">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3 pt-2">

              <ul className="list-unstyled">
                <h5><a href="/ServiceProvider" className="text-white font-bold" >Services By Location:</a></h5>
                <p><a href="#" className=" text-white" >Services in Bangalore</a></p>
                <p><a href="#" className=" text-white" >Services in Chennai</a></p>
                <p><a href="#" className=" text-white" >Services in Kerala</a></p>
                <p><a href="#" className=" text-white" >Services in Delhi</a></p>
                <p><a href="#" className=" text-white" >Services in Mumbai</a></p>
              </ul>
            </div>

            <div className="col-md-3 pt-2">

              <ul className="list-unstyled">
                <h5><a href="#" className="text-white font-bold" >Popular Searches:</a></h5>
                <li><p><a href="#" className=" text-white" >Data Analytics in Bangalore</a></p></li>
                <li><p><a href="#" className=" text-white" >Front End Developer in Mumbai</a></p></li>
                <li><p><a href="#" className=" text-white" >Truck Drivers in Rajasthan</a></p></li>
                <li><p><a href="#" className=" text-white" >Business Consultants in Delhi</a></p></li>
                <li><p><a href="#" className=" text-white" >Supply chain Manager in Kerala</a></p></li>
              </ul>
            </div>

            <div className="col-md-3 pt-2">

              <ul className="list-unstyled">
                <h5><a href="#" className="text-white font-bold">More on GTS Platform:</a></h5>
                <li><p><a href="https://ggtech.co.in/about-us" className=" text-white" >About Us</a></p></li>
                <li><p><a href="https://ggtech.co.in/privacy-policy" className=" text-white" >Privacy and Policy</a></p></li>
                <li><p><a href="https://www.naukri.com/faq/job-seeker?utm_source=footer" className=" text-white" >FAQ</a></p></li>
                <li><p><a href="https://www.naukri.com/termsconditions" className=" text-white" >Terms and Conditions</a></p></li>
                <li><p><a href="mailto: hr.gts@ggtech.co.in" className=" text-white" >Feedback</a></p></li>
              </ul>
            </div>

            <div className="col-md-3 pt-2">

              <ul className="list-unstyled">
                <h5><a href="/ContactUs" className="text-white font-bold" >Contact Us :</a></h5>
                <li><p><a href="mailto: hr.gts@ggtech.co.in" className=" text-white" target="_blank">hr.gts@ggtech.co.in</a></p></li>
                <li><p onClick="window.open('tel:+91 9739403914');"><a href="#" className=" text-white" >+91 9739403914</a></p></li>
                <li><p><a href="https://www.facebook.com/GoraiGlobalTechnology/" className="fb-ic  text-white" target="_blank"><i className="fab fa-facebook-f fa-lg white-text mr-3"> </i>Facebook</a></p></li>
                <li><p><a href="https://www.twitter.com" className="tw-ic text-white"><i className="fab fa-twitter fa-lg white-text mr-3"> </i>Twitter</a></p></li>
                <li><p><a href="https://www.instagram.com" className="ins-ic text-white"><i className="fab fa-instagram fa-lg white-text mr-3"> </i>Instagram</a></p></li>
                <li><p><a href="https://in.linkedin.com/company/goraitechnologysolutions" className="li-ic text-white" target="_blank"><i className="fab fa-linkedin-in fa-lg white-text mr-3"> </i>linkedin</a></p></li>
                {/* <li><p><a href="" className="yo-ic text-white" ><i className="fab fa-youtube fa-lg white-text mr-3"> </i>Youtube</a></p></li> */}
              </ul>
            </div>

          </div>{/* row */}

          <div className="container-fluid">
            <div className="row">
              <div className="col">
                <h5 className="text-white">Get it on your Mobile phone on</h5>
              </div>
              <div className="col-2">
               <a href="https://play.google.com/store/apps/details?id=com.gts.chakuri.JobSeeker">
                  <img src="https://ridesharetax.com.au/wp-content/uploads/Get_it_on_Google_play.png"
                  className="img-fluid" alt="Responsive Image"
                  width="150" height="300"
                  />
                </a>
              </div>
              <div className="col-1">
                <h6 className="text-white text-center">OR</h6>
              </div>
              <div className="col-2">
                <a href="https://www.apple.com/in/app-store/">
                  <img src="https://www.medsurety.com/wp-content/uploads/2019/09/apple-store-button.png"
                  className="img" alt="Responsive Image" width="150" height="200"
                  />
                </a>
              </div>

              <div className="col text-right pt-4">
                <p className="text ">
                  &copy;GTS 2021
                </p>
              </div>

            </div>
          </div>

        </div> {/*container */}

      </div>{/*Footer Midder */}

    </FooterContainer>
  );

}
export default Footer;

const FooterContainer = styled.footer`
.footer-middle
{
    background: #007bff;
    padding -top:6rem;
    color: #fff;

}
.footer-bottom{
    padding-top: 3rem;
    padding-bottom: 2rem;
}

`;
