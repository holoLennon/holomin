package holo;

import holo.IntroductionOfDesignPatternsBean.Sender;
/**
 * 抽象类工厂模式
 * @author Holo
 *
 */

public class IntroductionOfAbstractFactory {
    public interface Sender {  
        public void Send();  
    }  

    public interface Provider {  
        public Sender produce();  
    }  

    //mail发送
    public static class MailSender implements Sender {  
    	@Override  
        public void Send() {  
    		System.out.println("this is mail sender!");  
        }  
    }
    //sms发送 
    public static class SmsSender implements Sender {  
        @Override  
        public void Send() {  
            System.out.println("this is sms sender!");  
        }  
    } 
    //test
    public static class TestSender implements Sender {  
        @Override  
        public void Send() {  
            System.out.println("this is a test!");  
        }  
    } 
    public static class SendMailFactory implements Provider {  
        
        @Override  
        public  Sender produce(){  
            return new MailSender();  
        }  
    } 

    public class SendSmsFactory implements Provider{  
      
        @Override  
        public Sender produce() {  
            return new SmsSender();  
        }  
    }  

    //抽象类实现接口时可以不重写方法！
    //抽象方法意味着只是在此类（接口）中定义，要求子类完成功能   不建议使用static方法
    public  abstract class  AbsSender implements Provider{
	   
   }
    //子类
    public  class SonAbsSender extends AbsSender{
    	@Override
    	public Sender produce(){
    		return new TestSender();  
    	}
    }    

    static int a;
    int b;
      
        public static void main(String[] args) {  
        	  Provider provider = new SendMailFactory();  
        	  //在静态方法内 调用内部动态类 需要先创建外部类
            Provider provider2 = new IntroductionOfAbstractFactory().new SonAbsSender();
            Sender sender = provider.produce();  
            Sender sender2 = provider2.produce();  
            sender.Send();  
            sender2.Send();
            System.err.println(IntroductionOfAbstractFactory.a);
        }


}
