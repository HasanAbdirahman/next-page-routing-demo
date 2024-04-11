import MeetupList from "../components/meetups/MeetupList.js";
import Head from "next/head";
import { MongoClient } from "mongodb";
import { Fragment } from "react";

// when using the useEffect what happens the data is not fetched the first time
// the app runs but the second it is re-rendered. hence the nextJs creates static
// page and the data is not shown in the source page the second time the app
// rerenders the page is already creted and thus the data is not shown.
// So inorder to avoid that they are 2 methods
//  a) server-sider-rendering and b) static page rendering
// the recommended one and the most used ones is static page rendering
export default function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>Meet Ups</title>
        <meta
          name="description"
          content="Browse a huge list of active React meetups!"
        />
      </Head>
      <MeetupList meetups={props.meetups} />;
    </Fragment>
  );
}

// first you create a function called getStaticProps and it must have this name
// and it has to be created in the pages not in the components or so and
// what it does the Homepage is not called first but this function and prepares
// props for the homePage. This function is always works on the server and u can
// fetch data and must return object and you can configure anything but typically
// a props object and that will be received buy the homepage as props

// This is how the data fetching data is removed from the client side
// to the server side or build/production side

//  everything happens here in the server and regenerated every 10 seconds
// export async function getStaticProps() {
//   //  fetch data here we can use fetch() and get the data and then create a new instance
//   //  meetups file inside api folder but that is cumbersome since this function is
//   // already running on the server we can connect directly to the database here
//   // and retrieve that information

//   const client = await MongoClient.connect(process.env.MONGO_URL);

//   // create db
//   const db = client.db();
//   // creates database collection
//   const meetupCollection = db.collection("meetups");
//   //  all collections
//   const meetups = await meetupCollection.find().toArray();
//   console.log(meetups);

//   // close the connection
//   client.close();

//   return {
//     props: {
//       meetups: meetups.map((meetup) => {
//         return {
//           title: meetup.title,
//           image: meetup.image,
//           address: meetup.address,
//           id: meetup._id.toString(),
//         };
//       }),
//     },
//     // since getStaticProps is a static page that is build during the production
//     // if the data changes it will not know we want to use revalidate every 10
//     // seconds to check any changes
//     revalidate: 1,
//   };
// }

export async function getServerSideProps() {
  //  fetch data here we can use fetch() and get the data and then create a new instance
  //  meetups file inside api folder but that is cumbersome since this function is
  // already running on the server we can connect directly to the database here
  // and retrieve that information

  const client = await MongoClient.connect(process.env.MONGO_URL);

  // create db
  const db = client.db();
  // creates database collection
  const meetupCollection = db.collection("meetups");
  //  all collections
  const meetups = await meetupCollection.find().toArray();
  console.log(meetups);

  // close the connection
  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => {
        return {
          title: meetup.title,
          image: meetup.image,
          address: meetup.address,
          id: meetup._id.toString(),
        };
      }),
    },
  };
}

// for getStaticProps() function the revalidate generates new static page every
// 10 seconds but if you want the page to regenerate at every request it is great
// to getServerSideProps(). getServerSideProps is executed whenever someone
//  visits your site and it's not cached. the function always runs after deployment
//  not during deployment like getStaticProps() function.
//  It is better to use getServerSideProps() when u need the req, and res from the
// server and when the page is changing a lot but it is getStaticProps() is faster
//  and more efficient to the user

// export async function getServerSideProps(context) {
//   let res = context.res;
//   let req = context.req;

//   //  fetch data an api

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }
