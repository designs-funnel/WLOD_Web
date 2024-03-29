import React, { useState } from "react";
import "./forpass.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Navbarmenu, TopBar } from "../../component";
import bg2 from "../../assets/bg2.png";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import logo from "../../assets/logo.png";
const Forget = () => {
  let navigate = useNavigate(); 
  const [password, setpassword] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [errorModal, setErrorModal] = useState(false);
  const [error, setError] = useState(false);
  const [emailError, setEmailError] = useState('');
  const handleChangeemail = event => {
    // setemail(event.target.value);

    console.log('value is:', event.target.value);
  };
  const handleChangepass = event => {
    setpassword(event.target.value);

    // console.log('value is:', event.target.value);
  };
  const goNewpass=()=>{
  //  if(email && password){
    navigate('/newpass');
    
  //  }
  }
  

  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  // const handleEmail = () => {
  //   openInbox();
  // };

 
  const recoverPassword = () => {

    var formdata = new FormData();
    formdata.append('email', email);

    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow',
    };

    fetch('http://alsyedmmtravel.com/api/check_email', requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result,'====>log');
        if (result.message !== 'Email already exists ') {
          // setError(true);
          // setEmailError('Invalid Email');
        } else {
          // setIsModalVisible(true);
          var formdata = new FormData();
          formdata.append('email', email.toLowerCase());
console.log(email,'works');
          var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow',
          };

          fetch('http://alsyedmmtravel.com/api/forgot_pass', requestOptions)
            .then(response => response.json())
            .then(result => {
              console.log(result,'result');
              // setIsModalVisible(false);
              if (result.message.includes('Check')) {
                // setIsModalVisible(false);
                
              }
            })
            .catch(error => {
              console.log('error', error);
              // setIsModalVisible(false);
            });
        }
      })
      .catch(error => console.log('error', error));
  };
  return (
    <>
      <Container fluid>
        <Navbar expand="lg" variant="light" bg="light">
          <Container>
            <Navbar.Brand href="#"><img className="header-logo" src={logo}/></Navbar.Brand>
          </Container>
        </Navbar>
      </Container>
      <Row>
        <Col lg='12'>
           <div className="box1">
           <h6>Enter your email address and we will send you a link to reset your password.</h6>
           </div>

           <div className="box2"> 
            <input type='text' placeholder="enter your email" className="forgetinput"
             onChange={(event) => setEmail(event.target.value)}
            />
            <button onClick={recoverPassword} className="recoverbutt">Recover My password </button>
           </div>
        </Col>
      </Row>

      
    </>
  );
};

export default Forget;
