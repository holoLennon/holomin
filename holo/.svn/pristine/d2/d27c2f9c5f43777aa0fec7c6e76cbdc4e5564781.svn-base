package com.zmax.utils;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class StringUtilz1 {
	/**
	 * 检查是否为手机号
	 * 13* 15* 18*
	 * @param mobiles
	 * @return boolean
	 */
	public static boolean isMobileNO(String mobiles){  
		//Pattern p = Pattern.compile("^((13[0-9])|(15[^4,\\D])|(18[0,5-9]))\\d{8}$");  
		Pattern p = Pattern.compile("^((13[0-9])|(15[0-9])|(17[0-9])|(18[0-9])|(10[0-9]))\\d{8}$");
		Matcher m = p.matcher(mobiles);  
		return m.matches();  
	} 


	/**
	 * 替换一个字符串中的某些指定字符
	 * @param strData String 原始字符串
	 * @param regex String 要替换的字符串
	 * @param replacement String 替代字符串
	 * @return String 替换后的字符串
	 */
	public static String replaceXmlString(String strData, String regex,
			String replacement)
	{
		if (strData == null)
		{
			return null;
		}
		int index;
		index = strData.indexOf(regex);
		String strNew = "";
		if (index >= 0)
		{
			while (index >= 0)
			{
				strNew += strData.substring(0, index) + replacement;
				strData = strData.substring(index + regex.length());
				index = strData.indexOf(regex);
			}
			strNew += strData;
			return strNew;
		}
		return strData;
	}

	/**
	 * 替换字符串中特殊字符
	 */
	public static String encodeXml(String strData){
		if (strData == null)
		{
			return "";
		}
		strData = replaceXmlString(strData, "&", "&amp;");
		strData = replaceXmlString(strData, "<", "&lt;");
		strData = replaceXmlString(strData, ">", "&gt;");
		strData = replaceXmlString(strData, "&apos;", "&apos;");
		strData = replaceXmlString(strData, "\"", "&quot;");
		return strData;
	}

	/**
	 * 还原字符串中特殊字符
	 */
	public static String decodeXml(String strData){
		strData = replaceXmlString(strData, "&lt;", "<");
		strData = replaceXmlString(strData, "&gt;", ">");
		strData = replaceXmlString(strData, "&apos;", "&apos;");
		strData = replaceXmlString(strData, "&quot;", "\"");
		strData = replaceXmlString(strData, "&amp;", "&");
		return strData;
	}
}
