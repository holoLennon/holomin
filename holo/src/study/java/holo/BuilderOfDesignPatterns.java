package holo;

import java.util.ArrayList;
import java.util.List;

import holo.IntroductionOfDesignPatternsBean.Sender;

public class BuilderOfDesignPatterns {
	// 创造者模式
	public BuilderOfDesignPatterns() {
		// TODO Auto-generated constructor stub
	}
	//两个实现类 一个借口。
	public interface Sender {
		public void Send();
	}

	public static class MailSender implements Sender {
		@Override
		public void Send() {
			System.out.println("this is mailsender!");
		}
	}
	public static class SmsSender implements Sender {
		@Override
		public void Send() {
			System.out.println("this is sms sender!");
		}
	}
	
/*	从这点看出，建造者模式将很多功能集成到一个类里，这个类可以创造出比较复杂的东西。所以与工程模式的区别就是：
 * 工厂模式关注的是创建单个产品，而建造者模式则关注创建符合对象，多个部分。因此，是选择工厂模式还是建造者模式，依实际情况而定。*/
	private List<Sender> list = new ArrayList<Sender>();  
    
    public void produceMailSender(int count){  
        for(int i=0; i<count; i++){  
            list.add(new MailSender());  
        }  
    }  
      
    public void produceSmsSender(int count){  
        for(int i=0; i<count; i++){  
            list.add(new SmsSender());  
        }  
    }  
    public static void main(String[] args) {
    	BuilderOfDesignPatterns builder = new BuilderOfDesignPatterns();  
    	builder.produceMailSender(10);
  
	}


}
