package com.zhf.study.test.spec;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Random;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.zhf.study.controller.base.BaseController;
import com.zhf.study.service.UserService;
import com.zhf.study.service.spec.SpecTestService;
import com.zhf.study.test.dao.base.BaseDao;
import com.zhf.study.test.entity.Holo;
import com.zhf.study.test.entity.User;
import com.zhf.study.use.tool.ToolsSpec;
import com.zmax.utils.easyui.Json;
import com.zmax.yijian.common.conf.SpCfg;
import com.zmax.yijian.common.conf.T;


	
/**
 * holo 
 * 测试controller
 */

@Controller
@RequestMapping("/")
public class SpecTestController extends BaseController{
	private static final Logger logger = Logger.getLogger(SpecTestController.class);
	
	@Autowired
	UserService userService;
	@Autowired
	SpecTestService specTestService;
	ToolsSpec toolsSpec;
	@Autowired
	T t;
	@RequestMapping(value="/pub/wx",method=RequestMethod.GET)
	public String axxxx(HttpServletRequest request,HttpServletResponse response,String love){
		int a=333;
		int radomInt = new Random().nextInt(9);
		logger.debug(radomInt);
		logger.debug(t.getAge());
		System.err.println(radomInt);
		System.err.println(t.getAge());
		String msg="123";
		User user=new User(radomInt, null, msg);
		userService.save(user);
		logger.debug(t.getAge());
		//重定向
		return "/user/index";
	}
	/*@ResponseBody
		作用：
  		该注解用于将Controller的方法返回的对象，通过适当的HttpMessageConverter转换为指定格式后，写入到Response对象的body数据区。使用时机：
  		返回的数据不是html标签的页面，而是其他某种格式的数据时（如json、xml等）使用；*/
	@RequestMapping(value="/rest/holo/newget",method=RequestMethod.POST)
	@ResponseBody
	public Holo newget(HttpServletRequest request,HttpServletResponse response) {
		logger.debug("diudidu");
		List<Holo> list=new ArrayList<Holo>();
		int radomInt = new Random().nextInt(9);
		String msg="东临碣石，以观沧海";
		Holo holo=new Holo(radomInt, new Date(), msg, "18368085216", "zhf1994", 1);
		list.add(holo);
		return holo;
		//writeJson(request, response, list);
		//return new Json(false,"系统权限限止此项操作，请联系管理员");
	}
	@RequestMapping(value="/pub/email",method=RequestMethod.GET)
	public void email(HttpServletRequest request,HttpServletResponse response,String love){
		try {
			specTestService.robotUser();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		System.out.println(love);
		
	}
	@RequestMapping(value="/pub/reg2",method=RequestMethod.GET)
	public String dsadad(HttpServletRequest request,HttpServletResponse response,String love){
		System.out.println(love);
		return "/pub/reg2";
	}
	/**
	 * 图片上传
	 */
	public static void main(String[] args) {
		int radomInt = new Random().nextInt(9);
		String msg="123";
		User user=new User(radomInt, null, msg);
		System.out.println(user.getMsg());
	}
}
