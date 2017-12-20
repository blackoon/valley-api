package com.hylanda.entity;

import com.alibaba.fastjson.annotation.JSONField;

/** 
 * @author zhangy
 * @E-mail:blackoon88@gmail.com 
 * @qq:846579287
 * @version created at：2017年12月1日 下午3:32:36 
 * note
 */
public class Item {
	
	
	private String Content;
	private String Path;
	
	private String Name;
	
	private String ContentType;
	
	@JSONField(name="Content")
	public String getContent() {
		return Content;
	}
	public void setContent(String content) {
		Content = content;
	}
	@JSONField(name="Path")
	public String getPath() {
		return Path;
	}
	public void setPath(String path) {
		Path = path;
	}
	@JSONField(name="Name")
	public String getName() {
		return Name;
	}
	public void setName(String name) {
		Name = name;
	}
	@JSONField(name="ContentType")
	public String getContentType() {
		return ContentType;
	}
	public void setContentType(String contentType) {
		ContentType = contentType;
	}
	
	
}
