package com.hylanda.service;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.Part;

import org.apache.commons.io.IOUtils;
import org.apache.http.client.CredentialsProvider;
import org.apache.http.client.protocol.HttpClientContext;
import org.apache.http.entity.StringEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.hylanda.common.Base64Utils;
import com.hylanda.common.HttpClientUtils;
import com.hylanda.constant.UrlConstantHelper;
import com.hylanda.entity.ApiResponse;
import com.hylanda.entity.BigCatalogItem;
import com.hylanda.entity.CredentialsInServer;
import com.hylanda.entity.DataModelDataSource;
import com.hylanda.entity.DataSource;
import com.hylanda.entity.FileInfo;
import com.hylanda.entity.Folder;
import com.hylanda.entity.Item;

/**
 * @author zhangy
 * @E-mail:blackoon88@gmail.com
 * @qq:846579287
 * @version created at：2017年12月1日 下午3:44:38 note
 */
@Service
public class ApiService {
	@Autowired
	private HttpClientUtils httpClientUtils;
	@Autowired
	@Qualifier("sqlseverJdbcTemplate")
	private JdbcTemplate sqlseverJdbcTemplate;
	
	private String hostname = "localhost";
	private int port = 80;
	private String scheme = "http";
	
	public ApiResponse uploadCatalogItem(Part part, String parentName, String uname, String upassward) {
		String response =null;
		CredentialsProvider credentialsProvider = httpClientUtils.getCredentialsProvider();
		HttpClientContext httpClientContext = httpClientUtils.getHttpClientContext(credentialsProvider);
		try {
			FileInfo fileInfo = new FileInfo();
			fileInfo.setName(part.getSubmittedFileName());
			fileInfo.setExtension(part.getSubmittedFileName().substring(part.getSubmittedFileName().lastIndexOf(".") + 1));
			fileInfo.setSize(part.getSize());
			// File file = new File(part.getSubmittedFileName());
			// FileUtils.copyInputStreamToFile(part.getInputStream(), file);
			// String content=IOUtils.toString(part.getInputStream(), "utf-8");
			String content = Base64Utils.encode(part.getInputStream());
			IOUtils.closeQuietly(part.getInputStream());
			fileInfo.setContent(content);
			fileInfo.setContentType(part.getContentType());
			
			String uri = UrlConstantHelper.uploadCatalogItem_post;
			Map<String, String> headParams = new HashMap<String, String>();
			headParams.put("Content-Type", "application/json;charset=UTF-8");
			Item item = new Item();
			item.setContent(fileInfo.getContent());
			item.setContentType("");
			item.setName(fileInfo.getName());
			item.setPath(parentName == null ? "/" + fileInfo.getName()
					: parentName + "/" + fileInfo.getName());
			JSONObject joItem = JSON.parseObject(JSON.toJSONString(item));
			addDataType(joItem, fileInfo);
			StringEntity entitys = new StringEntity(JSON.toJSONString(joItem));
			
			response=httpClientUtils.httpPost(this.hostname, this.port, this.scheme, uri, headParams,httpClientContext, entitys);

			String fileName = fileInfo.getName().substring(0,fileInfo.getName().lastIndexOf("."));
			uri = UrlConstantHelper.getCatalogItemInfo_get.replaceAll("name",(parentName == null ? fileName: (parentName + "/" + fileName)));
			response = httpClientUtils.httpGet(this.hostname, this.port, this.scheme,uri, headParams, httpClientContext);
			BigCatalogItem bigCatalogItem = JSON.parseObject(response,BigCatalogItem.class);
			DataSource dataSource = bigCatalogItem.getDataSources()[0];
			dataSource.setDataSourceType("SQL");
			dataSource.setIsConnectionStringOverridden(true);
			dataSource.setCredentialRetrieval("store");
			DataModelDataSource dataModelDataSource = dataSource.getDataModelDataSource();
			dataModelDataSource.setUsername(uname);
			dataModelDataSource.setSecret(upassward);
			dataModelDataSource.setAuthType("UsernamePassword");
			CredentialsInServer credentialsInServer = null;
			if (dataSource.getCredentialsInServer() == null) {
				credentialsInServer = new CredentialsInServer();
			} else {
				credentialsInServer = dataSource.getCredentialsInServer();
			}

			credentialsInServer.setUserName(uname);
			credentialsInServer.setPassword(upassward);
			credentialsInServer.setUseAsWindowsCredentials(true);
			credentialsInServer.setImpersonateAuthenticatedUser(false);
			DataSource[] dataSources = new DataSource[] { dataSource };

			uri = UrlConstantHelper.updateDataSource_patch.replaceAll("bigItem.Id", bigCatalogItem.getId());
			entitys = new StringEntity(JSON.toJSONString(dataSources), "UTF-8");
			response=httpClientUtils.httpPatch(this.hostname, this.port, this.scheme, uri, headParams,httpClientContext, entitys);
		} catch (Exception e) {
			return new ApiResponse(response,"fail");
		}
		return new ApiResponse();
	}
	public String downloadCatalogItem(String path,JSONObject res) {
		String response =null;
		CredentialsProvider credentialsProvider = httpClientUtils.getCredentialsProvider();
		HttpClientContext httpClientContext = httpClientUtils.getHttpClientContext(credentialsProvider);
		Map<String, String> headParams = new HashMap<String, String>();
		headParams.put("Content-Type", "application/json;charset=UTF-8");
		String uri=UrlConstantHelper.download_get.replaceAll("path", path);
		try {
			response=httpClientUtils.httpGetFile(this.hostname, this.port, this.scheme, uri, headParams,httpClientContext, res);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return response;
	}
	
	public ApiResponse createFolder(String parentName) {
		//校验是否存在
		Map<String, String> headParams = new HashMap<String, String>();
		headParams.put("Content-Type", "application/json;charset=UTF-8");
		CredentialsProvider credentialsProvider = httpClientUtils.getCredentialsProvider();
		HttpClientContext httpClientContext = httpClientUtils.getHttpClientContext(credentialsProvider);
		String uri=UrlConstantHelper.folder_get;
		String response=null;
		try {
			response=httpClientUtils.httpGet(this.hostname, this.port,this.scheme, uri, headParams, httpClientContext);
			//不存在创建
			JSONObject joo=JSON.parseObject(response);
			JSONArray array=joo.getJSONArray("value");
			if(array!=null&&array.size()>0){
				boolean iscontinue=false;
				for(int i=0;i<array.size();i++){
					if(parentName.equals(array.getJSONObject(i).getString("Name"))
							&&"Folder".equals(array.getJSONObject(i).getString("Type"))){
						iscontinue=true;
						break;
					}
				}
				if(!iscontinue){
					Folder folder=new Folder();
					folder.setId(UUID.randomUUID().toString());
					folder.setName(parentName);
					folder.setPath("/"+parentName);
					folder.setType("Folder");
					JSONObject jo=JSON.parseObject(JSON.toJSONString(folder));
					jo.put("@odata.context", joo.getString("@odata.context")+"/$entity");//"http://localhost/reports/api/v2.0/$metadata#CatalogItems/$entity"
					jo.put("@odata.type", "#Model.Folder");
					StringEntity entitys = new StringEntity(JSON.toJSONString(jo));
					response=httpClientUtils.httpPost(this.hostname, this.port,this.scheme, uri, headParams, httpClientContext, entitys);
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
			return new ApiResponse(response,"fail");
		}
		return new ApiResponse();
	}
	public ApiResponse getReportList(String path) {
		Map<String, String> headParams = new HashMap<String, String>();
		headParams.put("Content-Type", "application/json;charset=UTF-8");
		CredentialsProvider credentialsProvider = httpClientUtils.getCredentialsProvider();
		HttpClientContext httpClientContext = httpClientUtils.getHttpClientContext(credentialsProvider);
		String uri=UrlConstantHelper.catalogItem_get.replace("path",path);
		String response=null;
		try {
			response=httpClientUtils.httpGet(this.hostname, this.port,this.scheme, uri, headParams, httpClientContext);
		} catch (IOException e) {
			e.printStackTrace();
			return new ApiResponse(response,"fail");
		}
		ApiResponse api=new ApiResponse();
		api.setData(JSON.parseObject(response));
		return api;
	}
	private void addDataType(JSONObject item, FileInfo fileInfo) {
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

//	public ApiResponse patchDataSource(String path, ConnectionString json) {
//		String response =null;
//		try {
//			Map<String, String> headParams = new HashMap<String, String>();
//			headParams.put("Content-Type", "application/json;charset=UTF-8");
//			CredentialsProvider credentialsProvider = httpClientUtils.getCredentialsProvider();
//			HttpClientContext httpClientContext = httpClientUtils.getHttpClientContext(credentialsProvider);
//			String uri = UrlConstantHelper.getCatalogItemInfo_get.replaceAll("name",path);
//			response = httpClientUtils.httpGet(this.hostname, this.port, this.scheme,uri, headParams, httpClientContext);
//			BigCatalogItem bigCatalogItem = JSON.parseObject(response,BigCatalogItem.class);
//
//			DataSource dataSource = bigCatalogItem.getDataSources()[0];
//			dataSource.setDataSourceType("SQL");
//			dataSource.setIsConnectionStringOverridden(true);
//			dataSource.setCredentialRetrieval("store");
//			
//			StringBuilder connectionString =new StringBuilder();
//			connectionString.append("data source=").append("HYP\\MSSQLSERVER2").append(";")
//			.append("initial catalog=").append("xzdata").append(";")
//			.append("user id=").append("sa").append(";")
//			.append("password=").append("hylanda").append(";")
//			.append("persist security info=").append("False").append(";")
//			.append("encrypt=").append("True").append(";")
//			.append("trustservercertificate=").append("False");
//			
//			
//			
//			dataSource.setConnectionString(connectionString.toString());
//			
//			DataModelDataSource dataModelDataSource = dataSource.getDataModelDataSource();
//			dataModelDataSource.setUsername("sa");
//			dataModelDataSource.setSecret("hylanda");
//			dataModelDataSource.setAuthType("UsernamePassword");
//			CredentialsInServer credentialsInServer = null;
//			if (dataSource.getCredentialsInServer() == null) {
//				credentialsInServer = new CredentialsInServer();
//			} else {
//				credentialsInServer = dataSource.getCredentialsInServer();
//			}
//
//			credentialsInServer.setUserName("sa");
//			credentialsInServer.setPassword("hylanda");
//			credentialsInServer.setUseAsWindowsCredentials(true);
//			credentialsInServer.setImpersonateAuthenticatedUser(false);
//			dataSource.setCredentialsInServer(credentialsInServer);
//			DataSource[] dataSources = new DataSource[] { dataSource };
//			System.out.println(JSON.toJSONString(dataSources));
//			uri = UrlConstantHelper.updateDataSource_patch.replaceAll("bigItem.Id", bigCatalogItem.getId());
//			StringEntity entitys = new StringEntity(JSON.toJSONString(dataSources), "UTF-8");
//			response=httpClientUtils.httpPatch(this.hostname, this.port, this.scheme, uri, headParams,httpClientContext, entitys);
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
//		
//		return new ApiResponse(response);
//	}

//	public ApiResponse queryDataSource(String path) {
//		String response =null;
//		try {
//			Map<String, String> headParams = new HashMap<String, String>();
//			headParams.put("Content-Type", "application/json;charset=UTF-8");
//			CredentialsProvider credentialsProvider = httpClientUtils.getCredentialsProvider();
//			HttpClientContext httpClientContext = httpClientUtils.getHttpClientContext(credentialsProvider);
//			String uri = UrlConstantHelper.getCatalogItemInfo_get.replaceAll("name",path);
//			response = httpClientUtils.httpGet(this.hostname, this.port, this.scheme,uri, headParams, httpClientContext);
//		} catch (IOException e) {
//			e.printStackTrace();
//		}
//		return new ApiResponse(response);
//	}
//
//	public ApiResponse createDataSource() {
//		// TODO Auto-generated method stub
//		return null;
//	}
//
//	public ApiResponse patchDataSource2(String path,
//			String connectionString) {
//		Map<String, String> headParams = new HashMap<String, String>();
//		headParams.put("Content-Type", "application/json;charset=UTF-8");
//		CredentialsProvider credentialsProvider = httpClientUtils.getCredentialsProvider();
//		HttpClientContext httpClientContext = httpClientUtils.getHttpClientContext(credentialsProvider);
//		String response =null;
//		try {
//			String uri = UrlConstantHelper.updateDataSource_patch2.replaceAll("path", path);
//			StringEntity entitys = new StringEntity(connectionString, "UTF-8");
//			response=httpClientUtils.httpPatch(this.hostname, this.port, this.scheme, uri, headParams,httpClientContext, entitys);
//		
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
//		return new ApiResponse(response);
//	}
	/**
	 * 创建表
	 * @param sql
	 * @return
	 */
	public ApiResponse createTable(String sql) {
		String response=null;
		try {
			sqlseverJdbcTemplate.execute(sql);
		} catch (Exception e) {
			response=e.getMessage();
		}
		if(response==null){
			return new ApiResponse();
		}
		return new ApiResponse(response);
	}
	public String downloadAzureReport(String url, String auth,JSONObject res) {
		String response =null;
//		CredentialsProvider credentialsProvider = httpClientUtils.getCredentialsProvider();
//		HttpClientContext httpClientContext = httpClientUtils.getHttpClientContext(credentialsProvider);
		Map<String, String> headParams = new HashMap<String, String>();
		headParams.put("Content-Type", "application/json;charset=UTF-8");
		headParams.put("Authorization",auth);
		try {
			response=httpClientUtils.httpGetAzureFile( url,headParams, res);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return response;
	}

	
}
