/**
 * 
 */
package com.zmax.yijian.web.utils;

import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Component;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

import sun.util.logging.resources.logging;


/**
 * 网站启动时的Listener，让其它实例可以获取ServletContext,WebApplicationContext
 * 在 Servlet API 中有一个 ServletContextListener 接口，它能够监听 ServletContext 对象的生命周期，实际上就是监听 Web 应用的生命周期。
 * @author zmax
 *
 */
//@Component
public class WebStartInit  implements  ServletContextListener  {
	private static final Logger logger = Logger.getLogger(WebStartInit.class);
	private static WebApplicationContext webApplicationContext;
	private static ServletContext servletContext;

	
	@Override
	public void contextDestroyed(ServletContextEvent arg0) {
		// TODO Auto-generated method stub

	}

	@Override
	public void contextInitialized(ServletContextEvent event) {
		logger.debug(logger);
		servletContext=event.getServletContext();
		webApplicationContext=WebApplicationContextUtils.getWebApplicationContext(servletContext);
		//有些其它想在启动时加载的，也可放在这里
		if (logger.isDebugEnabled())
			logger.debug("WebStartInit init");
		logger.debug("ServletContext启动时间"+webApplicationContext.getStartupDate());
	}

	public static WebApplicationContext getWebApplicationContext() {
		return webApplicationContext;
	}

	public static ServletContext getServletContext() {
		return servletContext;
	}


	

}
