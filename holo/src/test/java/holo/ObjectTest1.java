package holo;



import com.zmax.yijian.common.conf.Sys;

public class ObjectTest1 {

	public ObjectTest1() {
		// TODO Auto-generated constructor stub
	}
	
	public static void main(String[] args) {
		Student s1 = new Student();
		s1.setNumber(123);
		//stu1和stu2指向内存堆中同一个对象
		Student s2=s1;
		Student s3=(Student)s1.clone();
		s2.setNumber(456);
		System.err.println(s2.getNumber());
		System.err.println(s1.getNumber());
		System.err.println(s2.getNumber());
		System.err.println(s1.getNumber());
		System.err.println(s3.getNumber());
		
	}
	
}
class Student implements Cloneable{ 
    private int number; 
 
    public int getNumber() { 
        return number; 
    } 
 
    public void setNumber(int number) { 
        this.number = number; 
    } 
    @Override 
	public Object clone() { 
        Student stu = null; 
        try{ 
            stu = (Student)super.clone(); 
        }catch(CloneNotSupportedException e) { 
            e.printStackTrace(); 
        } 
        return stu; 
    } 
     
} 
