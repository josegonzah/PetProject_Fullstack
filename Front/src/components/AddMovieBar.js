import React from 'react';

const AddMovieBar = (props) => {
	return (
		<div className='col'>
			<h1>{props.heading}</h1>
            <input
				className='form-control'
				value={props.value}
				onChange={console.log(props.value)}
				placeholder='Ingrese el titulo de la pelicula que quiere añadir...'
			></input>
		</div>
	);
};

export default AddMovieBar;