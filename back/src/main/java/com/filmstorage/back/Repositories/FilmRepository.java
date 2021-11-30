package com.filmstorage.back.Repositories;

import com.filmstorage.back.Models.FilmModel;

import org.springframework.data.repository.CrudRepository;

public interface FilmRepository extends CrudRepository<FilmModel, Long>{
    
}
