import app from "./server.js";
import mongodb from "mongodb";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

async function main() {
  // Load environment variables from the parent .env file
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  dotenv.config({ path: path.resolve(__dirname, "../.env") });

  // Create a new MongoDB client using the URI from the .env file
  const client = new mongodb.MongoClient(
    process.env.MOVIEREVIEWS_DB_URI
  );

  // Use the PORT from .env or default to 8000
  const port = process.env.PORT || 8000;

  try {
    // Connect to the MongoDB cluster
    await client.connect();

    // Start the server
    app.listen(port, () => {
      console.log("Server is running on port: " + port);
    });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

// Run the main function
main().catch(console.error);