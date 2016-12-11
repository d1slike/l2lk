package ru.disdev;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.jdbc.core.JdbcTemplate;

import javax.sql.DataSource;

@SpringBootApplication
public class L2LKApplication {
	public static void main(String[] args) {
		SpringApplication.run(L2LKApplication.class, args);
	}

	@Bean
	protected DataSource gameServerDataSource() {
		return new HikariDataSource(new HikariConfig("/gs_data_source.properties"));
	}

	@Bean
	protected JdbcTemplate gsTemplate() {
		return new JdbcTemplate(gameServerDataSource());
	}
}
