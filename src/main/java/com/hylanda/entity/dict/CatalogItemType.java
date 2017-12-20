package com.hylanda.entity.dict;

/**
 * @author zhangy
 * @E-mail:blackoon88@gmail.com
 * @qq:846579287
 * @version created at：2017年12月1日 下午4:16:00 note
 */
public enum CatalogItemType {
	Unknown("Unknown") {
	},
	Folder("Folder") {
	},
	Report("Report") {
	},
	DataSource("DataSource") {
	},
	DataSet("DataSet") {
	},
	Component("Component") {
	},
	Resource("Resource") {
	},
	Kpi("Kpi") {
	},
	MobileReport("MobileReport") {
	},
	LinkedReport("LinkedReport") {
	},
	ReportModel("ReportModel") {
	},
	PowerBIReport("PowerBIReport") {
	},
	ExcelWorkbook("ExcelWorkbook") {
	};
	public String name;

	private CatalogItemType(String name) {
		this.name = name;
	}
}
