package ru.disdev.rest;

import org.springframework.boot.autoconfigure.web.ErrorController;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;

@Controller
public class AppController implements ErrorController {
    private final static String ERROR_PATH = "/error";

    @RequestMapping(value = ERROR_PATH, produces = "text/html")
    public ModelAndView errorHtml(HttpServletRequest request) {
        ModelAndView modelAndView = new ModelAndView("/index.html");
        modelAndView.setStatus(HttpStatus.OK);
        return modelAndView;
    }

    @Override
    public String getErrorPath() {
        return ERROR_PATH;
    }
}
