package com.zmax.yijian.common.conf;

import java.text.DateFormat;
import java.text.SimpleDateFormat;

/**
 *整个应用通用的常量，静态常量不需变化
 *<br><b>类描述:</b>
 *<pre>|</pre>
 *@see
 *@since
 */
public class StaticZ
{
	/**字符集*/
	public final static String CHARSET = "UTF-8";
	
	/**给FileRepository用的文件MAP属性 名称*/
	public final static String KEY_FILE_NAME = "name";
	/**给FileRepository用的文件MAP属性  大小*/
	public final static String KEY_FILE_SIZE = "size";
	/**给FileRepository用的文件MAP属性  上次修改时间*/
	public final static String KEY_FILE_LAST = "last";
	
	public static final String FILEUPLOADADDRESS="upload";
	/**一般上传的路径 upload*/
	public static final String UPLOAD_FOLDER="/upload";
	/**上传临时路径*/
	public static final String UPLOAD_TMP="/upload/tmp";
	/**头像上传最终路径*/
	public static final String UPLOAD_HEADIMG="/upload/headimg";
	/**
	 * 日期格式化对象
	 */
	public static final DateFormat MONTH_FORMAT = new SimpleDateFormat(
			"/yyyyMM/ddHHmmss");
	/**时间格式*/
	public static final String yyyyMMddHHmmss="yyyy-MM-dd HH:mm:ss";
   /**
    * 用户对象放到Session中的键名称
    */
   public static final String USER_CONTEXT = "USER_CONTEXT";
   
   /**
    * 将登录前的URL放到Session中的键名称
    */
   public static final String LOGIN_TO_URL = "toUrl";
   
	/**生成的静态页面的扩展名*/
	public static final String HTM=".htm";
	/**生成的静态页面的首页前面名称*/
	public static final String INDEXB="index";
	/**生成的静态页面的首页名称*/
	public static final String INDEX=INDEXB+HTM;

	public static final String msgErr="失败！系统出现问题，请联系管理员";
}
