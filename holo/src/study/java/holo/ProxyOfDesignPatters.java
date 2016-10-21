package holo;

import holo.DecoratorOfDesignPatterns.Sourceable;

/**
 * 代理模式 proxyofdesignpatters
 * 和装饰模式类似
 * @author Holo
1、修改原有的方法来适应。这样违反了“对扩展开放，对修改关闭”的原则。
2、就是采用一个代理类调用原有的方法，且对产生的结果进行控制。这种方法就是代理模式。
 *
 */
public class ProxyOfDesignPatters {

	public ProxyOfDesignPatters() {
		// TODO Auto-generated constructor stub
	}

	// 一个接口 一个实现类
	public interface Sourceable {
		public void method();
	}

	// 实现接口 重写方法
	public static class Source implements Sourceable {

		@Override
		public void method() {
			System.out.println("the original method!");
		}
	}

	public class Proxy implements Sourceable {

		private Source source;

		public Proxy() {
			super();
			this.source = new Source();
		}

		@Override
		public void method() {
			before();
			source.method();
			atfer();
		}

		private void atfer() {
			System.out.println("after proxy!");
		}

		private void before() {
			System.out.println("before proxy!");
		}
	}

}
