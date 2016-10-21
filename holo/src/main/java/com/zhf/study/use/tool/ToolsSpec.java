package com.zhf.study.use.tool;

import java.io.IOException;
import java.util.Arrays;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.zmax.yijian.web.controller.base.base.BaseController;
import com.zmax.yijian.web.utils.FastjsonFilter;

public class ToolsSpec {
	/**日志实例*/
	private static final Logger logger = Logger.getLogger(ToolsSpec.class);
	static final String success_jsonpCallback="success_jsonpCallback";
	/**
	 * 将对象转换成JSON字符串，并响应回前台
	 * 
	 * @param object
	 * @param includesProperties
	 *            需要转换的属性
	 * @param excludesProperties
	 *            不需要转换的属性
	 */
	public void writeJsonByFilter(HttpServletRequest request,HttpServletResponse response,Object object, String[] includesProperties, String[] excludesProperties,boolean isRemote) {
		try {
			//过滤器
			FastjsonFilter filter = new FastjsonFilter();// excludes优先于includes
			if (excludesProperties != null && excludesProperties.length > 0) {
				//addAll() 向一个集合添加另一个集合所有内容
				filter.getExcludes().addAll(Arrays.<String> asList(excludesProperties));
			}
			if (includesProperties != null && includesProperties.length > 0) {
				filter.getIncludes().addAll(Arrays.<String> asList(includesProperties));
			}
			if (logger.isDebugEnabled())
				logger.debug("对象转JSON：要排除的属性[" + excludesProperties + "]要包含的属性[" + includesProperties + "]");
			String json;
			String User_Agent = request.getHeader("User-Agent");
			//浏览器兼容
			if (User_Agent.indexOf("MSIE") > -1 && (User_Agent.indexOf("MSIE 6") > -1)) {
				// 使用SerializerFeature.BrowserCompatible特性会把所有的中文都会序列化为\\uXXXX这种格式，字节数会多一些，但是能兼容IE6
				json = JSON.toJSONString(object, filter, SerializerFeature.WriteDateUseDateFormat, SerializerFeature.DisableCircularReferenceDetect, SerializerFeature.BrowserCompatible);
			} else {
				// 使用SerializerFeature.WriteDateUseDateFormat特性来序列化日期格式的类型为yyyy-MM-dd hh24:mi:ss
				// 使用SerializerFeature.DisableCircularReferenceDetect特性关闭引用检测和生成
				json = JSON.toJSONString(object, filter, SerializerFeature.WriteDateUseDateFormat, SerializerFeature.DisableCircularReferenceDetect);
			}
			String w=json;
			if(isRemote){
				String callbackparam=request.getParameter("callbackparam");
				if(StringUtils.isBlank(callbackparam))
					callbackparam=success_jsonpCallback;
				w=callbackparam+"("+json+")";
			}
			if (logger.isDebugEnabled())	
				logger.debug("返回：" + w);
			response.setContentType("text/html;charset=utf-8");
			response.getWriter().write(w);
			response.getWriter().flush();
			response.getWriter().close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
