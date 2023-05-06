import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../../SearchBar";
import "./nav.css"

export default function Nav({ paginado, resetea }) {
    return (
        <div className="Nav" style={{ textAlign: "center" }}>
            <Link to="/">
                <button className="btn-nav">
                    START
                </button>
            </Link>
            <SearchBar paginado={paginado} resetea={resetea} />

            <Link to="/create">
                <button className="btn-nav">
                    CREATE
                </button>
            </Link>
        </div>
    );
}
