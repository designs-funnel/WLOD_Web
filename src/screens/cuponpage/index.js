import React, { useState } from "react";
import "./vt.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BasicExample, Error3, Loader, Navbarmenu, TopBar } from "../../component";
import bg2 from "../../assets/bg2.png";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import logo from "../../assets/logo.png";
// import Button from 'react-bootstrap/Button';
import Form from "react-bootstrap/Form";
import { IoIosArrowForward } from "@react-icons/all-files/io/IoIosArrowForward";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { storeCoupon } from "../../store/action";
import { useLocation } from "react-router-dom";
const Cupon = () => {
  const params = useLocation();
  console.log(">>",params.state);
  let navigate = useNavigate();
  const [ApplyCupon, setApplyCupon] = useState("");
  const [loader, setLoader] = useState(false);
  const [error, seterror] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [congratsStatus, setCongratsStatus] = useState(false);
  const [bttext, setbttext] = useState("OK");
  const token = useSelector((state) => state.token);
  const promoCode = useSelector((state) => state.user.promo_code);

  const dispatch = useDispatch();
  const Close = () => {
    seterror(false);
  };
  const coupon =params.state.bparams;
  const goto = () => {
    navigate("/Confrimandpay",{
      state :{
        coupon
      }
    });
  };
  const handleCoupon = () => {
    setLoader(true);
    // if (promoCode !== ApplyCupon) {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", token);
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        coupon: ApplyCupon,
      });
      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      setTimeout(() => {
        fetch("https://dashboard.weightlossondemand.com/backend/api/coupon_check", requestOptions)
          .then((response) => response.json())
          .then((result) => {
            console.log(result.status);
            // setMessage(result.message);
            if (result.status !== 200) {
              console.log("params are here",coupon);
              seterror(true);
              setErrorMessage("Invalid coupon");
              setbttext("Try again")
              setCongratsStatus(false);

              // setTitle('Oops!');
            } else {
              console.log(result.message);
              setCongratsStatus(true);
              seterror(true);
              setErrorMessage("");
              setbttext("OK")
              dispatch(storeCoupon(ApplyCupon));
              navigate("/Confrimandpay",{
                state :{
                  coupon,
                  ApplyCupon
                }
              });
            
              // setTitle('Congratulations!');
            }
            setLoader(false);
          })
          .catch((error) => console.log("error", error));
      }, 100);
    // } else {
    //   setLoader(false);
    //   seterror(true);
    //   setErrorMessage("Invalid coupon");
    //   setCongratsStatus(false);
    // }
  };
  return (
    <Container fluid>
      <div className="of">
      <BasicExample/>
        {/* <Navbar expand="lg" variant="light" bg="light">
          <Navbar.Brand href="#">
            <img className="header-logo" src={logo} />
          </Navbar.Brand>
        </Navbar> */}
        <Row class="d-flex justify-content-center  align-items-center gap-5 pt-5">
          <Col
            lg="12"
            className="d-flex justify-content-center  align-items-center coupon-col"
          >
            <Form className="w-60 d-flex justify-content-center  align-items-center flex-column">
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Apply Coupon</Form.Label>
                <Form.Control
                  type="numberic"
                  placeholder="Add Coupon"
                  onChange={(event) => setApplyCupon(event.target.value)}
                />
                <Form.Text className="text-muted">
                </Form.Text>
              </Form.Group>

              <Button
                variant="primary"
                className="coupon-submit"
                onClick={handleCoupon}
              >
                Apply Coupon 
              </Button>
            </Form>
          </Col>
        </Row>
      </div>
      {loader && <Loader />}
      {error && (
        <Error3
          onClick={Close}
          tittle={errorMessage}
          congrats={congratsStatus}
          bttext={bttext}
        />
      )}
    </Container>
  );
};

export default Cupon;
