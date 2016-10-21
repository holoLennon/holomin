package holo;


import java.net.URL;

import org.apache.http.client.methods.HttpUriRequest;
import org.apache.http.client.methods.RequestBuilder;

import com.zhf.study.beanUtils.my.HttpJsonToClass;
import com.zhf.study.test.entity.Weather;
import com.zmax.utils.file.localhttp.LocalHttpClient;


public class TestHttp {
	protected static final String BASE_URI="http://web.juhe.cn:8080/environment/air/cityair";
	public static void main(String[] args) {
		HttpUriRequest httpUriRequest = RequestBuilder.get()
				.setUri(BASE_URI )
				.addParameter("city", "hanzhou")
				.addParameter("key", "61178e70ade74cb64a01a14a0a57f380")
				.build();
		System.err.println(httpUriRequest);
		//URL url=new URL(httpUriRequest);
		//return HttpJsonToClass.executeJsonResult(httpUriRequest,Weather.class);
	}
}
