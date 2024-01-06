import React, { useEffect, useLayoutEffect, useState } from "react";
import "./App.css";
import Banner from "./Banner";

import Nav from "./Nav";
import Row from "./Row";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import HashLoader from "react-spinners/HashLoader";

import {
  useGetDiscoverQuery,
  useGetComedyQuery,
  useGetTopRatedQuery,
  useGetTrendingQuery,
  useGetTvShowQuery,
  useGetDocumentariesQuery,
  useGetHorrorQuery,
  useGetRomanceQuery,
} from "./features/Api";

function App() {
  useEffect(() => {
    document.title = "Netflix - Clone";
  }, []);

  const [rendered, setRendered] = useState(false);
  const [loading, setLoading] = useState(true);
  const [myClassName, setMyClassName] = useState('NotVisible');
  useLayoutEffect(() => {
    const simulateRendering = () => {
      // Simulating an asynchronous task
      setTimeout(() => {
        setRendered(true);
        setLoading(false);
        setMyClassName('visible')
      }, 3000); // Simulating a 2-second rendering time
    };

    simulateRendering();
  }, []);



  return (
    <>
      <div className="app">
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <>
                 { loading && (
                    <div className="loaderDiv">
                      <HashLoader
                          color={"#36d7b7"}
                          loading={loading}
                          size={150}
                        />
                    </div>
                  ) }
                  
                  <div className={myClassName}>
                    <Nav />
                    <Banner fetch={useGetTrendingQuery()} />
                    <Row title="Action Movies" fetch={useGetTrendingQuery()} />
                    <Row
                      title="Netflix Originals"
                      fetch={useGetDocumentariesQuery()}
                    />
                    <Row title="Trending" fetch={useGetTopRatedQuery()} />
                    <Row title="Top Rated" fetch={useGetDiscoverQuery()} />
                    <Row title="Comedy Movies" fetch={useGetComedyQuery()} />
                    <Row title="Horror Movies" fetch={useGetHorrorQuery()} />
                    <Row title="Romance Movies" fetch={useGetRomanceQuery()} />
                    <Row title="TV SHOW" fetch={useGetTvShowQuery()} />
                  </div>
                  
                 
                </>
              }
            />

            <Route
              path="/details/:type/:id"
              exact
              element={
                <>
                  {" "}
                  <Home />{" "}
                </>
              }
            />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
