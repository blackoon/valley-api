package com.hylanda.common;  

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import java.util.Date;
import java.util.UUID;

/** 
 * @author zhangy
 * @E-mail:blackoon88@gmail.com 
 * @version 创建时间：2017年12月7日 上午10:14:18 
 * note
 */
public class JwtTokenUtils {
	/**
	 * 创建新token
	 * 
	 * @param appId
	 * @return
	 */
	public static String createNewToken(String appId) {
		// 获取当前时间
		Date now = new Date(System.currentTimeMillis());
		// 过期时间
		Date expiration = new Date(now.getTime() + 7200000 * 12 * 365 * 10);// 10年后过期
		return Jwts
				.builder()
				.setSubject(appId)
				// .claim(YAuthConstants.Y_AUTH_ROLES, userDbInfo.getRoles())
				.setIssuedAt(now).setIssuer("Online YAuth Builder")
				.setExpiration(expiration)
				.signWith(SignatureAlgorithm.HS256, "valleyAuthv1.0.0")
				.compact();
	}

	public static void main(String[] args) {
		System.out.println(UUID.randomUUID().toString().replaceAll("-", ""));
		System.out.println(createNewToken("70522f9206ea47cfb29e1a70bce21209"));
	}
}
  