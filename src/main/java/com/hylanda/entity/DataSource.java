package com.hylanda.entity;

import com.alibaba.fastjson.annotation.JSONField;

/**
 * @author zhangy
 * @E-mail:blackoon88@gmail.com
 * @qq:846579287
 * @version created at：2017年12月1日 下午4:16:10 note
 */
public class DataSource {
	@JSONField(name="Id")
	private String Id;
	@JSONField(name="Name")
	private String Name;
	@JSONField(name="Description")
	private String Description;
	@JSONField(name="Path")
	private String Path;
	@JSONField(name="Type")
	private String Type;
	@JSONField(name="Hidden")
	private boolean Hidden;
	@JSONField(name="Size")
	private long Size;
	@JSONField(name="ModifiedBy")
	private String ModifiedBy;
	@JSONField(name="ModifiedDate")
	private String ModifiedDate;
	@JSONField(name="CreatedBy")
	private String CreatedBy;
	@JSONField(name="CreatedDate")
	private String CreatedDate;
	@JSONField(name="ParentFolderId")
	private String ParentFolderId;
	@JSONField(name="IsFavorite")
	private boolean IsFavorite;
	@JSONField(name="ConnectionString")
	private String ConnectionString;
	@JSONField(name="DataSourceSubType")
	private String DataSourceSubType;
	@JSONField(name="DataModelDataSource")
	private DataModelDataSource DataModelDataSource;
	@JSONField(name="CredentialsInServer")
	private CredentialsInServer CredentialsInServer;
	@JSONField(name="DataSourceType")
	private String DataSourceType;
	@JSONField(name="IsConnectionStringOverridden")
	private boolean IsConnectionStringOverridden;
	@JSONField(name="CredentialRetrieval")
	private String CredentialRetrieval;
	
	
	public String getDataSourceType() {
		return DataSourceType;
	}

	public void setDataSourceType(String dataSourceType) {
		DataSourceType = dataSourceType;
	}

	public boolean isIsConnectionStringOverridden() {
		return IsConnectionStringOverridden;
	}

	public void setIsConnectionStringOverridden(boolean isConnectionStringOverridden) {
		IsConnectionStringOverridden = isConnectionStringOverridden;
	}

	public String getCredentialRetrieval() {
		return CredentialRetrieval;
	}

	public void setCredentialRetrieval(String credentialRetrieval) {
		CredentialRetrieval = credentialRetrieval;
	}

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

	public String getType() {
		return Type;
	}

	public void setType(String type) {
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

	public String getModifiedDate() {
		return ModifiedDate;
	}

	public void setModifiedDate(String modifiedDate) {
		ModifiedDate = modifiedDate;
	}

	public String getCreatedBy() {
		return CreatedBy;
	}

	public void setCreatedBy(String createdBy) {
		CreatedBy = createdBy;
	}

	public String getCreatedDate() {
		return CreatedDate;
	}

	public void setCreatedDate(String createdDate) {
		CreatedDate = createdDate;
	}

	public String getParentFolderId() {
		return ParentFolderId;
	}

	public void setParentFolderId(String parentFolderId) {
		ParentFolderId = parentFolderId;
	}

	public boolean isIsFavorite() {
		return IsFavorite;
	}

	public void setIsFavorite(boolean isFavorite) {
		IsFavorite = isFavorite;
	}

	public String getConnectionString() {
		return ConnectionString;
	}

	public void setConnectionString(String connectionString) {
		ConnectionString = connectionString;
	}

	public String getDataSourceSubType() {
		return DataSourceSubType;
	}

	public void setDataSourceSubType(String dataSourceSubType) {
		DataSourceSubType = dataSourceSubType;
	}

	public DataModelDataSource getDataModelDataSource() {
		return DataModelDataSource;
	}

	public void setDataModelDataSource(DataModelDataSource dataModelDataSource) {
		DataModelDataSource = dataModelDataSource;
	}

	public CredentialsInServer getCredentialsInServer() {
		return CredentialsInServer;
	}

	public void setCredentialsInServer(CredentialsInServer credentialsInServer) {
		CredentialsInServer = credentialsInServer;
	}

}
