#include <WiFi.h>
#include <Firebase_ESP_Client.h>
#include <addons/RTDBHelper.h>
232425262720212223456789101112131415161718191
#include <WiFi.h>
#include <Firebase_ESP_Client.h>
#include <addons/RTDBHelper.h>

// ==============================
// Wi-Fi Configuration
// ==============================
#define WIFI_SSID "Infinix HOT 10i"
#define WIFI_PASSWORD "1234567mazoa"

…      Serial.printf("❌ Firebase Error: %s\n\n", fbdo.errorReason().c_str());
    }
  } else {
    Serial.println("⚠️ Firebase not ready...");
  }

  delay(5000);  // Send every 5 seconds
}



// ==============================
// Wi-Fi Configuration
// ==============================
#define WIFI_SSID "Infinix HOT 10i"
#define WIFI_PASSWORD "1234567mazoa"

// ==============================
// Firebase Configuration
// ==============================
#define DATABASE_URL "https://sendingdata-test-default-rtdb.firebaseio.com/"
#define DATABASE_SECRET "39lmV5Bt7OBAdObvD9Rqx53NsyuzmVO5GwjoJxwq"

// Firebase objects
FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;

void setup() {
  Serial.begin(115200);
  delay(1000);

  // ---------- Connect to Wi-Fi ----------
  Serial.printf("Connecting to Wi-Fi: %s", WIFI_SSID);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(300);
  }
  Serial.println("\n✅ Connected to Wi-Fi!");
  Serial.print("IP Address: ");
  Serial.println(WiFi.localIP());
  Serial.printf("Firebase Client v%s\n\n", FIREBASE_CLIENT_VERSION);

  // ---------- Firebase Setup ----------
  config.database_url = DATABASE_URL;
  config.signer.tokens.legacy_token = DATABASE_SECRET;  // ✅ Correct for DB secret usage
  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true);
}

void loop() {
  if (Firebase.ready()) {
    // ---- Simulated Current Readings ----
    float mainC = 100.0 + random(-30, 30) / 10.0;
    float c1 = 30.0 + random(-20, 20) / 10.0;
    float c2 = 25.0 + random(-20, 20) / 10.0;


    // ---- Simulated Location Readings ----
    float lat = 34.052235 + random(-100, 100) / 10000.0; // Example latitude around Los Angeles
    float lon = -118.243683 + random(-100, 100) / 10000.0; // Example longitude around Los Angeles

    // ---- Print to Serial ----
    Serial.println("📊 Sending current readings to Firebase:");
    Serial.printf("Main Transformer: %.2f A\n", mainC);
    Serial.printf("Consumer 1: %.2f A\n", c1);
    Serial.printf("Consumer 2: %.2f A\n", c2);


    // ---- Send Data to Firebase ----
    bool ok = true;
    ok &= Firebase.RTDB.setFloat(&fbdo, "/gridData/mainTransformer/currentLevel", mainC);
    ok &= Firebase.RTDB.setFloat(&fbdo, "/gridData/consumers/consumer1/currentLevel", c1);
    ok &= Firebase.RTDB.setFloat(&fbdo, "/gridData/consumers/consumer2/currentLevel", c2);

    ok &= Firebase.RTDB.setFloat(&fbdo,"/gridData/location/lat", lat);
    ok &= Firebase.RTDB.setFloat(&fbdo,"/gridData/location/lon", lon);
    ok &= Firebase.RTDB.setInt(&fbdo, "/gridData/lastUpdate", millis());

    if (ok) {
      Serial.println("✅ Data successfully sent to Firebase!\n");
    } else {
      Serial.printf("❌ Firebase Error: %s\n\n", fbdo.errorReason().c_str());
    }
  } else {
    Serial.println("⚠️ Firebase not ready...");
  }

  delay(5000);  // Send every 5 seconds
}
