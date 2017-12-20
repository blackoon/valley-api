package com.hylanda.entity;

import java.util.Date;

import com.alibaba.fastjson.annotation.JSONField;
import com.hylanda.entity.dict.CatalogItemType;

/**
 * @author zhangy
 * @E-mail:blackoon88@gmail.com
 * @qq:846579287
 * @version created at：2017年12月1日 下午3:53:57 note
 */
public class BigCatalogItem {
	
	@JSONField(name="Id")
	private String Id;
	@JSONField(name="Name")
	private String Name;
	@JSONField(name="Description")
	private String Description;
	@JSONField(name="Path")
	private String Path;
	@JSONField(name="Type")
	private CatalogItemType Type;
	@JSONField(name="Hidden")
	private boolean Hidden;
	@JSONField(name="Size")
	private long Size;
	@JSONField(name="ModifiedBy")
	private String ModifiedBy;
	@JSONField(name="ModifiedDate")
	private Date ModifiedDate;
	@JSONField(name="CreatedBy")
	private String CreatedBy;
	@JSONField(name="CreatedDate")
	private Date CreatedDate;
	@JSONField(name="ParentFolderId")
	private String ParentFolderId;
	@JSONField(name="ContentType")
	private String ContentType;
	@JSONField(name="Content")
	private String Content;
	@JSONField(name="IsFavorite")
	private boolean IsFavorite;
	@JSONField(name="DataSources")
	private DataSource[] DataSources;
	public String getId() {
		return Id;
	}
	public void setId(String id) {
		Id = id;
	}
	public String getName() {
		return Name;
	}
	public void setName(String name) {
		Name = name;
	}
	public String getDescription() {
		return Description;
	}
	public void setDescription(String description) {
		Description = description;
	}
	public String getPath() {
		return Path;
	}
	public void setPath(String path) {
		Path = path;
	}
	public CatalogItemType getType() {
		return Type;
	}
	public void setType(CatalogItemType type) {
		Type = type;
	}
	public boolean isHidden() {
		return Hidden;
	}
	public void setHidden(boolean hidden) {
		Hidden = hidden;
	}
	public long getSize() {
		return Size;
	}
	public void setSize(long size) {
		Size = size;
	}
	public String getModifiedBy() {
		return ModifiedBy;
	}
	public void setModifiedBy(String modifiedBy) {
		ModifiedBy = modifiedBy;
	}
	public Date getModifiedDate() {
		return ModifiedDate;
	}
	public void setModifiedDate(Date modifiedDate) {
		ModifiedDate = modifiedDate;
	}
	public String getCreatedBy() {
		return CreatedBy;
	}
	public void setCreatedBy(String createdBy) {
		CreatedBy = createdBy;
	}
	public Date getCreatedDate() {
		return CreatedDate;
	}
	public void setCreatedDate(Date createdDate) {
		CreatedDate = createdDate;
	}
	public String getParentFolderId() {
		return ParentFolderId;
	}
	public void setParentFolderId(String parentFolderId) {
		ParentFolderId = parentFolderId;
	}
	public String getContentType() {
		return ContentType;
	}
	public void setContentType(String contentType) {
		ContentType = contentType;
	}
	public String getContent() {
		return Content;
	}
	public void setContent(String content) {
		Content = content;
	}
	public boolean isIsFavorite() {
		return IsFavorite;
	}
	public void setIsFavorite(boolean isFavorite) {
		IsFavorite = isFavorite;
	}
	public DataSource[] getDataSources() {
		return DataSources;
	}
	public void setDataSources(DataSource[] dataSources) {
		DataSources = dataSources;
	}
	
	
	
}
