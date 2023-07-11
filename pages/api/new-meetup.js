import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    const client = await MongoClient.connect(process.env.DB_URL);
    try {
      const db = client.db();

      const meetupCollection = db.collection("meetupsItems");

      const result = await meetupCollection.insertOne(data);

      console.log(result);

      res.status(201).json({ message: "Meetup inserted successfully!" });
    } catch (error) {
      res.status(400).json({ message: "Meetup insert failed" });
    } finally {
      client.close();
    }
  }
}

export default handler;
