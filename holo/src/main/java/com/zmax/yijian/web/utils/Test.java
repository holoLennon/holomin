package com.zmax.yijian.web.utils;



import java.math.BigInteger;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Scanner;

import com.zmax.utils.page.Pagination;
//import com.zmax.yijian.common.dal.bean.User;
import com.zmax.utils.string.JsonUtil;

public class Test {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		//args  其实接受的是一个命令行参数
		// TODO Auto-generated method stub
		testArray();
	}
	public static void testJson(){
		int a=100_11_1111;
		int c=0b1001;
		System.out.println(c);
		String json="{\"firstPage\":true,\"firstResult\":0,\"lastPage\":true,\"list\":[{\"bclass\":null,\"bclassId\":3,\"bclasss\":[],\"gmtCreate\":{\"date\":11,\"day\":4,\"hours\":20,\"minutes\":25,\"month\":9,\"nanos\":0,\"seconds\":25,\"time\":1349958325000,\"timezoneOffset\":-480,\"year\":112},\"gmtCreateString\":\"2012-10-11\",\"gmtModified\":{\"date\":12,\"day\":5,\"hours\":16,\"minutes\":6,\"month\":9,\"nanos\":0,\"seconds\":36,\"time\":1350029196000,\"timezoneOffset\":-480,\"year\":112},\"gmtModifiedString\":\"2012-10-12\",\"gradeid\":2,\"gradeidString\":\"\",\"id\":2,\"inschool\":null,\"inschools\":[],\"myname\":\"小朋\",\"parents\":null,\"parentss\":[],\"school\":null,\"schoolId\":1,\"schools\":[],\"status\":1,\"statusList\":null,\"statusString\":\"\",\"studentExt\":null,\"studentExts\":[],\"user\":null,\"userId\":1,\"users\":[],\"xbm\":\"2\",\"xbmMap\":{},\"xbmString\":\"\",\"xh\":\"2\",\"xm\":\"小朋\",\"xzqhm\":\"431230\",\"xzqhmString\":\"\"}],\"nextPage\":1,\"pageNo\":1,\"pageSize\":1,\"prePage\":1,\"totalCount\":1,\"totalPage\":1}";
		//Map<String,Object> map=new HashMap<String,Object>();
/*
		map.put("list", Student.class);
		Pagination pageRet=(Pagination)JsonUtil.getDTO(json, Pagination.class,map);
		List listStudent=pageRet.getList()0;
		for (Object object : listStudent) {
			User cst=(User)object;
			System.out.println(cst);
		}
*/
	}
	public static void testSystemIn(){
		Scanner in =new Scanner(System.in);
		System.err.println("1+1=?");
		String name=in.nextLine();
		System.err.println(System.in);
		BigInteger b1=new BigInteger("123132131323123133212321412414214");
		System.err.println(b1);
	}
	public static void testArray(){
		int[] a;
		int[] b={1,23,434,5,6,77,3};
		//遍历方式1
		for(int c:b){
			System.out.println(c);
		}
		//遍历方式2
		Arrays.toString(b);
		//排序
		Arrays.sort(b);
		//System.out.println(	Arrays.toString(b));
	}
}
