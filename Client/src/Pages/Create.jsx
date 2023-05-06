import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Load from "../components/Loads";
import "../styles/Create.css"
import {
    createVideogame,
    getAllGenres,
    loading,
    getAllVideogames,
} from "../Redux/actions";

export const validate = (input) => {
    let errors = {};

    if (!input.name) {
        errors.name = "Name is required";
    } else if (!/[A-Za-z0-9!?-]{4,12}/.test(input.name)) {
        errors.name = "Too short, require 4 characters";
    } else if (input.name < 20) {
        errors.name = `Too long, maximum characters 20, you have ${input.description.name}`;
    }
    if (!input.description) {
        errors.description = "Description is required";
    } else if (!/[A-Za-z0-9!?-]{8,12}/.test(input.description)) {
        errors.description = "Requires a minimum of 8 characters";
    } else if (input.description.length > 1500) {
        errors.description = `maximum characters 1,500, you have ${input.description.length}`;
    }
    if (input.platforms.length === 0) {
        errors.platforms = "Requires platforms";
    } else if (input.platforms.length >= 7) {
        errors.platforms = "Requires at least 7 platforms";
    }
    if (input.gender.length === 0) {
        errors.gender = "Requires one genders";
    } else if (input.gender.length >= 7) {
        errors.platforms = "Requires at least 7 genders";
    }
    return errors;
};

export default function Create() {
    let history = useHistory()
    const dispatch = useDispatch();
    const allGenders = useSelector((state) => state.Genders);
    const load = useSelector((state) => state.loader);
    const [errors, setErrors] = useState({});
    const [input, setInput] = useState({
        name: "",//obligatorio
        image: "",
        rating: 0,
        description: "",//obligatorio
        realeased: "",//obligatorio
        platforms: [],//obligatorio
        gender: [],//obligatorio
    });

    const platforms = [
        "PC",
        "Linux",
        "Xbox One",
        "PlayStation 5",
        "PlayStation 4",
        "Wii U",
        "Nintendo Switch",
        "macOS",
        "iOS",
        "Nintendo 3DS",
        "Android",
        "Steam Deck",
    ];

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async () => {
        dispatch(loading());
        await dispatch(getAllGenres());
        dispatch(loading());
    }, [dispatch]);

    const handleChange = (e) => {
        e.preventDefault();
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });

        setErrors(
            validate({
                ...input,
                [e.target.name]: e.target.value,
            })
        );
    };

    const handlePlatform = (e) => {
        if (e.target.checked) {
            setInput({
                ...input,
                [e.target.name]: [...input.platforms, e.target.value],
            });
            delete errors.platforms;
        } else {
            setInput({
                ...input,
                [e.target.name]: input.platforms.filter((a) => a !== e.target.value),
            });
        }
    };

    const handleGender = (e) => {
        if (e.target.checked) {
            setInput({
                ...input,
                [e.target.name]: [...input.gender, e.target.value],
            });
            delete errors.gender;
        } else {
            setInput({
                ...input,
                [e.target.name]: input.gender.filter((a) => a !== e.target.value),
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (errors.hasOwnProperty("name") && errors.hasOwnProperty("description") && errors.hasOwnProperty("realeased") && errors.hasOwnProperty("platforms") && errors.hasOwnProperty("gender")) {
            for (const key in errors) {
                console.log("no se posteó")
                return alert(`${key}: ${errors[key]}`);
            }
        } else if (input.name === "") {
            return alert("Complete name")
        } else if (input.description === "") {
            return alert("Complete description")
        } else if (input.realeased === "") {
            return alert("Complete released")
        } else if (input.platforms === "") {
            return alert("Complete platforms")
        } else if (input.gender === "") {
            return alert("Complete genders")
        } else {
            if (input.image === "") {
                input.image = "https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            }
            console.log("se creó")
            dispatch(createVideogame(input));
            setInput({
                name: "",
                image: "",
                rating: 0,
                description: "",
                realeased: "",
                platforms: [],
                gender: [],
            });
            history.push('./videogames')
            dispatch(getAllVideogames());
        }
    };

    if (!load) {
        return <Load />;
    } else {
        return (
            <>
                <form className="form" onSubmit={(e) => handleSubmit(e)}>
                    <div className="container">
                        <div className="basic-info">
                            <div className="name-image">
                                <label className="btn">Image: </label>
                                <div className="form">
                                    <input
                                        className="input"
                                        type="url"
                                        placeholder="imagen"
                                        name="image"
                                        onChange={(e) => handleChange(e)}
                                    />
                                </div>
                                <div className="justname">
                                    <label className="btn">Name: </label>
                                    <div className="form">
                                        <input
                                            className="input"
                                            type="text"
                                            placeholder="name"
                                            name="name"
                                            onChange={(e) => handleChange(e)}
                                        />
                                    </div>
                                    <span className="input-border"></span>
                                    {errors.name && <p className="danger">{errors.name}</p>}
                                </div>
                            </div>

                            <div className="rating-released">
                                <div className="justrating">
                                    <label className="btn">Rating: </label>
                                    <div className="form">
                                        <input
                                            className="input"
                                            type="number"
                                            step="0.5"
                                            min="0"
                                            max="5"
                                            placeholder="rating"
                                            name="number"
                                            onChange={(e) => handleChange(e)}
                                        />
                                    </div>
                                    <span className="input-border"></span>
                                    {errors.image && <p className="danger">{errors.image}</p>}
                                </div>

                                <div className="justreleased">
                                    <label className="btn">Released: </label>
                                    <div className="form">
                                        <input
                                            className="input"
                                            type="date"
                                            name="realeased"
                                            onChange={(e) => handleChange(e)}
                                        />
                                    </div>
                                    <span className="input-border"></span>
                                </div>
                            </div>

                            <div className="justdescription">
                                <label className="btn">Description: </label>
                                <div className="form">
                                    <textarea
                                        className="input"
                                        name="description"
                                        id="Description"
                                        cols="30"
                                        rows="10"
                                        placeholder="Una breve descripción del videojuego."
                                        onChange={(e) => handleChange(e)}
                                    ></textarea>
                                </div>

                                <span className="input-border"></span>

                                {errors.description && (
                                    <p className="danger">{errors.description}</p>
                                )}
                            </div>
                        </div>

                        <div className="genders-platforms-container">
                            <div>
                                <fieldset>
                                    <legend className="leter">Genders: </legend>
                                    <div className="justgenders">
                                        <div className="columnas">
                                            {allGenders.map((e) => {
                                                return (
                                                    <div key={e[0]}>
                                                        <input
                                                            type="checkbox"
                                                            value={e[0]}
                                                            name="gender"
                                                            onChange={(e) => handleGender(e)}
                                                        />
                                                        <label>{e[0]}</label>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </fieldset>
                                {errors.gender && <p className="danger">{errors.gender}</p>}
                            </div>

                            <div className="justplatforms">
                                <fieldset>
                                    <legend className="leter">Platforms: </legend>

                                    <div className="platform-cont">
                                        {platforms.map((e) => {
                                            return (
                                                <div key={e}>
                                                    <input
                                                        type="checkbox"
                                                        id={e}
                                                        value={e}
                                                        name="platforms"
                                                        onChange={(e) => handlePlatform(e)}
                                                    />
                                                    <label>{e}</label>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </fieldset>

                                {errors.platforms && (
                                    <p className="danger">{errors.platforms}</p>
                                )}
                            </div>
                        </div>
                    </div>
                    <button className="btn" type="submit">
                        Submit
                    </button>
                </form>


                <button className="back">
                    <div className="backdiv">←</div>
                    <Link to="/videogames">
                        <span className="backspan">Back</span>
                    </Link>
                </button>

            </>
        );
    }
}
