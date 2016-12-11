package ru.disdev.utils;

public class ErrorText {
    public static final String NOT_UNIQUE_FIELD = "Значение: \"%s\" не уникально";
    public static final String SORT_DIRECTION_ERROR = "Направление сортировки может принимать одно из следующих значений [ASC, DESC], получено: ";
    public static final String ID_FORMAT_ERROR = "Переданный идентификатор не корректен";
    public static final String VALIDATION_ERROR = "Ошибка при валидации запроса";
    public static final String BAD_REQUEST = "Ошибка в запросе";
    public static final String EMPTY_FIELD = "Поле обязательно для заполнения";
    public static final String EMPTY_QUERY = "Пустой запрос";
    public static final String NOT_FOUND = "Запись не найдена";
    public static final String SUB_URL_ERROR = "Связанный урл должен начинаться с урла основной записи";
    public static final String SERVER_EXCEPTION = "Сервер временно недоступен. Пожалуйста попробуйте позже";
    public static final String DATE_FORMAT_ERROR = "Дата имеет неверный формат, ожидаетя: yyyy-MM-dd HH:mm:ss";
}
