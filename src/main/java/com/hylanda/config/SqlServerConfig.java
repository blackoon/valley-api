package com.hylanda.config;  

import java.sql.SQLException;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;

import com.alibaba.druid.pool.DruidDataSource;

/** 
 * @author zhangy
 * @E-mail:blackoon88@gmail.com 
 * @version 创建时间：2017年12月26日 上午10:07:53 
 * note
 */
@Configuration
public class SqlServerConfig {

	private int initialSize=10;
	private String dbType="sqlserver";
	private int minIdle=5;
	private int maxActive=20;
	private int maxWait=60000;
	private int timeBetweenEvictionRunsMillis=60000;
	private int minEvictableIdleTimeMillis=300000;
	private String validationQuery="SELECT 'x'";
	private boolean testWhileIdle=true;
	private boolean testOnBorrow=false;
	private boolean testOnReturn=false;
	private boolean poolPreparedStatements=true;
	private int maxPoolPreparedStatementPerConnectionSize=20;
	private String filters="stat";
	private String driverClass="com.microsoft.sqlserver.jdbc.SQLServerDriver";
	private String jdbcUrl="jdbc:sqlserver://localhost:1433;DatabaseName=xzdata";
	private String username="sa";
	private String password="hylanda";
	
	@Bean("sqlserverDataSource")
	public DruidDataSource sqlserverDatasource(){
		DruidDataSource druidDataSource=new DruidDataSource();
		druidDataSource.setInitialSize(initialSize);
		druidDataSource.setDbType(dbType);
		druidDataSource.setMinIdle(minIdle);
		druidDataSource.setMaxActive(maxActive);
		druidDataSource.setMaxWait(maxWait);
		druidDataSource.setTimeBetweenEvictionRunsMillis(timeBetweenEvictionRunsMillis);
		druidDataSource.setMinEvictableIdleTimeMillis(minEvictableIdleTimeMillis);
		druidDataSource.setValidationQuery(validationQuery);
		druidDataSource.setTestWhileIdle(testWhileIdle);
		druidDataSource.setTestOnBorrow(testOnBorrow);
		druidDataSource.setTestOnReturn(testOnReturn);
		druidDataSource.setPoolPreparedStatements(poolPreparedStatements);
		druidDataSource.setMaxPoolPreparedStatementPerConnectionSize(maxPoolPreparedStatementPerConnectionSize);
		try {
			druidDataSource.setFilters(filters);
		} catch (SQLException e) {
			e.printStackTrace();
		}
		druidDataSource.setDriverClassName(driverClass);
		druidDataSource.setUrl(jdbcUrl);
		druidDataSource.setUsername(username);
		druidDataSource.setPassword(password);
		return druidDataSource;
	}
	@Bean("sqlseverJdbcTemplate")
	public JdbcTemplate sqlseverJdbcTemplate(){
		JdbcTemplate JdbcTemplate=new JdbcTemplate(sqlserverDatasource());
		return JdbcTemplate;
	}
}
  