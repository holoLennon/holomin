package com.zmax.yijian.common.conf;
/**
 * 设置_我的，从spring的xml文件中获取
 * @author zmax
 *
 */
public class Propmy {
	/**默认管理员密码*/
	private String defaultAdminPwd;
	/**默认管理员密码*/
	public String getDefaultAdminPwd() {
		return defaultAdminPwd;
	}
	/**默认管理员密码*/
	public void setDefaultAdminPwd(String defaultAdminPwd) {
		this.defaultAdminPwd = defaultAdminPwd;
	}
	/**是否运行微信服务 true/false/test/db*/
	private String isRunWxServer;
	/**
	 * 是否运行微信服务 true/false/test/db
	 * true 是，定期从腾讯取
	 * false 否
	 * test 测试
	 * db 数据库，定期从数据库中取
	 * 
	 * */
	public String getIsRunWxServer() {
		return isRunWxServer;
	}
	/**是否运行微信服务 true/false/test*/
	public void setIsRunWxServer(String isRunWxServer) {
		this.isRunWxServer = isRunWxServer;
	}
}

