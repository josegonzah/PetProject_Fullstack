import React, { useState } from 'react';

import Card from './Card';
import Button from './Button';
import classes from './AddModal.module.css';

const AddModal = props => {
    const [movieTitle, setMovieTitle] = useState('');
    const [genre, setGenre] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');


    const titleChangeHandler = event => {
        setMovieTitle(event.target.value);
    };

    const genreChangeHandler = event => {
        setGenre(event.target.value);
    };

    const descriptionChangeHandler = event => {
        setDescription(event.target.value)
    };


    const buttonClickHandler = () => {
        if(movieTitle.trim().length === 0 || genre.trim().length === 0 || description.trim().length === 0){
            return
        }
        props.onConfirm(movieTitle, genre, description);
    }

    return(
        <div>
            <div className={classes.backdrop} onClick={props.onQuit}/>
            <Card className={classes.modal}>
                <header className={classes.header}>
                    <h2>Añadir pelicula a la base de datos</h2>
                </header>
                <div className={classes.content}>
                    <p>Ingrese el titulo de la pelicula</p>
                </div>
                <div className={classes.input}>
                    <input type="text" onChange={titleChangeHandler} />
                </div>
                <div className={classes.content}>
                    <p>Ingrese el genero de la pelicula</p>
                </div>
                <div className={classes.input}>
                    <input type="text" onChange={genreChangeHandler} />
                </div>
                <div className={classes.content}>
                    <p>Ingrese una descripcion de la pelicula</p>
                </div>
                <div className={classes.input}>
                    <input type="text" onChange={descriptionChangeHandler} />
                </div>
                <footer className={classes.actions}>
                    <Button onClick={buttonClickHandler}> Añadir pelicula</Button>
                </footer>
            </Card>
        </div>
    )
}

export default AddModal;