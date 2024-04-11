// the api path is created to perform a route path so that POST, PUT and Delete
//  http requests should be handled

// POST => /api/new-meetup

//  it is usually named handler but u can call whatever u want

import { MongoClient } from "mongodb";
async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const data = req.body;

      // connecting to db
      const client = await MongoClient.connect(process.env.MONGO_URL);

      // create db
      const db = client.db();
      // creates database collection
      const meetupCollection = db.collection("meetups");
      // inserting one item
      const result = await meetupCollection.insertOne(data);
      // close the connection
      client.close();

      res.status(201).json({ message: "Meetup inserted" });
    } catch (error) {
      console.log(error);
    }
  }
}

export default handler;
