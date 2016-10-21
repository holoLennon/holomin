package holo;

/**
 * 单例模式 designpatters
 * 
 * @author Holo
 *
 */
public class SingletonOfDesignPatterns {
	// Singleton 单身
	// instance 例子
	/* 持有私有静态实例，防止被引用，此处赋值为null，目的是实现延迟加载 */
	private static SingletonOfDesignPatterns instance = null;

	/* 私有构造方法，防止被实例化 */
	private SingletonOfDesignPatterns() {

	}

	// 多線程下需要加鎖
	public static SingletonOfDesignPatterns getInstance() {

		if (instance == null) {
			synchronized (instance) {
				/*
				 * a>A、B线程同时进入了第一个if判断
				 * 
				 * b>A首先进入synchronized块，由于instance为null，所以它执行instance = new
				 * Singleton();
				 * 
				 * c>由于JVM内部的优化机制，JVM先画出了一些分配给Singleton实例的空白内存，并赋值给instance成员（
				 * 注意此时JVM没有开始初始化这个实例），然后A离开了synchronized块。
				 * 
				 * d>B进入synchronized块，由于instance此时不是null，
				 * 因此它马上离开了synchronized块并将结果返回给调用该方法的程序。
				 * 
				 * e>此时B线程打算使用Singleton实例，却发现它没有被初始化，于是错误发生了。
				 */
				// 意思是先分配给Singleton实例的空白内存，instance ，后进行new
				// SingletonOfDesignPatterns() 初始化实例;
				instance = new SingletonOfDesignPatterns();
			}
		}
		return instance;
	}

	/* 如果该对象被用于序列化，可以保证对象在序列化前后保持一致 */
	public Object readResolve() {
		return instance;
	}
//以下优化方案---------------------------------------------------------------
	/* 此处使用一个内部类来维护单例 */
	private static class SingletonFactory {
		private static SingletonOfDesignPatterns instance = new SingletonOfDesignPatterns();
	}
	 /* 获取实例 */  
	public static SingletonOfDesignPatterns getInstance2() {
		return SingletonFactory.instance;
	}

}
