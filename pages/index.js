import { MongoClient } from "mongodb";
import Head from "next/head";
import MeetupList from "@/components/meetups/MeetupList";

function HomePage({ meetups }) {
  return (
    <>
      <Head>
        <title>React Meetups App</title>
        <meta
          name="description"
          content="discover new places and meet different people with amazing meetups app"
        />
      </Head>
      <MeetupList meetups={meetups} />
    </>
  );
}

export async function getStaticProps() {
  const client = await MongoClient.connect(process.env.DB_URL);
  const db = client.db();
  const meetupCollection = db.collection("meetupsItems");
  const meetups = await meetupCollection.find().toArray();
  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        image: meetup.image,
        address: meetup.address,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}
export default HomePage;
