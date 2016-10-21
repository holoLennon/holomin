package com.zhf.study.test.spec;


import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.text.MessageFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Enumeration;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileItemIterator;
import org.apache.commons.fileupload.FileItemStream;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.commons.io.FileUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.web.multipart.MultipartFile;

import com.alibaba.fastjson.JSON;
import com.zhf.study.test.entity.Holo;
import com.zhf.study.test.entity.User;
import com.zmax.entity.angularjsFileUpload.AngularFileUpEnt;
import com.zmax.entity.angularjsFileUpload.AngularRet;
import com.zmax.entity.angularjsFileUpload.ArFieldNameValue;
import com.zmax.utils.easyui.Json;
import com.zmax.utils.file.FileNameUtils;
import com.zmax.yijian.common.conf.Conf;
import com.zmax.yijian.web.utils.SpringInit;
import com.zmax.zbabi.files.FileRepository;

/**
 * AngularJs版的文件上传Servlet
 * 顺序：
 * get upload?name=xxx.jpg 响应：{"size":"0"}
 * 【
 * post upload 响应：{"result":[{"fieldName":"_chunkSize","value":"100000"},{"fieldName":"_currentChunkSize","value":"100000"
},{"fieldName":"_chunkNumber","value":"0"},{"fieldName":"_totalSize","value":"232779"},{"fieldName":"file"
,"name":"xxx.jpg","size":"100000"}]}
 * options upload 响应：{"result":[{"size":"0"}]}
 * 】
 * 最后一次post的响应，多出fieldName:url做为结束标识：{"result":[{"fieldName":"_chunkSize","value":"100000"},{"fieldName":"_currentChunkSize","value":"32779"
},{"fieldName":"_chunkNumber","value":"2"},{"fieldName":"_totalSize","value":"232779"},{"fieldName":"file"
,"name":"baby.gif","size":"32779"},{"fieldName":"url","value":"/userfiles/users/0/files/201606/20160612173152y9qt
.gif"}]}
 * 页面上是先post后options的，但后台没有特别明显的顺序。
 * 有
 * @author Administrator
 *
 */
public class FileUploadAngularServlet extends HttpServlet {
	private static final long serialVersionUID = -8244073279641189889L;
	/** 日志实例 */
	private static final Logger logger = Logger.getLogger(FileUploadAngularServlet.class);


	/**key=ipAddress + req.getParameter("name") */
	static Map<String, AngularFileUpEnt> sizeMap2 = new ConcurrentHashMap<>();
	int counter;
	@Override
	protected void service(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
		service2(req, res);
	} 

	//@Override
	protected void service2(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
		try {
			clearOldValuesInSizeMap2();
			String name=req.getParameter("name");
			if (logger.isDebugEnabled())
				logger.debug("Method:"+req.getMethod()+",filename=" + name);

			String ipAddress = req.getHeader("X-FORWARDED-FOR");
			if (ipAddress == null) {
				ipAddress = req.getRemoteAddr();
			}
			AngularFileUpEnt entry = sizeMap2.get(ipAddress + name);
			if(entry==null && name!=null){
				entry=new AngularFileUpEnt();
				String msg="东临碣石，以观沧海";
				Holo holo=new Holo(1, new Date(), msg, "18368085216", "zhf1994", 1);
				entry.setHolo(holo);
				sizeMap2.put(ipAddress + name, entry);
				if (logger.isDebugEnabled())
					logger.debug("put:ipAddress + name=" + ipAddress + name);
			}

			req.setCharacterEncoding("utf-8");
			res.setCharacterEncoding("utf-8");
			//响应 GET
			if (req.getMethod().equalsIgnoreCase("GET")) {
				actGet(req, res, ipAddress, entry);
				return;
			}
			//响应 OPTIONS
			if (req.getMethod().equalsIgnoreCase("OPTIONS")) {
				actOptions(res);
				return;
			}


			//响应返回错误指令
			if (!"OPTIONS".equalsIgnoreCase(req.getMethod()) && req.getParameter("errorCode") != null) {
				//				res.getWriter().write(req.getParameter("errorMessage"));
				//				res.getWriter().flush();
				res.sendError(Integer.parseInt(req.getParameter("errorCode")), req.getParameter("errorMessage"));
				return;
			}

			//响应POST文件指令
			AngularRet ar=new AngularRet();

			if (req.getHeader("Content-Type") != null
					&& req.getHeader("Content-Type").startsWith("multipart/form-data")) {
				//POST
				entry=putContent(ipAddress, ar, req);
			} else {
				//OPTIONS				
				if (logger.isDebugEnabled())logger.debug("OPTIONS,Content-Type == null");
				//putBuff(entry, req.getInputStream(),false);
			}

			if(entry!=null){
				if (logger.isDebugEnabled())
					logger.debug("entry=" + entry.toString());		
				if(entry.isFinished()){

					writeDisk(entry);
					//上传结束后，会返回给页面，key="url",value="/aaa/bbb/ccc.jpg"
					ar.getResult().add(new ArFieldNameValue("url",entry.getWritefilename()));
					if (logger.isDebugEnabled())
						logger.debug("isFinished=" + entry.toString());		
				}
			}


			res.getWriter().write(JSON.toJSONString(ar));

		} catch (Exception ex) {
			throw new ServletException(ex);
		}
	}

	/**
	 * 清除缓存Map
	 */
	private void clearOldValuesInSizeMap2() {
		if (counter++ == 100) {
			for (Map.Entry<String, AngularFileUpEnt> entry : sizeMap2.entrySet()) {
				//删除1小时前的数据
				if (new Date().getTime()-entry.getValue().getGmtCreate().getTime()>60*60*1000) {
					if (logger.isDebugEnabled())
						logger.debug("sizeMap.remove:"+entry.getKey());
					sizeMap2.remove(entry.getKey());
				}
			}
			counter = 0;
		}
	}
	/**
	 * 响应GET指令
	 * @param req
	 * @param res
	 * @param ipAddress
	 * @param entry
	 * @throws IOException 
	 */
	private void actGet(HttpServletRequest req, HttpServletResponse res,String ipAddress,AngularFileUpEnt entry) throws IOException,Exception{
		String name=req.getParameter("name");
		if(entry!=null){
			//清空重建个
			sizeMap2.remove(ipAddress + name);
			entry=new AngularFileUpEnt();
			String msg="东临碣石，以观沧海";
			Holo holo=new Holo(1, new Date(), msg, "18368085216", "zhf1994", 1);
			entry.setHolo(holo);
			sizeMap2.put(ipAddress + name, entry);
		}
		if (req.getParameter("restart") != null) {
			sizeMap2.remove(ipAddress + name);
		}                
		res.setContentType("application/json");
		res.getWriter().write(JSON.toJSONString(new ArFieldNameValue("0")));
	}
	/**
	 * 响应OPTIONS指令
	 * @param res
	 * @throws IOException
	 */
	private void actOptions(HttpServletResponse res) throws IOException{
		AngularRet ar=new AngularRet();
		ar.getResult().add(new ArFieldNameValue("0"));
		res.getWriter().write(JSON.toJSONString(ar));
	}
	/**
	 * 读POST的文件数据，写到AngularFileUpEnt，并且返回
	 * @param ipAddress
	 * @param sb
	 * @param req
	 * @return
	 * @throws FileUploadException
	 * @throws IOException
	 */
	private AngularFileUpEnt putContent(String ipAddress,AngularRet ar,HttpServletRequest req) throws FileUploadException, IOException{
		AngularFileUpEnt tmp = new AngularFileUpEnt();
		AngularFileUpEnt entry=null;
		ServletFileUpload upload = new ServletFileUpload();

		FileItemIterator iterator = upload.getItemIterator(req);

		while (iterator.hasNext()) {
			FileItemStream item = iterator.next();

			String fieldName=item.getFieldName();
			String name=item.getName();
			String cvalue="";


			if (name != null) {
				tmp.setFilename(name);
				//文件名不空的时候，就从MAP中取出

				entry = sizeMap2.get(ipAddress + name);
				if(entry==null && name!=null){
					entry=new AngularFileUpEnt();
					sizeMap2.put(ipAddress + name, entry);
					if (logger.isDebugEnabled())
						logger.debug("put:ipAddress + name=" + ipAddress + name);
				}

				int size=putBuff(tmp, item.openStream(), true);
				ar.getResult().add(new ArFieldNameValue("file", name,""+size));

			} else {
				cvalue=read(item.openStream()).replace("\"", "'");
				ar.getResult().add(new ArFieldNameValue(fieldName,cvalue));
			}
			//每段最大尺寸
			if(fieldName.equals("_chunkSize")){
				tmp.set_chunkSize(valueOfStr(cvalue));
			}
			//当前段尺寸
			if(fieldName.equals("_currentChunkSize")){
				tmp.set_currentChunkSize(valueOfStr(cvalue));
			}
			//已经有多少段了
			if(fieldName.equals("_chunkNumber")){
				tmp.set_chunkNumber(valueOfStr(cvalue));
			}          
			//总容量
			if(fieldName.equals("_totalSize")){
				tmp.set_totalSize(valueOfStr(cvalue));
			}   

		}

		entry.set_chunkSize(tmp.get_chunkSize());
		entry.set_currentChunkSize(tmp.get_currentChunkSize());
		entry.set_chunkNumber(tmp.get_chunkNumber());
		entry.set_totalSize(tmp.get_totalSize());
		entry.setFilename(tmp.getFilename());
		entry.setSize(entry.getSize()+tmp.getSize());
		entry.getList().addAll(tmp.getList());

		return entry;
	}

	/**
	 * 
	 * @param entry
	 * @param stream
	 * @param isAdd
	 * @return
	 */
	protected int putBuff(AngularFileUpEnt entry, InputStream stream,boolean isAdd) {
		int length=0;
		int size=0;
		byte[] buffer = new byte[200000];
		byte[] dest=new byte[0];

		try {
			while ((size = stream.read(buffer)) != -1) {
				length += size;
				//				for (int i = 0; i < 10; i++) {
				//					System.out.print(","+(int) buffer[i]);
				//				}
				//				System.out.println("=============("+size+")");
				dest=byteAppend(dest ,buffer, size);
			}
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
		if(entry!=null)
			entry.setSize(entry.getSize()+length);

		if(isAdd && length>0 &&entry!=null)
			entry.getList().add(dest);
		if (logger.isDebugEnabled())
			logger.debug("length=" + length);
		return length;
	}
	/**
	 * 读数据转成文本
	 * @param stream
	 * @return String 
	 */
	protected String read(InputStream stream) {
		StringBuilder sb = new StringBuilder();
		BufferedReader reader = new BufferedReader(new InputStreamReader(stream));
		try {
			String line;
			while ((line = reader.readLine()) != null) {
				sb.append(line);
			}
		} catch (IOException e) {
			throw new RuntimeException(e);
		} finally {
			try {
				reader.close();
			} catch (IOException e) {
				//ignore
			}
		}
		return sb.toString();
	}
	/**
	 * 文本转整数，如果是""，错误之类就返回0
	 * @param str
	 * @return
	 */
	public static int valueOfStr(String str){
		if(StringUtils.isBlank(str))
			return 0;
		try {
			return Integer.valueOf(str);
		} catch (NumberFormatException e) {
			// TODO Auto-generated catch block
			//e.printStackTrace();
			return 0;
		}
	}
	/**
	 * 写文件到硬盘
	 * @param entry
	 */
	private void writeDisk(AngularFileUpEnt entry){
		String sdest=null;
		Holo holo=entry.getHolo();
        System.err.println(123);
        // fileUuploadPath="/userfiles/users/{0}/files/{1}";
		sdest=MessageFormat.format(Conf.fileUuploadPath,holo.getId(),new SimpleDateFormat("yyyyMM").format(new Date()))
				+"/"+entry.getFilename();
		// ex./zweb//userfiles/users/2/201409/20140931235959abcd.png
		sdest=FileNameUtils.generateRandomUrlYMdHms(sdest);
		entry.setWritefilename(sdest);
		FileRepository fileRepository=(FileRepository)SpringInit.getCtx().getBean("fileRepository");
		File dest=fileRepository.retrieve(sdest);
		if(dest.exists())dest.delete();

		//目标目录的父目录，不存在则创建
		if (!dest.getParentFile().exists()) 
			dest.getParentFile().mkdirs();
		try {
			FileOutputStream fos = new FileOutputStream(dest);
			for (byte[] data : entry.getList()) {
				//FileUtils.writeByteArrayToFile(dest, data, true);	
				fos.write(data);
			}
			fos.close();

		} catch (Exception e) {
			throw new RuntimeException(e);
		}


	}

	/**
	 * 合并byte , src=src+append[len]
	 * @param src 源
	 * @param append 增加的
	 * @param len 增加的长度
	 * @return src+append
	 */
	public static byte[] byteAppend( byte[] src,byte[] append,int len) {
		if(len==-1)
			return src;
		byte[] newByte = new byte[len + src.length];
		System.arraycopy(src, 0, newByte, 0, src.length);
		System.arraycopy(append, 0, newByte, src.length, len);
		return newByte;
	}



}


