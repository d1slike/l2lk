package ru.disdev.dao;

import org.springframework.beans.factory.annotation.Autowired;
import ru.disdev.entity.DAOAccessor;

public class L2FAccountDAO implements AccountDAO {

    @Autowired
    private DAOAccessor accessor;
}
