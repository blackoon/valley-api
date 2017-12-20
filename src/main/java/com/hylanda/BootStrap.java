package com.hylanda;

import org.springframework.boot.Banner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/** 
 * @author zhangy
 * @E-mail:blackoon88@gmail.com 
 * @qq:846579287
 * @version created at：2017年10月19日 上午11:24:04 
 * note
 */
@SpringBootApplication
public class BootStrap {
	public static void main(String[] args) {
		/**
         * 隐藏banner启动方式
         */
		
        SpringApplication springApplication = new SpringApplication(BootStrap.class);
        //设置banner的模式为隐藏
        springApplication.setBannerMode(Banner.Mode.OFF);
        //启动springboot应用程序
        springApplication.run(args);
        //原启动方式
        /*SpringApplication.run(BootStrap.class, args);*/
	}
}
