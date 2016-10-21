/*
 * zmax 2013
 * 
 */

package  com.zmax.yijian.common.dal.dao.base;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.hibernate.Query;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate3.HibernateTemplate;
import org.springframework.orm.hibernate3.SessionFactoryUtils;
import org.springframework.stereotype.Repository;
import org.springframework.util.Assert;

import com.zmax.utils.easyui.Grid;
import com.zmax.utils.page.Pagination;
import com.zmax.utils.string.StringUtilz;






/**
 * DAO基类，其它DAO可以直接继承这个DAO，不但可以复用共用的方法，还可以获得泛型的好处。
 */
@Repository
public class BaseDao<T>{
	/**日志实例*/
	@SuppressWarnings("unused")
	private static final Logger logger = Logger.getLogger(BaseDao.class);
	/**是否启用二级缓存*/
	public static final boolean USECACHE=true;
	//public Class<T> entityClass;
	@Autowired
	private HibernateTemplate hibernateTemplate;
	
	public static int defaultRows=50;
		
	/**
	 * 通过反射获取子类确定的泛型类
	 */
	public BaseDao() {

	}

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
	/**
	 * 批量保存PO
	 * 
	 * @param entity
	 */
	@SuppressWarnings("rawtypes")
	public void saveOrUpdateAll(Collection entities) {
		if(entities==null)return;
		getHibernateTemplate().setFlushMode(HibernateTemplate.FLUSH_EAGER);
		getHibernateTemplate().saveOrUpdateAll(entities);
	}
	/**
	 * 根据ID删除PO
	 * 
	 * @param entity
	 */
	public void deleteById(Class<T> c,Serializable id) {
		if(id==null)return;
		getHibernateTemplate().setFlushMode(HibernateTemplate.FLUSH_EAGER);
		getHibernateTemplate().delete(get(c,id));
	}
	/**
	 * 根据对象删除PO
	 * 
	 * @param entity
	 */
	public void delete(T entity) {
		if(entity==null)return;
		getHibernateTemplate().setFlushMode(HibernateTemplate.FLUSH_EAGER);
		getHibernateTemplate().delete(entity);
	}
	/**
	 * 批量删除
	 * @param entities
	 */
	public void deleteAll(Collection<T> entities) {
		if(entities==null)return;
		getHibernateTemplate().setFlushMode(HibernateTemplate.FLUSH_EAGER);
		getHibernateTemplate().deleteAll(entities);
	}
	/**
	 * 根据ID加载PO实例
	 * 
	 * @param id
	 * @return 返回相应的持久化PO实例
	 */
	public T getLoad(Class<T> c,Serializable id) {
		if(id==null)return null;
		return (T) getHibernateTemplate().load(c, id);
	}

	/**
	 * 根据ID获取PO实例
	 * 
	 * @param id
	 * @return 返回相应的持久化PO实例
	 */
	public T get(Class<T> c,Serializable id) {
		if(id==null)return null;
		if(id instanceof Integer && ((Integer)id).intValue()==0)
			return null;
		return (T) getHibernateTemplate().get(c, id);
	}
	/**
	 * 返回查询的第一个结果，hql需要以 from Xxx开头
	 * ex: hql=from Aaa where name='a' order by id desc
	 * @param hql
	 * @return Object
	 */
	@SuppressWarnings("rawtypes")
	public Object getFirstNoC(String hql,Object... params){
		//List list = getHibernateTemplate().find(hql,params);
		Pagination page=new Pagination(1, 1);
		List list = listfindWithpage(hql, page, params);
		if(list.size()>0)
			return (T)list.get(0);
		return null;
	}
	/**
	 * 返回查询的第一个结果
	 * @param c Class<T>
	 * @param hql 这个hql比较灵活，可以是 aaa=? or where aaa=? or from xxx where aaa=? or select * from xxx where aaa=?
	 * @param params
	 * @return T
	 */
	public T getFirst(Class<T> c,String hql,Object... params){
		//List list = getHibernateTemplate().find(hql,params);
		hql=hqlFix(hql,c.getSimpleName());
		Pagination page=new Pagination(1, 1);
		List list = listfindWithpage(hql, page, params);
		if(list.size()>0)
			return (T)list.get(0);
		return null;
	}
	/**
	 * 返回数量 
	 * @param where
	 * @return
	 */
	@SuppressWarnings("rawtypes")
	public int getTableCount(Class<T> c,String where,Object... params){
		where=StringUtilz.whereLast(where);
		String countQueryString = "select count(*) from "+c.getSimpleName()+" "+removeOrders(where);
		List countlist = getHibernateTemplate().find(countQueryString,params);
		int totalCount = (int)((long)((Long) countlist.get(0)));
		return totalCount;
	}


	/**
	 * 获取PO的所有对象
	 * 
	 * @return
	 */
	public List<T> listAll(Class<T> c) {
		return getHibernateTemplate().find("from "+c.getSimpleName());	
		//return getHibernateTemplate().loadAll(c);
	}
	/**
	 * 执行HQL查询
	 * 
	 * @param hql
	 * @return 查询结果
	 */
	@SuppressWarnings("unchecked")
	public List<T> listfind(String hql) {
		return this.getHibernateTemplate().find(hql);
	}

	/**
	 * 执行带参的HQL查询
	 * 
	 * @param hql
	 * @param params
	 * @return 查询结果，没有数量限制
	 */
	@SuppressWarnings("unchecked")
	public List<T> listfind(String hql,  Object... params) {
		return this.getHibernateTemplate().find(hql,params);
	}
	/**
	 * 执行带参的HQL查询
	 * @param c 
	 * @param hql 
	 * @param where 可以带"where",也可以不
	 * @param order
	 * @param params
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List<T> listfindWithWhereOrder(Class<T> c,String hql,String where,String order,  Object... params) {
		hql=fixHql(c, hql);
		where=StringUtilz.whereLast(where);
		order= fixOrder(order);
		return this.getHibernateTemplate().find(hql+where+order,params);
	}
	/**
	 * 执行带参的HQL查询加分页输入，返回非泛形带C版,hql前面可以不写
	 * @param c ex. Admin.class
	 * @param hql ex. where id>1 order by id desc
	 * @param page 
	 * @param params
	 * @return
	 */
	@SuppressWarnings({ "rawtypes" })
	public List listfindWithpage(Class<T> c,String hql, Pagination page, Object... params) {
		Session session= getSession();
		Query query = createQuery(session,c,hql,params);
		List list = query.setFirstResult(page.getFirstResult()).setMaxResults(page.getPageSize()).list();
		closeSession(session);
		try {
			return list;
		} finally{
			closeSession(session);
		}
	}
	/**
	 * 执行带参的HQL查询加分页输入，返回非泛形带C版,hql前面可以不写，返回非泛形
	 * @param hql ex. from Admin where id>1 order by id desc
	 * @param page
	 * @param params
	 * @return
	 */
	@SuppressWarnings({ "rawtypes" })
	public List listfindWithpage(String hql, Pagination page, Object... params) {
		Session session= getSession();
		Query query = createQueryWithoutC(session,hql,params);
		List list = query.setFirstResult(page.getFirstResult()).setMaxResults(page.getPageSize()).list();
		try {
			return list;
		} finally{
			closeSession(session);
		}
	}
	
	/**
	 * 对延迟加载的实体PO执行初始化
	 * @param entity
	 */
	public void initialize(Object entity) {
		this.getHibernateTemplate().initialize(entity);
	}

	/**
	 * 获取从第一行开始的带分页列表
	 * @return
	 * 
	 * */
	public Grid listPageAll(Class<T> c) {
		return listPagedQuery(c,null,null,null,null);
	}

	/**
	 * 分页查询函数，使用hql.
	 * @param where 
	 * @param order 
	 * @param pageNo
	 * @param pageSize
	 * @param params
	 * 示例
	 * pagedQuery("a=?","id desc",null,null,1)
	 * pagedQuery("a=1",null,null,null)
	 * @return
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public Grid listPagedQuery(Class<T> c,String where,String order, Integer pageNo, Integer pageSize, Object... params) {
		where=StringUtilz.whereLast(where);
		order= fixOrder(order);
		pageNo=(pageNo==null)?1:pageNo;
		pageSize=(pageSize==null)?defaultRows:pageSize;

		// Count查询
		int totalCount = getTableCount(c,where,params);
		Grid p = new Grid();
		p.setTotal(totalCount);
		if (totalCount < 1){ //空数据
			p.setRows(new ArrayList());
			return p;
		}
		Session session= getSession();
		// 实际查询返回分页对象
		Query query = createQuery(session,c,where+order, params);
		List<T> list = query.setFirstResult((pageNo-1)*pageSize).setMaxResults(pageSize).list();
		p.setRows(list);
		try {
			return p;
		} finally{
			closeSession(session);
		}
	}



	/**
	 * 执行Sql语句
	 * @param sql
	 * @param values
	 * @return
	 */
	public int executeSqlNotUsed(String sql, Object... values){
		Session session=getSession();
		Query query = createQueryBySqlNotUsed(session, sql, values);
		int ret=query.executeUpdate();
		try {
			return ret;
		} finally{
			closeSession(session);
		}
	}	
	
	/**
	 * 执行Hql_Sql语句
	 * @param sql
	 * @param values
	 * @return
	 */
	public int executeHql(String hql, Object... values){
		Session session=getSession();
		Query query = createQueryHql(session, hql, values);
		int ret=query.executeUpdate();
		try {
			return ret;
		} finally{
			closeSession(session);
		}
	}
	/**
	 * 清除二级缓存
	 */
	public void cleanSecondCache(Class<T> c){
		Session session=getSession();
//		session.flush();
//		session.clear();
		session.evict(c);
		closeSession(session);
	}

	public HibernateTemplate getHibernateTemplate() {
		return hibernateTemplate;
	}

	public void setHibernateTemplate(HibernateTemplate hibernateTemplate) {
		this.hibernateTemplate = hibernateTemplate;
		this.hibernateTemplate.setCacheQueries(USECACHE);
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
	public Query createQuery(Session session,Class<T> c,String hql, Object... params) {
		hql=fixHql(c,hql);
		Assert.hasText(hql);
//		Query query = session.createQuery(hql);
//		query.setCacheable(USECACHE);
//		if(params!=null){
//			for (int i = 0; i < params.length; i++) {
//				query.setParameter(i, params[i]);
//			}
//		}
//		return query;
		return createQueryHql(session, hql, params);
	}
	/**
	 * 生成hql版查询
	 * @param session
	 * @param hql
	 * @param params
	 * @return
	 */
	public Query createQueryHql(Session session,String hql, Object... params) {
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
	 * 没c版的查询
	 * @param session
	 * @param hql 一定要带"from Abc"了
	 * @param params
	 * @return
	 */
	public Query createQueryWithoutC(Session session,String hql, Object... params) {
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
	public Query createQueryBySqlNotUsed(Session session,String sql, Object... params) {
		Assert.hasText(sql);

		Query query = session.createSQLQuery(sql);
		//query.setCacheable(USECACHE);
		if(params!=null){
			for (int i = 0; i < params.length; i++) {
				query.setParameter(i, params[i]);
			}
		}
		return query;
	}
	/**
	 * 如果hql 不是以from Table 开头，加上from Table
	 * @param hql
	 * @return
	 */
	private String fixHql(Class<T> c,String hql){
		if(hql.indexOf("select ")==0)
			return hql;
		if(hql.indexOf("from "+c.getSimpleName())==0)
			return hql;
		return "from "+c.getSimpleName()+" "+hql;
	}

	private static String fixOrder(String order){
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
	 * 获取session，记得关
	 * @return
	 */
	public  Session getSession() {
		return SessionFactoryUtils.getSession(hibernateTemplate.getSessionFactory(),true);
	}
	/**
	 * 关session
	 * @param session
	 */
	public  void closeSession(Session session) {
		SessionFactoryUtils.releaseSession(session,this.getHibernateTemplate().getSessionFactory());
	}
	/**
	 * 修补hql，如果传参是个where,不以from开头
	 * <pre>where 可以是以下</pre>
	 * <pre>aaa=?</pre>
	 * <pre>where aaa=?</pre>
	 * <pre>from Aaa where aaa=?</pre>
	 * @param where ex.
	 * @return
	 */
	@SuppressWarnings("unchecked")
	private String hqlFix(String where,String tbname){
		
		if(StringUtils.isBlank(where))
			return "from "+tbname;
		where=where.trim();
		if(StringUtils.indexOf(where, "from ")==0)
			return where;
		if(StringUtils.indexOf(where, "select ")==0)
			return where;	
		if(StringUtils.indexOf(where, "where ")==0)
			return "from "+tbname+" "+where;		
		
		return "from "+tbname+" where "+where;
	}
	
}