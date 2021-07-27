import React from 'react';
import {Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import ls from 'local-storage';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import  { Redirect } from 'react-router-dom'

var jsonPayLoad=ls.get('jsonPayLoad');

class SwitchRole extends React.Component {

    render(){
        var roles=[];
        roles=jsonPayLoad.other_roles.split(',');
     return (
        <div> 
            <button type="button" className="btn btn-primary btn-sm btn-center" data-toggle="modal" data-target="#switchmode" >Switch Mode</button> 
            <div id="switchmode" className="modal fade" role="dialog"  maxwidth={'md'}>
                <div className="modal-dialog"  maxwidth={'md'}> 
                <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title"> Switch to Role</h5>
                        </div>
                        <div>
                            <a href={"/gts/"+jsonPayLoad.primary_role.toLowerCase().replace(/_/g,'-')+"-profile"} style={{ color: "blue", textDecoration: "underline" }} >
                              <center>{jsonPayLoad.primary_role}</center><br/>
                            </a>
                            {roles.map(name => ( 
                            <a href={"/gts/"+name.toLowerCase().replace(/_/g,'-')+"-profile"} style={{ color: "blue", textDecoration: "underline" }} >
                                <center>{name}<br/></center>
                            </a> 
                            ))} 
                        </div>  
                        <div className="modal-footer">
                            <div className="text-inline">
                            <Button type="button" className="close" data-dismiss="modal" onClick={this.cancelHandler}>Cancel</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     )
    }
}
export default SwitchRole;