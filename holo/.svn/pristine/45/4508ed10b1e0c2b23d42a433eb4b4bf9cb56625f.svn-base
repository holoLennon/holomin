package com.zmax.yijian.web.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.zmax.zbabi.utils.RequestUtils;




/**
 * 权限上下文信息拦截器
 * 
 * 包括登录信息、权限信息、站点信息
 * 
 * @author 
 * 
 */
public class JsonBackInterceptor extends HandlerInterceptorAdapter {
	private static final Logger logger = Logger
	.getLogger(JsonBackInterceptor.class);

	/**内网地址段*/
	private String innerip;

	
	@Override
	public boolean preHandle(HttpServletRequest request,
			HttpServletResponse response, Object handler) throws Exception {
		if (logger.isDebugEnabled())
			logger.debug("权限预处理");
		String ip=RequestUtils.getIpAddr(request);
		if(StringUtils.indexOf(ip, innerip)==0)
			return true;
		return false;
	}

	@Override
	public void postHandle(HttpServletRequest request,
			HttpServletResponse response, Object handler, ModelAndView mav)
	throws Exception {
	
	}

	@Override
	public void afterCompletion(HttpServletRequest request,
			HttpServletResponse response, Object handler, Exception ex)
	throws Exception {

	}

	public String getInnerip() {
		return innerip;
	}

	public void setInnerip(String innerip) {
		this.innerip = innerip;
	}
	
}