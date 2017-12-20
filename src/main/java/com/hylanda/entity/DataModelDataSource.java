package com.hylanda.entity;

import com.alibaba.fastjson.annotation.JSONField;

/** 
 * @author zhangy
 * @E-mail:blackoon88@gmail.com 
 * @qq:846579287
 * @version created at：2017年12月1日 下午4:24:41 
 * note
 */
public class DataModelDataSource {
	@JSONField(name="Type")
	private String Type;
	@JSONField(name="Kind")
    private String Kind;
	@JSONField(name="AuthType")
    private String AuthType;
	@JSONField(name="UserName")
    private String Username;
	@JSONField(name="Secret")
    private String Secret;
	@JSONField(name="ModelConnectionName")
    private String ModelConnectionName;
	public String getType() {
		return Type;
	}
	public void setType(String type) {
		Type = type;
	}
	public String getKind() {
		return Kind;
	}
	public void setKind(String kind) {
		Kind = kind;
	}
	public String getAuthType() {
		return AuthType;
	}
	public void setAuthType(String authType) {
		AuthType = authType;
	}
	public String getUsername() {
		return Username;
	}
	public void setUsername(String username) {
		Username = username;
	}
	public String getSecret() {
		return Secret;
	}
	public void setSecret(String secret) {
		Secret = secret;
	}
	public String getModelConnectionName() {
		return ModelConnectionName;
	}
	public void setModelConnectionName(String modelConnectionName) {
		ModelConnectionName = modelConnectionName;
	}
    
    
}
