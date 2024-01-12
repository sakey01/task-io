// Sheikh Ahmed, 33114212, programming, B.S.c Computer Science, Ikram Rehman

import java.time.LocalDate;
public class Bank{
    private int ID;
    private double balance;
    private double annualInterestRate;
    private LocalDate dateCreated;

    //no arg constructor (default account)
    public Bank(){
        setID(0);
        setBalance(0);
        setAnnualInterestRate(0);
    }
    // arg constructor (standard account)
    public Bank(int ID, double balance){
        this.ID = ID;
        this.balance = balance;
        this.dateCreated = LocalDate.now();
    }

    // getter and setter methods for ID
    public int getID() {
        return ID;
    }
    public void setID(int ID) {
        this.ID = ID;
    }
    // getter and setter methods for balance
    public double getBalance() {
        return balance;
    }
    public void setBalance(double balance) {
        this.balance = balance;
    }
    // getter and setter methods for annual interest rate
    public double getAnnualInterestRate(){
        return annualInterestRate;
    }
    public void setAnnualInterestRate(double annualInterestRate){
        this.annualInterestRate = annualInterestRate;
    }
    // getter methods for date created
    public LocalDate getDateCreated(){
        return dateCreated;
    }

    // monthly interest method which returns the monthly interest
    public double monthlyInterestRate(){
        return getAnnualInterestRate()/12;
    }
    // withdraw method which takes the specified amount out of the account
    public void withdraw(double out){
        if (out > 0 && balance >= out) {
            balance = balance - out;
        }
        else {
            System.out.println("withdrawing error");
        }
    }
    // deposit method which takes the specified amount out of the account
    public void deposit(double in){
        if (in > 0) {
            balance = balance + in;
        }
        else {
            System.out.println("depositing error");
        }
    }
}
// my programme creates an account with attributes: balance, interest and id, and methods which allow the user
// to withdraw, deposit and receive their monthly interest
