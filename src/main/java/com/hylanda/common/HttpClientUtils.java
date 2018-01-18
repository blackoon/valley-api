package com.hylanda.common;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.atomic.AtomicReference;
import javax.servlet.http.HttpServletResponse;
import org.apache.http.Header;
import org.apache.http.HttpEntity;
import org.apache.http.HttpHost;
import org.apache.http.HttpStatus;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.CredentialsProvider;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpDelete;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpHead;
import org.apache.http.client.methods.HttpOptions;
import org.apache.http.client.methods.HttpPatch;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.methods.HttpPut;
import org.apache.http.client.methods.HttpTrace;
import org.apache.http.client.protocol.HttpClientContext;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.BasicCredentialsProvider;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestMethod;

import com.alibaba.fastjson.JSONObject;


/** 
 * @author zhangy
 * @E-mail:blackoon88@gmail.com 
 * @qq:846579287
 * @version created at：2017年12月5日 下午4:00:02 
 * note
 */
@Component
public class HttpClientUtils {
	private final AtomicReference<CloseableHttpClient> httpClientAtomicReference = new AtomicReference<>();
	
	private String hostname = "localhost";
	private int port = 80;
	private String scheme = "http";
	
	
	public HttpClientUtils(){
		CloseableHttpClient httpclient = HttpClients.createDefault();
		httpClientAtomicReference.set(httpclient);
	}
	
	public RequestConfig getproxy(){
		 HttpHost proxy = new HttpHost("127.0.0.1", 8888, "http");  
	     RequestConfig config = RequestConfig.custom().setProxy(proxy).build();
	     return config;
	}
	public CredentialsProvider getCredentialsProvider(){
		CredentialsProvider credsProvider = new BasicCredentialsProvider();  
		credsProvider.setCredentials(org.apache.http.auth.AuthScope.ANY,new org.apache.http.auth.NTCredentials("hylanda", "hylanda", "HYP", "localhost"));  //192.168.16.96
		return credsProvider;
	}
	
	public HttpClientContext getHttpClientContext(CredentialsProvider credsProvider){
		//使用相同的上下文来执行逻辑相关的请求  
		HttpClientContext context = HttpClientContext.create();  
		context.setCredentialsProvider(credsProvider);
		return context;
	}
	public String  httpGetFile(String hostname,int port,String scheme,
			String uri, Map<String, String> headParams,
			HttpClientContext context,JSONObject res) throws ClientProtocolException, IOException {
		CloseableHttpClient httpclient = httpClientAtomicReference.get();
		HttpHost target = new HttpHost(hostname, port, scheme);  //"www.microsoft.com", 80, "http"
		//使用轻量级的请求来触发NTLM认证  
		HttpGet httpget = new HttpGet(uri); //"/ntlm-protected/info"
		if(headParams!=null){
		    for (Map.Entry<String, String> entry : headParams.entrySet()) {
		    	httpget.setHeader(entry.getKey(), entry.getValue());
			}
		}
		String is=null;
		CloseableHttpResponse response1 = httpclient.execute(target, httpget,context); 
		try {  
			HttpEntity httpEntity = response1.getEntity();
			Header[] headers=response1.getHeaders("Content-Disposition");
			if(headers!=null&&headers.length>0){
				res.put("Content-Disposition", headers[0].getValue());
			}
			String contentType=httpEntity.getContentType().getValue();
			res.put("contentType", contentType);
			is=EntityUtils.toString(httpEntity);
			EntityUtils.consume(httpEntity);
		} finally {  
		    try {
				response1.close();
			} catch (IOException e) {
				e.printStackTrace();
			}  
		}
		return is;
	}
	public String  httpGetAzureFile(
			String uri, Map<String, String> headParams,JSONObject res) throws ClientProtocolException, IOException {
		CloseableHttpClient httpclient = httpClientAtomicReference.get();
		HttpGet httpget = new HttpGet(uri);
		if(headParams!=null){
		    for (Map.Entry<String, String> entry : headParams.entrySet()) {
		    	httpget.setHeader(entry.getKey(), entry.getValue());
			}
		}
		String is=null;
		CloseableHttpResponse response1 = httpclient.execute(httpget);
		try {  
			HttpEntity httpEntity = response1.getEntity();
			Header[] headers=response1.getHeaders("Content-Disposition");
			if(headers!=null&&headers.length>0){
				res.put("Content-Disposition", headers[0].getValue());
			}
			String contentType=httpEntity.getContentType().getValue();
			res.put("contentType", contentType);
			is=EntityUtils.toString(httpEntity);
			EntityUtils.consume(httpEntity);
		} finally {  
		    try {
				response1.close();
			} catch (IOException e) {
				e.printStackTrace();
			}  
		}
		return is;
	}
	public String httpGet(String hostname,int port,String scheme,String uri,Map<String, String> headParams,HttpClientContext context) throws ClientProtocolException, IOException{
		CloseableHttpClient httpclient = httpClientAtomicReference.get();
		HttpHost target = new HttpHost(hostname, port, scheme);  //"www.microsoft.com", 80, "http"
		//使用轻量级的请求来触发NTLM认证  
		HttpGet httpget = new HttpGet(uri); //"/ntlm-protected/info"
		if(headParams!=null){
		    for (Map.Entry<String, String> entry : headParams.entrySet()) {
		    	httpget.setHeader(entry.getKey(), entry.getValue());
			}
		}
		CloseableHttpResponse response1 = httpclient.execute(target, httpget,context); 
//		httpclient.execute(httpget, context);
		
		try {  
		    if (response1.getStatusLine().getStatusCode() == HttpStatus.SC_OK) {
				HttpEntity httpEntity = response1.getEntity();
				String result=EntityUtils.toString(httpEntity);
				EntityUtils.consume(httpEntity);
				return result;
			}else{
				return EntityUtils.toString(response1.getEntity());
			}
		} finally {  
		    try {
				response1.close();
			} catch (IOException e) {
				e.printStackTrace();
			}  
		}
	}
	
	public String httpPost(String hostname, int port, String scheme, String uri,
			Map<String, String> headParams,
			HttpClientContext httpClientContext, HttpEntity entitys) throws Exception {
		CloseableHttpClient httpclient = httpClientAtomicReference.get();
		HttpHost target = new HttpHost(hostname, port, scheme); 
		//使用相同的上下文，执行重量级的方法  
		HttpPost httppost = new HttpPost(uri);  
		if(headParams!=null){
		    for (Map.Entry<String, String> entry : headParams.entrySet()) {
		    	httppost.setHeader(entry.getKey(), entry.getValue());
			}
		}
		httppost.setHeader("Accept", "application/json, text/plain, */*");
		httppost.setHeader("Accept-Encoding","gzip, deflate");
		httppost.setHeader("Connection","keep-alive");
		httppost.setEntity(entitys);  
		CloseableHttpResponse response2 = httpclient.execute(target, httppost,httpClientContext);
		
		try {  
		    if (response2.getStatusLine().getStatusCode() == HttpStatus.SC_OK) {
				HttpEntity responseHttpEntity = response2.getEntity();
				String result=EntityUtils.toString(responseHttpEntity);
				EntityUtils.consume(responseHttpEntity);
				return result;
			}else{
				HttpEntity responseHttpEntity = response2.getEntity();
				String result=EntityUtils.toString(responseHttpEntity);
				EntityUtils.consume(responseHttpEntity);
				return result+response2.getStatusLine().getStatusCode();
			}
		} finally {  
		    response2.close();  
		}  
		
	}
	
	public String httpPatch(String hostname, int port, String scheme, String uri,
			Map<String, String> headParams,
			HttpClientContext httpClientContext, StringEntity entitys) throws Exception {
		CloseableHttpClient httpclient = httpClientAtomicReference.get();
		HttpHost target = new HttpHost(hostname, port, scheme); 
		//使用相同的上下文，执行重量级的方法  
		HttpPatch httppatch = new HttpPatch(uri);  
		if(headParams!=null){
		    for (Map.Entry<String, String> entry : headParams.entrySet()) {
		    	httppatch.setHeader(entry.getKey(), entry.getValue());
			}
		}
		httppatch.setHeader("Accept", "application/json, text/plain, */*");
		httppatch.setHeader("Accept-Encoding","gzip, deflate");
		httppatch.setHeader("Connection","keep-alive");
		httppatch.setEntity(entitys);  
		CloseableHttpResponse response2 = httpclient.execute(target, httppatch,httpClientContext);  
		try {  
		    if (response2.getStatusLine().getStatusCode() == HttpStatus.SC_OK) {
				HttpEntity responseHttpEntity = response2.getEntity();
				String result=EntityUtils.toString(responseHttpEntity);
				EntityUtils.consume(responseHttpEntity);
				return result;
			}else{
				System.out.println("--------------code:"+response2.getStatusLine().getStatusCode());
				if(response2!=null&&response2.getEntity()!=null){
					String result=EntityUtils.toString(response2.getEntity());
					System.out.println(result);
				}
				return response2.toString();
			}
		} finally {  
		    response2.close();  
		}  
	}
	
	/**
	 * Request.Get("http://targethost/homepage").execute().returnContent();
	 * @param url
	 * @param headParams
	 * @return
	 */
	public String httpGet(String url,Map<String, String> headParams){
		HttpGet httpGet = new HttpGet(url);
		CloseableHttpResponse response=null;
		try {
			CloseableHttpClient httpclient=httpClientAtomicReference.get();
			for (Map.Entry<String, String> entry : headParams.entrySet()) {
				httpGet.setHeader(entry.getKey(), entry.getValue());
			}
			response=httpclient.execute(httpGet);
			if (response.getStatusLine().getStatusCode() == HttpStatus.SC_OK) {
				HttpEntity httpEntity = response.getEntity();
				String result=EntityUtils.toString(httpEntity);
				EntityUtils.consume(httpEntity);
				return result;
			}else{
				return response.toString();
			}
		} catch (IOException e) {
			e.printStackTrace();
		}finally{
			if(response!=null){
				try {
					response.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
			httpGet.releaseConnection();
		}
		return "error";
	}
	/**
	 * Request.Post("http://targethost/login")
    .bodyForm(Form.form().add("username",  "vip").add("password",  "secret").build())
    .execute().returnContent();
	 * @param url
	 * @param headParams
	 * @param httpEntity
	 * @return
	 */
	public String httpPost(String uri,Map<String, String> headParams,HttpEntity httpEntity){
		HttpPost httpPost = new HttpPost(uri);
		CloseableHttpResponse response=null;
		try {
			CloseableHttpClient httpclient=httpClientAtomicReference.get();
//		List <NameValuePair> nvps = new ArrayList <NameValuePair>();
//		nvps.add(new BasicNameValuePair("username", "vip"));
//		nvps.add(new BasicNameValuePair("password", "secret"));
//		httpPost.setEntity(new UrlEncodedFormEntity(nvps));
			httpPost.setEntity(httpEntity);
			response = httpclient.execute(httpPost);
			if (response.getStatusLine().getStatusCode() == HttpStatus.SC_OK) {
				HttpEntity entity = response.getEntity();
				String result=EntityUtils.toString(entity);
				EntityUtils.consume(entity);
				return result;
			}else{
				return response.toString();
			}
		} catch (IOException e) {
			e.printStackTrace();
		}finally{
			if(response!=null){
				try {
					response.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
			httpPost.releaseConnection();
		}
		return "error";
	}
	public static void main(String[] args) throws Exception {
//		HttpClientUtils httpClientUtils=new HttpClientUtils();
//		CredentialsProvider credentialsProvider=httpClientUtils.getCredentialsProvider();
//		Map<String, String> headParams=new HashMap<String, String>();
//		headParams.put("Content-Type", "application/json;charset=UTF-8");
//		String res=httpClientUtils.httpGet("192.168.16.96", 80, "http", "/reports/api/v2.0/CatalogItems(Path='/test')?&$expand=DataSources", headParams, credentialsProvider);
//		System.out.print("------------------------------"+res);
		System.out.println("http://loss.hjk?w={www}".replaceAll("\\{", "%7B").replaceAll("\\}", "%7D"));//%7B%7D
	}

	public String httpGet(String hostname, int port, String scheme,
			String uri, Map<String, String> headParams,
			CredentialsProvider credentialsProvider) throws Exception {
		CloseableHttpClient httpclient = httpClientAtomicReference.get();
		HttpHost target = new HttpHost(hostname, port, scheme);  //"www.microsoft.com", 80, "http"
		//使用轻量级的请求来触发NTLM认证  
		HttpGet httpget = new HttpGet(uri); //"/ntlm-protected/info"
		if(headParams!=null){
		    for (Map.Entry<String, String> entry : headParams.entrySet()) {
		    	httpget.setHeader(entry.getKey(), entry.getValue());
			}
		}
		CloseableHttpResponse response1 = httpclient.execute(target, httpget,getHttpClientContext(credentialsProvider)); 
//		httpclient.execute(httpget, context);
		
		try {  
		    if (response1.getStatusLine().getStatusCode() == HttpStatus.SC_OK) {
				HttpEntity httpEntity = response1.getEntity();
				String result=EntityUtils.toString(httpEntity);
				EntityUtils.consume(httpEntity);
				return result;
			}else{
				return response1.toString();
			}
		} finally {  
		    try {
				response1.close();
			} catch (IOException e) {
				e.printStackTrace();
			}  
		}
	}
	/**
	 * 多所有的请求类型做代理服务，主要是解决windows ntlm验证问题
	 * @param uri
	 * @param method
	 * @param headParams
	 * @param entitys
	 * @throws Exception 
	 */
	public void httpProxy(String uri, String method,
			Map<String, String> headParams, StringEntity entitys,
			HttpClientContext context,JSONObject res,HttpServletResponse direct_response,boolean isProxy) throws  Exception {
		
//		System.setProperty("http.proxyHost", "127.0.0.1"); 
//		System.setProperty("http.proxyPort", "8888"); 
//		System.setProperty("https.proxyHost", "127.0.0.1");
//		System.setProperty("https.proxyPort", "8888");
		
		
		CloseableHttpClient httpclient = httpClientAtomicReference.get();
		HttpHost target = new HttpHost(this.hostname, this.port, this.scheme);  //"www.microsoft.com", 80, "http"
		//使用轻量级的请求来触发NTLM认证  
		//转义
		uri=uri.replaceAll("\\{", "%7B").replaceAll("\\}", "%7D");
		
		
		
		if(RequestMethod.HEAD.toString().equals(method)){
			HttpHead httpHead =new HttpHead(uri);
			if(headParams!=null){
			    for (Map.Entry<String, String> entry : headParams.entrySet()) {
			    	httpHead.setHeader(entry.getKey(), entry.getValue());
				}
			}
			if(isProxy){
				httpHead.setConfig(getproxy());
			}
			
			CloseableHttpResponse response=null;
			try {  
				response = httpclient.execute(target, httpHead,context);
				int code=response.getStatusLine().getStatusCode();
				HttpEntity responseHttpEntity = response.getEntity();
				String result=EntityUtils.toString(responseHttpEntity);
				EntityUtils.consume(responseHttpEntity);
				res.put("content", result);
				res.put("code",code );
				
//				HeaderIterator iterator=response.headerIterator();
//				while(iterator.hasNext()){
//					Header header=iterator.nextHeader();
//					direct_response.addHeader(header.getName(), header.getValue());
//				}
				res.put("content-Encoding", response.getEntity().getContentEncoding()==null?null:response.getEntity().getContentEncoding().getValue());
				res.put("content-type", response.getEntity().getContentType()==null?"application/json; odata.metadata=minimal":response.getEntity().getContentType().getValue());
			}catch(Exception e){
				e.printStackTrace();
			}finally {  
				if(response!=null)
					response.close();  
			}  
		}else if(RequestMethod.GET.toString().equals(method)){
			HttpGet httpGet = new HttpGet(uri);
			if(headParams!=null){
			    for (Map.Entry<String, String> entry : headParams.entrySet()) {
			    	httpGet.setHeader(entry.getKey(), entry.getValue());
				}
			}
			if(isProxy){
				httpGet.setConfig(getproxy());
			}
			
			CloseableHttpResponse response=null;
			try {  
				response = httpclient.execute(target, httpGet,context);
				int code=response.getStatusLine().getStatusCode();
				HttpEntity responseHttpEntity = response.getEntity();
				String result=EntityUtils.toString(responseHttpEntity);
				EntityUtils.consume(responseHttpEntity);
				res.put("content", result);
				res.put("code",code );
//				HeaderIterator iterator=response.headerIterator();
//				while(iterator.hasNext()){
//					Header header=iterator.nextHeader();
//					direct_response.addHeader(header.getName(), header.getValue());
//				}
				res.put("content-Encoding", response.getEntity().getContentEncoding()==null?null:response.getEntity().getContentEncoding().getValue());
				res.put("content-type", response.getEntity().getContentType()==null?"application/json; odata.metadata=minimal":response.getEntity().getContentType().getValue());
			}catch(Exception e){
				e.printStackTrace();
			} finally {  
				if(response!=null)
					response.close();  
			}  
		}else if(RequestMethod.POST.toString().equals(method)){
			HttpPost httpPost=new HttpPost(uri);
			if(headParams!=null){
			    for (Map.Entry<String, String> entry : headParams.entrySet()) {
			    	httpPost.setHeader(entry.getKey(), entry.getValue());
				}
			}
			if(isProxy){
				httpPost.setConfig(getproxy());
			}
			if(entitys!=null){
				httpPost.setEntity(entitys);
			}
			CloseableHttpResponse response=null;
			try {  
				response = httpclient.execute(target, httpPost,context);
				int code=response.getStatusLine().getStatusCode();
				HttpEntity responseHttpEntity = response.getEntity();
				String result=EntityUtils.toString(responseHttpEntity);
				EntityUtils.consume(responseHttpEntity);
				res.put("content", result);
				res.put("code",code );
//				HeaderIterator iterator=response.headerIterator();
//				while(iterator.hasNext()){
//					Header header=iterator.nextHeader();
//					direct_response.addHeader(header.getName(), header.getValue());
//				}
				res.put("content-Encoding", response.getEntity().getContentEncoding()==null?null:response.getEntity().getContentEncoding().getValue());
				res.put("content-type", response.getEntity().getContentType()==null?"application/json; odata.metadata=minimal":response.getEntity().getContentType().getValue());
			}catch(Exception e){
				e.printStackTrace();
			} finally {  
				if(response!=null)
					response.close();  
			}  
		}else if(RequestMethod.OPTIONS.toString().equals(method)){
			HttpOptions httpOptions=new HttpOptions(uri);
			if(headParams!=null){
			    for (Map.Entry<String, String> entry : headParams.entrySet()) {
			    	httpOptions.setHeader(entry.getKey(), entry.getValue());
				}
			}
			if(isProxy){
				httpOptions.setConfig(getproxy());
			}
			CloseableHttpResponse response=null;
			try {  
				response = httpclient.execute(target, httpOptions,context);
				int code=response.getStatusLine().getStatusCode();
				HttpEntity responseHttpEntity = response.getEntity();
				String result=EntityUtils.toString(responseHttpEntity);
				EntityUtils.consume(responseHttpEntity);
				res.put("content", result);
				res.put("code",code );
//				HeaderIterator iterator=response.headerIterator();
//				while(iterator.hasNext()){
//					Header header=iterator.nextHeader();
//					direct_response.addHeader(header.getName(), header.getValue());
//				}
				res.put("content-Encoding", response.getEntity().getContentEncoding()==null?null:response.getEntity().getContentEncoding().getValue());
				res.put("content-type", response.getEntity().getContentType()==null?"application/json; odata.metadata=minimal":response.getEntity().getContentType().getValue());
			} catch(Exception e){
				e.printStackTrace();
			}finally {  
				if(response!=null)
					response.close();  
			}  
		}else if(RequestMethod.PATCH.toString().equals(method)){
			HttpPatch httpPatch=new HttpPatch(uri);
			if(headParams!=null){
			    for (Map.Entry<String, String> entry : headParams.entrySet()) {
			    	httpPatch.setHeader(entry.getKey(), entry.getValue());
				}
			}
			if(isProxy){
				httpPatch.setConfig(getproxy());
			}
			if(entitys!=null)
				httpPatch.setEntity(entitys);
			CloseableHttpResponse response=null;
			try {  
				response = httpclient.execute(target, httpPatch,context);
				int code=response.getStatusLine().getStatusCode();
				HttpEntity responseHttpEntity = response.getEntity();
				String result=EntityUtils.toString(responseHttpEntity);
				EntityUtils.consume(responseHttpEntity);
				res.put("content", result);
				res.put("code",code );
//				HeaderIterator iterator=response.headerIterator();
//				while(iterator.hasNext()){
//					Header header=iterator.nextHeader();
//					direct_response.addHeader(header.getName(), header.getValue());
//				}
				res.put("content-Encoding", response.getEntity().getContentEncoding()==null?null:response.getEntity().getContentEncoding().getValue());
				res.put("content-type", response.getEntity().getContentType()==null?"application/json; odata.metadata=minimal":response.getEntity().getContentType().getValue());
			} catch(Exception e){
				e.printStackTrace();
			}finally {  
				if(response!=null)
					response.close();  
			}  
		}else if(RequestMethod.PUT.toString().equals(method)){
			HttpPut httpPut=new HttpPut(uri);
			if(headParams!=null){
			    for (Map.Entry<String, String> entry : headParams.entrySet()) {
			    	httpPut.setHeader(entry.getKey(), entry.getValue());
				}
			}
			if(isProxy){
				httpPut.setConfig(getproxy());
			}
			if(entitys!=null)
				httpPut.setEntity(entitys);
			CloseableHttpResponse response=null;
			try {  
				response = httpclient.execute(target, httpPut,context);
				int code=response.getStatusLine().getStatusCode();
				HttpEntity responseHttpEntity = response.getEntity();
				String result=EntityUtils.toString(responseHttpEntity);
				EntityUtils.consume(responseHttpEntity);
				res.put("content", result);
				res.put("code",code );
//				HeaderIterator iterator=response.headerIterator();
//				while(iterator.hasNext()){
//					Header header=iterator.nextHeader();
//					direct_response.addHeader(header.getName(), header.getValue());
//				}
				res.put("content-Encoding", response.getEntity().getContentEncoding()==null?null:response.getEntity().getContentEncoding().getValue());
				res.put("content-type", response.getEntity().getContentType()==null?"application/json; odata.metadata=minimal":response.getEntity().getContentType().getValue());
			} catch(Exception e){
				e.printStackTrace();
			}finally {  
				if(response!=null)
					response.close();  
			}  
		}else if(RequestMethod.DELETE.toString().equals(method)){
			HttpDelete httpDelete=new HttpDelete(uri);
			if(headParams!=null){
			    for (Map.Entry<String, String> entry : headParams.entrySet()) {
			    	httpDelete.setHeader(entry.getKey(), entry.getValue());
				}
			}
			if(isProxy){
				httpDelete.setConfig(getproxy());
			}
			
			CloseableHttpResponse response=null;
			try {  
				response = httpclient.execute(target, httpDelete,context);
				int code=response.getStatusLine().getStatusCode();
				HttpEntity responseHttpEntity = response.getEntity();
				String result=EntityUtils.toString(responseHttpEntity);
				EntityUtils.consume(responseHttpEntity);
				res.put("content", result);
				res.put("code",code );
//				HeaderIterator iterator=response.headerIterator();
//				while(iterator.hasNext()){
//					Header header=iterator.nextHeader();
//					direct_response.addHeader(header.getName(), header.getValue());
//				}
				res.put("content-Encoding", response.getEntity().getContentEncoding()==null?null:response.getEntity().getContentEncoding().getValue());
				res.put("content-type", response.getEntity().getContentType()==null?"application/json; odata.metadata=minimal":response.getEntity().getContentType().getValue());
			}catch(Exception e){
				e.printStackTrace();
			} finally {  
				if(response!=null)
					response.close();  
			}  
		}else if(RequestMethod.TRACE.toString().equals(method)){
			HttpTrace httpTrace=new HttpTrace(uri);
			if(headParams!=null){
			    for (Map.Entry<String, String> entry : headParams.entrySet()) {
			    	httpTrace.setHeader(entry.getKey(), entry.getValue());
				}
			}
			if(isProxy){
				httpTrace.setConfig(getproxy());
			}
			CloseableHttpResponse response=null;
			try {  
				response = httpclient.execute(target, httpTrace,context);
				int code=response.getStatusLine().getStatusCode();
				HttpEntity responseHttpEntity = response.getEntity();
				String result=EntityUtils.toString(responseHttpEntity);
				EntityUtils.consume(responseHttpEntity);
				res.put("content", result);
				res.put("code",code );
//				HeaderIterator iterator=response.headerIterator();
//				while(iterator.hasNext()){
//					Header header=iterator.nextHeader();
//					direct_response.addHeader(header.getName(), header.getValue());
//				}
				res.put("content-Encoding", response.getEntity().getContentEncoding()==null?null:response.getEntity().getContentEncoding().getValue());
				res.put("content-type", response.getEntity().getContentType()==null?"application/json; odata.metadata=minimal":response.getEntity().getContentType().getValue());
			}catch(Exception e){
				e.printStackTrace();
			} finally {  
				if(response!=null)
					response.close();  
			}  
		}
		
	}

	

	
	
	
}
