package ru.disdev;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.jdbc.core.JdbcTemplate;
import ru.disdev.dao.AccountDAO;
import ru.disdev.dao.L2FAccountDAO;
import ru.disdev.entity.DAOAccessor;
import ru.disdev.entity.ServerProfile;

import javax.sql.DataSource;

@SpringBootApplication(exclude = DataSourceAutoConfiguration.class)
public class L2LKApplication {
    public static void main(String[] args) {
        SpringApplication.run(L2LKApplication.class, args);
    }

    @Bean
    protected AccountDAO accountDAO(
            @Value("${data.server.profile}") ServerProfile profile) {
        switch (profile) {
            case L2F:
                return new L2FAccountDAO();
            default:
                return new L2FAccountDAO();
        }
    }

    @Bean
    protected DAOAccessor daoAccessor(
            @Value("${data.separated.login.server}") boolean separatedLs) {
        HikariConfig gsConfig = new HikariConfig("/gs_data_source.properties");
        DataSource gsDataSource = new HikariDataSource(gsConfig);
        if (separatedLs) {
            HikariConfig lsConfig = new HikariConfig("/ls_data_source.properties");
            DataSource lsDataSource = new HikariDataSource(lsConfig);
            return new DAOAccessor(new JdbcTemplate(lsDataSource), new JdbcTemplate(gsDataSource));
        }
        return new DAOAccessor(new JdbcTemplate(gsDataSource), new JdbcTemplate(gsDataSource));
    }
}
