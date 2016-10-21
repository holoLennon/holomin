package holo;


import holo.IntroductionOfDesignPatternsBean.SendFactory;
import holo.IntroductionOfDesignPatternsBean.Sender;

public class TestOfDesignPatterns {
	public static void main(String[] args) {
		//SendFactory factory = new SendFactory();  
        Sender sender = SendFactory.produce("sms");  
        sender.Send();  
	}
}
