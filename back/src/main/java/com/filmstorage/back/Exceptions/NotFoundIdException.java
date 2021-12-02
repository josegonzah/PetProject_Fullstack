package com.filmstorage.back.Exceptions;

public class NotFoundIdException extends RuntimeException{
    public NotFoundIdException(String message){
        super(message);
    }
}