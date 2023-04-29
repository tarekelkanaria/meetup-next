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
      <MeetupList meetups={meetups} />;
    </>
  );
}

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://tarekelkanaria:R04qS69fx64ebNCl@cluster0.8v6kiip.mongodb.net/meetups?retryWrites=true&w=majority"
  );
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
