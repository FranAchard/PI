import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../styles/Home.css";
import {
    getAllVideogames,
    filterOrder,
    filterSource,
    getAllGenres,
    filterGender,
    loading,
} from "../Redux/actions";
import Card from "../components/Cards";
import Pagina from "../components/Paginator";
import Load from "../components/Loads";
import Options from "../components/Option";
import Nav from "./Nav";

export default function Home() {
    const dispatch = useDispatch();
    const allVideogames = useSelector((state) => state.Videogames);
    const allGenders = useSelector((state) => state.Genders);
    const load = useSelector((state) => state.loader);
    const [currentPage, setcurrentPage] = useState(1);
    const [ordenado, setOrdenado] = useState("");
    const indexLastVideogame = currentPage * 15; //15
    const indexFirtsVideogame = indexLastVideogame - 15; //0
    const currentVideogames = allVideogames.slice(
        indexFirtsVideogame,
        indexLastVideogame
    );

    const paginado = (pageNumber) => {
        setcurrentPage(pageNumber);
    };

    const avanza = () => {
        if (currentPage < Math.ceil(allVideogames.length / 15)) {
            paginado(currentPage + 1)
        } else {
            console.log(Math.ceil(allVideogames / 15))
        }

    };
    const retrocede = () => {
        if (currentPage > 1) {
            paginado(currentPage - 1)
        }
        console.log(currentPage);
        console.log(currentPage - 1);
    };

    const resetea = (e) => {
        dispatch(getAllVideogames());
        paginado(1);
    };

    const handleSource = (e) => {
        dispatch(filterSource(e.target.value));
        paginado(1);
    };

    const handleOrden = (e) => {
        setOrdenado(e.target.value);
        dispatch(filterOrder(e.target.value));
        paginado(1);
    };

    const handleGender = (e) => {
        dispatch(filterGender(e.target.value));
        paginado(1);
    };

    useEffect(() => {

        if (ordenado === "") {
            dispatch(loading());
            dispatch(getAllVideogames());
            dispatch(loading());
            dispatch(getAllGenres());
        } else {
            dispatch(filterOrder(ordenado));
        }
    }, [dispatch, ordenado]);

    useEffect(() => {
        if (!currentPage) {
            paginado(1)
        }
    }, [currentPage])



    if (!load) {
        return <Load />;
    } else if (currentVideogames?.length === 0) {
        return (
            <div key={1}>
                <Nav paginado={paginado} resetea={resetea} />
                <Options
                    resetea={resetea}
                    handleSource={handleSource}
                    handleOrden={handleOrden}
                    handleGender={handleGender}
                    allGenders={allGenders}
                />
            </div>
        )
    } else {
        return (
            <div>
                <Nav paginado={paginado} resetea={resetea} />
                <Options
                    resetea={resetea}
                    handleSource={handleSource}
                    handleOrden={handleOrden}
                    handleGender={handleGender}
                    allGenders={allGenders}
                />

                <Pagina
                    videogamesForPage={15}
                    allVideogames={allVideogames.length}
                    paginado={paginado}
                    avanza={avanza}
                    retrocede={retrocede}
                />

                <div className="container-cards">
                    {currentVideogames?.map((e) => (
                        <Card
                            key={e.id}
                            id={e.id}
                            name={e.name}
                            image={e.image}
                            genres={e.genders?.join(", ")}
                        />
                    ))
                    }
                </div>
                <span className="pagina">{`--->${currentPage} <---`}</span>
            </div>
        );
    }
}
