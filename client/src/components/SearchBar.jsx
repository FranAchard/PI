import React from "react";
import { useDispatch } from "react-redux";
import { searchVideoagame } from "../Redux/actions";
import "../styles/SearchBar.css"

export default function SearchBar({ paginado, resetea }) {
    const dispatch = useDispatch();

    function handleSearch(e) {
        paginado(1)
        dispatch(searchVideoagame(e.target.value));
    };

    return (
        <div className="search">

            <div className="form">
                <input
                    className="input"
                    placeholder="Type your text"
                    required=""
                    type="text"
                    onChange={(e) => handleSearch(e)}
                />
                <span className="input-border"></span>
            </div>
            <button className="btn" onClick={resetea}>reset</button>
        </div>
    );
}