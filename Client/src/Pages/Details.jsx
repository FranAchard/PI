import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useHistory } from "react-router-dom";
import Load from "../components/Loads";
import { getAllVideogames, getOneVideogame, loading } from "../Redux/actions";
import "../styles/Details.css";
import Swal from "sweetalert2";


export default function Details() {
    const dispatch = useDispatch();
    const params = useParams();
    const load = useSelector((state) => state.loader);
    const details = useSelector((state) => state.VideogameDetail);
    const navigate = useHistory();

    const id = params.id;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async () => {
        dispatch(loading());
        await dispatch(getOneVideogame(id));
        dispatch(loading());
    }, [dispatch, id]);

    const handleDelete = (id, event) => {
        event.preventDefault()
        if (id) {
            Swal.fire({
                title: "Confirm",
                text: "Are yo sure you want to delete this videogame?",
                icon: "warning",
                showDenyButton: true,
                denyButtonText: "No",
                denyButtonColor: "#FF5733",
                confirmButtonText: "Yes",
                confirmButtonColor: "#72CE65",
                background:"#6F787A",
                color:"#fff",
            }).then(res => {
                if (res.isConfirmed) {
                    fetch(`http://localhost:3001/videogames/${id}`, {
                        method: 'DELETE',
                    })

                    const Toast = Swal.mixin({
                        toast: true,
                        position: "top-right",
                        iconColor: "white",
                        customClass: {
                            popup: "colored-toast",
                        },
                        showConfirmButton: false,
                        timer: 3500,
                        timerProgressBar: false,
                    });
                    Promise.resolve(
                        Toast.fire({
                            icon: "success",
                            title: "Videogame succesfully deleted!",
                        })
                    );
                    navigate.push("/videogames")
                    dispatch(getAllVideogames())
                    return

                }
                else {
                    const Toast = Swal.mixin({
                        toast: true,
                        position: "top-right",
                        iconColor: "white",
                        customClass: {
                            popup: "colored-toast",
                        },
                        showConfirmButton: false,
                        timer: 2500,
                        timerProgressBar: false,
                    });
                    Promise.resolve(
                        Toast.fire({
                            icon: "error",
                            title: 'Videogame deletion canceled',
                        })
                    );
                }
            })
        }
    };
    if (!load) {
        return <Load />;
    } else {
        return details.map((e) => {
            return (
                <div key={e.id}>
                    <div

                        className="fondo"
                        style={{ backgroundImage: `url(${e.image})` }}
                    ></div>

                    <div className="content">
                        <div
                            className="img"
                            style={{ backgroundImage: `url(${e.image})` }}
                        ></div>

                        <div className="image-desc">
                            <h1 className="letra">{e.name}</h1>
                            <h4 className="letra">Released: {e.released}</h4>
                            <h5 className="letra">{e.description}</h5>
                            <h5 className="letra">Géneros: {e.genders.join(", ")}</h5>
                            <h5 className="letra">Plataformas: {e.platforms.join(", ")}</h5>
                            <h5 className="letra">Rating: {e.rating}</h5>
                            <button className="btn-delete" disabled={e.id.length > 5 ? false : true} onClick={(event)=>handleDelete(e.id, event)}>
                                DELETE
                            </button>
                        </div>


                        <div className="butondetail">
                            <button className="bback">
                                <div className="bbackdiv">←</div>
                                <Link to="/videogames">
                                    <span className="bbackspan">Back</span>
                                </Link>
                            </button>
                        </div>

                    </div>

                </div>
            );
        });
    }
}
