/*
 * zmax 
 * 
 */

package com.zhf.study.test.spec;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Random;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.zhf.study.test.entity.Holo;

/**
 * RestFul控制 
 * 医生会员
 * 
 *
 */

//@RequestMapping("/rest/Holo")
public class HoloRestController {
	/** 日志实例 */
	private static final Logger logger = Logger.getLogger(HoloRestController.class);
	@RequestMapping(value = "/newget", method = RequestMethod.GET)
	@ResponseBody
	public List<Holo> newget(HttpServletRequest request,HttpServletResponse response) {
		logger.debug("diudidu");
		List<Holo> list=new ArrayList<Holo>();
		int radomInt = new Random().nextInt(9);
		String msg="东临碣石，以观沧海";
		Holo holo=new Holo(radomInt, new Date(), msg, "18368085216", "zhf1994", 1);
		list.add(holo);
		return list;
	}
	
}
