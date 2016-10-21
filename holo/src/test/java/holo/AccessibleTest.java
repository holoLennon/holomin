package holo;

import java.lang.reflect.Field;

public class AccessibleTest {
	static String b = "4";
	public AccessibleTest() {
		// TODO Auto-generated constructor stub
	}

	public static void a(String a) {
		Class<?> clazz = a.getClass();
		try {
			//反射机制 reflect
			Field field = clazz.getDeclaredField("value");
			// Object obj = fields.get(a);
			field.setAccessible(true);
			Object obj = field.get(a);
			char[] charValue = (char[]) obj;
			charValue = new char[4];
			for (int i = 0; i < charValue.length; i++) {
				charValue[i] = 'a';
			}
			field.set(a, charValue);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public static void main(String[] args) throws IllegalArgumentException,
			IllegalAccessException, NoSuchFieldException, SecurityException {
		// Integer b=4;
		
		a(b);
		System.err.println(b);

	}
}
