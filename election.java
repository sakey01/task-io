import java.util.Scanner;
import java.util.ArrayList;
import java.util.Collections;


public class Election{
    public static void main(String[] args) {
        ArrayList<String> votes = new ArrayList<>();
        ArrayList<Integer> count = new ArrayList<>();
        Scanner sc = new Scanner(System.in);
        System.out.println("Press enter or type '-1' to exit");
        while (true) {
            System.out.println("Enter vote: ");
            String input = sc.nextLine();
            if (input.equals("q") || input.isEmpty()){
                System.out.println("END");
                break;
            }
            if (votes.contains(input)){
                int j = votes.indexOf(input);
                int i = count.get(j) + 1;
                count.set(j,i);
            }
            else {
                votes.add(input);
                count.add(1);
            }    
        }
        System.out.println(votes);
        System.out.println(count);

        int highestVote = Collections.max(count);
        int x = 0;
        for (int k = 0; k < votes.size(); k++){
            if (highestVote == count.get(k)){
                ++x;
                System.out.println(votes.get(k) + " is the winner with " + highestVote + " vote(s)");
            }
        }
    }       
}
