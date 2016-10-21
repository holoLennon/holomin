package holo;
/**
 * 外观模式
 * @author Holo
 *
 */
public class FacadeOfDesignPatters {
	public FacadeOfDesignPatters() {
		// TODO Auto-generated constructor stub
	}

    public static class CPU {  
          
        public void startup(){  
            System.out.println("cpu startup!");  
        }  
          
        public void shutdown(){  
            System.out.println("cpu shutdown!");  
        }  
    }  

    public static class Memory {  
          
        public void startup(){  
            System.out.println("memory startup!");  
        }  
          
        public void shutdown(){  
            System.out.println("memory shutdown!");  
        }  
    }  

    public static class Disk {  
          
        public void startup(){  
            System.out.println("disk startup!");  
        }  
          
        public void shutdown(){  
            System.out.println("disk shutdown!");  
        }  
    }  

    public static class Computer {  
        private CPU cpu;  
        private Memory memory;  
        private Disk disk;  
          
        public Computer(){  
            cpu = new CPU();  
            memory = new Memory();  
            disk = new Disk();  
        }  
          
        public void startup(){  
            System.out.println("start the computer!");  
            cpu.startup();  
            memory.startup();  
            disk.startup();  
            System.out.println("start computer finished!");  
        }  
          
        public void shutdown(){  
            System.out.println("begin to close the computer!");  
            cpu.shutdown();  
            memory.shutdown();  
            disk.shutdown();  
            System.out.println("computer closed!");  
        }  
    }  
    public static void main(String[] args) {
		Computer computer=new Computer();
		computer.shutdown();
		computer.startup();
	}

}
