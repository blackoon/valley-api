package com.hylanda.entity;

import com.alibaba.fastjson.annotation.JSONField;

/** 
 * @author zhangy
 * @E-mail:blackoon88@gmail.com 
 * @qq:846579287
 * @version created at：2017年12月1日 下午4:24:56 
 * note
 */
public class CredentialsInServer {
	@JSONField(name="UserName")
	 private String UserName;
	@JSONField(name="Password")
	 private String Password;
	@JSONField(name="UseAsWindowsCredentials")
	 private boolean UseAsWindowsCredentials;
	@JSONField(name="ImpersonateAuthenticatedUser")
	 private boolean ImpersonateAuthenticatedUser;
	public String getUserName() {
		return UserName;
	}
	public void setUserName(String userName) {
		UserName = userName;
	}
	public String getPassword() {
		return Password;
	}
	public void setPassword(String password) {
		Password = password;
	}
	public boolean isUseAsWindowsCredentials() {
		return UseAsWindowsCredentials;
	}
	public void setUseAsWindowsCredentials(boolean useAsWindowsCredentials) {
		UseAsWindowsCredentials = useAsWindowsCredentials;
	}
	public boolean isImpersonateAuthenticatedUser() {
		return ImpersonateAuthenticatedUser;
	}
	public void setImpersonateAuthenticatedUser(boolean impersonateAuthenticatedUser) {
		ImpersonateAuthenticatedUser = impersonateAuthenticatedUser;
	}
	 
	 
}
