package com.hylanda.api;  

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/** 
 * @author zhangy
 * @E-mail:blackoon88@gmail.com 
 * @version 创建时间：2017年12月8日 下午3:58:15 
 * note
 */
@Controller
@RequestMapping("/powerbi")
public class PowerController {
	@RequestMapping(value = { "/" }, method = RequestMethod.GET)
	public void getPowerBi(HttpServletRequest request,HttpServletResponse response){
		
	}
	@RequestMapping(value = { "/api/explore/reports/{id}/modelsAndExploration" }, method = RequestMethod.GET)
	public void getReportsModelsAndExploration(HttpServletRequest request,HttpServletResponse response){
		
	}
	@RequestMapping(value = { "/api/explore/reports/{id}/conceptualschema" }, method = RequestMethod.POST)
	public void getReportsConceptualschema(HttpServletRequest request,HttpServletResponse response){
		
	}
	@RequestMapping(value = { "/api/explore/reports/{id}/querydata" }, method = RequestMethod.POST)
	public void getReportsquerydata(HttpServletRequest request,HttpServletResponse response){
		
	}
}
  