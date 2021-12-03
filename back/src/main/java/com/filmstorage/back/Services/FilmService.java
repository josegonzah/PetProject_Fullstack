package com.filmstorage.back.Services;

import java.util.ArrayList;
import java.util.Optional;

import com.filmstorage.back.Exceptions.NotFoundIdException;
import com.filmstorage.back.Models.FilmModel;
import com.filmstorage.back.Repositories.FilmRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FilmService {
    
    private static final String NO_FOUND_ID = "No existe la pelicula";

    @Autowired
    FilmRepository filmRepository;

    public ArrayList<FilmModel> getFilms(){
        return (ArrayList<FilmModel>) filmRepository.findAll();
    }

    public Optional<FilmModel> getById(Long id){
        return filmRepository.findById(id);
    }

    public FilmModel saveFilm(FilmModel filmModel){
        return filmRepository.save(filmModel);
    } 

    public boolean deleteFilm(Long id){
        try {
            filmRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public FilmModel updateFilm(Long id, FilmModel film){
        
        var filmUpdate = filmRepository.findById(id).orElseThrow(() -> new NotFoundIdException(NO_FOUND_ID));

        filmUpdate.setDescription(film.getDescription());
        filmUpdate.setDuration(film.getDuration());
        filmUpdate.setGenre(film.getGenre());
        filmUpdate.setName(film.getName());
        filmUpdate.setBorrow(film.getBorrow());
        
        filmRepository.save(filmUpdate);

        return filmUpdate;
    }

    public Optional<FilmModel> getByName(String name){
        return filmRepository.findByName(name);
    }

    public ArrayList<FilmModel> getByGenre(String genre){
        return filmRepository.findByGenre(genre);
    }

    public ArrayList<FilmModel> getBySimilarityName(String nameSimilarity){
        ArrayList<FilmModel> films = this.getFilms();
        ArrayList<FilmModel> similarity = new ArrayList<FilmModel>();
        for (FilmModel filmModel : films) {
            if (filmModel.getName().toLowerCase().contains(nameSimilarity)) {
                similarity.add(filmModel);
            }
        }

        return similarity;
    }
}
