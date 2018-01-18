package com.hylanda.entity;

import com.alibaba.fastjson.JSONObject;

/** 
 * @author zhangy
 * @E-mail:blackoon88@gmail.com 
 * @qq:846579287
 * @version created at：2017年12月1日 下午4:38:19 
 * note
 */
public class ApiResponse {
	private String info;
	private JSONObject data;
	private String status;
	
	public  ApiResponse() {
		this.info="调用接口成功";
		this.status="success";
	}
	public ApiResponse(String info){
		this.info=info;
		this.status="success";
	}
	public ApiResponse(String info,String status){
		this.info=info;
		this.status=status;
	}
	public String getInfo() {
		return info;
	}

	public void setInfo(String info) {
		this.info = info;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
	public JSONObject getData() {
		return data;
	}
	public void setData(JSONObject data) {
		this.data = data;
	}
	
	
}
