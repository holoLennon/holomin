package com.zhf.study.test.entity;

public class Weather {
	private static String city;
	private static String AQI;
	private static String quality;
	private static String date;
	public static String getCity() {
		return city;
	}
	public static void setCity(String city) {
		Weather.city = city;
	}
	public static String getAQI() {
		return AQI;
	}
	public static void setAQI(String aQI) {
		AQI = aQI;
	}
	public static String getQuality() {
		return quality;
	}
	public static void setQuality(String quality) {
		Weather.quality = quality;
	}
	public static String getDate() {
		return date;
	}
	public static void setDate(String date) {
		Weather.date = date;
	}

}
