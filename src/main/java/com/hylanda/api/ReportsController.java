package com.hylanda.api;  

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import com.hylanda.service.HtmlService;

/** 
 * @author zhangy
 * @E-mail:blackoon88@gmail.com 
 * @version 创建时间：2017年12月7日 下午5:33:58 
 * note
 */
@Controller
@RequestMapping("/reports")
public class ReportsController {
	//http://192.168.16.96:8080/reports/api/v2.0/SafeGetSystemResourceContent(type='UniversalBrand',key='logo')
	@Autowired
	private HtmlService htmlService;
	@RequestMapping(value = { "/powerbi/{Name}" }, method = RequestMethod.GET)
	public void getPowerbiHtml(HttpServletRequest request, @PathVariable String Name,HttpServletResponse response) {
		String htmlResponse=htmlService.getPowerbiHtml(request.getRequestURI()+"?"+request.getQueryString());
		 //输出对象
        PrintWriter writer=null;
		try {
			response.setContentType("text/html; charset=utf-8");
			writer = response.getWriter();
			writer.write(htmlResponse);
		} catch (IOException e) {
			e.printStackTrace();
		}finally{
			if(writer!=null)
			 writer.close();
		}
	}
	
	
	@RequestMapping(value = { "/api/v2.0/me" }, method = RequestMethod.GET)
	public void getMe(HttpServletRequest request,HttpServletResponse response){
		
	}
		
	@RequestMapping(value = { "/api/v2.0/DataSources" }, method = {RequestMethod.GET,RequestMethod.POST})
	public void getDataSources(HttpServletRequest request,HttpServletResponse response){
		
	}
	
	@RequestMapping(value = { "/api/v2.0/Reports" }, method = {RequestMethod.GET,RequestMethod.POST})
	public void getReports(HttpServletRequest request,HttpServletResponse response){
		
	}
	
	@RequestMapping(value = { "/api/v2.0/ServiceState" }, method = RequestMethod.GET)
	public void getServiceState(HttpServletRequest request,HttpServletResponse response){
		
	}
	@RequestMapping(value = { "/api/v2.0/SystemResources" }, method = RequestMethod.GET)
	public void getSystemResources(HttpServletRequest request,HttpServletResponse response){
		
	}
	@RequestMapping(value = { "/api/v2.0/telemetry" }, method = RequestMethod.GET)
	public void getTelemetry(HttpServletRequest request,HttpServletResponse response){
		
	}
	@RequestMapping(value = { "/api/v2.0/SafeGetSystemResourceContent/{type}" }, method = RequestMethod.GET)
	public void getSystemResourceContentType(HttpServletRequest request,HttpServletResponse response){
		
	}
	@RequestMapping(value = { "/api/v2.0/SafeGetSystemResourceContent*" }, method = RequestMethod.GET)
	public void getSystemResourceContent(HttpServletRequest request,HttpServletResponse response){
		
	}
	@RequestMapping(value = { "/api/v2.0/System/Properties" }, method = RequestMethod.GET)
	public void getSystem(HttpServletRequest request,HttpServletResponse response){
		
	}
	
	@RequestMapping(value = { "/api/v2.0/System/WebPortalRelativeUrl" }, method = RequestMethod.GET)
	public void getWebPortalRelativeUrl(HttpServletRequest request,HttpServletResponse response){
		
	}
	@RequestMapping(value = { "/api/v2.0/System/ReportServerRelativeUrl" }, method = RequestMethod.GET)
	public void getReportServerRelativeUrl(HttpServletRequest request,HttpServletResponse response){
		
	}
	@RequestMapping(value = { "/api/v2.0/CatalogItems*/*" }, method ={RequestMethod.GET,RequestMethod.POST})
	public void getCatalogItems(HttpServletRequest request,HttpServletResponse response){
		
	}
//	http://localhost:8080/reports/api/v2.0/CatalogItems(Path=%27/test5%27)/AllowedActions
	@RequestMapping(value = { "/api/v2.0/CatalogItems*/*/AllowedActions" }, method ={RequestMethod.GET,RequestMethod.POST})
	public void getCatalogItemsAllowedActions(HttpServletRequest request,HttpServletResponse response){
		
	}
	@RequestMapping(value = { "/api/v2.0/PowerBIReports*/*" }, method ={RequestMethod.GET,RequestMethod.POST})
	public void getPowerBIReports(HttpServletRequest request,HttpServletResponse response){
		
	}
	
	@RequestMapping(value = { "/api/v2.0/PowerBIReports" }, method ={RequestMethod.GET,RequestMethod.POST})
	public void powerBIReports(HttpServletRequest request,HttpServletResponse response){
		
	}
	
	@RequestMapping(value = { "/api/v2.0/PowerBIReports*/*/AllowedActions" }, method ={RequestMethod.GET,RequestMethod.POST})
	public void getPowerBIReportsAllowedActions(HttpServletRequest request,HttpServletResponse response){
		
	}
	@RequestMapping(value = { "/api/v2.0/notifications" }, method = RequestMethod.GET)
	public void getNotifications(HttpServletRequest request,HttpServletResponse response){
		
	}
	
	@RequestMapping(value = { "/api/v2.0/powerbiintegration/model.isenabled" }, method = RequestMethod.GET)
	public void getPowerbiintegration(HttpServletRequest request,HttpServletResponse response){
		
	}
	
	
	
	
	
}
  