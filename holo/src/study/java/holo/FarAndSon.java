package holo;

import org.junit.Test;

public class FarAndSon {

	public FarAndSon() {
		// TODO Auto-generated constructor stub
	}
	public void farther(){
		System.err.println("初代");
	}
	public class Son extends FarAndSon{
		public void farther(){
			System.err.println("次代");
		}
		@Test
		public void a(){
			System.err.println("三代");
			this.farther();
		}
	}

}

