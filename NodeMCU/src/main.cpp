#include <Arduino.h>
#include <dht11.h>

#define DHT11PIN D5

dht11 DHT11;

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

   int chk = DHT11.read(DHT11PIN); 
   Serial.print("Temp: ");
   Serial.print(DHT11.temperature);
   Serial.print("°C Humi: ");
   Serial.print(DHT11.humidity);
   Serial.println("%");
   delay(1000);
}