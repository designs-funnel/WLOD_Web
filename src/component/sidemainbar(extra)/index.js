import React from 'react'
// import './slide.css'
import { MdExpandLess } from "@react-icons/all-files/md/MdExpandLess";
import { GiHamburgerMenu } from "@react-icons/all-files/gi/GiHamburgerMenu";
import { Link } from "react-router-dom";
import { useState } from 'react';
import { Row,Col } from 'react-bootstrap';

const SideMainBar = () => {
    const [show, setshow] = useState(false);
    const [drawer, setdrawer] = useState(true);
    const open = () => {
        setshow(!show);
      };
      const opendarwer = () => {
        setdrawer(!drawer);
      };
  return (
    // style={{border:'solid green',height:'100%', backgroundColor: 'green'}}
          <div style={{position:'fixed',top: 0,bottom: 0,backgroundColor:'#be1f2d',zIndex:-100000,width:'20%'}}>

            {/* <Row style={{border:'solid green',position:'fixed',top: 0,bottom: 0, backgroundColor: 'green'}} > */}
            {/* <Row >
              <Col lg="12" md="12" sm="12" xs="12">

              </Col>
            </Row> */}
        </div>



  //   <div
  //   className="maindeowercontainerreal "
  // >
  //   {/* <GiHamburgerMenu  className="ham" /> */}

  //   <div className="cent">
  //     <div className="back">
  //       {/* <Link className="tit" to="/">
  //         Home
  //       </Link> */}
  //     </div>
  //   </div>
  //   {/* <div className="cent">
  //     <div className="back2">
  //       <p className="tit">MY PROFILE</p>
  //       <p>
  //         <MdExpandLess onClick={open} className="expand" />
  //       </p>
  //     </div>
  //   </div> */}
  //   {/* {!show ? ( */}
  //     <div className="cent2">
  //       <div className="backkk "></div>
       
  //       <div className="back33">
  //       <Link className="tit" to="/">
  //         Home
  //       </Link>
  //         <Link className="tit" to="/visit">
  //           Recent Session
  //         </Link>

  //         {/* <Link className="tit" to="/provider">
  //           My consultants
  //         </Link> */}
  //         {/* <Link className="tit" to="/document">
  //           Document
  //         </Link> */}
  //         <Link className="tit" to="/chat">
  //           Message
  //         </Link>
  //       </div>
  //     </div>
  //   {/* ) : null} */}
  // </div>
  )
}

export default SideMainBar