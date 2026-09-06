const mongoose = require("mongoose");
const dns = require("dns");

// Set Google / Cloudflare DNS servers for reliable SRV lookup on Windows
try {
  dns.setServers(["8.8.8.8", "1.1.1.1", "8.8.4.4"]);
} catch (e) {
  console.log("DNS setServers fallback note:", e.message);
}

let isConnected = false;

const connectDB = async () => {
  const urisToTry = [
    process.env.MONGODB_URI,
    "mongodb://127.0.0.1:27017/new-portsaid",
    "mongodb://localhost:27017/new-portsaid",
  ].filter(Boolean);

  for (const uri of urisToTry) {
    try {
      console.log(`Attempting MongoDB connection to: ${uri.split("@").pop()} ...`);
      const conn = await mongoose.connect(uri, {
        dbName: "new-portsaid",
        serverSelectionTimeoutMS: 5000,
      });
      console.log(`✅ MongoDB Connected Successfully: ${conn.connection.host} [DB: ${conn.connection.name}]`);
      isConnected = true;
      return true;
    } catch (error) {
      console.error(`⚠️ Connection attempt failed for ${uri.split("@").pop()}: ${error.message}`);
    }
  }

  console.error("❌ All MongoDB connection attempts failed. Operating in offline/memory fallback mode.");
  isConnected = false;
  return false;
};

module.exports = connectDB;
