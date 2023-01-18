import React from "react";
import { Link } from "react-router-dom";
import "../styles/Cards.css"


export default function Card({ id, name, image, genres }) {

    return (

        <div className="Card" style={{ backgroundImage: `url(${image})` }}>
            <div className="card-info">
                <h3 className="text-title">{name}</h3>
                <p className="text-body">{genres}</p>
                <Link to={"/videogames/" + id}>
                    <button className="card-button">
                        Read More
                    </button>
                </Link>
            </div>
        </div>
    );
}
