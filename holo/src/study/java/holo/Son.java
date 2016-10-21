package holo;

import org.junit.Test;

public class Son extends Far{

	public Son() {
		// TODO Auto-generated constructor stub
	}
	public void ball(){
		System.err.println("this is son's ball");
	}
	@Test
	public void test(){
		this.ball();
		super.ball();
	}

}
