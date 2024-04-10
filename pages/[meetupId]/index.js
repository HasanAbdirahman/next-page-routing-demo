import { MongoClient, ObjectId } from "mongodb";
import MeetupDetailsPage from "../../components/meetups/MeetupDetailsPage";
import Head from "next/head";
// remember this props is coming from the getStaticProps function down below
export default function MeetupDetails(props) {
  return (
    <>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>

      <MeetupDetailsPage
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
        image={props.meetupData.image}
      />
    </>
  );
}

// getStaticPaths is another important fn which you need in dynamic pages to tell
//  nextjs for which dynamic paramater values this page should be pre-generated
//  and will only be used when we have getStaticProps not getServerSideProps
export async function getStaticPaths() {
  // fetch data
  const client = await MongoClient.connect(process.env.MONGO_URL);
  const db = client.db();
  const mongoCollection = db.collection("meetups");

  // just include the id nothing else and convert to Array since collections are object
  const meetups = await mongoCollection.find({}, { _id: 1 }).toArray();
  client.close();

  return {
    // to show all the supported parameter values are in the path array or not
    fallback: "blocking",
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}
// since the data changes we can use the getStaticProps
export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;

  // fetch data
  const client = await MongoClient.connect(
    "mongodb+srv://hasanabdirahmanao:Hassan1998&@cluster0.azrwtau.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  );
  const db = client.db();
  const mongoCollection = db.collection("meetups");

  // just include the id nothing else and convert to Array since collections are object
  const selectedMeetup = await mongoCollection.findOne({
    _id: new ObjectId(meetupId),
  });
  console.log(selectedMeetup);

  client.close();

  return {
    props: {
      meetupData: {
        title: selectedMeetup.title,
        description: selectedMeetup.description,
        id: selectedMeetup._id.toString(),
        address: selectedMeetup.address,
        image: selectedMeetup.image,
      },
    },
  };
}
