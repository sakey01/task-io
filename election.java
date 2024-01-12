// Sheikh Ahmed, 33114212, programming, B.S.c Computer Science, Ikram Rehman
import java.util.Scanner;
import java.util.ArrayList;
import java.util.Collections;

/* election takes the users unique input, stores it in votes. It also has an array list called count
which keeps track of how many votes each candidate recieves. finally the person with the highest votes
is returned */
public class Election{
    public static void main(String[] args) {
        // initialisation votes and count of type array list
        ArrayList<String> votes = new ArrayList<>();
        ArrayList<Integer> count = new ArrayList<>();
        Scanner sc = new Scanner(System.in);
        System.out.println("Press enter or type '-1' to exit");
        while (true) {
            System.out.println("Enter vote: ");
            String input = sc.nextLine();
            // enables the user to exit the loop
            if (input.equals("q") || input.isEmpty()){
                System.out.println("END");
                break;
            }
            /* obtains the index of 'input' if the element is present in votes
            and increments the corresponding index in count */
            if (votes.contains(input)){
                int j = votes.indexOf(input);
                int i = count.get(j) + 1;
                count.set(j,i);
            }
            // adds the input if the element is not already present in the array
            else {
                votes.add(input);
                count.add(1);
            }    
        }
        sc.close();
        // using collections, the highest vote is stored in 'highestVote'
        int highestVote = Collections.max(count);
        int x = 0;
        int y = 0;
        // goes through count and stores the index of the highest vote
        for (int k = 0; k < votes.size(); k++){
            System.out.println(votes.get(k) + " recieved " + count.get(k) + " vote(s)");
            // if there are multiple highest votes then x is incremented
            if (highestVote == count.get(k)) {
                x++;
                y = k;
            }
        }
        // prints the person with the highest votes
        if (x == 1) {
            System.out.println(votes.get(y) + " is the winner with " + highestVote + " votes");
        }
        // the following is printed if 2 or more candidates recieve the highest votes
        else {
            System.out.println("the votes are tied");
        }
    }       
}
