#include <Arduino.h>

void setup() {
  Serial.begin(9600);
  pinMode(D6,OUTPUT);
  pinMode(D7,OUTPUT);
  pinMode(D8,OUTPUT);

  analogWrite(D6,1024);
  analogWrite(D7,1024);
  analogWrite(D8,1024);
}

void loop() {
  // Serial.println("OPA");
  // char str[4]={0};
  // if(Serial.available()){
  //   Serial.readBytes(str,3);
  //   Serial.print(str);
  //   analogWrite(D6,1024-4*str[0]);
  //   analogWrite(D7,1024-4*str[1]);
  //   analogWrite(D8,1024-4*str[2]);
  // }
  // delay(2000);
  if(Serial.available()){
    Serial.write(Serial.read());
  }
}