package com.zhf.study.test.dao.base;

import java.io.Serializable;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate3.HibernateTemplate;
/**
 * 基类
 * Dao
 * @author zhf
 *
 */
public class BaseDao<T>{
	private static final Logger logger = Logger.getLogger(BaseDao.class);
	/**是否启用二级缓存*/
	public static final boolean USECACHE=true;
	
	/**@Autowired可以对成员变量、方法和构造函数进行标注，来完成自动装配的工作*/
	@Autowired
	private HibernateTemplate hibernateTemplate;
	/**默认pageSize=50*/
	public static int defaultRows=50;
	
	/**hibernateTemplate*/
	public HibernateTemplate getHibernateTemplate() {
		return hibernateTemplate;
	}
	public void setHibernateTemplate(HibernateTemplate hibernateTemplate) {
		this.hibernateTemplate = hibernateTemplate;
		//设置二级缓存
		this.hibernateTemplate.setCacheQueries(USECACHE);
	}
	
	/**hibernateTemplate的一些基本方法*/
	/**hibernateTemplate的一些基本方法*/
	/**
	 * 保存PO
	 * @param entity
	 * @return ID
	 */
	public Serializable save(T entity) {
		if(entity==null)return null;
		getHibernateTemplate().setFlushMode(HibernateTemplate.FLUSH_EAGER);
		return getHibernateTemplate().save(entity);
	}
	/**
	 * 更新PO
	 * 
	 * @param entity
	 */
	public void update(T entity) {
		if(entity==null)return;
		getHibernateTemplate().setFlushMode(HibernateTemplate.FLUSH_EAGER);
		getHibernateTemplate().update(entity);
	}	
	/**
	 * 保存或更新PO
	 * 
	 * @param entity
	 */
	public void saveOrUpdate(T entity) {
		if(entity==null)return;
		getHibernateTemplate().setFlushMode(HibernateTemplate.FLUSH_EAGER);
		getHibernateTemplate().saveOrUpdate(entity);
	}
}
