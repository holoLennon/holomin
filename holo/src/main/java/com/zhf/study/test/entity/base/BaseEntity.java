package com.zhf.study.test.entity.base;


/**
 * 基类
 * BaseEntity
 * @author holo
 *
 */
public class BaseEntity implements java.io.Serializable {
	public static final long serialVersionUID = 1L;
	public static final String DATE_FORMAT = "yyyy-MM-dd HH:mm:ss";
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
	
}
