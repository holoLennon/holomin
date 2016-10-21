package com.zhf.study.service.spec;

import java.util.Random;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zhf.study.service.UserService;
import com.zhf.study.test.entity.User;

@Service
public class SpecTestService {
	private static final Logger logger = Logger.getLogger(SpecTestService.class);

	@Autowired
	UserService userService;
	public void robotUser() throws Exception{
		//一天运行本代码的次数*100,
		int thisRunTimes=12*60*60*100/253;//17000//36000秒，每253秒运行一次，*100=14229
		int rbtDocnum=80;
		Random random = new Random();
		if(random.nextInt(thisRunTimes)>rbtDocnum*100){ 
				logger.debug("随机数说不要做");
				return;
		}
		createUser();
	}
	public void createUser(){
		int radomInt = new Random().nextInt(9);
		String msg="456";
		User user=new User(radomInt, null, msg);
		userService.save(user);
		 Email themail = new Email("smtp.sina.com");//这里以新浪邮箱为例子  
	        String mailbody = "对酒当歌，人生几何！譬如朝露，去日苦多。慨当以慷，忧思难忘。何以解忧？唯有杜康。青青子衿，悠悠我心。但为君故，沉吟至今。呦呦鹿鸣，食野之苹。我有嘉宾，鼓瑟吹笙。明明如月，何时可掇？忧从中来，不可断绝。越陌度阡，枉用相存。契阔谈讌，心念旧恩。月明星稀，乌鹊南飞。绕树三匝，何枝可依？山不厌高，海不厌深。周公吐哺，天下归心。 ";//邮件正文  
	        themail.setNeedAuth(true);  
	        themail.setSubject("JAVA发邮件的测试");//邮件主题  
	        themail.setBody(mailbody);//邮件正文  
	        themail.setTo("1571982027@qq.com");//收件人地址  
	        themail.setFrom("zhftest123456@sina.com");//发件人地址  
	        //themail.addFileAffix("F:/download/email.rar");// 附件文件路径,例如：C:/222.jpg,*注；"/"的写法； 如果没有可以不写  
	        themail.setNamePass("zhftest123456@sina.com", "zhf1994");//发件人地址和密码 **改为相应邮箱密码  
	        themail.sendout();  
	}

}
