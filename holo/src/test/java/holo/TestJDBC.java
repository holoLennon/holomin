/*package holo;

import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Properties;
import java.util.Scanner;

import com.mysql.jdbc.Connection;

public class TestJDBC {
	public static void main(String[] args) {
		try {
			Scanner in=args.length==0?new Scanner(System.in):new Scanner(Paths.get(args[0]));
			try (Connection connection=getConnection()){
				
			} catch (Exception e) {
				// TODO: handle exception
			}
		} catch (Exception e) {
			// TODO: handle exception
		}
	}
	public  static Connection getConnection() {
		Properties properties=new Properties();
		//try with resource  try()内的流会自动关闭 不需单独写在family中关闭
		try (InputStream in=Files.newInputStream(Paths.get("database.properties"))){
			properties.load(in);
		} catch (Exception e) {

		}
		String drivers=properties.getProperty("jdbc.drivers");
		if(drivers!=null)System.setProperty("jdbc.drivers", drivers);
		String url=properties.getProperty("jdbc.url");
		String username=properties.getProperty("jdbc.username");
		String password=properties.getProperty("jdbc.password");
	}

}
*/