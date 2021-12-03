package com.filmstorage.back.Controllers;

import java.util.ArrayList;
import java.util.Optional;

import com.filmstorage.back.Models.FilmModel;
import com.filmstorage.back.Services.FilmService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class FilmController {

    @Autowired
    FilmService filmService;
    
    @GetMapping(value = "/film")
    public ArrayList<FilmModel> getAllFilms(){
        return filmService.getFilms();
    }

    @GetMapping(value = "/{Id}/film")
    public Optional<FilmModel> getFilmById(@PathVariable("Id") Long id){
        return filmService.getById(id);
    }

    @PostMapping(value = "/film")
    public FilmModel newFilm(@RequestBody FilmModel film){
        return filmService.saveFilm(film);
    }

    @DeleteMapping(value = "/{Id}/film")
    public String deleteFilmById(@PathVariable("Id") Long id){
        boolean ok = filmService.deleteFilm(id);
        if(ok){
            return "200. Se elimino correctamente";
        }
        return "400. No se elimino correctamente";
    }

    @PutMapping(value = "/{Id}/film")
    public FilmModel updateFilm(@RequestBody FilmModel film, @PathVariable("Id") Long id){
        return filmService.updateFilm(id, film);
    }

    @GetMapping(value = "film/name")
    public Optional<FilmModel> getFilmByName(@RequestParam("Name") String name){
        name = name.replace('-', ' ');
        return filmService.getByName(name.toLowerCase());
    }

    @GetMapping(value = "film/genre")
    public ArrayList<FilmModel> getFilmByGenre(@RequestParam("Genre") String genre){
        genre = genre.replace('-', ' ');
        return filmService.getByGenre(genre.toLowerCase());
    }

    @GetMapping(value = "film/similarity")
    public ArrayList<FilmModel> getFilmBySimilarityName(@RequestParam("Simil") String name) {
        name = name.replace('-', ' ');
        return filmService.getBySimilarityName(name.toLowerCase());        
    }
}
