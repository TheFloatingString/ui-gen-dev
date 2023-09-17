import React from 'react';
import '../styles/header.css';
import "../styles/footer.css";
import GitHubIcon from '@mui/icons-material/GitHub';
import { Link } from '@mui/material';



function Footer() {
  return <div className="footer">
    <div className="socialMedia">
      <Link href=
        "https://www.youtube.com/" //change later lol - urgent dont forget 
        target="_blank">
        <GitHubIcon />
      </Link>

    </div>
    <p> &copy; Laurence Liang, Kate Zheng, Leo Liao, James Liang </p>
  </div>

}

export default Footer;
