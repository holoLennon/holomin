package com.zhf.study.test.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.Max;

import org.hibernate.validator.constraints.Length;
import org.springframework.format.annotation.DateTimeFormat;

import com.zhf.study.test.entity.base.BaseEntity;

public class Holo extends BaseEntity{
	@Max(99999999999L)
	@Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private int id;
    
	/**创建时间 Date   */
	
	@DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	private Date gmtCreate;
	
	@Length(max=400)
	/** 消息*/
	private String msg;
	
	@Length(max=400)
	/** 用户名*/
	private String username;
	
	@Length(max=400)
	/** 密码*/
	private String password;
	
	@Length(max=40)
	/** 神之匙*/
	private int holoId;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Date getGmtCreate() {
		return gmtCreate;
	}

	public void setGmtCreate(Date gmtCreate) {
		this.gmtCreate = gmtCreate;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public int getHoloId() {
		return holoId;
	}

	public void setHoloId(int holoId) {
		this.holoId = holoId;
	}

	public Holo(int id, Date gmtCreate, String msg, String username,
			String password, int holoId) {
		super();
		this.id = id;
		this.gmtCreate = gmtCreate;
		this.msg = msg;
		this.username = username;
		this.password = password;
		this.holoId = holoId;
	}

}
