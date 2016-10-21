package holo;
/**
 * 桥接模式
 * 将抽象化与实现化解耦，使得二者可以独立变化
 * 例如jdbc连接数据库,数据库之间进行切换
 * @author Holo
 *
 */
public class BridgeOfDesignPatters {

	public BridgeOfDesignPatters() {
		// TODO Auto-generated constructor stub
	}
	//一个接口 两个实现类
    public interface Sourceable {  
        public void method();  
    }  

    public static class SourceSub1 implements Sourceable {  
      
        @Override  
        public void method() {  
            System.out.println("this is the first sub!");  
        }  
    }  
    public static class SourceSub2 implements Sourceable {  
      
        @Override  
        public void method() {  
            System.out.println("this is the second sub!");  
        }  
    }  
    //抽象 桥
    public abstract class Bridge {  
        private Sourceable source;  
      
        public void method(){  
            source.method();  
        }  
          
        public Sourceable getSource() {  
            return source;  
        }  
      
        public void setSource(Sourceable source) {  
            this.source = source;  
        }  
    }  

    public class MyBridge extends Bridge {  
        public void method(){  
            getSource().method();  
        }  
    }  
    public static void main(String[] args) {  
        
        Bridge bridge = new BridgeOfDesignPatters().new MyBridge();  
          
        /*调用第一个对象*/  
        Sourceable source1 = new SourceSub1();  
        bridge.setSource(source1);  
        bridge.method();  
          
        /*调用第二个对象*/  
        Sourceable source2 = new SourceSub2();  
        bridge.setSource(source2);  
        bridge.method();  
    }  
    





}
