package com.zhf.study.test.spec;



import org.springframework.beans.factory.annotation.Autowired;

import com.zmax.yijian.common.conf.Holo;

public class testzzzzzzz {
	@Autowired
	static Holo holo;
	static String a;
	public static String tes(){
		a=holo.getAge();
		return a;
	}
	public static void main(String[] args) {
		System.err.println(tes());
	}

}
