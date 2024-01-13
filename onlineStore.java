// Sheikh Ahmed, 33114212, programming, B.Sc. Computer Science, Ikram Rehman

/* I created an italian store which prints the menu and the user can choose what they want
  and how many. The total cost is then calculated and output */
  import java.util.Scanner;
  public class OnlineStore
  {
      public static void main(String[] args)
      {
          double total = 0;
          Scanner Choice = new Scanner(System.in);
          Scanner Quantity = new Scanner(System.in);
          Scanner Exit = new Scanner(System.in);
  
          // prints the menu until the user want to exit
          while (true) {
              String menu = """
                             |Menu|
                       1. Ravioli | £14
                       2. Tortellini | £10.50
                       3. Linguini Garibaldi | £15
                       4. Mozzarella Caprese |  £7.95
                       5. Eggplant Parmigiana | £12
                       6. Water | £1.89
                       What would you like?
                      """;

              System.out.print(menu);
              // user is prompted for their input
              String choice = Choice.nextLine();
              System.out.println("how many would you like? ");
              int quantity = Quantity.nextInt();
              System.out.println("to leave, type 'q' or 'exit' or press enter to continue");
              String exit = Exit.nextLine();
  
              /* User can choose options 1 - 6. 
              Their cost is then multiplied by quantity and stored in total */
              switch (choice) {
                  case "1":
                     total = total + (14 * quantity); 
                      break;
                  case "2":
                      total = total + (10.50 * quantity);
                      break;
                  case "3":
                      total = total + (15 * quantity);  
                      break;
                  case "4":
                      total = total + (7.95 * quantity);
                      break;
                  case "5":
                      total = total + (12 * quantity);
                      break;
                  case "6":
                      total = total + (1.89 * quantity);
              } 
              // allows the user to exit and prints their total cost
              if (exit.equals("exit") || exit.equals("q")) {
                  System.out.println("Your total is " + "£" + total);
                  Choice.close();
                  Quantity.close();
                  Exit.close();
                  break;
              }
          }
      }
  }
