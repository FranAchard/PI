import React from "react"
import "../styles/Option.css"

export default function Options({ resetea, handleSource, handleOrden, handleGender, allGenders }) {

    return (
        <div style={{ textAlign: "center" }} >
            <select className="btn" name="Source" style={{ backgroundColor: "black" }} onChange={e => handleSource(e)}>
                <option className="btn" value="Source">
                    Source
                </option>
                <option className="btn" value="Api">
                    Api
                </option>
                <option className="btn" value="Created">
                    Created
                </option>
            </select>

            <select className="btn" name="Order" style={{ backgroundColor: "black" }} onChange={(e) => handleOrden(e)}>
                <option className="btn" value="Order">Order</option>
                <option className="btn" value="A-Z">A-Z</option>
                <option className="btn" value="Z-A">Z-A</option>
                <option className="btn" value="Rating ascendete">Higher</option>
                <option className="btn" value="Rating descendete">Lower</option>
            </select>

            <select className="btn" name="Gender" style={{ backgroundColor: "black" }} onChange={(e) => handleGender(e)}>
                <option className="btn" value="Gender">
                    Gender
                </option>
                <option className="btn" value="All">
                    All
                </option>
                {
                    allGenders?.map(e => (
                        <option className="btn" key={e[0]} value={e[0]}>{e[0]}</option>
                    ))
                }
            </select>

            <button className="btn" onClick={resetea}>reset</button>
        </div>
    )
}
