package com.hylanda.config;  

import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.IOUtils;
import org.apache.http.client.CredentialsProvider;
import org.apache.http.client.protocol.HttpClientContext;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.StringEntity;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.BeanFactory;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.context.support.WebApplicationContextUtils;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import com.alibaba.fastjson.JSONObject;
import com.hylanda.common.DateUtils;
import com.hylanda.common.HttpClientUtils;
import com.hylanda.common.RequestUtils;

/** 
 * @author zhangy
 * @E-mail:blackoon88@gmail.com 
 * @version 创建时间：2017年12月8日 上午9:52:26 
 * note
 */
@Component
public class ReportInterceptor implements HandlerInterceptor{
//	@Autowired
//	private HttpClientUtils httpClientUtils;//在拦截器无法通过springbean的方式注入，可以使用请求对象的上下文 
	 //请求日志实体标识
    private static final String LOGGER_ENTITY = "_logger_entity";
    private static Logger logger = LoggerFactory.getLogger("request_log");
    
    private <T> T getBean(Class<T> clazz,HttpServletRequest request){
    	BeanFactory factory=WebApplicationContextUtils.getRequiredWebApplicationContext(request.getServletContext());
    	return factory.getBean(clazz);
    }
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response,
			Object handler) throws Exception {
		preRequestLog(request);
		StringBuilder uri=new StringBuilder();
		uri.append(request.getRequestURI());
		if(!StringUtils.isEmpty(request.getQueryString())){
			uri.append("?").append(request.getQueryString());
		}
		Map<String, String> headParams = new HashMap<String, String>();
		if(request.getHeader("Accept")!=null)
			headParams.put("Accept", request.getHeader("Accept"));
		if(request.getHeader("Accept-Encoding")!=null)
			headParams.put("Accept-Encoding", request.getHeader("Accept-Encoding"));
		if(request.getHeader("Accept-Language")!=null)
			headParams.put("Accept-Language", request.getHeader("Accept-Language"));
		if(request.getHeader("Content-Type")!=null)
			headParams.put("Content-Type", request.getHeader("Content-Type"));
		if(request.getHeader("Connection")!=null)
			headParams.put("Connection", "keep-alive".equals(request.getHeader("Connection"))?"Keep-Alive":request.getHeader("Connection"));
		if(request.getHeader("User-Agent")!=null)
			headParams.put("User-Agent", request.getHeader("User-Agent"));
		if(request.getHeader("Cookie")!=null&&!"null".equals(request.getHeader("Cookie"))){
			headParams.put("Cookie", request.getHeader("Cookie"));
		}
		if(request.getHeader("Referer")!=null&&!"null".equals(request.getHeader("Referer"))){
			headParams.put("Referer", request.getHeader("Referer"));
			System.out.println(request.getHeader("Referer"));
		}
//		Enumeration<String> itrator= request.getHeaderNames();
//		while(itrator.hasMoreElements()){
//			String e=itrator.nextElement();
//			if(!"Content-Length".equals(e)&&!"content-length".equals(e))
//				if("Host".equals(e)||"host".equals(e)){
//					headParams.put(e,request.getHeader(e).replaceAll(":8080", ""));
//				}else if("Origin".equals(e)||"origin".equals(e)){
//					headParams.put(e,request.getHeader(e).replaceAll(":8080", ""));
//				}else if("Referer".equals(e)||"referer".equals(e)){
//					headParams.put(e,request.getHeader(e).replaceAll(":8080", ""));
//				}else{
//					headParams.put(e,request.getHeader(e));
//				}
//		}
		if(request.getHeader("Accept-Encoding")==null)
			headParams.put("Accept-Encoding", "gzip, deflate, sdch");
		if(request.getHeader("Accept-Language")==null)
			headParams.put("Accept-Language", "Accept-Language:zh-CN,zh;q=0.8");
		
		int code=0;
		JSONObject res =new JSONObject();
		HttpClientUtils httpClientUtils=getBean(HttpClientUtils.class, request);
		CredentialsProvider credentialsProvider = httpClientUtils.getCredentialsProvider();
		HttpClientContext httpClientContext = httpClientUtils.getHttpClientContext(credentialsProvider);
			
//		System.out.println("111"+request.getHeader("enctype"));
		String content=IOUtils.toString(request.getInputStream(),"utf-8");
		StringEntity entitys = null;
		if(!StringUtils.isEmpty(content)){
			entitys=new StringEntity(content,ContentType.APPLICATION_JSON);
			entitys.setContentType("application/json;charset=UTF-8");
		}
		httpClientUtils.httpProxy(uri.toString(),request.getMethod(),headParams,entitys,httpClientContext,res,response,false);
		//打出日志
		code =res.getIntValue("code");
			 //输出对象
	        PrintWriter writer=null;
			try {
				if(res.getString("content-Encoding")!=null)
					response.addHeader("Content-Encoding", res.getString("content-Encoding"));
					response.setContentType(res.getString("content-type"));//"text/html; charset=utf-8"
					writer = response.getWriter();
//				if(uri.toString().contains("/powerbi/?id=")){
//					String rescontent=res.getString("content");
//					rescontent=rescontent.replaceFirst("", "");
//					writer.write(rescontent);
//				}else 
					writer.write(res.getString("content"));
			} catch (IOException e) {
				e.printStackTrace();
			}finally{
				if(writer!=null)
				 writer.close();
			}
		
		request.setAttribute("proxyResponseStatus", code);
		return false;
	}

	private void preRequestLog(HttpServletRequest request) {
		JSONObject logger = new JSONObject();
        //获取请求sessionId
        String sessionId = request.getRequestedSessionId();
        //请求路径
        String url = request.getRequestURI();
        //获取请求参数信息
//        String paramData = JSON.toJSONString(request.getParameterMap(),SerializerFeature.DisableCircularReferenceDetect,SerializerFeature.WriteMapNullValue);
        //设置客户端ip
        logger.put("ClientIp",RequestUtils.getCliectIp(request));
        //设置请求方法
        logger.put("request_method",request.getMethod());
        //设置请求类型(json|普通请求)
//        logger.put("type",RequestUtils.getRequestType(request));
        //设置请求参数内容json字符串
//        logger.put("paramData",paramData);
        //设置请求地址
        logger.put("uri",url);
        //设置sessionId
        logger.put("sessionId",sessionId);
        //设置请求开始时间
        logger.put("sendTime",System.currentTimeMillis());
        //设置请求实体到request内，方面afterCompletion方法调用
        request.setAttribute(LOGGER_ENTITY,logger);
	}
	
	@Override
	public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception arg3)
			throws Exception {
		
		 //获取请求码
//        int status = response.getStatus(); 使用代理请求后返回状态
        //当前时间
        long currentTime = System.currentTimeMillis();
        //获取本次请求日志实体
        JSONObject loggerEntity = (JSONObject) request.getAttribute(LOGGER_ENTITY);
        //请求开始时间
        long time = loggerEntity.getLongValue("sendTime");
        //设置请求时间差
        long timeConsuming=currentTime - time;
        //打出日志
        //127.0.0.1 -  -  [2017-09-04 19:05:12,538] "POST http://s.wisdom.www.sogou.com/sugg?ifc=4&em=4 HTTP/1.1" 500 4769  16 16
        StringBuilder losb=new StringBuilder();
        losb.append(loggerEntity.getString("ClientIp")).append(" -  -  [");
        losb.append(DateUtils.longtoString(loggerEntity.getLongValue(("sendTime")))).append("] '").append(loggerEntity.getString("request_method"));
        losb.append(" ").append(loggerEntity.getString("uri")).append("' ").append(request.getAttribute("proxyResponseStatus")).append(" ").append(timeConsuming);
        logger.info(losb.toString());
        loggerEntity=null;
	}

	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response,
			Object handler, ModelAndView arg3) throws Exception {
		
	}

	

}
  