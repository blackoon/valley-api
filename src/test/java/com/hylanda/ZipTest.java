package com.hylanda;  

import java.io.File;
import java.io.IOException;

import org.apache.commons.io.IOUtils;

/** 
 * @author zhangy
 * @E-mail:blackoon88@gmail.com 
 * @version 创建时间：2017年12月14日 上午10:32:45 
 * note
 */
public class ZipTest {
	public static void main(String[] args) throws Exception {
		File file =new File("DataMashup");
		String content=IOUtils.toString(file.toURI());
		System.out.println(content);
	}
}
  