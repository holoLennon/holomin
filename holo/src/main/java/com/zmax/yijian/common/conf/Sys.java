package com.zmax.yijian.common.conf;
/**
 * 系统设置，一个BEAN对象，需要实例化才能使用
 * @author zmax
 *
 */
public class Sys {
	/**网站的名称*/
	private String webname="yijian";
	private String weburl="www.yijian.com";
	private String webnamee="yijian";
	private String version="v1.0.0.20120707";
	private String res="/r";
	public String getWebname() {
		return webname;
	}

	public void setWebname(String webname) {
		this.webname = webname;
	}

	public String getRes() {
		return res;
	}

	public void setRes(String res) {
		this.res = res;
	}

	public String getWeburl() {
		return weburl;
	}

	public void setWeburl(String weburl) {
		this.weburl = weburl;
	}

	public String getWebnamee() {
		return webnamee;
	}

	public void setWebnamee(String webnamee) {
		this.webnamee = webnamee;
	}

	public String getVersion() {
		return version;
	}

	public void setVersion(String version) {
		this.version = version;
	}
	@Override
	public String toString() {
		return "Sys [webname=" + webname + ", weburl=" + weburl + ", webnamee="
				+ webnamee + ", version=" + version + ", res=" + res + "]";
	}
}
