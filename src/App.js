import React, { useState, useEffect, Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddFavourites from './components/AddFavourites';
import RemoveFavourites from './components/RemoveFavourites';
import Button from './components/Button';
import AddModal from './components/AddModal';

const HOST_API = "http://localhost:8080/api";
const App = () => { 
	const [movies, setMovies] = useState([]);
	const [moviesDB, setMoviesDB] = useState([{
		id: 1,
		name: "titulo",
		genre: "genero",
		description: "description"
	}, {
		id: 2,
		name: "tirulo 2",
		genre: "genero 2",
		description: "description 2"
	}]);
	const [favourites, setFavourites] = useState([]);
	const [searchValue, setSearchValue] = useState('');
	const [modalAddMovie, setModalAddMovie] = useState(false);

	const getMovieRequest = async (searchValue) => {

		var movieNameToAPI = searchValue.split(' ').join('-').toLowerCase();
		console.log(movieNameToAPI);
		const url = `http://localhost:8080/api/film/similarity?Simil=${movieNameToAPI}`;
		const urlGenre = `http://localhost:8080/api/film/genre?Genre=${movieNameToAPI}`;

		const response = await fetch(url);
		const responseGenre = await fetch(urlGenre);
		const responseJson = await response.json();
		const responseJsonGenre = await responseGenre.json();
		console.log(responseJson);

		if (responseJson) {
			setMoviesDB(responseJson);
		}

		if(responseJsonGenre){
			const movieGenreDB = [...responseJson, ...responseJsonGenre]
			setMoviesDB(movieGenreDB);
		}
		// fetch(HOST_API + '/film/similarity?' + movieNameToAPI)
		// .then((response) => {
		// 	return response.json();
		// }).then((data) => {
		// 	const fetchedMovieList = data.map((moviesData) => {
		// 		return{
		// 			id: moviesData.id,
		// 			title: moviesData.name,
		// 			description: moviesData.description,
		// 			genre: moviesData.genre,
		// 			duration: moviesData.duration
		// 		};
		// 	});
		// 	setMoviesDB(fetchedMovieList);
		// })
	};

	useEffect(() => {
		getMovieRequest(searchValue);
	}, [searchValue]);

	useEffect(() => {
		const movieFavourites = JSON.parse(
			localStorage.getItem('react-movie-app-favourites')
		);

		if (movieFavourites) {
			setFavourites(movieFavourites);
		}
	}, []);

	const saveToLocalStorage = (items) => {
		localStorage.setItem('react-movie-app-favourites', JSON.stringify(items));
	};

	const addFavouriteMovie = (movie) => {
		const newFavouriteList = [...favourites, movie];
		setFavourites(newFavouriteList);
		saveToLocalStorage(newFavouriteList);
	};

	const removeFavouriteMovie = (movie) => {
		const newFavouriteList = favourites.filter(
			(favourite) => favourite.id !== movie.id
		);

		setFavourites(newFavouriteList);
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
						handleFavouritesClick={addFavouriteMovie}
						favouriteComponent={AddFavourites}
					/>
				</div>
				<div className='row d-flex align-items-center mt-4 mb-4'>
					<MovieListHeading heading='Prestadas' />
				</div>
				<div className='row'>
					<MovieList
						movies={favourites}
						handleFavouritesClick={removeFavouriteMovie}
						favouriteComponent={RemoveFavourites}
					/>
				</div>
			</div>
		</Fragment>
	);
};

export default App;
