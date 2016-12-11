package ru.disdev.entity;

import org.springframework.jdbc.core.JdbcTemplate;

public class DAOAccessor {
    private final JdbcTemplate loginServerTemplate;
    private final JdbcTemplate gameServerTemplate;

    public DAOAccessor(JdbcTemplate loginServerTemplate, JdbcTemplate gameServerTemplate) {
        this.loginServerTemplate = loginServerTemplate;
        this.gameServerTemplate = gameServerTemplate;
    }

    public JdbcTemplate getLoginServerTemplate() {
        return loginServerTemplate;
    }

    public JdbcTemplate getGameServerTemplate() {
        return gameServerTemplate;
    }
}
