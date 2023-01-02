import React, { useState, useEffect } from "react";
import logo from "../../assets/logo.png";
import book from "../../assets/book.png";
import Navbar from "react-bootstrap/Navbar";
import { Button, Col, Container, Nav, Row } from "react-bootstrap";
import "./chat.css";
import Form from "react-bootstrap/Form";
// import Button from 'react-bootstrap/Button';
import Card from "react-bootstrap/Card";
import { MdExpandLess } from "@react-icons/all-files/md/MdExpandLess";
import { GiHamburgerMenu } from "@react-icons/all-files/gi/GiHamburgerMenu";
import { BasicExample, CardHome, SideBar, Visitcom } from "../../component";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUser } from "../../services/utilities/api";
import moment from "moment";

// function getWindowDimensions() {
//   const { innerWidth: width, innerHeight: height } = window;
//   return {
//     width,
//     height
//   };
// }

//  function useWindowDimensions() {
//   const [windowDimensions, setWindowDimensions] = useState(
//     getWindowDimensions()
//   );

//   useEffect(() => {
//     function handleResize() {
//       setWindowDimensions(getWindowDimensions());
//     }

//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   return windowDimensions;
// }

const MessageScreen = () => {
  let navigate = useNavigate();
  const [show, setshow] = useState(false);
  const [drawer, setdrawer] = useState(true);
  const [Visit, setVisit] = useState("");
  const [trainer, settrainer] = useState();
  const [Document, setDocument] = useState();
  const [message, setMessage] = useState();
  const [home, sethome] = useState("");
  const [loader, setLoader] = useState(false);
  const [msgList, setMsgList] = useState([]);
  const [userName, setUserName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");

  const token = useSelector((state) => state.token);

  const open = () => {
    setshow(!show);
  };
  const opendarwer = () => {
    setdrawer(!drawer);
  };
  const visit = () => {
    setVisit("'0'");
  };
  const goto = () => {
    navigate("/booksession");
  };

  useEffect(() => {
    getUserDetails();
    getChat();
  }, []);

  const getUserDetails = async () => {
    try {
      let response = await getUser(token);
      setUserName(response.data.data.first_name);
      setMiddleName(response.data.data.middle_name);
      setLastName(response.data.data.last_name);
    } catch (error) {
      console.log(error);
    }
  };

  const handleMsg = async () => {
    if (message !== "") {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", token);

      var formdata = new FormData();
      formdata.append("msg", message);
      formdata.append("sender", "user");

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow",
      };

      fetch("https://dashboard.weightlossondemand.com/backend/api/msg_sent", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          setMessage(" ");
          console.log(result);
          getChat();
        })
        .catch((error) => console.log("error", error));
    }

    // if (message != '') {
    //   setVisible(true);
    //   sendMsg();
    // } else {
    //   setVisible(false);
    // }
    // setmessage('');
  };
  const getChat = async () => {
    setLoader(true);

    var myHeaders = new Headers();
    myHeaders.append("Authorization", token);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch("https://dashboard.weightlossondemand.com/backend/api/chat_display", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result.data);
        setMsgList(result.data);
        setLoader(false);
      })
      .catch((error) => console.log("error", error));
  };
  return (
    <div className="wi55" >
      <BasicExample />

      <Row>
        <Col lg="2">
        <SideBar/>
      
        </Col>
       
        <Col lg="10">
          <div className="chatdivmain">
            <div className="textbox">
              {msgList?.map((item, index) => {
                return (
                  <div>
                    {item.sender == "user" ? (
                      <div className="chbox">
                        <p className="msgtext">
                          {moment(new Date(item.created_at)).format(
                            "MM/DD/YYYY hh:MMA"
                          )}
                        </p>
                     
                        <p className="msgtext">
                          {userName} {middleName}{" "}
                          {lastName}
                        </p>
                        <p className="msgtext">
                           {item.message}</p>
                      </div>
                    ) : (
                      <div>
                        {/* Yaha image add krni ha */}
                        {/* <img src={}/> */}
                        <p>Support Team</p>
                        <p>
                          &nbsp; &nbsp; &nbsp;
                          {moment(new Date(item.created_at)).format(
                            "MM/DD/YYYY hh:MMA"
                          )}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="inputdivmessage">
              <input
                className="messinput"
                type={"text"}
                placeholder="Enter your message"
                onChange={(event) => setMessage(event.target.value)}
                value={message}
              />
              <button className="sendbuttondiv" onClick={handleMsg}>
                <p className="sendbutton">Send</p>
              </button>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default MessageScreen;
