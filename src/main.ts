import { Collection, Long, MongoClient, Document } from "mongodb";

const migrateUsersDocuments = (users: Collection): Promise<Document> => {
  return users.updateMany(
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

    await migrateUsersDocuments(users);
  } catch (error) {
    console.log(error);
  }
}

run();
