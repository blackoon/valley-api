package com.hylanda.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureException;
import java.io.PrintWriter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;
import com.hylanda.entity.dict.Account;

/** 
 * @author zhangy
 * @E-mail:blackoon88@gmail.com 
 * @qq:846579287
 * @version created at：2017年11月15日 下午3:31:20 
 * note
 */
@Component
public class JwtTokenInterceptor implements HandlerInterceptor{
	
	/**
     * 请求之前
     * @param request 请求对象
     * @param response 返回对象
     * @param o
     * @return
     * @throws Exception
     */
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object o) throws Exception {

        //自动排除生成token的路径,并且如果是options请求是cors跨域预请求，设置allow对应头信息
        if(request.getRequestURI().equals("/token")||request.getRequestURI().equals("/api/download") || RequestMethod.OPTIONS.toString().equals(request.getMethod()))
        {
            return true;
        }

        //其他请求获取头信息
        final String authHeader = request.getHeader("X-YAuth-Token");
        try {
            //如果没有header信息
            if (authHeader == null || authHeader.trim() == "") {
                throw new SignatureException("not found X-YAuth-Token.");
            }
            //获取jwt实体对象接口实例
            final Claims claims = Jwts.parser().setSigningKey("valleyAuthv1.0.0").parseClaimsJws(authHeader).getBody();
            //从数据库中获取token
            String subject=claims.getSubject();
            String token=request.getParameter("appId");
            if(Account.nifi.name.equals(subject)&&Account.nifi.name.equals(token)){
            	
            	
            	return true;
            }else{
            	if(claims.getExpiration().getTime()<System.currentTimeMillis())
                	throw new SignatureException(("X-YAuth-Token expired."));
            	else
            		throw new SignatureException("not found X-YAuth-Token.");
            }
            
            
        }
        //验证异常处理
        catch (SignatureException | ExpiredJwtException e)
        {
            //输出对象
            PrintWriter writer = response.getWriter();
            //输出error消息
            writer.write(e.getMessage());
            writer.close();
            return false;
        }
        //出现异常时
        catch (final Exception e)
        {
            //输出对象
            PrintWriter writer = response.getWriter();
            //输出error消息
            writer.write(e.getMessage());
            writer.close();
            return false;
        }
    }

    @Override
    public void postHandle(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o, ModelAndView modelAndView) throws Exception {

    }

    @Override
    public void afterCompletion(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o, Exception e) throws Exception {

    }
}
