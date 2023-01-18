import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import "../styles/nav.css"

export default function Nav({ paginado, resetea }) {
    return (
        <div className="Nav" style={{ textAlign: "center" }}>
            <Link to="/">
                <button className="btn">
                    Start
                </button>
            </Link>
            <SearchBar paginado={paginado} resetea={resetea} />

            <Link to="/create">
                <button className="btn">
                    Create
                </button>
            </Link>
        </div>
    );
}
