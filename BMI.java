// Sheikh Ahmed, 33114212, programming, B.S.c Computer Science, Ikram Rehman

// takes in the users height and weight, calculates their BMI, and outputs the corresponding weight category
import java.util.Scanner;
public class BMI
{
    public static void main(String[] args)
    {
            // creating the instance of height and weight of type scanner
            Scanner Height = new Scanner(System.in);
            Scanner Weight = new Scanner(System.in);

            // prompts the user to enter their height and weight. 
            System.out.println("Enter your height(m): ");
            double height = Height.nextDouble();
            System.out.println("Enter your weight(kg): ");
            
            // using the formula, bmi is rounded to 1 d.p
            double weight = Weight.nextDouble();
            double bmi = weight / (height * height);
            double factor = Math.pow(10, 1);
            double bmirounded = Math.round(bmi * factor) / factor;
            Height.close();
            Weight.close();

            // only accepts height and weight within a certain range
            if (1.397 <= height && height <= 2.438 && weight >= 25.4 && weight <= 317.5) {
                System.out.println("Your BMI is " + bmirounded);

                // using 'bmi', the corresponding weight range is then printed.
                if (bmirounded >= 4 && bmirounded <= 18.5) {
                    System.out.println("Your BMI is in the underweight category");   
                } else if (18.5 < bmirounded && bmirounded <= 24.9) {
                    System.out.println("Your BMI is in the healthy weight category");
                } else if (25 < bmirounded && bmirounded <= 29.9) {
                    System.out.println("Your BMI is in the overweight category");
                } else if (30 <= bmirounded){
                    System.out.println("Your BMI is in the obese category");
                } 
            }
            else {
                System.out.println("error");
            }
    }
}
