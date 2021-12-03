import React from 'react';
import classes from './MovieList.module.css';

const MovieList = (props) => {
	const BorrowedComponent = props.borrowedComponent;

	return (
		<>
			{props.movies.map((movie, index) => (
				<div className={classes.movie}>
					<h3>{movie.name}</h3>
					<p>{movie.description}</p>
					<p>{movie.genre}</p>
					{/* <img src={movie.Poster} alt='movie'></img> */}
					<div
						onClick={() => props.handleFavouritesClick(movie)}
						// className='overlay d-flex align-items-center justify-content-center'
					>
						<BorrowedComponent />
					</div>
				</div>
			))}
		</>
	);
};

export default MovieList;
