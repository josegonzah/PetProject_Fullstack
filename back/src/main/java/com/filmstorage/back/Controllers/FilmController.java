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
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "htpp://localhost:3000")
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
}
