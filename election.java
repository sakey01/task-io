import java.util.Scanner;
import java.util.ArrayList;
import java.util.Collections;

// Figure 4, source code for election (task 4)
public class Election{
    public static void main(String[] args) {
        // initialisation
        ArrayList<String> votes = new ArrayList<>();
        ArrayList<Integer> count = new ArrayList<>();
        Scanner sc = new Scanner(System.in);
        System.out.println("Press enter or type '-1' to exit");
        while (true) {
            System.out.println("Enter vote: ");
            String input = sc.nextLine();
            // allows the user to exit the loop
            if (input.equals("q") || input.isEmpty()){
                System.out.println("END");
                break;
            }
            // obtains the index of input if already the element is present votes
            // and increment the corresponding index in count
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
        // using collections, the highest vote is stored
        int highestVote = Collections.max(count);
        int x = 1;
        int y = 0;
        for (int k = 0; k < votes.size(); k++){
            System.out.println(votes.get(k) + " recieved " + count.get(k) + " votes");
            // if there are multiple highest votes then the x is incremented
            if (highestVote == count.get(k)){
                ++x;
                y = k;
            }
        }
        if (x == 1) {
            System.out.println(votes.get(y) + " is the winner with " + highestVote + " vote(s)");
        }    
        else if (x>1) {
            System.out.println("the votes are tied");
        }
    }       
}
