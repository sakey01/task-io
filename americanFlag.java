// Sheikh Ahmed, 33114212, programming, B.Sc. Computer Science, Ikram Rehman

// series of for loops that print the flag line by line
public class Flag
{
    public static void main(String[] args)
    {
        // for loop which prints the following 9 times
        for (int a = 0; a < 9; a++) {
            // print one star on every odd line
            if (a % 2 == 0) {
                System.out.print("*  ");
            } // nested for loop, prints the remaining 5 stars
            for (int b = 0; b < 5; b++) {
                System.out.print("  *  ");
            }
            // print three spaces on every even line so that the sides are straight
            if (a % 2==1) {
                System.out.print("   ");
            }
            for (int c = 0; c < 40; c++) {
                System.out.print("=");
            }
            // goes to the next line
            System.out.println();
        }
        // nested for loop which prints the last 6 lines of the flag which is just the '='
        for (int d = 0; d < 6; d++) {
            for (int e = 0; e < 68; e++) {
                System.out.print("=");
            }
            System.out.println();
        }
    }
}
