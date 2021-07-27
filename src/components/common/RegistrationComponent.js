import React from 'react';

// reactstrap components
import {
  Button,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
  Alert,
  ButtonGroup
} from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
//import backgroundImage from '../assets/img/icons/common/4.svg';
import { Card, CardBody, CardText, FormControl, FormLabel, FormCheck } from 'react-bootstrap';


class RegistrationComponent extends React.Component {
  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
  }
  constructor(props) {
    super(props);
    this.state = {
      user: 0,
      isServiceProvider: false,
      isServiceConsumer: false,
      isTrainer: false,
      isTrainee: false,
      defaultRole: 'none',
      gts_user_id: '',
      email: '',
      password: '',
      role: '',
      confirmPassword: '',
      registrationError: '',
      registrationSuccess: '',
      buttonDisabled: false,
      message: '',
      isError: '',
      errors: {},
      responses: {},
      visible: false,
      roleError: '',
      defaultRoleError: '',
      roleSuccess: '',
    };
    this.onRadioChange = this.onRadioChange.bind(this);
  }

  onRadioChange = (e) => {
    if (e.target.value == "ServiceProvider") {
      this.setState({
        defaultRole: e.target.value,
        isServiceProvider: true
      });
    }
    if (e.target.value == "ServiceConsumer") {
      this.setState({
        defaultRole: e.target.value,
        isServiceConsumer: true
      });
    }
    if (e.target.value == "Trainee") {
      this.setState({
        defaultRole: e.target.value,
        isTrainee: true
      });
    }
    if (e.target.value == "Trainer") {
      this.setState({
        defaultRole: e.target.value,
        isTrainer: true
      });
    }
  }
  //analyse why we need this?
  toggleChangeServiceProvider = () => {
    this.setState(prevState => ({
      isServiceProvider: !prevState.isServiceProvider
    }));
  }

  toggleChangeServiceConsumer = () => {
    this.setState(prevState => ({
      isServiceConsumer: !prevState.isServiceConsumer
    }));
  }

  toggleChangeTrainee = () => {
    this.setState(prevState => ({
      isTrainee: !prevState.isTrainee
    }));
  }

  toggleChangeTrainer = () => {
    this.setState(prevState => ({
      isTrainer: !prevState.isTrainer
    }));
  }

  onSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
  }

  inputOnChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  clearEmailError = e => {
    //let fields = this.state.fields;
    let errors = this.state.errors;
    let formIsValid = true;

    //alert("Field name: "+e.target.name)

    if (e.target.name == "email") {
      errors["email"] = "";
      this.setState({
        errors: errors
      });
      return formIsValid;
    }
  }

  clearPasswordError = e => {
    //let fields = this.state.fields;
    let errors = this.state.errors;
    let formIsValid = true;

    //alert("Field name: "+e.target.name)

    if (e.target.name == "password") {
      errors["password"] = "";
      this.setState({
        errors: errors
      });
      return formIsValid;
    }
  }

  clearConfirmPasswordError = e => {
    //let fields = this.state.fields;
    let errors = this.state.errors;
    let formIsValid = true;

    //alert("Field name: "+e.target.name)

    if (e.target.name == "confirmPassword") {
      errors["confirmPassword"] = "";
      this.setState({
        errors: errors
      });
      return formIsValid;
    }
  }

  validateEmail = e => {
    //let fields = this.state.fields;
    let errors = this.state.errors;
    let formIsValid = true;

    //alert("Validate Email: "+this.state.email)

    if (!this.state.email) {
      //alert("Enter email")
      formIsValid = false;
      errors["email"] = "Please enter your email-ID.";
      this.setState({
        errors: errors
      });
      return formIsValid;
    }

    if (typeof this.state.email !== "undefined") {
      //Production
      //var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

      //Development
      var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

      if (!pattern.test(this.state.email)) {
        formIsValid = false;
        errors["email"] = "Please enter valid email-ID.";
      }
      this.setState({
        errors: errors
      });
      return formIsValid;
    }
  }

  validatePassword = e => {
    let errors = this.state.errors;
    let formIsValid = true;

    if (!this.state.password) {
      //alert("Enter valid password")
      formIsValid = false;
      errors["password"] = "Please enter your password.";
      this.setState({
        errors: errors
      });
      return formIsValid;
    }

    if (typeof this.state.password !== "undefined") {
      //Production
      //if (!fields["password"].match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/)) {

      //Development
      if (!this.state.password.match(/^.*(?=.{2,}).*$/)) {
        formIsValid = false;
        errors["password"] = "Please enter secure and strong password .";
        this.setState({
          errors: errors
        });
        return formIsValid;
      }
    }
  }

  validateConfirmPassword = e => {
    let errors = this.state.errors;
    let formIsValid = true;

    if (!this.state.confirmPassword) {
      //alert("Enter valid password")
      formIsValid = false;
      errors["confirmPassword"] = "Please confirm your  password.";
      this.setState({
        errors: errors
      });
      return formIsValid;
    }

    if (typeof this.state.confirmPassword !== "undefined") {
      //Production
      //if (!fields["confirmPassword"].match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/)) {

      //Development
      if (!this.state.confirmPassword.match(/^.*(?=.{2,}).*$/)) {
        formIsValid = false;
        errors["confirmPassword"] = "Please enter secure and strong password .";
        this.setState({
          errors: errors
        });
        return formIsValid;
      }

      if (this.state.password != this.state.confirmPassword) {
        errors["confirmPassword"] = "Password & Confirm-Password must be same.";
        this.setState({
          errors: errors
        });
        return formIsValid;
      }
    }
  }

  onSubmitHandler = e => {

    e.preventDefault();
    var validationResultOfForm = this.formIsValid;

    let responses = this.state.responses;
    var url = "http://localhost:4728/api/v1/user/email"

    var payload = {

      "gts_user_email": this.state.email,
      "gts_user_password": this.state.password,
      "gts_user_status": true,
      "gts_user_login_tries": 0
    };

    axios
      .post(url, payload)
      .then(response => {

        console.log("Response data: " + response.data);
        console.log("UserID: " + response.data.gts_user_id);
        this.setState({
          gts_user_id: response.data.gts_user_id
        })

        if (validationResultOfForm == false) {

          console.log("inside if block of onSubmitHandle method");

          responses["registrationError"] = response.data.message;
          console.log("form is not valid")

          console.log("setting the state");
          this.setState({
            responses: responses
          });
          console.log("state is set");

        }

        else {
          console.log("inside else block of onSumbitHandler method");

          let user_id = this.state.gts_user_id;
          console.log("user:" + user_id);

          var ro = this.onSubmitHandlerRole(user_id, e);
          console.log("the value of ro: " + ro);
          if (ro === true) {

            console.log("roles are returned");

            responses["registrationSuccess"] = "Registration is successful";

            this.setState({
              responses: responses

            });
          }
        }
      })
      .catch(error => {
        console.log("registration failed");
          responses["registrationError"] = "Error while Registering! Please Try again...";
            this.setState({
              responses: responses
            });
      });
  };


  onSubmitHandlerRole(user_id, e) {
    var arr = [];
    console.log("userId inside handler method: " + user_id);
    if (this.state.isServiceProvider === true) {
      arr.push(2);
    }
    if (this.state.isServiceConsumer === true) {
      arr.push(3);
    }
    if (this.state.isTrainee === true) {
      arr.push(6);
    }
    if (this.state.isTrainer === true) {
      arr.push(4);
    }

    //alert("array length="+arr.length);
    if (arr.length === 0) {
      //alert("Roles is not checked");
      this.state.errors.roleError = "Please select atleast one role";
    }

    let listOfRoles = arr.toString();
    console.log("list of roles: " + listOfRoles);

    var defaultRole = 0
    if (this.state.defaultRole === "ServiceProvider") {
      defaultRole = 2;
    }
    else if (this.state.defaultRole === "ServiceConsumer") {
      defaultRole = 3;
    }
    else if (this.state.defaultRole === "Trainee") {
      defaultRole = 6;
    }
    else if (this.state.defaultRole === "Trainer") {
      defaultRole = 4;
    }

    // alert("default role:" +defr);
    if (defaultRole == 0) {
      //alert("default role is not selected");
      this.state.errors.defaultRoleError = "Please select one default role";
    }

    e.preventDefault();
    var RoleValidationResult = arr.length>0 && defaultRole>0;
    //add condition
    console.log("Role Validation result: " +RoleValidationResult);
    // validationResult = true;
    //let responses = this.state.responses;

    var url2 = "http://localhost:4728/api/v1/user/role";
    //localhost:4728/api/v1/user/role

    var rolesPayload = [];

    console.log("no. of roles: " + arr.length);
    for (var i = 0; i < arr.length; i++) {
      let role_id = arr[i];
      let isPrimary = 0;
      console.log("role_id: " + role_id);
      console.log("defaultRole: " + defaultRole);

      if (role_id === defaultRole) {
        isPrimary = 1;
      }

      var userRole = {
        "gts_user_id": user_id,
        "userRole":[{
          "gts_role_id": role_id,
          "gts_user_role_is_primary": isPrimary
        }]
      };
      rolesPayload[i] = userRole;

    }
    /*
        var payload2 = [{
          "gts_user_id": user_id,
          "roles": listOfRoles,
          "primary_role_id": defr
        }];
        */
    //let json = JSON.stringify(rolesPayload);
    console.log("rolesPayload: " + JSON.stringify(rolesPayload));

    if(RoleValidationResult == true){
    axios 
      .post(url2, userRole)
      .then(response => {
        console.log("data: " + response.data);
        let message = response.message;
        if (response.data.success == "false") {
          console.log("Not able to create roles");
          return false;
        }
        else {
          console.log("Roles created successfully");
          return true;
        }
      })
      .catch(error => {
        console.log("Error while creating roles: " + error);
      });
      return RoleValidationResult;
    }
    else{
      console.log("Not able to insert roles");
      return RoleValidationResult;
    }
  };

  render() {

    const errorMessageStyles = {
      //backgroundColor: "#f0f",
      fontWeight: 'bold',
      fontSize: 18,
      color: "#ff4d4d",
      //padding: paddings
    }

    const successMessageStyles = {
      //backgroundColor: "#f0f",
      fontWeight: 'bold',
      fontSize: 18,
      color: "#008000",
      //padding: paddings
    }
    
    return (
      <>
        {/* <DemoNavbar /> */}
        <main ref="main">
          <section className="section section-shaped section-lg">
            {/* <div className="shape shape-style-1 bg-gradient-default"> */}
            {/* <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span /> */}
            {/* </div> */}

            <div class="d-flex justify-content-around">
              <div Align="left">
                <Container className="pt-lg-md">
                  <Row className="mt-7">
                    <Col >
                      <Card border="primary" style={{ width: '20rem' }}>
                        <Card.Body>
                          <Card.Text>
                            <dl>
                              <font className="text-primary"><i>
                                <dd>  By Registering with our platform, you will get the following opportunities:</dd>
                                <dd>  * Connect with the People throughout the world in order to provide and consume services with each other in best price.</dd>
                                <dd>  * Showcase your skills to the genuine service consumers.</dd>
                                <dd>  * Find out the best skilled service providers for your any day to day needs.</dd>
                                <dd>  * Best service recommendations for your daily needs.</dd>
                                <dd>  * Appropriate Training recommendations for service providers.</dd>
                                <dd>  * Recommendations for top qualified service providers.</dd>
                                <dd>  * Trainers have the opportunity to empower service providers through world class trainings.</dd>
                              </i>
                              </font>
                            </dl>
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                </Container>
              </div>

              <Container className="pt-lg-md">
                <div className="pt-4">
                  <h1 className="font-bold underline">Register Below</h1>
                </div>
                <Row className="justify-content-center mt-4">
                  <Col className="col-6">
                    <Card border="primary" style={{ width: '25rem' }}>
                      <Card.Body>
                        <Form method="post" name="handler" onSubmit={this.onSubmitHandler}>
                          <FormGroup className="mb-3" controlId="formBasicEmail">
                            <FormLabel>Enter Email-</FormLabel>
                            <InputGroup>
                              <Input
                                type="text"
                                name="email"
                                id="email"
                                className="form-control"
                                placeholder="monoranjang@gmail.com"
                                value={this.state.email}
                                onChange={this.inputOnChangeHandler}
                                onBlur={this.validateEmail}
                                onFocus={this.clearEmailError}
                              />
                            </InputGroup>
                          </FormGroup>
                          <FormGroup className="mb-3">
                            <div divID="emailError" style={errorMessageStyles}>{this.state.errors.email}</div>
                          </FormGroup>

                          <FormGroup className="mb-3" controlId="formBasicPassword">
                            <FormLabel>Enter Password</FormLabel>
                            <InputGroup>

                              <Input
                                type="password"
                                name="password"
                                id="password"
                                className="form-control"
                                placeholder="**********"
                                value={this.state.password}
                                onChange={this.inputOnChangeHandler}
                                onBlur={this.validatePassword}
                                onFocus={this.clearPasswordError}
                              />
                            </InputGroup>
                          </FormGroup>
                          <FormGroup className="mb-3">
                            <div divID="passwordError" style={errorMessageStyles}>{this.state.errors.password}</div>
                          </FormGroup>

                          <FormGroup className="mb-3" controlId="formBasicPassword">
                            <FormLabel>Re-enter Password</FormLabel>
                            <InputGroup>
                              <Input
                                type="password"
                                name="confirmPassword"
                                id="confirmPassword"
                                className="form-control"
                                placeholder="Confirm Password"
                                value={this.state.confirm_password}
                                onChange={this.inputOnChangeHandler}
                                onBlur={this.validateConfirmPassword}
                                onFocus={this.clearConfirmPasswordError}
                              />
                            </InputGroup>
                          </FormGroup>
                          <FormGroup className="mb-3">
                            <div divID="confirmPasswordError" style={errorMessageStyles}>{this.state.errors.confirmPassword}</div>
                          </FormGroup>

                          <FormGroup className="mb-3">
                            <div divID="registrationError" style={errorMessageStyles}>{this.state.responses.registrationError}</div>
                          </FormGroup>

                          <FormGroup className="mb-3">
                            <div divID="registrationSuccess" style={successMessageStyles}>{this.state.responses.registrationSuccess}</div>
                          </FormGroup>

                          <div className="text-center">
                            <Button className="mt-4" color="primary" type="submit" style={{ borderRadius: "8px" }}>
                              Register
                          </Button>
                          </div>
                        </Form>
                        <p style={{textAlign:"center"}}>OR</p>
                        <div className="text-center">
                          <ButtonGroup vertical>
                            <Button outline color="primary" style={{ borderRadius: "12px" }}><i class="fab fa-google fa-fw"></i>Join with Google</Button>
                            <Button outline color="primary" style={{ borderRadius: "12px" }}><i class="fab fa-facebook fa-fw"></i>Join with Facebook</Button>
                            <Button outline color="primary" style={{ borderRadius: "12px" }}><i class="fab fa-linkedin fa-fw"></i>Join with Linkedin</Button>
                          </ButtonGroup>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                    <Col className="col-6">

                      <dl>
                        <dd>
                          Select Role(You can have multiple, but please state one role as your default as well) :
                        </dd>
                      </dl>

                      <form>

                        <div class="row">
                          <div class="col">
                            <label className="form-check-label">
                              <input type="checkbox"
                                checked={this.state.isServiceProvider}
                                onChange={this.toggleChangeServiceProvider}
                                className="form-check-input"
                              />
                                  Service Provider
                              </label>
                          </div>
                          <div class="col">
                            <label>
                              <input type="radio" value="ServiceProvider"
                                checked={this.state.defaultRole === "ServiceProvider"}
                                onChange={this.onRadioChange}
                              />
                                  Default
                              </label>
                          </div></div><br />


                        <div class="row">
                          <div class="col">
                            <label className="form-check-label">
                              <input type="checkbox"
                                checked={this.state.isServiceConsumer}
                                onChange={this.toggleChangeServiceConsumer}
                                className="form-check-input"
                              />
                                  Service Consumer
                              </label>
                          </div>
                          <div class="col">
                            <label>
                              <input type="radio" value="ServiceConsumer" checked={this.state.defaultRole === "ServiceConsumer"}
                                onChange={this.onRadioChange}
                              />
                                  Default
                              </label>
                          </div>
                        </div><br />

                        <div class="row">
                          <div class="col">
                            <label className="form-check-label">
                              <input type="checkbox"
                                checked={this.state.isTrainee}
                                onChange={this.toggleChangeTrainee}
                                className="form-check-input"
                              />
                                  Trainee
                              </label>
                          </div>
                          <div class="col">
                            <label>
                              <input type="radio" value="Trainee" checked={this.state.defaultRole === "Trainee"}
                                onChange={this.onRadioChange}
                              />
                                  Default
                              </label>
                          </div>
                        </div><br />


                        <div class="row">
                          <div class="col">
                            <label className="form-check-label">
                              <input type="checkbox"
                                checked={this.state.isTrainer}
                                onChange={this.toggleChangeTrainer}
                                className="form-check-input"

                              />
                                  Trainer
                              </label>
                          </div>
                          <div class="col">
                            <label>
                              <input type="radio" value="Trainer" checked={this.state.defaultRole === "Trainer"}
                                onChange={this.onRadioChange}
                              />
                                  Default
                              </label>
                          </div></div><br />
                      </form>
                      <FormGroup className="mb-3">
                        <div divID="roleError" style={errorMessageStyles}>{this.state.errors.roleError}</div>
                        <div divID="defaultRoleError" style={errorMessageStyles}>{this.state.errors.defaultRoleError}</div>
                      </FormGroup>
                      <FormGroup className="mb-3">
                        <div divID="roleSuccess" style={errorMessageStyles}>{this.state.errors.roleSuccess}</div>
                      </FormGroup>


                    </Col>
                   </Row>
                </Container>


            </div>
          </section>
        </main>

        {/* <SimpleFooter /> */}
      </>
    );
  }
}

const bgImage = {
  backgroundSize: 'contain',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  //backgroundImage: `url(${backgroundImage})`
};

export default RegistrationComponent;

