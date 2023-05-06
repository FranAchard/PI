import React from "react";
import { Link } from "react-router-dom";
import './start.css';
import fondo from "./fondo.jpg";

export default function Start() {
    return (
        <div className="contenido">
            <img className="bg-landing" src={fondo} alt="fondo"></img>
            <div className="start">
                <div className="fancy">
                    <span className="top-key"></span>
                    <Link to="/videogames">
                        <span className="text">Start</span>
                    </Link>
                    <span className="bottom-key-1"></span>
                    <span className="bottom-key-2"></span>
                </div>
            </div>
        </div>
    );
}
