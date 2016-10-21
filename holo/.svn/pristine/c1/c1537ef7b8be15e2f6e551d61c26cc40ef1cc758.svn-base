package com.zmax.yijian.web.ftl;
/**
 * freemarker的工具类，都放在此目录下，这是一个演示。
 */
import java.io.IOException;
import java.io.Writer;
import java.util.Map;

import org.springframework.stereotype.Component;

import com.zmax.zbabi.freemarker.BodyDirectiver;
import com.zmax.zbabi.freemarker.BodyWriter;
import com.zmax.zbabi.freemarker.DirectiveUtils;
import com.zmax.utils.string.HtmlStrUtils;

import freemarker.core.Environment;
import freemarker.template.TemplateDirectiveBody;
import freemarker.template.TemplateDirectiveModel;
import freemarker.template.TemplateException;
import freemarker.template.TemplateModel;
/**
 * 示例：
 * 字符切断之BODY版
 * <br/><\@ztTest len=5 append="...">
 * <br/>需要被切的内容
 * <br/></\@ztTest>
 * 
 * @author zmax
 *
 */

@Component
public class ZtTest implements TemplateDirectiveModel,BodyDirectiver{
	public static final String PARAM_LEN = "len";
	public static final String PARAM_APPEND = "append";
	@Override
	public void execute(Environment env, Map params, TemplateModel[] tm,
			TemplateDirectiveBody body) throws TemplateException, IOException {

		Writer out = env.getOut();

		Integer len = DirectiveUtils.getInt(PARAM_LEN, params);
		String append = DirectiveUtils.getString(PARAM_APPEND, params);

		BodyWriter mout=new BodyWriter(out,this,new Object[]{len,append});

		if (body != null) {
			body.render(mout);
		}
	}
	@Override
	public String calcBody(String src, Object[] params) {
		Integer len1=0;
		String append="...";
		if(params.length>0)len1=(Integer)params[0];
		if(params.length>1)append=(String)params[1];;
		return HtmlStrUtils.textCut(src, len1, append);
	}
}
