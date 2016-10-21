package holo;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;

import com.jcraft.jsch.Buffer;

public class TestBuffer {
	public static void main(String[] args) {
		writeIn();
	}

	public static void writeIn() {
		try {
			String data = "the music is never stop";
			File file = new File("C:/zzz.txt");
			if (!file.exists()) {
				System.err.println("GG");
				return;
			}
			FileWriter fileWriter = new FileWriter(file.getName(),true);
			BufferedWriter bufferedWriter = new BufferedWriter(fileWriter);
			bufferedWriter.write(data);
			bufferedWriter.close();
			System.err.println("finish");
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public static void read() {
		try {
			StringBuffer str = new StringBuffer();
			// 　char 在java中是2个字节。java采用unicode，2个字节（16位）来表示一个字符。 1个字节 8位
			char[] buf = new char[1024];
			FileReader fileReader = new FileReader("C:/xuanmu.mp3");
			while (fileReader.read(buf) > 0) {
				// append放同一个地址
				str.append(buf);
			}
			str.toString();
			System.err.println(str);
			fileReader.close();
		} catch (Exception e) {
		}
	}

}
