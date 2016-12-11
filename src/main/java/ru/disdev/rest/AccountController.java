package ru.disdev.rest;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/account", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
public class AccountController extends RestExceptionHandler {

}
