import React from "react";
import Head from "next/head";
import Login from "../components/Login";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Feed from "../components/Feed";
import Widgets from "../components/Widgets";
import { getSession } from "next-auth/react";
import { collection, getDocs, orderBy, query } from "@firebase/firestore";
import { db } from "../firebase";

const Home = ({ session, posts }) => {
  if (!session) return <Login />;

  return (
    <div className="bg-gray-100 h-screen overflow-hidden">
      <Head>
        <title>Facebook Clone</title>
      </Head>

      <Header />

      <main className="flex">
        <Sidebar />

        <Feed posts={posts} />

        <Widgets />
      </main>
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const session = await getSession(context);

  const postsDocs = await getDocs(
    query(collection(db, "posts"), orderBy("timestamp", "desc"))
  );

  const posts = postsDocs.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    timestamp: null,
  }));

  return {
    props: {
      session,
      posts,
    },
  };
};

export default Home;
