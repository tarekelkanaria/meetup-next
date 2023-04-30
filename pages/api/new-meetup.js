import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    const client = await MongoClient.connect(
      "mongodb+srv://tarekelkanaria:R04qS69fx64ebNCl@cluster0.8v6kiip.mongodb.net/meetups?retryWrites=true&w=majority"
    );
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
