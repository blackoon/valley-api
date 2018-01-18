package com.hylanda.constant;
/** 
 * @author zhangy
 * @E-mail:blackoon88@gmail.com 
 * @qq:846579287
 * @version created at：2017年11月30日 下午6:00:29 
 * note
 */
public class UrlConstantHelper {
	/**
	 *上传报表接口集合 
	 */
	public static final String uploadCatalogItem_post="/reports/api/v2.0/CatalogItems";
	public static final String getCatalogItemInfo_get="/reports/api/v2.0/CatalogItems(Path='/name')?&$expand=DataSources";
	public static final String updateDataSource_patch="/reports/api/v2.0/PowerBIReports(bigItem.Id)/DataSources";
	public static final String updateDataSource_patch2="/reports/api/v2.0/PowerBIReports(Path='/path')/DataSources";
	
	/**
	 * 创建文件夹集合
	 */
	//Gets an array of Folder CatalogItems.
	public static final String folder_get="/reports/api/v2.0/catalogitems";
	//Creates a new Folder CatalogItem.
	public static final String folder_post="/reports/api/v2.0/catalogitems";
	
	/**
	 * 下载文件
	 */
	public static final String download_get="/reports/api/v2.0/CatalogItems(Path='/path')/Content/$value";
	
	/**
	 * 获取用户下的报表列表
	 */
	public static final String catalogItem_get="/reports/api/v2.0/catalogitems(Path='/path')/Model.Folder/catalogitems/?$orderby=name%20ASC";
}
