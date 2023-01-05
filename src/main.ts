import { Collection, Long, MongoClient, ObjectId } from "mongodb";

const uri = "mongodb://localhost:27017/";
const client = new MongoClient(uri);

const migrateDocuments = async (collection: Collection): Promise<void> => {
  await collection.updateMany(
    {
      _id: {
        $exists: false,
      },
    },
    {
      $set: {
        _id: new ObjectId(),
        name: "Lista",
        emoji: ":p",
        weight: new Long("0"),
      },
    }
  );
};

async function run() {
  try {
    await client.connect();
    const db = client.db("migrationdb");

    const users = db.collection("users");

    migrateDocuments(users);
  } catch (error) {
    console.log(error);
  }
}

run();
