package holo;

import java.io.FileOutputStream;
import java.io.ObjectOutputStream;
import java.io.Serializable;


public class TestSerialize implements Serializable{
	private static final long serialVersionUID=1;
	public int num =1930;
	public static void main(String[] args) {
		try {
			FileOutputStream fos=new FileOutputStream("C:/zzz.txt");
			ObjectOutputStream oos=new ObjectOutputStream(fos);
			TestSerialize serialize=new TestSerialize();
			oos.writeObject(serialize);
			oos.flush();
			System.err.println(oos);
			System.err.println(fos);
			oos.close();
		} catch (Exception e) {
			// TODO: handle exception
		}
	}
}

