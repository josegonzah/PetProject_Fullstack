package com.filmstorage.back.Repositories;

import java.util.ArrayList;
import java.util.Optional;

import com.filmstorage.back.Models.FilmModel;

import org.springframework.data.repository.CrudRepository;

public interface FilmRepository extends CrudRepository<FilmModel, Long>{
    public abstract Optional<FilmModel> findByName(String name);
    public abstract ArrayList<FilmModel> findByGenre(String genre);
}
