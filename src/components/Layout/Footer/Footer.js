import React from "react";
import "./Footer.css";
 import playStore from '../../Images/playstore.jpg'
 import appStore from '../../Images/Appstore.jpg'
import { Facebook, Instagram, YouTube} from "@mui/icons-material";
const Footer = () => {
  return (
    <footer id="footer">
     
      <div className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download App for Android and IOS mobile phone</p>
        <img src={playStore} alt="playstore" />
        <img src={appStore} alt="Appstore" />
      </div>

      <div className="midFooter">
        <h1>E-Governance</h1>
        <p>High Quality is our first priority</p>

        <p>Copyrights 2023 &copy; E-Governance</p>
      </div>

      <div className="rightFooter">
        <h4>Follow Us</h4>
        <a href="http://instagram.com/meabhisingh"><Instagram/> Instagram</a>
        <a href="http://youtube.com/6packprograme"><YouTube/>Youtube</a>
        <a href="http://instagram.com/meabhisingh"><Facebook/>Facebook</a>
      </div>
    </footer>
  );
};

export default Footer;