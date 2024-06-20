import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import MovieCard from "../movieCard/MovieCard"; 
import useFetch from "../custom/useFetch/useFetch"; 

const Dashboard = () => {
    const { data: moviesData, loading: moviesLoading, error: moviesError } = useFetch("https://fake-api-nodejs-s8ck.onrender.com/movies");

    return (
        <>
            <Navbar />
            <div className="container mt-4">
                <h2>Movies Dashboard</h2>
                <div className="row">
                    {moviesLoading ? (
                        <p>Cargando películas...</p>
                    ) : moviesError ? (
                        <p>Error al cargar películas: {moviesError}</p>
                    ) : (
                        moviesData.map((movie) => (
                            <div key={movie.id} className="col-md-4 mb-4">
                                <MovieCard
                                    title={movie.title}
                                    description={movie.description}
                                    price={movie.price}
                                    thumbnail={movie.thumbnail}
                                    status={movie.status}
                                />
                            </div>
                        ))
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Dashboard;
