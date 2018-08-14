import React from "react";
import "./Footer.css";

const Footer = () => {
    return (
        <footer className="footer flexRow">
            Copyright &copy; {new Date().getFullYear()} Social by Enache Laurentiu
        </footer>
    );
};

export default Footer;
