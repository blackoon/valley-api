package com.hylanda.entity;  

import com.alibaba.fastjson.annotation.JSONField;

/** 
 * @author zhangy
 * @E-mail:blackoon88@gmail.com 
 * @version 创建时间：2017年12月7日 上午11:14:33 
 * note
 */
public class Folder {
	 //"Id": "01234567-89ab-cdef-0123-456789abcdef",
	private String Id;
	  //"Name": "string",
	private String Name;
	  //"Description": "string",
	  private String Description;
	  //"Path": "string",
	  private String Path;
	  //"Type": "Unknown",
	  private String Type;
	  //"Hidden": true,
	  private boolean Hidden;
	  //"Size": 0,
	  private long Size;
	  //"ModifiedBy": "string",
	  private String ModifiedBy;
	  //"ModifiedDate": "2017-04-13T15:51:04Z",
	  private String ModifiedDate;
	  //"CreatedBy": "string",
	  private String CreatedBy;
	 // "CreatedDate": "2017-04-13T15:51:04Z",
	  private String CreatedDate;
	 // "ParentFolderId": "01234567-89ab-cdef-0123-456789abcdef",
	  private String ParentFolderId;
	  //"ContentType": "string",
	  private String ContentType;
	  //"Content": "string",
	  private String Content;
	  //"IsFavorite": true
	  private boolean IsFavorite;
	@JSONField(name="Id")
	public String getId() {
		return Id;
	}
	public void setId(String Id) {
		this.Id = Id;
	}
	@JSONField(name="Name")
	public String getName() {
		return Name;
	}
	public void setName(String name) {
		Name = name;
	}
	@JSONField(name="Description")
	public String getDescription() {
		return Description;
	}
	public void setDescription(String description) {
		Description = description;
	}
	@JSONField(name="Path")
	public String getPath() {
		return Path;
	}
	public void setPath(String path) {
		Path = path;
	}
	@JSONField(name="Type")
	public String getType() {
		return Type;
	}
	public void setType(String type) {
		Type = type;
	}
	@JSONField(name="Hidden")
	public boolean isHidden() {
		return Hidden;
	}
	public void setHidden(boolean hidden) {
		Hidden = hidden;
	}
	@JSONField(name="Size")
	public long getSize() {
		return Size;
	}
	public void setSize(long size) {
		Size = size;
	}
	@JSONField(name="ModifiedBy")
	public String getModifiedBy() {
		return ModifiedBy;
	}
	public void setModifiedBy(String modifiedBy) {
		ModifiedBy = modifiedBy;
	}
	@JSONField(name="ModifiedDate")
	public String getModifiedDate() {
		return ModifiedDate;
	}
	public void setModifiedDate(String modifiedDate) {
		ModifiedDate = modifiedDate;
	}
	@JSONField(name="CreatedBy")
	public String getCreatedBy() {
		return CreatedBy;
	}
	public void setCreatedBy(String createdBy) {
		CreatedBy = createdBy;
	}
	@JSONField(name="CreatedDate")
	public String getCreatedDate() {
		return CreatedDate;
	}
	public void setCreatedDate(String createdDate) {
		CreatedDate = createdDate;
	}
	@JSONField(name="ParentFolderId")
	public String getParentFolderId() {
		return ParentFolderId;
	}
	public void setParentFolderId(String parentFolderId) {
		ParentFolderId = parentFolderId;
	}
	@JSONField(name="ContentType")
	public String getContentType() {
		return ContentType;
	}
	public void setContentType(String contentType) {
		ContentType = contentType;
	}
	@JSONField(name="Content")
	public String getContent() {
		return Content;
	}
	public void setContent(String content) {
		Content = content;
	}
	@JSONField(name="IsFavorite")
	public boolean isIsFavorite() {
		return IsFavorite;
	}
	public void setIsFavorite(boolean isFavorite) {
		IsFavorite = isFavorite;
	}
	  
	  
}
	 
