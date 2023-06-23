# Final Project Report

I completed project option number 1 (circuit for checking if a list of numbers are sorted). This report details all the workings and derivations required to build the circuit and Verilog modules contained in the project. It contains a general overview of every top-level module, followed by a multilevel description of the inner workings of each module that explains very submodule involved.

In this project you will implement a finite state machine and a circuit that allows a user to enter a list of numbers into a register file, and then press a button to determine if the list is sorted in increasing order. This circuit for this project will have two modes that are described below.
- Initialization Mode: During this stage the numbers are loaded one by one into the register file. Two values will be provided by the user through the switches on the Alterra board: the address and the number. The address specifies in which register the number should be stored. A LOAD button or switch is used to load each value into the register file. Once all the numbers are loaded into the register file, a different switch is used to change modes. (Note that the loading may be out of order.) 
- Checking Mode: A VALIDATE button or switch needs to be pressed to begin the validation process. The machine should iterate through the registers and compare each with its neighbor in the address space. If the contents of the two registers are not sorted in increasing order, then the machine should stop the iteration and indicate with the LEDs or in some other way the position of the exception. That is, the address or location of the first register that has a lower value than the preceding register.
  
Your circuit must have a register file with eight 4-bit registers. The values stored in the registers must be visualized on the eight 7-segment displays. The rest of the datapath should contain the comparator circuit that is used for checking and any other components that may be necessary.

## Top Level Diagram
![top level diagram](/images/class-281/img1.png)

This is the overall top-level diagram. Since it is difficult to view at this size, I have split it into
three different sections: Part A, Part B, Part C, and Part D. These are explained below.



## Part A: STATE DIAGRAM
![top level diagram](/images/class-281/img2.png)

My first part is my state machine. According to the instructions, our device has two states checking mode(0) and writing mode(1). Our state diagram has one input w, when w is 0 we are meant to be in checking state and when w is 1, we are meant to be in writing state. I also added a state_n to the FSM so that in the other parts, the STATE acts as a Write Enable in the register machine and the STATE_N acts as a Check Enable for the checker section. And both states can never be on at the same time, and only one is enabled at every time. Below lies d Moore FSM derivation for our state diagram: 
![top level diagram](/images/class-281/img3.png)



## Part B: Register File
![top level diagram](/images/class-281/img4.png)
 
My 2nd part is my register machine. It is a register file with one write port and two read ports. It  can write and read from the register file, including reading from two registers during the same clock cycle. It consist of 3 parts the register part, the write port and the read port. Below I explain each of these sections more.

### i: WRITE PORT
-	It contains of four data input pins that are connected to each of the register file.  
-	It contains three write_address input pins. These three pins represent reg0 to reg7 address, ie if w2, w1, w0 is 5 then it means u want to write to reg 5.
-	It contains a 3-to -8 decoder. It receives its input from the write address pin and outputs 8 outputs. These outputs are one-hot encoded and they are connected to the load pins of the 8 registers. This means that only one registers load can ever be on at a time. And this is based on the values of the write-address pins.The decoder also hasthe write_enable pin from the state machine connected to its enable pin. This means when not in write state all registers loads are 0, and u cannot write to any of the registers in the register file.
![top level diagram](/images/class-281/img5.png) 

### ii: THE 8 PARRALLEL LOAD REGISTERS
-	Each of the registers are the same.
-	They are parallel load 4-bit registers that use muxes to switch between the dffs current value or the new input value. If load input is 1 the dffs next value is the IN[3:0], else it retains its value.
![top level diagram](/images/class-281/img6.png)

### iii: THE READ PORT
-	It contains two read_address[2:0] input buses. Each of the read_addresss bus is a number btw 0 and 7 representing reading from reg0 to reg7 address
-	It contains two read_result[3:0] output buses. Each of the read_result bus is a number btw 0 and 15 representing the  value dat the register in the read_address holds.
-	I used a 4bit 8-to-1 mux to choose from the 8 4bit register values. And the read-address was their selection input an d the read_result was the output of the mux. I wrote this in Verilog below. 
![top level diagram](/images/class-281/img7.png)



## Part C: COMPARATOR FILE
![top level diagram](/images/class-281/img8.png)

My  part C is my comparator file. A VALIDATE button or switch needs to be pressed to begin the validation process. The machine should iterate through the registers and compare each with its neighbor in the address space. If the contents of the two registers are not sorted in increasing order, then the machine should stop the iteration and indicate with the LEDs or in some other way the position of the exception. That is, the address or location of the first register that has a lower value than the preceding register. It consists of 3 parts the parallel load synchronous counter, the compare port and the storage unit. Below I explain each of these sections more.

### i: A MODIFIED PARALLEL LOAD SYNCHRONOUS 3-BITCOUNTER USING DFFS
-	It contains of 2 input pins: the check_enable pin, which receives its input from the state_n of the state machine it is 1 when the state is 0 and viceversa. This check_enable causes the comparator to be disabled once it is 0 and enabled when it is back to 1. The 2nd input is the validator pin.
-	It is basically a parallel load synchronous counter using dffs. On each of the parallel inputs are grounds, this means that in load the counters next value is 0. 
The modification to this counter is that the counters enable depends on its current value of the counter and the validator input ORED together. Meaning that the counter is disabled when all the four pins are 0. This lead to a counter that counts from 0 to 7 back to 0 only once which is what we needed to check each of the 8 registers values once.




### ii: THE COMPARE PORT
-	It contains a special unit written in Verilog that takes the first the 3 output pins from the counter and produces 2 buses representing the current value of the counter and the current value of the counter-1. Except when it is 0 in which the 2nd output is also 0. These two buses go to the external register file read-address0 and 1 which will give the value held in those two registers asynchronously.
![top level diagram](/images/class-281/img9.png)
 
-	The two results from the register files read address are passed to a compare circuit that produces 1 only if read_result0 less than read_result1. 
![top level diagram](/images/class-281/img10.png) 
 
-	The whole reason this was designed like this was that the value of the compare acts as the souce for the load of the counter and read in new value of the storage unit. Whe compare is 1. It means the object is not sorted and it should stop checking. So it needs to set the counter back to 0 on load and also reads the value of the counter at which it stops being sorted in the storage unit. 

# iii: THE STORAGE UNIT
-	It is basically a parallel load 3-bit registers that stores the value of the counter at which the values in the registers stop being sorted. Its load pin is connected to the output of the compare meaning that if the altb is 1 it stores the value of the counter at that point.
 


## Part D: OUTPUT PART
![top level diagram](/images/class-281/img11.png)

The last part is just the output part. It consists of 2 parts. The first part is 8 sevseg decoder to display the value stored in the eight register on the sevseg display. The 2nd part is used for displaying where it stops being sorted when comparing if sorted. Below I explain each of these sections more.

### 1: 8 SEVSEG FOR 8 REGISTERS
-	Each of the sevsegs are the same.
-	We derived the truth table for a sevseg decoder to represent 0 to 15 from a lab quite a while ago. Here is the truth table for this:
![top level diagram](/images/class-281/img12.png)
![top level diagram](/images/class-281/img13.png)
 
-	I just used this truth table in Verilog to create the a sevseg_decoder with 7 outputs. We connected to each of the 7pins for the seven segment diplay. We did this to connect the eight registers to seven segment display.
![top level diagram](/images/class-281/img14.png)
 

### 2: OUTPUT FOR THE COMPARATOR
-	The comparator returns a number btw 0 and 7 repping where the values in the register file stops being ordered
-	I used a 3_to_8 decoder this value to  8 outputs one-hot encoded. I connected each of these outputs to LEDS. This helps to signify where the register stops being sorted. And if the register file is sorted it does not change
-	 the output of the mux. I wrote this in Verilog below.


 
# TEST CASES
1.	First I test the register machine if I make w=09checking mode), then I should not be able to modify any of the registers in the register file.

2.	Then I test the writing mode and check that if I set the write address to a value only the registers value at that address should change when I change the data pin. It if my write_address[2:0] is 3, then reg3 should be the value of the data[3:0]. And no other register should change at this point.


3.	First I start the test with all 0s, this means it is sorted so when I should compare it it should be 0 and should not change the value of the output for the comparator meaning it is sorted.

4.	Then I made reg0 be 0 , reg1 be 1, .. reg7 be 7, then I check again it is still sorted and there should be no change in the output value of the comparator.


5.	Then I make reg 3 be 0, then I switch to checking mode and on the validator, then the value outputed by the comparator is 3, meaning that the register file stops being sorted at this reg3.

6.	Then I make reg 6 be 0, then I switch to checking mode and on the validator, then the value outputed by the comparator is still 3, meaning that the register file stops being sorted at this reg3. This shows that the comparator stops once it sees its first unsorted register.


7.	Then I make reg 3 to be 3 again, then I switch to checking mode and on the validator, then the value outputed by the comparator is 6 this time, meaning that the register file stops being sorted at this reg6.

