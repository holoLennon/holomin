package com.zmax.yijian.web.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;
import org.springframework.web.util.UrlPathHelper;

import com.zmax.conf.Addr;




/**
 * <br>权限上下文信息拦截器
 * <br>包括登录信息、权限信息、站点信息
 * <br>页面访问分两类，页面 和 AJAX，页面以html结尾，Ajax以json结尾 
 * <br>无权直接跳转 
 * @author 
 * 
 */
public class UserInterceptor extends HandlerInterceptorAdapter {
	private static final Logger logger = Logger
	.getLogger(UserInterceptor.class);
	public static final String SITE_PARAM = "_site_id_param";
	public static final String SITE_COOKIE = "_site_id_cookie";
	public static final String PERMISSION_MODEL = "_permission_key";

	@Autowired
	Addr addr;
	/**开发时的管理员ID*/
	private Integer devmode;
	/**是否获权*/
	private boolean auth = true;
	/**可以排除的无权的路径*/
	private String[] excludeUrls;
	/**ajax的路径，出错时，返回nologin*/
	private String[] ajaxUrls;
	/**登录地*/
	private String loginUrl;
	/**返回地址*/
	private String returnUrl;
	
	@Override
	public boolean preHandle(HttpServletRequest request,
			HttpServletResponse response, Object handler) throws Exception {
		//if (logger.isDebugEnabled())logger.debug("权限预处理");
		String uri = getURI(request);
		// 不在验证的范围内
		if (exclude(uri)) {
			return true;
		}
		String loginurl=addr.getBackLoginUrl();
		HttpSession session=request.getSession();
		logger.debug("这还验证个毛");
		
		return true;
	}

	@Override
	public void postHandle(HttpServletRequest request,
			HttpServletResponse response, Object handler, ModelAndView mav)
	throws Exception {
		//if (logger.isDebugEnabled())logger.debug("权限处理");
		
	}

	@Override
	public void afterCompletion(HttpServletRequest request,
			HttpServletResponse response, Object handler, Exception ex)
	throws Exception {
		//if (logger.isDebugEnabled())logger.debug("权限后处理");

		// Sevlet容器有可能使用线程池，所以必须手动清空线程变量。

	}

	/**
	 * 是否是排除路径，是表示无需权限 
	 * @param uri
	 * @return
	 */
	private boolean exclude(String uri) {
		if (excludeUrls != null) {
			for (String exc : excludeUrls) {
				if (exc.equals(uri)) {
					return true;
				}
			}
		}
		return false;
	}
	/**
	 * 是否ajax，返回方式不同
	 * @param uri
	 * @return
	 */
	private boolean ajax(String uri) {
		if (ajaxUrls != null) {
			for (String exc : ajaxUrls) {
				if (uri.indexOf(exc)>-1) {
					return true;
				}
			}
		}
		return false;
	}
	/**
	 * 获得第二个路径分隔符的位置/zmax-zcms/user/index.do=>/index.do
	 * 
	 * @param request
	 * @throws IllegalStateException
	 *             访问路径错误，没有二个'/'
	 */
	public static String getURI(HttpServletRequest request)
			throws IllegalStateException {
		UrlPathHelper helper = new UrlPathHelper();
		String uri = helper.getOriginatingRequestUri(request); //    /zmax-zcms/user/index.do
		String ctxPath = helper.getOriginatingContextPath(request);  //   /zmax-zcms
		int start = 0, i = 0, count = 1;
		if (!StringUtils.isBlank(ctxPath)) {
			count++;
		}
		while (i < count && start != -1) {
			start = uri.indexOf('/', start + 1);
			i++;
		}
		if (start <= 0) {
			throw new IllegalStateException(
					"user access path not like '/user/some/...' pattern: "
							+ uri);
		}
		return uri.substring(start);
	}	
	
	public Integer getDevmode() {
		return devmode;
	}

	public void setDevmode(Integer devmode) {
		this.devmode = devmode;
	}

	public boolean isAuth() {
		return auth;
	}

	public void setAuth(boolean auth) {
		this.auth = auth;
	}

	public String[] getExcludeUrls() {
		return excludeUrls;
	}

	public void setExcludeUrls(String[] excludeUrls) {
		this.excludeUrls = excludeUrls;
	}

	public String[] getAjaxUrls() {
		return ajaxUrls;
	}

	public void setAjaxUrls(String[] ajaxUrls) {
		this.ajaxUrls = ajaxUrls;
	}

	public String getLoginUrl() {
		return loginUrl;
	}

	public void setLoginUrl(String loginUrl) {
		this.loginUrl = loginUrl;
	}

	public String getReturnUrl() {
		return returnUrl;
	}

	public void setReturnUrl(String returnUrl) {
		this.returnUrl = returnUrl;
	}
	
	
	
	
	
	
}