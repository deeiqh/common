import { Collection, Long, MongoClient, ObjectId, Document } from "mongodb";
import { faker } from "@faker-js/faker";

const migrateUsersDocuments = async (users: Collection): Promise<Document> => {
  return await users.updateMany(
    {},
    {
      $set: {
        name: "Default",
        emoji: "\u{1F60E}",
        weight: new Long(0),
      },
    }
  );
};

async function run(): Promise<void> {
  try {
    const uri = "mongodb://localhost:27017/";
    const client = new MongoClient(uri);
    await client.connect();

    const db = client.db("migration-db");
    const users = db.collection("users");

    migrateUsersDocuments(users);
  } catch (error) {
    console.log(error);
  }
}

run();
