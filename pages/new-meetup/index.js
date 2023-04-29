import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import NewMeetupForm from "@/components/meetups/NewMeetupForm";

function NewMeetup() {
  const router = useRouter();
  async function addMeetUpHandler(enteredMeetup) {
    const response = await axios.post("/api/new-meetup", enteredMeetup, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response.data);
    router.push("/");
  }
  return (
    <>
      <Head>
        <title>Add New Meetup</title>
        <meta
          name="description"
          content="Create your new meetup with the place you choose by React meetups app"
        />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetUpHandler} />;
    </>
  );
}

export default NewMeetup;
