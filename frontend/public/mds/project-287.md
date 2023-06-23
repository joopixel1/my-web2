# Final Project Report
## Jesutofunmi Obimakinde & Chris Palacios
[You can find the github repo here](http://example.com)

![top level diagram](/images/class-287/img1.jpg)


# Problem and Design
This system controls and automates the temperature of the demo box by adjusting the inputs of the HVAC components. Our system looks to read the temperatures of zones in the house as well as if the heater or cooler is running, and control the flow of hot or cold air into each zone. This is done through turning the heater, cooler, and fan on or off; limiting the flow of air into each zone using dampers, controlled by a PWM servo motor opening a flap to a certain angle; making sure the fan is off when both the heater and cooler are off; and by making sure the heater and cooler are never on at the same time.

There is a program loop to read & communicate the temperatures of each zone through an Adafruit FunHouse connected to an LM35 temperature sensor. The loop aims to get all of the zones to a set target temperature, and then limit the flow of air to a room that reaches its target temperature before the other zones. When all zones reach their target temperature, the heater or cooler, with the circulation fan, is turned off until a zone moves too far away from the target temperature. Rooms with conflicting temperatures targets will completely close their damper as the other room is adjusted.

The program is run on a primary Adafruit FunHouse and a Feather S2, which read temperatures from a FunHouse node in each zone. The temperature measurement FunHouse nodes communicate back to the primary FunHouse control node through an MQTT broker run on a Raspberry Pi.

Case Study
![top level diagram](/images/class-287/img5.jpg)

Since Heating & Cooling shows up infrequently & between values 0-1, this graph isolates just the heating & cooling status.
 
## Cybersecurity Analysis

Our system is not secure. An HVAC system going offline is a health risk and ours has a large surface area for attacks and failures. From an attack perspective, our MQTT Raspberry Pi server uses default passwords for the Pi and Node Red. Our Pi also does not check if the SD card has been swapped, meaning that anyone can run their own software on it. Our Feather S2’s do not use passwords and will show their files to any computer that it is connected to. This would allow anyone to copy, replace, or modify our code. This leaves us open to impersonation or compromise of everything from the MQTT broker, primary, secondary, and temperature measurement nodes. Our Dashboard and Node Red communicate over HTTP instead of HTTPs allowing for insecure connections. In the Lab Cloud, we allowed our MQTT server to use unauthenticated connections for the sake of making sure our system worked in class. These unauthenticated connections may also impersonate our Feathers or DDOS our Raspberry Pi. Our Pi and Feathers do not encrypt their messages when publishing to the MQTT server, leaving our communication open for eavesdropping.

In terms of failure, there is little hardware redundancy. Our topology is a centralized node, with a chain of our Pi, the primary node, and secondary in the center with no fallback. If either the Pi, primary or secondary control nodes fail, the whole system breaks from lack of communication brokerage, and no HVAC controls. There are no backup power systems, and our hardware is susceptible to surprise hammer attacks. 

To improve our system, we must have several versions of each piece of hardware. Four Pi’s are needed at a minimum. Two can be kept on location but two must be remote at a secured location. To counteract errors, the Pi’s should all receive the same data, then vote on an output. At a certain period throughout the day, the two on-location pi’s should clone their software from the remote Pi’s in order to correct compromised Pi’s. This should happen at different times so that the system does not go down if a Pi malfunctions while another is updating. Two Pi’s should be kept on location and communicate to the control nodes over the local network to overcome internet outages. The primary and secondary nodes should instead both be Adafruit FunHouses where should the secondary node go down, the primary will start up the secondary functions and vice versa. This increases the cost but marginally compared to the quadruple pi setup. The temperature sensors should read and compare from the built in temperature sensor and the LM35. Should the LM35 break, the internal sensor can be activated. The primary, secondary, and Raspberry Pi’s should encrypt their messages to prevent eavesdropping or emulating their commands to one another.

## Conclusion:
Our Smart HVAC system is a great project. We learned about communication between several devices, reading inputs and controlling outputs, and finding a way to manipulate all of the nodes at once to create a functioning temperature controlled environment. We can take the basic principles of reading analog & digital signals from microcontrollers and communicating them back to a higher spec processor to analyze and act on the data we receive. This could be used in larger industrial applications, robotics, or even more demo HVAC systems.

The pacing ramped up quickly in this class. The separation between basic python, environment set up and jumping into communication was rough. If we did the electrical portions first, basic python, actuation labs, communication, and then the final project, the more demanding programming portions would have been fresh in our minds. Incredible class.

![top level diagram](/images/class-287/img2.jpg)
![top level diagram](/images/class-287/img3.jpg)
![top level diagram](/images/class-287/img4.jpg)
