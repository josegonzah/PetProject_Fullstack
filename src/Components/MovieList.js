import React from 'react';
// import classes from './.module.css';

const MovieList = (props) => {
	const FavouriteComponent = props.favouriteComponent;

	return (
		<>
			{props.movies.map((movie, index) => (
				<div className='image-container d-flex justify-content-start m-3'>
					<h3>{movie.title}</h3>
					<p>{movie.description}</p>
					<p>{movie.genre}</p>
					{/* <img src={movie.Poster} alt='movie'></img> */}
					<div
						onClick={() => props.handleFavouritesClick(movie)}
						className='overlay d-flex align-items-center justify-content-center'
					>
						<FavouriteComponent />
					</div>
				</div>
			))}
		</>
	);
};

export default MovieList;
