/*
 * zmax 2013
 * 
 */

package  com.zmax.yijian.common.dal.dao.base;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate3.HibernateTemplate;
import org.springframework.orm.hibernate3.SessionFactoryUtils;
import org.springframework.stereotype.Repository;
import org.springframework.util.Assert;

import com.zmax.utils.easyui.Grid;
import com.zmax.utils.page.Pagination;
import com.zmax.utils.string.StringUtilz;
import com.zmax.yijian.common.conf.Conf;
import com.zmax.yijian.common.dal.dao.base.SpecDao;



/**
 * 特别DAO
 */
@Repository
public class SpecDao{
	/**日志实例*/
	@SuppressWarnings("unused")
	private static final Logger logger = Logger.getLogger(SpecDao.class);
	/**是否启用二级缓存*/
	public static final boolean USECACHE=true;
	@Autowired
	private HibernateTemplate hibernateTemplate;
	/**
	 * 通过反射获取子类确定的泛型类
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public SpecDao() {
	}
	public HibernateTemplate getHibernateTemplate() {
		return hibernateTemplate;
	}

	public void setHibernateTemplate(HibernateTemplate hibernateTemplate) {
		this.hibernateTemplate = hibernateTemplate;
		this.hibernateTemplate.setCacheQueries(USECACHE);
	}
	public  Session getSession() {
		return SessionFactoryUtils.getSession(this.hibernateTemplate.getSessionFactory(),true);
	}
	public  void closeSession(Session session) {
		SessionFactoryUtils.releaseSession(session,this.hibernateTemplate.getSessionFactory());
	}
	/**
	 * 创建Query对象. 对于需要first,max,fetchsize,cache,cacheRegion等诸多设置的函数,可以在返回Query后自行设置.
	 * 留意可以连续设置,如下：
	 * <pre>
	 * dao.getQuery(hql).setMaxResult(100).setCacheable(true).list();
	 * </pre>
	 * 调用方式如下：
	 * <pre>
	 *        dao.createQuery(hql)
	 *        dao.createQuery(hql,arg0);
	 *        dao.createQuery(hql,arg0,arg1);
	 *        dao.createQuery(hql,new Object[arg0,arg1,arg2])
	 * </pre>
	 *
	 * @param values 可变参数.
	 */
	public Query createQuery(Session session,String hql, Object... params) {
		Assert.hasText(hql);
		Query query = session.createQuery(hql);
		query.setCacheable(USECACHE);
		if(params!=null){
			for (int i = 0; i < params.length; i++) {
				query.setParameter(i, params[i]);
			}
		}
		return query;
	}
	/**
	 * 创建Sql版Query
	 * @param session
	 * @param sql
	 * @param params
	 * @return
	 */
	public Query createQueryBySql(Session session,String sql, Object... params) {
		Assert.hasText(sql);

		Query query = session.createSQLQuery(sql);
		query.setCacheable(USECACHE);
		if(params!=null){
			for (int i = 0; i < params.length; i++) {
				query.setParameter(i, params[i]);
			}
		}
		return query;
	}

	private String fixWhere(String where){
		where=(StringUtils.isBlank(where))?"":" where "+where;
		return where;
	}
	private String fixOrder(String order){
		order=(StringUtils.isBlank(order))?"id desc":order;
		order=" order by "+order;
		return order;
	}	
	/**
	 * 去除hql的select 子句，未考虑union的情况,用于pagedQuery.
	 *
	 * @see #pagedQuery(String,int,int,Object[])
	 */
	@SuppressWarnings("unused")
	private static String removeSelect(String hql) {
		Assert.hasText(hql);
		int beginPos = hql.toLowerCase().indexOf("from");
		Assert.isTrue(beginPos != -1, " hql : " + hql + " must has a keyword 'from'");
		return hql.substring(beginPos);
	}

	/**
	 * 去除hql的orderby 子句，用于pagedQuery.
	 *
	 * @see #pagedQuery(String,int,int,Object[])
	 */
	private static String removeOrders(String hql) {
		if(hql==null)return "";
		if(hql.equals(""))return "";
		Assert.hasText(hql);
		Pattern p = Pattern.compile("order\\s*by[\\w|\\W|\\s|\\S]*", Pattern.CASE_INSENSITIVE);
		Matcher m = p.matcher(hql);
		StringBuffer sb = new StringBuffer();
		while (m.find()) {
			m.appendReplacement(sb, "");
		}
		m.appendTail(sb);
		return sb.toString();
	}
	/**
	 * 根据类名获取对象
	 * @param entityName ex.com.zmax.xxx.admin
	 * @param id
	 * @return
	 */
	public Object get(String entityName, Serializable id){
		return getHibernateTemplate().get(entityName, id);
	}
	/**
	 * 根据hql获取第一个对象
	 * @param hql ex. from aaa where id>1 and status=2 order by id asc
	 * @param params
	 * @return
	 */
	public Object getFirst(String hql,Object... params){
		Pagination page=new Pagination(1, 1);
		List list = listfindWithpage(hql, page, params);
		if(list.size()>0)
			return list.get(0);
		return null;
	}
	/**
	 * 返回数量 
	 * @param hql
	 * @return
	 */
	@SuppressWarnings("rawtypes")
	public int getTableCount(String hql,Object... params){
		hql=StringUtilz.fixHql(hql);
		hql=StringUtilz.removeOrders(hql);
		String countQueryString = "select count (*) "+hql;
		List countlist = getHibernateTemplate().find(countQueryString,params);
		int totalCount = (int)((long)((Long) countlist.get(0)));
		return totalCount;
	}
	/**
	 * 根据HQL条件返回列表，返回非泛形List，无分页
	 * @param hql ex.from Admin where id=1 order by id desc
	 * @param params
	 * @return List
	 */
	@SuppressWarnings({ "rawtypes" })
	public List listfind(String hql, Object... params) {
		Session session= getSession();
		Query query = createQuery(session,hql,params);
		List list = query.list();
		try {
			return list;
		} finally{
			closeSession(session);
		}
	}	
	/**
	 * 根据HQL条件返回列表，返回非泛形List，有分页
	 * 
	 * @param hql ex.from Admin where id=1 order by id desc
	 * @param page Pagination
	 * @param params 
	 * @return List
	 */
	@SuppressWarnings({ "rawtypes" })
	public List listfindWithpage(String hql, Pagination page, Object... params) {
		Session session= getSession();
		Query query = createQuery(session,hql,params);
		List list = query.setFirstResult(page.getFirstResult()).setMaxResults(page.getPageSize()).list();
		closeSession(session);
		try {
			return list;
		} finally{
			closeSession(session);
		}
	}
	/**
	 * 根据HQL条件返回列表，返回Grid，有分页
	 * 
	 * @param hql ex.from Admin where id=1 order by id desc
	 * @param page Pagination
	 * @param params 
	 * @return List
	 */
	public Grid listfindGridWithpage(String hql, Pagination page, Object... params) {
		hql=StringUtilz.fixHql(hql);
		// Count查询
		int totalCount = getTableCount(hql);
		Grid p = new Grid();
		p.setTotal(totalCount);
		if (totalCount < 1){ //空数据
			p.setRows(new ArrayList());
			return p;
		}
		Session session= getSession();
		// 实际查询返回分页对象
		Query query = createQuery(session,hql, params);
		List list = query.setFirstResult(page.getFirstResult()).setMaxResults(page.pageSize).list();
		p.setRows(list);
		try {
			return p;
		} finally{
			closeSession(session);
		}
	}	
	
	/**
	 * 根据HQL条件返回列表，返回Pagination，有分页
	 * 
	 * @param hql ex.from Admin where id=1 order by id desc
	 * @param page Pagination
	 * @param params 
	 * @return Pagination
	 */
	public Pagination listfindPageWithpage(String hql, Pagination page, Object... params) {
		Grid grid=listfindGridWithpage(hql, page, params);
		Pagination p=new Pagination(page.pageNo, page.pageSize, grid.getTotal(),grid.getRows());
		return p;
	}

	/**
	 * 自定义查询HQL，返回List[Object[]]
	 * @param hql ex:select t.obj_id,t.template_id,s.ckey from channel_prop_link t,channel_prop_template s where t.obj_id="+channelId+" and t.template_id=s.id
	 * @return
	 */
	public List<Object[]> listObjectHql(String hql, Object... params){
		Session session= getSession();
		Query query = createQuery(session,hql, params);
		//query.setCacheable(BaseDao.USECACHE);
		if(params!=null){
			for (int i = 0; i < params.length; i++) {
				query.setParameter(i, params[i]);
			}
		}
		List list= query.list();
		try {
			return list;
		} finally{
			closeSession(session);
		}
	}	
	/**
	 * 自定义查询HQL，返回List[Object[]] 有分页
	 * @param hql ex:select t.obj_id,t.template_id,s.ckey from channel_prop_link t,channel_prop_template s where t.obj_id="+channelId+" and t.template_id=s.id
	 * @return
	 */
	public List<Object[]> listObjectHqlWithpage(String hql, Pagination page, Object... params){
		Session session= getSession();
		Query query = createQuery(session,hql, params);
		//query.setCacheable(BaseDao.USECACHE);
		if(params!=null){
			for (int i = 0; i < params.length; i++) {
				query.setParameter(i, params[i]);
			}
		}
		List list= query.setFirstResult(page.getFirstResult()).setMaxResults(page.pageSize).list();
		try {
			return list;
		} finally{
			closeSession(session);
		}
	}
	/**
	 * 自定义查询SQL，返回List[Object[]]
	 * @param sql ex:select t.obj_id,t.template_id,s.ckey from channel_prop_link t,channel_prop_template s where t.obj_id="+channelId+" and t.template_id=s.id
	 * @return
	 */
	public List<Object[]> listObjectSql(String sql, Object... params){
		Session session=getSession();
		SQLQuery query  = session.createSQLQuery(sql);
		//query.setCacheable(BaseDao.USECACHE);
		if(params!=null){
			for (int i = 0; i < params.length; i++) {
				query.setParameter(i, params[i]);
			}
		}
		List list= query.list();
		try {
			return list;
		} finally{
			closeSession(session);
		}
	}	
	/**
	 * 自定义查询SQL，返回List[Object[]] 有分页
	 * @param sql ex:select t.obj_id,t.template_id,s.ckey from channel_prop_link t,channel_prop_template s where t.obj_id="+channelId+" and t.template_id=s.id
	 * @return
	 */
	public List<Object[]> listObjectSqlWithpage(String sql, Pagination page, Object... params){
		Session session=getSession();
		SQLQuery query  = session.createSQLQuery(sql);
		//query.setCacheable(BaseDao.USECACHE);
		if(params!=null){
			for (int i = 0; i < params.length; i++) {
				query.setParameter(i, params[i]);
			}
		}
		List list= query.setFirstResult(page.getFirstResult()).setMaxResults(page.pageSize).list();
		try {
			return list;
		} finally{
			closeSession(session);
		}	
	}
	
	
	
	/**
	 * 执行executeSql
	 * @param sql
	 * @param values
	 * @return
	 */
	public int executeSql(String sql, Object... values){
		Session session=getSession();
		Query query = createQueryBySql(session, sql, values);
		int ret=query.executeUpdate();
		try {
			return ret;
		} finally{
			closeSession(session);
		}	
	}
	/**
	 * 执行executeHql
	 * @param sql
	 * @param values
	 * @return
	 */
	public int executeHql(String hql, Object... values){
		Session session=getSession();
		Query query = createQuery(session, hql, values);
		int ret=query.executeUpdate();
		try {
			return ret;
		} finally{
			closeSession(session);
		}	
	}
	/**
	 * 求和 select sum(xxx) from table1 where id=5;
	 * @param field 被求和字段
	 * @param table 表名
	 * @param where 条件
	 * @param objs
	 * @return
	 */
	public double sumField(String field,String table,String where,Object... values){
		double ret=0;
		where=(where==null)?"":" where "+where;
		String hql="select sum("+field+") from "+table+where;
		Session session=getSession();
		Query query = createQuery(session, hql, values);
		try {
			Double lret=(Double)query.uniqueResult();
			if(lret==null)
				ret=0.00;
			else
				ret=lret.doubleValue();
			return ret;
		}finally{
			closeSession(session);
		}
		
	}
	
}