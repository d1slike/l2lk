package ru.disdev.rest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.TypeMismatchException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.BindException;
import org.springframework.web.HttpMediaTypeNotSupportedException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.multipart.support.MissingServletRequestPartException;
import org.springframework.web.servlet.NoHandlerFoundException;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import ru.disdev.entity.RestResponse;
import ru.disdev.utils.ErrorText;

import javax.validation.ConstraintViolationException;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class RestExceptionHandler extends ResponseEntityExceptionHandler {
    private final static Logger LOGGER = LoggerFactory.getLogger(RestExceptionHandler.class);

    // 400
    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(final MethodArgumentNotValidException ex,
                                                                  final HttpHeaders headers, final HttpStatus status,
                                                                  final WebRequest request) {
        //List<String> errors = exception.getBindingResult().getAllErrors().stream()
        //.map(DefaultMessageSourceResolvable::getDefaultMessage).collect(Collectors.toList());
        final Map<String, Object> errors = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(error -> errors.put(error.getField(), error.getDefaultMessage()));
        ex.getBindingResult().getGlobalErrors().forEach(error ->
                errors.put(error.getObjectName(), error.getDefaultMessage()));
        RestResponse<Map<String, Object>> response = new RestResponse<>(400, ErrorText.BAD_REQUEST, errors);
        return new ResponseEntity<>(response, new HttpHeaders(), HttpStatus.OK);
    }

    @Override
    protected ResponseEntity<Object> handleBindException(final BindException ex, final HttpHeaders headers,
                                                         final HttpStatus status, final WebRequest request) {
        final Map<String, Object> errors = new HashMap<>();
        ex.getBindingResult().getGlobalErrors().forEach(error ->
                errors.put(error.getObjectName(), error.getDefaultMessage()));
        ex.getBindingResult().getFieldErrors().forEach(error -> errors.put(error.getField(), error.getDefaultMessage()));
        RestResponse<Map<String, Object>> response = new RestResponse<>(400, ErrorText.BAD_REQUEST, errors);
        return new ResponseEntity<>(response, new HttpHeaders(), HttpStatus.OK);
    }

    @Override
    protected ResponseEntity<Object> handleTypeMismatch(final TypeMismatchException ex, final HttpHeaders headers,
                                                        final HttpStatus status, final WebRequest request) {
        final String error = ex.getValue() + " значение поля: " + ex.getPropertyName()
                + " должно иметь тип: " + ex.getRequiredType();
        RestResponse<String> response = new RestResponse<>(400, ErrorText.BAD_REQUEST, Collections.singletonList(error));
        return new ResponseEntity<>(response, new HttpHeaders(), HttpStatus.OK);
    }

    @Override
    protected ResponseEntity<Object> handleMissingServletRequestPart(final MissingServletRequestPartException ex,
                                                                     final HttpHeaders headers, final HttpStatus status,
                                                                     final WebRequest request) {
        final String error = ex.getRequestPartName() + " часть отсутствует";
        RestResponse<String> response = new RestResponse<>(400, ErrorText.BAD_REQUEST, Collections.singletonList(error));
        return new ResponseEntity<>(response, new HttpHeaders(), HttpStatus.OK);
    }

    @Override
    protected ResponseEntity<Object> handleMissingServletRequestParameter(final MissingServletRequestParameterException ex,
                                                                          final HttpHeaders headers, final HttpStatus status,
                                                                          final WebRequest request) {
        final String error = ex.getParameterName() + " параметр обязателен";
        RestResponse<String> response = new RestResponse<>(400, ErrorText.BAD_REQUEST, Collections.singletonList(error));
        return new ResponseEntity<>(response, new HttpHeaders(), HttpStatus.OK);
    }

    @ExceptionHandler({MethodArgumentTypeMismatchException.class})
    @ResponseStatus(value = HttpStatus.OK)
    public RestResponse handleException(final MethodArgumentTypeMismatchException ex,
                                        final WebRequest request) {
        final String error = ex.getName() + " должен иметь тип: " + ex.getRequiredType().getName();
        return new RestResponse<>(400, ErrorText.BAD_REQUEST, Collections.singletonList(error));
    }

    @Override
    public ResponseEntity<Object> handleHttpMessageNotReadable(final HttpMessageNotReadableException ex,
                                                               final HttpHeaders headers, final HttpStatus status,
                                                               final WebRequest request) {
        RestResponse<Object> response = new RestResponse<>(400, ErrorText.BAD_REQUEST,
                Collections.singletonList(ErrorText.EMPTY_QUERY));
        return new ResponseEntity<>(response, new HttpHeaders(), HttpStatus.OK);
    }

    @ExceptionHandler({ConstraintViolationException.class})
    @ResponseStatus(value = HttpStatus.OK)
    public RestResponse handleException(final ConstraintViolationException ex, final WebRequest request) {
        final List<String> errors = ex.getConstraintViolations().stream().map(violation ->
                violation.getRootBeanClass()
                        .getName() + " " + violation.getPropertyPath() + ": " + violation.getMessage())
                .collect(Collectors.toList());
        return new RestResponse<>(400, ErrorText.BAD_REQUEST, errors);
    }

    // 404
    @Override
    protected ResponseEntity<Object> handleNoHandlerFoundException(final NoHandlerFoundException ex,
                                                                   final HttpHeaders headers, final HttpStatus status,
                                                                   final WebRequest request) {
        final String error = "Не найден обработчик для:  " + ex.getHttpMethod() + " " + ex.getRequestURL();
        RestResponse<String> response = new RestResponse<>(400, ErrorText.BAD_REQUEST, Collections.singletonList(error));
        return new ResponseEntity<>(response, new HttpHeaders(), HttpStatus.OK);
    }

    // 405
    @Override
    protected ResponseEntity<Object> handleHttpRequestMethodNotSupported(final HttpRequestMethodNotSupportedException ex,
                                                                         final HttpHeaders headers,
                                                                         final HttpStatus status,
                                                                         final WebRequest request) {
        final StringBuilder builder = new StringBuilder();
        builder.append(ex.getMethod());
        builder.append(" method is not supported for this request. Supported methods are ");
        ex.getSupportedHttpMethods().forEach(t -> builder.append(t).append(" "));
        RestResponse<String> response = new RestResponse<>(400, ErrorText.BAD_REQUEST,
                Collections.singletonList(builder.toString()));
        return new ResponseEntity<>(response, new HttpHeaders(), HttpStatus.OK);
    }

    // 415
    @Override
    protected ResponseEntity<Object> handleHttpMediaTypeNotSupported(final HttpMediaTypeNotSupportedException ex,
                                                                     final HttpHeaders headers, final HttpStatus status,
                                                                     final WebRequest request) {
        final StringBuilder builder = new StringBuilder();
        builder.append(ex.getContentType());
        builder.append(" media type is not supported. Supported media types are ");
        ex.getSupportedMediaTypes().forEach(t -> builder.append(t).append(" "));
        RestResponse<String> response = new RestResponse<>(400, ErrorText.BAD_REQUEST,
                Collections.singletonList(builder.toString()));
        return new ResponseEntity<>(response, new HttpHeaders(), HttpStatus.OK);
    }

    // 500
    @ExceptionHandler({Exception.class})
    @ResponseStatus(value = HttpStatus.OK)
    protected RestResponse handleException(Exception exception) {
        LOGGER.warn(exception.getMessage(), exception);
        return new RestResponse<>(500, ErrorText.SERVER_EXCEPTION);
    }
}
