import React, { useState, useEffect, useRef } from "react";
import "./Row.css";
import { Link } from "react-router-dom";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

const base_url = "https://image.tmdb.org/t/p/original";

function Row({ title, fetch }) {
  const [movies, setMovies] = useState([]);
  
  useEffect(() => {
    setMovies(fetch.data?.results);
  }, [fetch]);
  //console.log(movies)

  const movieRowRef = useRef();
  const scrollMovies = (direction) => {
    // console.log("scrollMovies button clicked")
    const scrollAmount = 300; // Adjust as needed
    const movieRow = movieRowRef.current;

    if (direction === 'next') {
      movieRow.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    } else if (direction === 'prev') {
      movieRow.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <>
      <div className="row" id={title}>
        <h3>{title}</h3>

        <div className="list" ref={movieRowRef}>

        <button className="scroll-button prev" onClick={() => scrollMovies('prev')}>
          <ChevronLeftIcon className="ChevronLeftIcon"></ChevronLeftIcon>
        </button>

          {movies?.map((data) => (
            <Link
              to={`/details/${"movie" || "tv"}/${data.id}`}
              key={data.id}
              className="link"
            >
              <img
                className="bigPoster"
                key={data.id}
                src={`${base_url}${data.poster_path}`}
              />
            </Link>
          ))}

        <button className="scroll-button next" onClick={() => scrollMovies('next')}>
          <ChevronRightIcon className="ChevronRightIcon"></ChevronRightIcon>
        </button>
          
        </div>
      </div>
    </>
  );
}

export default Row;
