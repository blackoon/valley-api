package com.hylanda.entity;  

import com.alibaba.fastjson.annotation.JSONField;

/** 
 * @author zhangy
 * @E-mail:blackoon88@gmail.com 
 * @version 创建时间：2017年12月13日 上午11:05:42 
 * note
 */
public class ConnectionString {
//data source=l6xxc5w2m8.database.chinacloudapi.cn;
	//initial catalog=xzdata;persist security info=True;encrypt=True;trustservercertificate=False
	private String data_source;
	private String initial_catalog;
//	private boolean persist_security_info;
//	private boolean encrypt;
//	private boolean trustservercertificate;
	@JSONField(name="data source")
	public String getData_source() {
		return data_source;
	}
	public void setData_source(String data_source) {
		this.data_source = data_source;
	}
	@JSONField(name="initial catalog")
	public String getInitial_catalog() {
		return initial_catalog;
	}
	public void setInitial_catalog(String initial_catalog) {
		this.initial_catalog = initial_catalog;
	}
//	@JSONField(name="persist security info")
//	public boolean isPersist_security_info() {
//		return persist_security_info;
//	}
//	public void setPersist_security_info(boolean persist_security_info) {
//		this.persist_security_info = persist_security_info;
//	}
//	@JSONField(name="encrypt")
//	public boolean isEncrypt() {
//		return encrypt;
//	}
//	public void setEncrypt(boolean encrypt) {
//		this.encrypt = encrypt;
//	}
//	@JSONField(name="trustservercertificate")
//	public boolean isTrustservercertificate() {
//		return trustservercertificate;
//	}
//	public void setTrustservercertificate(boolean trustservercertificate) {
//		this.trustservercertificate = trustservercertificate;
//	}
	
	
}
  