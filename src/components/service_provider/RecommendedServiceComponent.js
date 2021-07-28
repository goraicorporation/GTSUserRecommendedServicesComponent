import React, { Component } from "react";
import  "./RecommendedServiceComponent.css";
import 'bootstrap/dist/css/bootstrap.css'
import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css";
import axios from "axios";
import ls from "local-storage";
import Moment from 'moment';
import {Grid,Input,} from "@material-ui/core";
import { Button} from "reactstrap";
import { Dropdown,InputGroup,Form, Collapse } from "react-bootstrap";
import ShowMoreText from 'react-show-more-text';
import { properties } from '../../properties/Properties.js';

var token = ls.get("token");
var jsonPayLoad = ls.get("jsonPayLoad");
var userPersonalDetails=ls.get('userPersonalDetails');
if(jsonPayLoad!==null){
var gts_user_id = jsonPayLoad.user_id;
}
class RecommendedServiceComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      recommendedJobs:[],
      myJobs:[],
      skills:[],
      gts_job_skills:[],
      jobSkillName:[],
      showText: false
    }
    this.cancel = "";
    this.changeHandler = this.changeHandler.bind(this)
  }

  changeHandler = (e) => {
   this.setState({ [e.target.name] : e.target.value})
  }

  componentDidMount(){
    var url = properties.ENDPOINT_RECOMMENDED_SERVICES_LOCAL+"/api/v1/gts_user_recommended_job/gts_user_id/"+gts_user_id;
    axios.get(url,{ headers: {"Auth_Token" : `Bearer ${token}`} })
    .then(response =>{
    console.log(response.data)
      this.setState({recommendedJobs: response.data.gts_user_recommended_jobs})
    })
    .catch(error => {
       this.setState({status:400})
       this.setState({recommendedJobs: []})
      })

      this.autoCompleteChangeHandler();
  }

  autoCompleteChangeHandler = (input) =>{
    var skill_url = "http://localhost:4744/api/v1/skills/active";
    axios.get(skill_url,{ headers: {"Auth_Token" : `Bearer ${token}`} })
    .then((response) => {
      this.state.skills = response.data;
       if (this.state.skills.length > 0){
        this.state.skills.forEach((skills) => {
         this.state.gts_job_skills.push(skills.gts_skill_name);
         this.state.gts_job_skills.filter((value) => value.includes(input));
        });
       }
    })
  }

  clearError= e=>{
    this.setState({error:''})
    this.setState({message:''})
    this.setState({updateError:''})
    this.setState({updateMessage: ''})
    this.setState({appliedMessage: ''})
  }


  applyForJob =(gts_job_application_status, gts_job_id) =>{
    var url ="http://localhost:4740/api/v1/job/applications";

    var jobApplicationPostPayLoad = {
      "gts_applied_job_id": gts_job_id,
      "gts_applicant_id": gts_user_id,
      "gts_applicant_proposal": this.state.jobProposal,
      "gts_job_application_status": gts_job_application_status,
      "gts_job_application_is_active":true,
      "is_fraud_job":0,
      "gts_job_reviewed_date" : "",
      "gts_job_shortlisted_date" : "",
      "gts_job_proposed_for_interview_date" : "",
      "gts_job_rejected_date"  :"",
      "gts_job_selected_date" : "",
      "gts_job_offered_date"  :""
    }

    var getURL = "http://localhost:4740/api/v1/job/applications/applicant_id/"+gts_user_id;
    axios.get(getURL,{ headers: {"Auth_Token" : `Bearer ${token}`} })
    .then(response =>{
      console.log(response.data)
      for(var i=0; i<response.data.length; i++){
        if(response.data[i].gts_applied_job_id == gts_job_id){
          var jobApplicationPutPayLoad = {
            "gts_job_application_id":response.data[i].gts_job_application_id,
            "gts_applied_job_id": gts_job_id,
            "gts_applicant_id": gts_user_id,
            "gts_applicant_proposal": this.state.jobProposal,
            "gts_job_application_status": gts_job_application_status,
            "gts_job_application_is_active":true,
            "is_fraud_job":0,
            "gts_job_reviewed_date" : "",
            "gts_job_shortlisted_date" : "",
            "gts_job_proposed_for_interview_date" : "",
            "gts_job_rejected_date"  :"",
            "gts_job_selected_date" : "",
            "gts_job_offered_date"  :""
          }
          console.log(jobApplicationPutPayLoad)
          axios.put(url,jobApplicationPutPayLoad,{ headers: {"Auth_Token" : `Bearer ${token}`} })
          .then(response =>{
            if(gts_job_application_status == "APPLIED"){
              var appliedMessage = "";
              appliedMessage = "Job applied successfully";
              this.setState({
                appliedMessage: appliedMessage
              })
            }
          })
          .catch(error =>{
            if(error.response.data.status_code == 400 || error.response.data.status_code == 404){
              this.setState({
                error: error.response.data.message
              })
            }
            else{
              var error="Not able to apply for job";
              console.log(error.response)
              this.setState({
              error: error
              })
            }
          })
        }
        if(this.state.appliedMessage == '' && this.state.appliedMessage == null){
          if(response.data[i].gts_applied_job_id  !== gts_job_id){
            this.saveJob(url,jobApplicationPostPayLoad,gts_job_application_status);
          }
        }
      }
    })
    .catch(post =>{
      axios.post(url,jobApplicationPostPayLoad,{ headers: {"Auth_Token" : `Bearer ${token}`} })
          .then(response =>{
            var appliedMessage = "";
            if(gts_job_application_status == "APPLIED"){
            appliedMessage = "Job applied successfully";
            this.setState({appliedMessage : appliedMessage})
            }
            if(gts_job_application_status == "SAVED"){
              var message = "Job saved successfully";
              this.setState({message : message})
            }
         })

         .catch(error =>{
          if(error.response.data.status_code == 400 || error.response.data.status_code == 404){
            this.setState({
              error: error.response.data.message
            })
          }
          else{
            var error="Not able to apply for job";
            console.log(error.response)
            this.setState({
            error: error
            })
          }
       })
    })

  }

  saveJob(url,jobApplicationPostPayLoad,gts_job_application_status){

      axios.post(url,jobApplicationPostPayLoad,{ headers: {"Auth_Token" : `Bearer ${token}`} })
      .then(response =>{
        var message = "";
        if(gts_job_application_status == 'SAVED'){
          message = "Job saved successfully";
          this.setState({appliedMessage : response.data.message})
          this.setState({gts_job_application_id:response.data.job_application_id})
        }
        if(gts_job_application_status == "APPLIED"){
          var appliedMessage = "Job applied successfully";
          this.setState({
            message: appliedMessage
          })
        }
     })
     .catch(error =>{
      if(error.response.data.status_code == 400 || error.response.data.status_code == 404){
        this.setState({
          error: error.response.data.message
        })
      }
      else{
        var error="Not able to apply for job";
        console.log(error.response)
        this.setState({
        error: error
        })
      }
    })
  }

  executeOnClick(isExpanded) {
    console.log(isExpanded);
}

  render() {
    return (
     <div className="mt-3">
     <div>
     <div >
            <span style={{color:'green'}}><strong><center>{this.state.message}</center></strong></span>
            <span style={{color:'green'}}><strong><center>{this.state.updateMessage}</center></strong></span>
            <span style={{color:'red'}}><strong><center>{this.state.updateError}</center></strong></span>
            <span style={{color:'red'}}><strong><center>{this.state.error}</center></strong></span>
          </div>
        {this.state.recommendedJobs.map((item)=>(
         <InputGroup>
           <Grid container spacing={2}>
            <Grid item xs={11}>
              <div class="mt-4">
               <div class="border border-dark rounded-lg offset-1">
                 <div class="row" >
                   <div class="col-4 p-3 pl-4" >
                     <h5 style={{fontSize:"15px"}}><b>Service ID&nbsp;:&nbsp;{item.gts_job_id}</b></h5>
                     <h5 style={{fontSize:"15px"}}><strong>Service Name: </strong>{item.job_title_name.toUpperCase() }</h5>
                     <h5 style={{fontSize:"15px"}}><strong>Company: </strong><span style={{color:'black'}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{item.company_name.toUpperCase() }</span></h5>
                     <h5 style={{fontSize:"15px"}}><strong>Job Description: </strong><span style={{color:'black'}}>
                     <ShowMoreText
                        lines={2}
                        more='Show more'
                        less='Show less'
                        className='content-css'
                        anchorClass='my-anchor-css-class'
                        onClick={this.executeOnClick}
                        expanded={false}
                        width={300}
                      >
                       {item.gts_job_description}
                      </ShowMoreText></span></h5>
                     </div>
                    <div class="col-3 p-3">
                      <br/>
                      {item.gts_job_post_skill_ids.map((skill)=>{
                        this.state.jobSkillName.push(skill.gts_skill_name)
                      })}
                      <h6 style={{fontSize:"15px"}}>Skills: <span style={{color:'red'}}>{this.state.jobSkillName.toString()}</span></h6>
                      <br/>
                    </div>

                   <div class="col-3 p-3">
                     <br/>
                      <h6 style={{fontSize:"15px"}}>Posted Date: <span style={{color:'red'}}>{Moment(item.gts_job_posted_date).format('DD-MMM-YYYY') }</span></h6>
                      {item.gts_job_min_exp_in_months == 0 || item.gts_job_min_exp_in_months == '' ? <h6>Experience: '' </h6> :
                      <h6 style={{fontSize:"15px"}}>Experience: <span style={{color:'red'}}>{item.gts_job_min_exp_in_months} months</span></h6>
                      }
                      <h6 style={{fontSize:"15px"}}>Location:<span style={{color:'red'}}>{item.city_name}</span></h6>
                    </div>

                    <div class="col-0 p-2" text-align="right">
                      <br/>
                      <button
                       className="btn btn-primary"
                       data-toggle="modal"
                       data-target={"#viewJob"+item.gts_job_id}
                       onClick={this.state.is_company_requirement = item.gts_job_is_company_requirement}
                       style={{backgroundColor:"white",color:"white", align:"right", borderRadius:"15px", fontSize:"12px"}}>
                       <b>View</b>
                      </button>
                    </div>
                    <div class="col-0 p-2" align="right">
                    <br/>
                     <button
                       className="btn btn-primary"
                       onClick={()=>this.applyForJob("SAVED",item.gts_job_id)}
                       onBlur={this.clearError.bind(this)}
                       style={{backgroundColor:"white",color:"white", align:"right", borderRadius:"15px", fontSize:"12px"}}>
                       <b>Save</b>
                      </button>
                    </div>
                  </div>
               </div>
             </div>
              <div id={"viewJob"+item.gts_job_id} class="modal fade" role="dialog">
                <div class="modal-dialog modal-xl" >
                  <div class="modal-content">
                    <div class="modal-body">
                      <div className="container" >
                        <div class="row-sm m-0  text-left">
                         <div class="row-0" align="right">
                            <div class="col-0" align="right">
                             <button  type="button" class="close" data-dismiss="modal" ><i  class="fas fa-window-close fa-lg"></i></button>
                            </div>
                          </div>
                          <InputGroup>
                            <div class="row-0" align="left">
                              <div class="col-0" align="left">
                               <h6  style={{color : "black"}}><label style={{fontSize:"15px"}}><b>Service ID&nbsp;:&nbsp;{item.gts_job_id}</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label></h6>
                                <h6  style={{color : "black"}}><label style={{fontSize:"15px"}}><b>Service Name&nbsp;:&nbsp;{item.job_title_name.toUpperCase()}</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label></h6>
                                <h6 style={{color : "black", display:item.job_title_name}}><label style={{fontSize:"15px"}}><b>Industry Name&nbsp; :&nbsp;</b><span style={{color:'red'}}>{item.industry_name}</span>&nbsp;&nbsp;</label></h6>
                                <h6  style={{color : "black", display : this.state.is_company_requirement == true ? 'block' : 'none'}}><label style={{fontSize:"15px"}}><b>Company Name&nbsp;:&nbsp;</b><span style={{color:'red'}}>{item.company_name}</span>&nbsp;&nbsp;</label></h6>
                              </div>
                            </div>
                            <div class="row-0" align="right">
                              <div class="col-0" align="right">
                                <br/>
                                <h6  style={{color : "black"}}><label style={{fontSize:"15px", display:item.gts_job_id >0 ? 'none' : 'block'}}><b>Service ID&nbsp;:&nbsp;{item.gts_job_id}</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label></h6>
                                <h6  style={{color : "black"}}><label style={{fontSize:"15px"}} ><b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Expiry Date&nbsp; :&nbsp;</b><span style={{color:'red'}}>{Moment(item.gts_job_expiry_date).format('DD-MMM-YYYY')}</span>&nbsp;&nbsp;</label></h6>
                             </div>
                            </div>

                            <div class="row-0" align="right">
                              <div class="col-0" align="right">
                                <br/>
                                <h6  style={{color : "black"}}><label style={{fontSize:"15px", display:item.gts_job_id >0 ? 'none' : 'block'}}><b>Service ID&nbsp;:&nbsp;{item.gts_job_id}</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label></h6>
                                <h6  style={{color : "black"}}><label style={{fontSize:"15px"}} ><b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Experience(Months) &nbsp;:&nbsp;</b><span style={{color:'red'}}>{item.gts_job_min_exp_in_months}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label></h6>
                                <h6  style={{color : "black"}}><label style={{fontSize:"15px"}} ><b>Work Type &nbsp;:&nbsp;</b><span style={{color:'red'}}>{item.gts_work_type}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label></h6>
                                <h6  style={{color : "black"}}><label style={{fontSize:"15px"}} ><b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Job Type&nbsp;:&nbsp;</b> <span style={{color:'red'}}>{item.gts_job_type}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label></h6>
                              </div>
                            </div>

                            <div class="row-0" align="right">
                              <div class="col-0" align="right">
                               <br/>
                                <h6  style={{color : "black"}}><label style={{fontSize:"15px", display:item.gts_job_id >0 ? 'none' : 'block'}}><b>Service ID&nbsp;:&nbsp;{item.gts_job_id}</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label></h6>
                               <h6 class="form-group" style={{color : "black"}}><label style={{fontSize:"15px"}}><b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Country&nbsp;:&nbsp;</b><span style={{color:'red'}}>{item.country_name}</span>&nbsp;</label></h6>
                                <h6 class="form-group" style={{color : "black"}}><label style={{fontSize:"15px"}}><b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;City&nbsp;:&nbsp;</b><span style={{color:'red'}}>{item.city_name}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label></h6>
                              </div>
                            </div>
                          </InputGroup>

                          <div className="row">
                            <h6 class="text" style={{color : "black", display : this.state.is_company_requirement == true ? 'block' : 'none'}}><label style={{fontSize:"15px"}}><b>&nbsp;&nbsp;&nbsp;Company/SC Description &nbsp;:&nbsp; </b>{item.company_description}&nbsp;&nbsp;</label></h6>
                         </div>

                          <div className="row">
                            <div class="col">
                               <h6 class="text" style={{color : "black"}}><label style={{fontSize:"15px"}}><b>Service Description&nbsp;:&nbsp;</b>
                               <h6 >{item.gts_job_description}</h6></label></h6>
                            </div>
                         </div>

                          <div className="row">
                            <h6 class="form-group" style={{color : "black"}}><label style={{fontSize:"15px"}}><b>&nbsp;&nbsp;&nbsp;&nbsp;Skills &nbsp;:&nbsp;</b><span style={{color:'red'}}>{item.gts_job_post_skill_ids.map(user_skill =>user_skill.gts_skill_name.concat(', '))}</span></label></h6>
                          </div>

                          <InputGroup>
                            <h6 class="form-group" style={{color : "black"}}><label style={{fontSize:"15px"}}><b>Minimum Qualification &nbsp;:&nbsp;</b><span style={{color:'red'}}>{item.degree_name}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label></h6>
                            <h6 class="form-group" style={{color : "black"}}><label style={{fontSize:"15px"}}><b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Language Proficiency&nbsp;:&nbsp;</b><span style={{color:'red'}}>{item.language_name}</span> &nbsp;&nbsp;&nbsp;</label></h6>
                            <h6 class="form-group" style={{color : "black"}}><label style={{fontSize:"15px"}}><b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Notice Period(Days)&nbsp;:&nbsp;</b><span style={{color:'red'}}>{item.gts_job_expected_hiring_weeks}</span>&nbsp;&nbsp;&nbsp;</label></h6>
                            <h6 class="form-group" style={{color : "black"}}><label style={{fontSize:"15px"}}><b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;No. of Vacancies&nbsp;:&nbsp;</b><span style={{color:'red'}}>{item.gts_job_vacancy_numbers}</span>&nbsp;</label></h6>
                          </InputGroup>

                          <InputGroup>
                            <h6 class="form-group" style={{color : "black"}}><label style={{fontSize:"15px"}}><b>Salary Currency&nbsp;:&nbsp;</b><span style={{color:'red'}}>{item.currency_name}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label></h6>
                            <h6 class="form-group" style={{color : "black"}}><label style={{fontSize:"15px"}}><b>&nbsp;&nbsp;&nbsp;&nbsp;Salary&nbsp;:&nbsp;</b><span style={{color:'red'}}>{item.gts_job_salary}</span>&nbsp;</label></h6>
                            <h6 class="form-group" style={{color : "black"}}><label style={{fontSize:"15px"}}><b>&nbsp;&nbsp;Per&nbsp;:&nbsp;</b><span style={{color:'red'}}>{item.gts_job_salary_duration_unit}</span>&nbsp;</label></h6>
                          </InputGroup>

                          <div style={{borderBottomColor: 'black',borderBottomWidth: "0.5px"}}/><br/>
                          <InputGroup>
                            <h6 class="form-group" style={{color : "black", align:"left"}}><label style={{fontSize:"15px"}}><b>Email&nbsp;:&nbsp;</b><span style={{color:'red'}}>{item.gts_job_contact_email}</span>&nbsp;</label></h6>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <h6 class="form-group" style={{color : "black", align:"center"}}><label style={{fontSize:"15px"}}><b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Mobile Number&nbsp;:&nbsp;</b><span style={{color:'red'}}>+{item.gts_job_mobile_country_code}&nbsp;{item.gts_job_contact_mobile_number}</span>&nbsp;&nbsp;&nbsp;</label></h6>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <h6 class="form-group" style={{color : "black", align:"right"}}><label style={{fontSize:"15px"}}><b>&nbsp;&nbsp;WhatsApp Number&nbsp;:&nbsp;</b><span style={{color:'red'}}>+{item.gts_job_whatsapp_country_code}&nbsp;{item.gts_job_contact_whatsapp_number}</span>&nbsp;</label></h6>
                          </InputGroup>

                        </div>
                      </div>
                    </div>
                    <div class="modal-footer">
                      <div class="text-inline">
                        <Button type="button" class="close" data-dismiss="modal"  data-toggle="modal" data-target={"#jobProposal"+item.gts_job_id} color="primary" onBlur={this.clearError.bind(this)}>APPLY FOR JOB</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div id={"jobProposal"+item.gts_job_id} class="modal fade" role="dialog">
                <div class="modal-dialog modal-lg ">
                  <div class="modal-content">
                    <div style={{align:"center"}}>
                  <button type="button"  class="close" data-dismiss="modal" style={{align:"right"}}>&times;</button>
                </div>
                <div class="modal-body">
                  <div className="container" >
                    <h6 style={{fontSize:"15px"}}>Job Proposal: </h6>
                    <Form.Control
                      as="textarea"
                      rows={'auto'}
                      style={{height:"200px"}}
                      onChange={this.changeHandler}
                      name="gts_job_proposal"
                      id="gts_job_proposal"
                      onFocus={this.clearError}
                    />
                  </div>
                  <div class="modal-footer">
                    <Button type="button" color="primary"  onClick={()=>this.applyForJob("APPLIED",item.gts_job_id)} onBlur={this.clearError.bind(this)} onChange={this.state.jobProposal=''}>Skip</Button>
                    <Button type="button" color="primary" onClick={()=>this.applyForJob("APPLIED",item.gts_job_id)} onBlur={this.clearError.bind(this)}>Save</Button>
                    <br/><span style={{fontSize:"15px", color:'green'}} ><strong><center>{this.state.appliedMessage}</center></strong></span>
                    <span style={{fontSize:"15px", color:'red'}} ><strong><center>{this.state.error}</center></strong></span>
                  </div>
                </div>
              </div>
            </div>
          </div>

         <div style={{display: this.state.jobSkillName!==null ? 'none' : 'block'}}>
            { this.state.jobSkillName =  []}
          </div>
       </Grid>
     </Grid>
   </InputGroup> ))}
   <br/>
  </div>
  </div>
  );
  }
}

export default RecommendedServiceComponent;
