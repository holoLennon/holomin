package com.zhf.study.service.base;

import java.io.Serializable;
import java.lang.reflect.ParameterizedType;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;

import com.zhf.study.test.dao.base.BaseDao;
import com.zhf.study.test.entity.User;


/**
 * 基类
 * service
 * @author Administrator
 *
 */
public class BaseService<T> {
	private static final Logger logger = Logger.getLogger(BaseService.class);
	@Autowired
	public BaseDao<T> baseDao;
	
	public BaseService() {
		/**获取泛型*/
		Class<T> c = (Class<T>) ((ParameterizedType) getClass().getGenericSuperclass()).getActualTypeArguments()[0];
		
	}
	/**
	 * 保存PO
	 * @param entity
	 * @return ID
	 */
	public Serializable save(T entity) {
		if(entity==null)
			return null;
		return baseDao.save(entity);
	}

	/**
	 * 保存或更新PO
	 * 
	 * @param entity
	 */
	public void saveOrUpdate(User sessionUser,T entity) {
		if(entity==null)
			return ;
		Class<T> c = (Class<T>) ((ParameterizedType) getClass().getGenericSuperclass()).getActualTypeArguments()[0];
		baseDao.saveOrUpdate(entity);
	}
}
