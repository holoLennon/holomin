package holo;

import java.io.IOException;
import java.io.InputStream;
import java.net.Socket;
import java.util.Scanner;

public class SocketTest {
	public static void main(String[] args) throws IOException {
		//打开一个套接字
		//源IP地址和目的IP地址以及源端口号和目的端口号的组合称为套接字。其用于标识客户端请求的服务器和服务
		try (Socket socket=new Socket("time-A.timefreq.bldrdoc.gov",13)){
			InputStream inStream=socket.getInputStream();
			Scanner in=new Scanner(inStream);
			
			while(in.hasNextLine()){
				String lineString=in.nextLine();
				System.err.println(lineString);
			}
		} catch (Exception e) {
			// TODO: handle exception
		}
	}
}
