package com.hylanda.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

/** 
 * @author zhangy
 * @E-mail:blackoon88@gmail.com 
 * @qq:846579287
 * @version created at：2017年11月15日 下午3:29:15 
 * note
 */
@Configuration
public class MyInterceptorConfiguration extends WebMvcConfigurerAdapter{
	@Override
    public void addInterceptors(InterceptorRegistry registry) {
//        registry.addInterceptor(new JwtTokenInterceptor()).addPathPatterns("/api/**");
        registry.addInterceptor(new ReportInterceptor()).addPathPatterns(new String[]{"/reports/**","/powerbi/**"});
    }
}
