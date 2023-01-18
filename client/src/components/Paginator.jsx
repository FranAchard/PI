import React from 'react'
import "../styles/Paginator.css"

export default function Pagina({ videogamesForPage, allVideogames, paginado, avanza, retrocede }) {
    const pageNumbers = []

    for (let i = 0; i < Math.ceil(allVideogames / videogamesForPage); i++) {
        pageNumbers.push(i + 1)
    }

    return (
        <nav className='nav'>
            <ul className='paginado'>
                <button className='btn' onClick={retrocede}>{`< `}</button>
                {
                    pageNumbers?.map(e =>
                        <button className='btn' key={e} onClick={() => paginado(e)}>{e}</button>
                    )
                }
                <button className='btn' onClick={avanza}>{` >`}</button>
            </ul>
        </nav>
    )
}
