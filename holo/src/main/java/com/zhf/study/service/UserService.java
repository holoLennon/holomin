package com.zhf.study.service;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import com.zhf.study.test.dao.base.BaseDao;
import com.zhf.study.test.entity.User;
@Service
public class UserService extends BaseDao<User>{
	private static final Logger logger=Logger.getLogger(UserService.class);
	public void holo(){
		
	}
}