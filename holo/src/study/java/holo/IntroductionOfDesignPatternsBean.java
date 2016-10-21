package holo;
/**
 * 设计模式入门
 *  工厂方法模式（Factory Method）
 *  //普通工厂模式，就是建立一个工厂类，对实现了同一接口的一些类进行实例的创建
 *  // 静态工厂模式
 * @author Holo
 *
 */
public class IntroductionOfDesignPatternsBean {
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
	public static class SendFactory {   
	    public static Sender produce(String type) {  
	        if ("mail".equals(type)) {  
	            return new MailSender();  
	        } else if ("sms".equals(type)) {  
	            return new SmsSender();  
	        } else {  
	            System.out.println("请输入正确的类型!");  
	            return null;  
	        }  
	    }  
	} 
	
}

