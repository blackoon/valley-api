package com.hylanda.api;

import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.Part;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.fastjson.JSON;
import com.hylanda.entity.ApiResponse;
import com.hylanda.entity.ConnectionString;
import com.hylanda.service.ApiService;

/**
 * @author zhangy
 * @E-mail:blackoon88@gmail.com
 * @qq:846579287
 * @version created at：2017年11月30日 下午5:38:25 note
 */
@RestController
@RequestMapping("/api")
public class ApiController {

	@Autowired
	private ApiService apiService;

	@ApiOperation(value = "上传报表文件到本地报表服务器", notes = "需要指定appId,X-YAuth-Token,parentName以及文件")
	@ApiImplicitParams({
		@ApiImplicitParam(name = "appId", value = "用户ID,如70522f9206ea47cfb29e1a70bce21209", required = true, dataType = "long"),
		@ApiImplicitParam(name = "parentName", value = "上传到报表服务器的父目录名称,必填。不能包含以下任何字符: / @ $ & * + = < > : \' , ? | \\", required = true, dataType = "string"),
		@ApiImplicitParam(name = "X-YAuth-Token", value = "header中的token参数,如eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI3MDUyMmY5MjA2ZWE0N2NmYjI5ZTFhNzBiY2UyMTIwOSIsImlhdCI6MTUxMjExMTczMSwiaXNzIjoiT25saW5lIFlBdXRoIEJ1aWxkZXIiLCJleHAiOjE1MTM5MzkxMTh9.K6JNZ6xSNQPDNFrlL3vNvdaId-0N2jh_0fog-F0pGIo", required = true, dataType = "string") })
	@RequestMapping(value = { "/upload/powerbireport" }, method = RequestMethod.POST)
	public ApiResponse uploadReportFile(HttpServletRequest request,
			@RequestPart("file") Part file, @RequestParam String parentName) {
		boolean rq1 = apiService.uploadCatalogItem(file, parentName);
		ApiResponse apiResponse = new ApiResponse();
		
		if (!rq1) {
			apiResponse.setInfo("上传报表接口失败");
			apiResponse.setStatus("fail");
		}
		return apiResponse;
	}

	
	@ApiOperation(value = "在本地报表服务器创建用户文件夹", notes = "需要指定appId,X-YAuth-Token,parentName")
	@ApiImplicitParams({
		@ApiImplicitParam(name = "appId", value = "用户ID,如70522f9206ea47cfb29e1a70bce21209", required = true, dataType = "long"),
		@ApiImplicitParam(name = "parentName", value = "上传到报表服务器的父目录名称,必填。不能包含以下任何字符: / @ $ & * + = < > : \' , ? | \\", required = true, dataType = "string"),
		@ApiImplicitParam(name = "X-YAuth-Token", value = "header中的token参数,如eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI3MDUyMmY5MjA2ZWE0N2NmYjI5ZTFhNzBiY2UyMTIwOSIsImlhdCI6MTUxMjExMTczMSwiaXNzIjoiT25saW5lIFlBdXRoIEJ1aWxkZXIiLCJleHAiOjE1MTM5MzkxMTh9.K6JNZ6xSNQPDNFrlL3vNvdaId-0N2jh_0fog-F0pGIo", required = true, dataType = "string") })
	@RequestMapping(value = { "/create/folder" }, method = RequestMethod.GET)
	public ApiResponse createFolder(HttpServletRequest request, @RequestParam String parentName){
		ApiResponse apiResponse=apiService.createFolder(parentName);
		return apiResponse;
	}
	
	@ApiOperation(value= "修改报表文件数据源")
	@ApiImplicitParams({
		@ApiImplicitParam(name = "appId", value = "用户ID,如70522f9206ea47cfb29e1a70bce21209", required = true, dataType = "long"),
		@ApiImplicitParam(name = "path", value = "上传到报表服务器的名称(包括父目录),必填。不能包含以下任何字符: / @ $ & * + = < > : \' , ? | \\", required = true, dataType = "string"),
		@ApiImplicitParam(name = "X-YAuth-Token", value = "header中的token参数,如eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI3MDUyMmY5MjA2ZWE0N2NmYjI5ZTFhNzBiY2UyMTIwOSIsImlhdCI6MTUxMjExMTczMSwiaXNzIjoiT25saW5lIFlBdXRoIEJ1aWxkZXIiLCJleHAiOjE1MTM5MzkxMTh9.K6JNZ6xSNQPDNFrlL3vNvdaId-0N2jh_0fog-F0pGIo", required = true, dataType = "string") })
	@RequestMapping(value={"/patch/datasource"},method=RequestMethod.POST)
	public ApiResponse patchDataSource(HttpServletRequest request, @RequestParam String path,@RequestBody String json){
		ConnectionString connectionString=null;
		try {
			connectionString=JSON.parseObject(json, ConnectionString.class);
		} catch (Exception e) {
		}
		if(connectionString==null) return new ApiResponse("请求body参数不正确","fail");
		
		ApiResponse apiResponse=apiService.patchDataSource(path,connectionString);
		return apiResponse;
	}
	@RequestMapping(value={"/patch/datasource/test"},method=RequestMethod.POST)
	public ApiResponse patchDataSourceTest(HttpServletRequest request, @RequestParam String path,@RequestBody String json){
		
		ApiResponse apiResponse=apiService.patchDataSource2(path,json);
		return apiResponse;
	}
	@ApiOperation(value="查看报表数据源")
	@ApiImplicitParams({
		@ApiImplicitParam(name = "appId", value = "用户ID,如70522f9206ea47cfb29e1a70bce21209", required = true, dataType = "long"),
		@ApiImplicitParam(name = "path", value = "上传到报表服务器的名称(包括父目录),必填。不能包含以下任何字符: / @ $ & * + = < > : \' , ? | \\", required = true, dataType = "string"),
		@ApiImplicitParam(name = "X-YAuth-Token", value = "header中的token参数,如eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI3MDUyMmY5MjA2ZWE0N2NmYjI5ZTFhNzBiY2UyMTIwOSIsImlhdCI6MTUxMjExMTczMSwiaXNzIjoiT25saW5lIFlBdXRoIEJ1aWxkZXIiLCJleHAiOjE1MTM5MzkxMTh9.K6JNZ6xSNQPDNFrlL3vNvdaId-0N2jh_0fog-F0pGIo", required = true, dataType = "string") })
	@RequestMapping(value={"/query/datasource"},method=RequestMethod.GET)
	public ApiResponse querydatasource(HttpServletRequest request, @RequestParam String path){
		ApiResponse apiResponse=apiService.queryDataSource(path);
		return  apiResponse;
	}
	
	@RequestMapping(value="/create/datasource")
	public ApiResponse createDatasource(){
		ApiResponse apiResponse=apiService.createDataSource();
		return apiResponse;
	}
}
