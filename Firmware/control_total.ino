#include "BluetoothSerial.h"

#if ( !defined(CONFIG_BT_ENABLED) || !defined(CONFIG_BLUEDROID_ENABLED) )
    #error Bluetooth is not enabled! Please run `make menuconfig` to and enable it
#endif

#define motor_door_step 15
#define motor_door_direction 2
#define motor_door_EN 0 
#define motor_curtain_step 14
#define motor_curtain_direction 12
#define motor_curtain_EN 0
#define bolt 4 
#define light1 23
#define light2 25
#define light3 26
#define light4 27
        
char order = 0;
BluetoothSerial SerialBT;

void setup()
{
    Serial.begin(115200);
    SerialBT.begin("CASA-DOMOTICA");   //Bluetooth device name is "CASA-DOMOTICA"

    pinMode(motor_door_step, OUTPUT);
    pinMode(motor_door_direction, OUTPUT);
    pinMode(motor_door_EN,   OUTPUT);
    pinMode(motor_curtain_step, OUTPUT);
    pinMode(motor_curtain_direction, OUTPUT);
    pinMode(motor_curtain_EN,   OUTPUT);
    pinMode(bolt,   OUTPUT);
    pinMode(light1,   OUTPUT);
    pinMode(light2,   OUTPUT);
    pinMode(light3,   OUTPUT);
    pinMode(light4,   OUTPUT);

    digitalWrite(light1, HIGH);
    digitalWrite(light2, HIGH);
    digitalWrite(light3, HIGH);
    digitalWrite(light4, HIGH);
    Serial.println("Setup completed");
}

void loop()
{
    if (SerialBT.available())
    { 
        order = SerialBT.read();
    
        if (order == 'A') {                                                                      //Door
            digitalWrite(bolt, 0);                                                               // Open bolt
            rotateStepper(motor_door_step, motor_door_direction, motor_door_EN, 1);              // Open door
        }         
        else if (order == 'a') {
            rotateStepper(motor_door_step, motor_door_direction, motor_door_EN, 0);              // Close door
            digitalWrite(bolt, 1);                                                               // Close bolt
        }  
        else if (order == 'B') {                                                                 //Curtain
            rotateStepper(motor_curtain_step, motor_curtain_direction, motor_curtain_EN, 1);     //Open
        }  
        else if (order == 'b')
        {
            rotateStepper(motor_curtain_step, motor_curtain_direction, motor_curtain_EN, 0);     //Close
        }  
        else if (order == 'C') {                                                                 //Lights        
            digitalWrite(light1, HIGH);
        } 
        else if (order == 'c') {
            digitalWrite(light1, LOW);
        } 
        else if (order == 'D') {
            digitalWrite(light2, HIGH);
        } 
        else if (order == 'd') {
            digitalWrite(light2, LOW);
        } 
        else if (order == 'E') {
            digitalWrite(light3, HIGH);
        } 
        else if (order == 'e') {
            digitalWrite(light3, LOW);
        } 
        else if (order == 'F') {
            digitalWrite(light4, HIGH);
        } 
        else if (order == 'f') {
            digitalWrite(light4, LOW);
        } 
    } 
}

void rotateStepper(int stepPin, int directionPin, int enablePin, bool direction) 
{
    const int motorDelay = 2000; // ref 500
    const int motorSteps = 3000; // ref 1000

    digitalWrite(enablePin, LOW);  // Enable the driver
    digitalWrite(directionPin, direction);
    for(int i = 0; i < motorSteps; i++)
    {  
        digitalWrite(stepPin, HIGH);      
        delayMicroseconds(motorDelay);          
        digitalWrite(stepPin, LOW);       
        delayMicroseconds(motorDelay); 
    }
    digitalWrite(enablePin, HIGH); 
}
