/**
 * 全站配置文件，有可能从配置文件中得，有可能实时算出，有可能是数据库中取出
 */
package com.zmax.yijian.common.conf;

/**
 * @author zmax
 *
 */
/**
 * @author zmax
 *
 */
public class Conf {

	/////////数据库关键字系列
	/**微信共享图文信息之用户关注*/
	public final static String DBKW_WAENTITYARTICLE_subscribe="subscribe";	
	/**微信共享图文信息之商家指令*/
	public final static String DBKW_WAENTITYARTICLE_SJ="sj";	
	
	/////////支付系列
	/**支付ID号前缀：订单之微信支付*/
	public final static String PAY_ORDERR_WX="TA";
	/**支付ID号前缀：充值订单之微信支付 CW*/
	public final static String PAY_ORDERRRECHARGE_WX="TB";
	/**支付ID号前缀：活动订单之微信支付 CW*/
	public final static String PAY_ORDERRPOMOTION_WX="TC";
	
	/**支付ID号前缀：订单之支付宝支付*/
	public final static String PAY_ORDERR_ALIPAY="AA";
	/**支付ID号前缀：充值订单之v支付 CW*/
	public final static String PAY_ORDERRRECHARGE_ALIPAY="AB";
	/**支付ID号前缀：活动订单之支付宝支付 CW*/
	public final static String PAY_ORDERRPOMOTION_ALIPAY="AC";
	
	/**文件上传最终路径,ex./userfiles/users/{0}/files/{1} ,0=user.id,1=yyyyMM*/
	public static String fileUuploadPath="/userfiles/users/{0}/files/{1}";
	
	/**平台的KF电话*/
	public static String KFTEL="400-897-6166";
	
	/**平台的ID*/
	public static int BIZID=1;
	/**测试手机开头*/
	public static String TESTUSER="101234";
	
	
	/**当前在服务器上的服务名称，也就是在webapps下的一级目录，在启动时会放 ex. /bo*/
	public static String base="";
	/**服务器base，遇到图片、资源时，会使用这个 ex. http://me.maykeys.com  */
	public static String hbase="";
	/**网站base，绝对路径，常用于客户端js ex. http://me.maykeys.com/bo */
	public static String wbase="";
	/**其它系统从前端转向的密码串在启动时会放*/
	public static String zresmd5pwd="";

	
	/**用户模板相对WEB-INF的路径，供freemarkerCfg使用, ex:/t*/
	public static String tplAbsPath="/pages/t";


	/**用户模板路径，相对网站根目录路径，WEB-INF在servlet.xml中，被设置为freemarkerCfg的管理路径*/
	public static String tplPath="/WEB-INF"+tplAbsPath;

	/**目前使用的模板 ex:/模板1*/
	public static String tplUsed="/mb1";
	
	/**网站URL-用户资源路径，相对于根目录*/
	public static String resUserUrl="/ru";

	/**生成的页面相对网站的路径, ex:/ru/w		 */
	public static String frontPath="/ru/w";
	/**生成的页面相对网站的路径mobile版, ex:/ru/m		 */
	public static String frontPathm="/ru/m";
	/**生成的用户相册页面文件夹名称 /pu*/
	public static String frontPathUserPhoto="/pu";

	/**网站URL-ckfinder地址*/
	public static String zres="/zres";//http://192.168.1.193/zres
	
	/**上传路径*/
	public static String uploadUrl=resUserUrl+"/upload";
	
	/**IPSEEK的Dat文件，相对根目录路径*/
	public static String ipSeekerFile="/ipseek/QQWry.Dat";

	/**
	 * 全文检索索引路径 ex:/WEB-INF/lucene
	 */
	public static String LUCENE_PATH = "/lucene";
	/**
	 * 每页的记录数
	 */
	public static int PAGE_SIZE = 30;
	/**允许上传的图*/
	public static String imgExt="bmp,gif,jpg,jpeg,png";
	
	/**允许管理员上传的文件*/
	public static String uploadAdminFileExt="htm,html,css,js,rar";
	
	/**出错页面*/
	public static String ERRPAGE="/error/err.html";
	/**出错，弹窗，关闭*/
	public static String ERRCLOSEPAGE="/error/errClose.html";
	/**
	/**
	 * 初始化
	 */
	public static void init(){

	}
	
	
	
	
	
	public static String getTplAbsPath() {
		return tplAbsPath;
	}





	public static void setTplAbsPath(String tplAbsPath) {
		Conf.tplAbsPath = tplAbsPath;
	}





	public static String getTplPath() {
		return tplPath;
	}





	public static void setTplPath(String tplPath) {
		Conf.tplPath = tplPath;
	}





	public static String getTplUsed() {
		return tplUsed;
	}





	public static void setTplUsed(String tplUsed) {
		Conf.tplUsed = tplUsed;
	}





	public static String getResUserUrl() {
		return resUserUrl;
	}





	public static void setResUserUrl(String resUserUrl) {
		Conf.resUserUrl = resUserUrl;
	}





	public static String getFrontPath() {
		return frontPath;
	}





	public static void setFrontPath(String frontPath) {
		Conf.frontPath = frontPath;
	}





	public static String getFrontPathm() {
		return frontPathm;
	}





	public static void setFrontPathm(String frontPathm) {
		Conf.frontPathm = frontPathm;
	}





	public static String getZres() {
		return zres;
	}






	public static void setZres(String zres) {
		Conf.zres = zres;
	}





	public static String getUploadUrl() {
		return uploadUrl;
	}





	public static void setUploadUrl(String uploadUrl) {
		Conf.uploadUrl = uploadUrl;
	}





	public static String getIpSeekerFile() {
		return ipSeekerFile;
	}





	public static void setIpSeekerFile(String ipSeekerFile) {
		Conf.ipSeekerFile = ipSeekerFile;
	}





	public static String getLUCENE_PATH() {
		return LUCENE_PATH;
	}





	public static void setLUCENE_PATH(String lUCENE_PATH) {
		LUCENE_PATH = lUCENE_PATH;
	}





	public static int getPAGE_SIZE() {
		return PAGE_SIZE;
	}





	public static void setPAGE_SIZE(int pAGE_SIZE) {
		PAGE_SIZE = pAGE_SIZE;
	}





	public static String getImgExt() {
		return imgExt;
	}





	public static void setImgExt(String imgExt) {
		Conf.imgExt = imgExt;
	}





	public static String getUploadAdminFileExt() {
		return uploadAdminFileExt;
	}





	public static void setUploadAdminFileExt(String uploadAdminFileExt) {
		Conf.uploadAdminFileExt = uploadAdminFileExt;
	}





	public static String getERRPAGE() {
		return ERRPAGE;
	}





	public static void setERRPAGE(String eRRPAGE) {
		ERRPAGE = eRRPAGE;
	}





	public static String getERRCLOSEPAGE() {
		return ERRCLOSEPAGE;
	}





	public static void setERRCLOSEPAGE(String eRRCLOSEPAGE) {
		ERRCLOSEPAGE = eRRCLOSEPAGE;
	}





	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub

	}

}