package com.zmax.yijian.web.utils;

import java.io.File;
import java.io.IOException;
import java.util.Map;

import javax.servlet.ServletContext;

import org.apache.commons.io.FileUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.servlet.view.freemarker.FreeMarkerConfigurer;
import com.zmax.conf.Addr;
import com.zmax.utils.string.JsonUtil;
import com.zmax.utils.string.StringUtilz;
import com.zmax.yijian.common.conf.Conf;
import com.zmax.yijian.common.conf.Prop;
import com.zmax.yijian.common.conf.Sys;


import freemarker.template.Configuration;
import freemarker.template.TemplateDirectiveModel;
import freemarker.template.TemplateModelException;
/**
 * Spring启动加些配置，如Freemarker管理，增加自定义标签等
 * @author zmax
 * 
 */
//@Component implements ApplicationContextAware
public class SpringInit implements ApplicationContextAware{
	
	private static final Logger logger = Logger.getLogger(SpringInit.class);

	public static boolean isinit=true;
	public static WebApplicationContext webApplicationContext ;
	public static ApplicationContext ctx ;
	public static ServletContext servletContext;
	public static FreeMarkerConfigurer freeMarkerCfg;
	/**WEB-INF/classes的物理路径*/
	public static String webinfclasses="";
	@Autowired
	FreeMarkerConfigurer freeMarkerConfigurer;
	@Autowired
	Prop prop;
	@Autowired
	Addr addr;	
	public SpringInit(){
	}
	/**
	 * 初始化
	 * @throws TemplateModelException
	 */
	public void init() {
		if(!isinit)return;
		if (logger.isDebugEnabled())
			logger.debug("SpringInit init  123456");
		
		webApplicationContext=WebStartInit.getWebApplicationContext();
		if(webApplicationContext==null){
			logger.error("webApplicationContext==null");
		}
		
		servletContext=WebStartInit.getServletContext();
		if(servletContext==null){
			logger.error("servletContext==null");
		}
		//WEB-INF/classes目录
		webinfclasses=servletContext.getRealPath("/")+"/WEB-INF/classes";
		webinfclasses=StringUtilz.urlFormat(webinfclasses);

		//Addr系列
		try {
			String addrStr=new FileUtils().readFileToString(new File(webinfclasses+"/addr.txt"));
			addrStr=addrStr.replace("\r", "").replace("\n", "");
			addr.getWwbase().putAll(JsonUtil.getMapFromJson(addrStr));
		} catch (IOException e) {
			e.printStackTrace();
			logger.error(e);
		}
		
		if(freeMarkerConfigurer==null){
			logger.error("freeMarkerConfigurer==null");
		}
		SpringInit.freeMarkerCfg=freeMarkerConfigurer;
		try {
			freemarkerInit();
		} catch (TemplateModelException e) {
			logger.error(e);
		}
	/*	//参数初始化
		specPubController.paraminit(null);	
		//运行参数初始化
		RtCfg.init();
		//静态参数初始化
*/

		
	}
	/**
	 * freeMarker初始化
	 * @throws TemplateModelException 
	 */
	public void freemarkerInit() throws TemplateModelException{
		//注册自定义标签到cfg中
		Map<String,TemplateDirectiveModel> beans=(Map<String,TemplateDirectiveModel>)ctx.getBeansOfType(TemplateDirectiveModel.class);
		if (logger.isDebugEnabled())
			logger.debug("TemplateDirectiveModel.beans.size()=" + beans.size());
		for (String key : beans.keySet()) { 
			Object bean = beans.get(key); 
			freeMarkerConfigurer.getConfiguration().setSharedVariable(key, bean);
			if (logger.isDebugEnabled())logger.debug("freeMarkerConfigurer.reg.key=" + key);
		}
		//ctx.get
		//注册一些freemarker使用的全局变量
		makeFtlVars(freeMarkerConfigurer.getConfiguration(),prop,addr);
		//集群地址
		//freeMarkerConfigurer.getConfiguration().setSharedVariable("addr",ctx.getBean("addr"));
		//ckfinder的启动赋值
		logger.info("init.addr="+((Addr)ctx.getBean("addr")).toString());
	}
	/**
	 * 注册全站用的ftl变量，也可以给生成器使用。
	 * "base","res","ru","sys","author"
	 * @param cfg
	 * @param servletContext
	 */
	public static void makeFtlVars(Configuration cfg,Prop prop,Addr addr){
		try {
			ServletContext servletContext=SpringInit.getServletContext();
			//注册一些freemarker使用的全局变量
			String base=servletContext.getContextPath();
			logger.info("base=" + base);
			
			Conf.base=base; //bo
			Conf.hbase=prop.getDomain(); //http://me.maykeys.com
			Conf.wbase=StringUtils.isBlank(base)?Conf.hbase:Conf.hbase+Conf.base; //http://me.maykeys.com/bo
			Conf.base=Conf.wbase;
			Conf.zresmd5pwd=prop.getZresmd5pwd();
			
			//服务器根，也就是域名
			cfg.setSharedVariable("hbase",Conf.hbase);
			//相对URL-网站根目录，例："/zmax-zcms" 或者 ""
			cfg.setSharedVariable("base",Conf.base);
			//相对URL-网站根目录，例："/zmax-zcms" 或者 ""
			cfg.setSharedVariable("wbase",Conf.wbase);
			//其它服务的wbase，使用方法 wwbase.get("bo") ftl: $ {wwbase["bo"]}
			cfg.setSharedVariable("wwbase",addr.getWwbase());
			
			//相对URL-网站资源地址，例："/zmax-zcms/res"
			cfg.setSharedVariable("res",Conf.base+"/res");
			cfg.setSharedVariable("pubres",addr.getWwbase().get("res")+"/res");
			//相对URL-用户资源地址，例："/zmax-zcms/ru" 
			cfg.setSharedVariable("ru",Conf.base+Conf.resUserUrl);
			//系统设置
			cfg.setSharedVariable("sys",new Sys());

			//作者
			cfg.setSharedVariable("author", "zmax");

		} catch (BeansException e) {
			// e.printStackTrace();
			logger.error(e);
		} catch (TemplateModelException e) {
			// e.printStackTrace();
			logger.error(e);
		}
	}
	
	public FreeMarkerConfigurer getFreeMarkerConfigurer() {
		return freeMarkerConfigurer;
	}

	public void setFreeMarkerConfigurer(FreeMarkerConfigurer freeMarkerConfigurer) {
		this.freeMarkerConfigurer = freeMarkerConfigurer;
	}
	
	@Override
	public void setApplicationContext(ApplicationContext ctx)
			throws BeansException {
		SpringInit.ctx=ctx;
		
	}

	public static ApplicationContext getCtx() {
		return ctx;
	}

	public static WebApplicationContext getWebApplicationContext() {
		return webApplicationContext;
	}
	public static ServletContext getServletContext() {
		return servletContext;
	}
	
}
