package holo;
//实现Cloneable借口 目的是运行时通知虚拟机可以安全地在实现了此接口的类上使用clone方法
public class PrototypeOfDesignPatterns implements Cloneable {

	// 原型类 
	//重写Object类中的clone方法。
	public Object clone() throws CloneNotSupportedException {
		PrototypeOfDesignPatterns proto = (PrototypeOfDesignPatterns) super
				.clone();
		return proto;
	}

}
