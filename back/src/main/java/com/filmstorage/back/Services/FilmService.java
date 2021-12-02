package com.filmstorage.back.Services;

import java.util.ArrayList;

import com.filmstorage.back.Models.FilmModel;
import com.filmstorage.back.Repositories.FilmRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FilmService {
    
    @Autowired
    FilmRepository filmRepository;

    public ArrayList<FilmModel> getFilms(){
        return (ArrayList<FilmModel>) filmRepository.findAll();
    }
}
