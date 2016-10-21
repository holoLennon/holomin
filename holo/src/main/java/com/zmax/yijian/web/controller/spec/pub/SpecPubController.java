package com.zmax.yijian.web.controller.spec.pub;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.zmax.yijian.web.controller.base.base.BaseController;

/**
 * 
 * <br>
 * <b>类描述:</b>
 * 
 * <pre>
 * 不用登录的页，如：登录，退出
 * 以及一些共用的页，如：出错页，成功页，消息页
 * </pre>
 * 
 * @see
 * @since
 */
@Controller
@RequestMapping("/")
public class SpecPubController extends BaseController{
	@RequestMapping(value="/a/b",method=RequestMethod.GET)
	public void asdad(){
		System.out.println("test success");
	}
	
}