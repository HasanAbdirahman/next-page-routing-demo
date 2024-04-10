// /ourdomain/new-meetup.js
import { useRouter } from "next/router";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import Head from "next/head";
import { Fragment } from "react";

export default function newMeetUp() {
  const router = useRouter();
  async function handleAddMeetup(formData) {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    router.push("/");
  }
  return (
    <Fragment>
      <Head>
        <title>Add a New Meetup</title>
        <meta
          name="description"
          content="Add your own meetups and create network opportunities."
        />
      </Head>
      <NewMeetupForm onAddMeetup={handleAddMeetup} />;
    </Fragment>
  );
}
