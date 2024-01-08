
abstract class vehicle{
    protected int age = 4;
    public static void main(String[] args) {
        car c = new car();
        bike b = new bike(); 
        lorry l = new lorry();

        b.drive();
        c.drive();
        l.drive();
        System.out.println(l.age);
    }
}
class car extends vehicle {
    void drive(){
        System.out.println("driving car");
    }
}
class bike extends vehicle {
    void drive(){
        System.out.println("driving bike");
    }
}
class lorry extends vehicle{
    void drive(){
        System.out.println("driving lorry");
        
    }

}
