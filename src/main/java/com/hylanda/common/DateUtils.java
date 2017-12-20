package com.hylanda.common;  

import java.util.Calendar;
import java.util.Date;

import org.joda.time.DateTime;
import org.joda.time.format.DateTimeFormat;
import org.joda.time.format.DateTimeFormatter;

/** 
 * @author zhangy
 * @E-mail:blackoon88@gmail.com 
 * @version 创建时间：2017年12月8日 上午11:40:11 
 * note
 */
public class DateUtils {
	/**
	 * 近十天数据
	 * 
	 * @param dataStr
	 * @return
	 * @throws ParseException
	 *             return true 不是近10天数据
	 */
	private static final DateTimeFormatter format = DateTimeFormat.forPattern("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
	public static final DateTimeFormatter format1 = DateTimeFormat.forPattern("yyyy-MM-dd HH:mm:ss"); 
	public static final DateTimeFormatter format2 = DateTimeFormat.forPattern("yyyyMMdd");
	public static final DateTimeFormatter format3 = DateTimeFormat.forPattern("yyyy-MM-dd");
	
	
	

	public static  DateTime isValidDate(String date) {
		DateTime datetime=null;
		try{
			datetime=DateTime.parse(date, format2);
		}catch(IllegalArgumentException e){
			datetime=null;
		}
		return datetime;
	}
	
	/**
	 * Date to String
	 * 
	 * @param staDate
	 * @return
	 */
	public static String Date2Str(Date date) {
		if(date==null) return null;
		DateTime datetime=new DateTime(date);
		return  datetime.toString(format1);
	}
	/**
	 * yyyy-MM-dd
	 * @param date
	 * @return
	 */
	public static String Date2Str2(Date date) {
		DateTime datetime=new DateTime(date);
		return  datetime.toString(format3);
	}
	
	public static String Date2Str3(Date date) {
		DateTime datetime=new DateTime(date);
		return  datetime.toString(format2);
	}
	/**
	 * 格式化日期
	 * 
	 * @param date
	 * @param formatStr
	 * @return
	 */
	public static String formatDate(Date date, DateTimeFormatter format3) {
		return new DateTime(date.getTime()).toString(format3);
	}
	
	public static Date str2Date(String date, DateTimeFormatter format3) {
		return DateTime.parse(date, format3).toDate();
	}

	
	

	public static DateTime jodaTime(String str){
		DateTime datetime=DateTime.parse(str, format);
		datetime=datetime.plusHours(8);
		return  datetime;
	}
	public static String longtoString(long time){
		DateTime dateTime = new DateTime(time);
		return dateTime.toString(format1);  
	}
	
	
	/**
	 * 判断时间差是否在一小时内
	 * @param date
	 * @return
	 */
	public static  boolean checkTimeOnehour(Date date) {
		int min_1 = (int) (date.getTime()/(1000*60));
		int min_2 = (int) (System.currentTimeMillis()/(1000*60));
		int n = (min_2 -min_1);
		return n > 60;
	}
	
	/**
	 * 近十天数据
	 * 
	 * @param dataStr
	 * @return
	 */
	public static boolean checkTimeTenDay(Date date) {
		int day_1 = (int) (date.getTime()/(1000*60*60*24));
		int day_2 = (int) (System.currentTimeMillis()/(1000*60*60*24));
		int n = (day_2 -day_1);
		return n > 10;
	}
	
	public static boolean checkTime30Day(Date date) {
		int day_1 = (int) (date.getTime()/(1000*60*60*24));
		int day_2 = (int) (System.currentTimeMillis()/(1000*60*60*24));
		int n = (day_2 -day_1);
		return n > 30;
	}
	
	/**
	 * 计算下次执行时间
	 * @param startTime
	 * @param span
	 * @return
	 */
	public static String getNextExeTime(String startTime, int span) {
		DateTime dateTime=DateTime.parse(startTime, format1);
		dateTime=dateTime.plusMinutes(span);
		return dateTime.toString(format1);
	}
	
	/**
	 * 获取若干天前日期
	 * @param date
	 * 		参数: 日期
	 * @param day
	 * 		参数 : 天数
	 * @return
	 */
	public static Date getDateBefore(Date date, int day) {
		  Calendar now = Calendar.getInstance();
		  now.setTime(date);
		  now.set(Calendar.DATE, now.get(Calendar.DATE) - day);
		  return now.getTime();
		 }
}
  