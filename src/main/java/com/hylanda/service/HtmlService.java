package com.hylanda.service;  

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.apache.http.client.CredentialsProvider;
import org.apache.http.client.protocol.HttpClientContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.hylanda.common.HttpClientUtils;

/** 
 * @author zhangy
 * @E-mail:blackoon88@gmail.com 
 * @version 创建时间：2017年12月7日 下午5:39:52 
 * note
 */
@Component
public class HtmlService {
	@Autowired
	private HttpClientUtils httpClientUtils;
	
	private String hostname = "192.168.16.96";
	private int port = 80;
	private String scheme = "http";
	public String getPowerbiHtml(String uri) {
		CredentialsProvider credentialsProvider = httpClientUtils.getCredentialsProvider();
		HttpClientContext httpClientContext = httpClientUtils.getHttpClientContext(credentialsProvider);
		Map<String, String> headParams = new HashMap<String, String>();
		headParams.put("Content-Type", "application/json;charset=UTF-8");
		String response=null;
		try {
			response = httpClientUtils.httpGet(this.hostname, this.port, this.scheme, uri, headParams, httpClientContext);
		} catch (IOException e) {
			e.printStackTrace();
		}
		return response;
	}

}
  