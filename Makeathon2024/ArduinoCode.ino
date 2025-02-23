//This is the correct

#include <ESP8266WiFi.h>

const char* ssid = "RedRover";
const char* serverIP = "34.66.120.146";
const int serverPort = 5000;

WiFiClient client;  // Corrected WiFiClient with uppercase 'W'

#define LED 2
#define TILT_PIN 5  // Pin for tilt sensor
#define MOTOR_PIN 12

int tiltState;

void setup() {
  Serial.begin(115200);

  // Initialize LED and tilt sensor pin
  pinMode(LED, OUTPUT);  
  pinMode(TILT_PIN, INPUT);  
  pinMode(MOTOR_PIN, INPUT);

  Serial.println("Connecting to wifi...");
  WiFi.begin(ssid);

  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.print(".");
  }

  Serial.println("Connected to wifi!");

  if (client.connect(serverIP, serverPort)) {
    Serial.println("Connected to server");
  } else {
    Serial.println("Connection failed");
    return;
  }
}

void loop() {

  tiltState = digitalRead(TILT_PIN);  // Read the tilt state from the sensor

  // If client is connected, send tilt state to the server
  if (client.connected()) {
    String data = String(tiltState);  // Convert tiltState to a string
    client.println(data);  // Send the tilt state to the server
    Serial.print("Sending to server: ");
    Serial.println(data);  // Debugging print to confirm data being sent
  } else {
    Serial.println("Lost connection to the server, reconnecting...");
    if (client.connect(serverIP, serverPort)) {
      Serial.println("Reconnected to server.");
    } else {
      Serial.println("Reconnection failed!");
    }
  }

  // Check tilt state to manage posture and LED
  if (tiltState == LOW) {
    Serial.println("Tilt Detected - Bad Posture!");
    digitalWrite(LED, HIGH);  // Turn on LED if tilt is detected
    digitalWrite(MOTOR_PIN, HIGH);
  } else {
    Serial.println("Good Posture");
    digitalWrite(LED, LOW);   // Turn off LED if posture is good
    digitalWrite(MOTOR_PIN, LOW);
  }

  delay(1000);  // Wait 5 seconds before reading again
}
