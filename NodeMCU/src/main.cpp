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

byte str[4]={0};

void loop() {
  if(Serial.available()){
    Serial.readBytes(str,3);
    Serial.write(str[0]);
    Serial.write(str[1]);
    Serial.write(str[2]);
    analogWrite(D6,1024-4*str[0]);
    analogWrite(D7,1024-4*str[1]);
    analogWrite(D8,1024-4*str[2]);
  }
}