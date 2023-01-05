import { MongoClient } from "mongodb";

const uri = "mongodb://localhost:27017/";
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const db = client.db("migrationdb");

    const pets = db.collection("pets");
    await pets.insertOne({ b: "b" });
  } catch (error) {
    console.log(error);
  }
}

run();
