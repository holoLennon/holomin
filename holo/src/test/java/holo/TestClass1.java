package holo;

import org.apache.maven.usability.SystemWarnings;

public class TestClass1 {

	public TestClass1() {
		// TODO Auto-generated constructor stub
	}
	public  void a(){
		
	}
	public static class A{
		static int a=3;
	}
	public static class B extends A{
		static int b=3;
		
	}
	public static void main(String[] args) {
		B b=new B();
		A a=new A();
		System.err.println(a.getClass()==b.getClass());
		A c=new B();
		System.err.println(c.getClass()==b.getClass());
		System.err.println(a.getClass());
		System.err.println(b.getClass());
		System.err.println(c.getClass());

		
	}
	

}
