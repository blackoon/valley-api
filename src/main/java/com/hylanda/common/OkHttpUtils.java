package com.hylanda.common;

import java.io.IOException;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;
import java.util.concurrent.atomic.AtomicReference;

import okhttp3.Authenticator;
import okhttp3.Credentials;
import okhttp3.MediaType;
import okhttp3.MultipartBody;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;
import okhttp3.ResponseBody;
import okhttp3.Route;

import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.hylanda.entity.FileInfo;
import com.hylanda.entity.Item;

/**
 * @author linda
 * @version created at：2017年9月15日
 */
@Component
public class OkHttpUtils {
	public static final String DEFAULT_CONTENT_TYPE = "application/octet-stream";
	public static final String MULTIPART_FORM_DATA = "multipart/form-data";
	public static final MediaType mediaType = MediaType.parse("application/json; charset=utf-8");
	public static final String ERR_CODE = "500";
	public static final String GET="GET";
	public static final String POST="POST";
	public static final String PUT="PUT";
	public static final String PATCH="PATCH";
	public static final String HEAD="HEAD";
	public static final String DELETE="DELETE";

	private final AtomicReference<OkHttpClient> okHttpClientAtomicReference = new AtomicReference<>();
	public String httpRequestWithContent(String method, String urlstr, Map<String, String> headerPropertys,
			String contentType, String content) {
		return httpRequest(method, urlstr, headerPropertys, contentType, content, null);
	}

	public OkHttpUtils() {
		OkHttpClient okHttpClient = new OkHttpClient();
		okHttpClient.newBuilder().authenticator(new Authenticator() {
			@Override
			public Request authenticate(Route route, Response response)
					throws IOException {
				if (response.request().header("Authorization") != null) {
		              return null; // Give up, we've already attempted to authenticate.
		         }
	            System.out.println("Authenticating for response: " + response);
	            System.out.println("Challenges: " + response.challenges());
	            String credential = Credentials.basic("hyp", "hylanda");
	            return response.request().newBuilder()
	                .header("Authorization", credential)
	                .build();
			}
			
		}).build();
        okHttpClientAtomicReference.set(okHttpClient);
	}
	
	public String httpRequest(String method, String urlstr, Map<String, String> headerPropertys,
			String contentType, String content, RequestBody withRequestBody) {
		OkHttpClient okHttpClient = okHttpClientAtomicReference.get();
		
		try {
			final URL url = new URL(urlstr);
			Request httpRequest = configureRequest(method, url, headerPropertys, contentType, content,withRequestBody);
			Response responseHttp = okHttpClient.newCall(httpRequest).execute();

			// output the raw response headers (DEBUG level only)
			// logResponse(logger, url, responseHttp);
			// store the status code and message
			int statusCode = responseHttp.code();
			// String statusMessage = responseHttp.message();

			if (statusCode == 0) {
				throw new IllegalStateException("Status code unknown, connection hasn't been attempted.");
			}
			ResponseBody responseBody = responseHttp.body();
			try {
				return responseBody.string();
			} catch (Exception e) {				
				return String.valueOf(statusCode);
			} 			
		} catch (final Exception e) {
			e.printStackTrace();
			// logger.error("Yielding processor due to exception encountered as a source processor: {}",
			// e);
		}
		return ERR_CODE;
	}

	private Request configureRequest(String method, URL url, Map<String, String> headerPropertys,
			String contentType, String content, RequestBody withRequestBody) {
		Request.Builder requestBuilder = new Request.Builder();

		requestBuilder = requestBuilder.url(url);

		// set the request method
		switch (method.toUpperCase()) {
		case GET:
			requestBuilder = requestBuilder.get();
			break;
		case POST:
			RequestBody requestBody = null;
			if (withRequestBody != null) {
				requestBody = withRequestBody;
			} else {
				requestBody = getRequestBodyToSend(contentType, content);
			}
			requestBuilder = requestBuilder.post(requestBody);
			break;
		case PUT:
			requestBody = getRequestBodyToSend(contentType, content);
			requestBuilder = requestBuilder.put(requestBody);
			break;
		case PATCH:
			requestBody = getRequestBodyToSend(contentType, content);
			requestBuilder = requestBuilder.patch(requestBody);
			break;
		case HEAD:
			requestBuilder = requestBuilder.head();
			break;
		case DELETE:
			requestBuilder = requestBuilder.delete();
			break;
		default:
			requestBuilder = requestBuilder.method(method, null);
		}

		requestBuilder = setHeaderProperties(requestBuilder, headerPropertys);
		return requestBuilder.build();
	}

	private RequestBody getRequestBodyToSend(String contentType, String content) {
		switch (contentType != null ? contentType.toUpperCase() : "") {
		case "JSON":
			return RequestBody.create(mediaType, content);
		default:
			return RequestBody.create(null, new byte[0]);
		}
	}

	private Request.Builder setHeaderProperties(Request.Builder requestBuilder,
			Map<String, String> dynamicPropertys) {
		for (Entry<String, String> entry : dynamicPropertys.entrySet()) {
			requestBuilder = requestBuilder.addHeader(entry.getKey(), entry.getValue());
		}
		return requestBuilder;
	}

	public String httpGet(String url,String authorization) {
		Map<String, String> headParams = new HashMap<String, String>();
		if(authorization!=null)
			headParams.put("Authorization", authorization);
		headParams.put("Content-Type", "application/json;charset=UTF-8");
		return this.httpRequestWithContent(GET, url, headParams, null, null);
	}

	public String sendPostHttp(String url,String authorization) {
		Map<String, String> headParams = new HashMap<String, String>();
		headParams.put("Authorization", authorization);
		if(authorization!=null)
			headParams.put("Authorization", authorization);
		return this.httpRequestWithContent(POST, url, headParams, null, null);
	}
	
	public String httpPatch(String url, String body,String authorization) {
		Map<String, String> headParams = new HashMap<String, String>();
		if(authorization!=null)
			headParams.put("Authorization", authorization);
		headParams.put("Content-Type", "application/json;charset=UTF-8");
		return this.httpRequestWithContent(PATCH, url, headParams, "JSON", body);
	}

	public String sendDeleteHttp(String url,String authorization) {
		Map<String, String> headParams = new HashMap<String, String>();
		if(authorization!=null)
			headParams.put("Authorization", authorization);
		headParams.put("Content-Type", "application/json");
		return this.httpRequestWithContent(DELETE, url, headParams, null, null);
	}
	
	
	public String httpPost(String url, MultipartFile file,String clientName ,String authorization) {
		Map<String, String> headParams = new HashMap<String, String>();
		if(authorization!=null)
			headParams.put("Authorization", authorization);
		headParams.put("Content-Type", MULTIPART_FORM_DATA);
		RequestBody reqBody = null;
		try {
			reqBody = this.constructPart(file.getName(), file.getBytes());
		} catch (IOException e) {
			e.printStackTrace();
		}
		return this.httpRequest(POST, url, headParams, null, null, reqBody);
	}
	public String httpPost(String url, FileInfo fileInfo,
			String parentName, String authorization) {
		Item item =new Item();
		item.setContent(fileInfo.getContent());
		item.setContentType(fileInfo.getContentType());
		item.setName(fileInfo.getName());
		item.setPath(parentName==null?"/"+fileInfo.getName():parentName+"/"+fileInfo.getName());
		JSONObject joItem=JSON.parseObject(JSON.toJSONString(item)) ;
		addDataType(joItem,fileInfo);
		Map<String, String> headParams = new HashMap<String, String>();
//		if(authorization!=null)
//		String credential = Credentials.basic("hyp", "hylanda");
		String credential ="NTLM TlRMTVNTUAADAAAAGAAYAGwAAADqAOoAhAAAAAAAAABYAAAADgAOAFgAAAAGAAYAZgAAAAAAAABuAQAABYKIogoAqz8AAAAPzVJ0wJPnKxU7BnBpKeQA2mgAeQBsAGEAbgBkAGEASABZAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAe1wPv/z/iOOava2eKN7CsQEBAAAAAAAAu70I0HJt0wGWi74wnV45/QAAAAACAAYASABZAFAAAQAGAEgAWQBQAAQABgBoAHkAcAADAAYAaAB5AHAABwAIALu9CNBybdMBBgAEAAIAAAAIADAAMAAAAAAAAAABAAAAACAAAOptVBNwt4hDCFJjGn2pPnfmMd36gA7Ml5srgeM/i1N7CgAQAAAAAAAAAAAAAAAAAAAAAAAJACoASABUAFQAUAAvADEAOQAyAC4AMQA2ADgALgAxADYALgA5ADYAOgA4ADAAAAAAAAAAAAAAAAAA";
		headParams.put("Authorization", credential);
		headParams.put("Content-Type", "application/json;charset=UTF-8");
		return httpRequest(POST, url, headParams, "application/json;charset=UTF-8", JSON.toJSONString(item), null);
		
	}
	private void addDataType(JSONObject item,FileInfo fileInfo) {
		switch (fileInfo.getExtension().toLowerCase()) {
        case "rdl":
            item.put("@odata.type", "#Model.Report");
            break;
        case "rsd":
        	item.put("@odata.type", "#Model.DataSet");
            break;
        case "rds":
        	item.put("@odata.type", "#Model.Resource");
        	item.put("ContentType", "text/xml");
            break;
        case "rsc":
        	item.put("@odata.type", "#Model.Component");
            break;
        case "rsmobile":
        	item.put("@odata.type", "#Model.MobileReport");
            break;
        case "pbix":
        	item.put("@odata.type", "#Model.PowerBIReport");
            break;
        case "xls":
        case "xlsb":
        case "xlsm":
        case "xlsx":
        case "csv":
        	item.put("@odata.type", "#Model.ExcelWorkbook");
            break;
        default:
            item.put("@odata.type", "#Model.Resource");
            break;
    }
	}

	private RequestBody constructPart(String fileName, byte[] bytes) {
//		RequestBody requestBody = new MultipartBuilder().type(MultipartBuilder.FORM).addFormDataPart("file", fileName,RequestBody.create(MediaType.parse(MULTIPART_FORM_DATA), bytes)).build();
		RequestBody requestBody=RequestBody.create(MediaType.parse(MULTIPART_FORM_DATA), bytes);
		MultipartBody.Builder rb= new MultipartBody.Builder().setType(MultipartBody.FORM).addFormDataPart("file", fileName, requestBody);
		return rb.build();
	}
	public String replacePowerBiParam(String url, String collectionName, String wid) {
		if (StringUtils.isEmpty(collectionName)) {
			url = url.replace("{collectionName}", "");
		} else {
			url = url.replace("{collectionName}", collectionName);
		}
		if (StringUtils.isEmpty(wid)) {
			url = url.replace("{workspaceID}", "");
		} else {
			url = url.replace("{workspaceID}", wid);
		}
		return url;
	}

	
}
