import React, { useState, useEffect, Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import borrow from './components/BorrowMovie';
import returnFilm from './components/ReturnMovie';
import Button from './components/Button';
import AddModal from './components/AddModal';

const HOST_API = "http://localhost:8080/api";
const App = () => { 
	const [moviesDB, setMoviesDB] = useState([]);
	const [borrowed, setBorrowed] = useState([]);
	const [searchValue, setSearchValue] = useState('');
	const [modalAddMovie, setModalAddMovie] = useState(false);

	const getMovieRequest = async (searchValue) => {

		var movieNameToAPI = searchValue.split(' ').join('-').toLowerCase();
		const url = `http://localhost:8080/api/film/similarity?Simil=${movieNameToAPI}`;
		const urlGenre = `http://localhost:8080/api/film/genre?Genre=${movieNameToAPI}`;

		const response = await fetch(url);
		const responseGenre = await fetch(urlGenre);
		const responseJson = await response.json();
		const responseJsonGenre = await responseGenre.json();

		if (responseJson) {
			setMoviesDB(responseJson);
		}

		if(responseJsonGenre){
			const movieGenreDB = [...responseJson, ...responseJsonGenre]
			setMoviesDB(movieGenreDB);
		}
	};

	useEffect(() => {
		getMovieRequest(searchValue);
	}, [searchValue]);

	useEffect(() => {
		const movieBorrowed = JSON.parse(
			localStorage.getItem('react-movie-app-favourites')
		);

		if (movieBorrowed) {
			setBorrowed(movieBorrowed);
		}
	}, []);

	const saveToLocalStorage = (items) => {
		localStorage.setItem('react-movie-app-favourites', JSON.stringify(items));
	};

	const borrowMovie = (movie) => {
		const newFavouriteList = [...borrowed, movie];
		setBorrowed(newFavouriteList);
		saveToLocalStorage(newFavouriteList);
	};

	const returnMovie = (movie) => {
		const newFavouriteList = borrowed.filter(
			(favourite) => favourite.id !== movie.id
		);

		setBorrowed(newFavouriteList);
		saveToLocalStorage(newFavouriteList);
	};
	
	const addMovieModalHandler = () => {
		setModalAddMovie(true);
	}

	const addMovieHandler = (movieTitle, genre, description) => {
		const newMovie = {name: movieTitle, genre: genre, description: description};
		const newMoviesList = [...moviesDB, newMovie];
		setMoviesDB(newMoviesList)
		setModalAddMovie(false);
		fetch(HOST_API + '/film', { 
			method: 'POST',
			body: JSON.stringify({name: movieTitle, genre: genre, description: description}),
			headers: {'Content-Type': 'application/json'}
		})
	}

	const exitAddMovieHandler = () => {
		setModalAddMovie(false);
	}

	return (
		<Fragment>
			{modalAddMovie && <AddModal onConfirm={addMovieHandler} onQuit={exitAddMovieHandler}/>}
			<div className='container-fluid movie-app'>
				<div className='row d-flex align-items-center mt-4 mb-4'>
					<MovieListHeading heading='Base de datos de Peliculas' />
					<SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
					<Button type="submit" onClick={addMovieModalHandler}>Añadir pelicula</Button>

					{/* <AddMovieBar heading='Añadir peliculas'/> */}
				</div>
				<div className='row'>
					<MovieList
						movies={moviesDB}
						handleFavouritesClick={borrowMovie}
						borrowedComponent={borrow}
					/>
				</div>
				<div className='row d-flex align-items-center mt-4 mb-4'>
					<MovieListHeading heading='Prestadas' />
				</div>
				<div className='row'>
					<MovieList
						movies={borrowed}
						handleFavouritesClick={returnMovie}
						borrowedComponent={returnFilm}
					/>
				</div>
			</div>
		</Fragment>
	);
};

export default App;
