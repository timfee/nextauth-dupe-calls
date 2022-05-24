import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";

const Home: NextPage = () => {
  const { data, status } = useSession();
  // const status = 'broken'
  return (
    <>
      <div>
        {status === "unauthenticated" && (
          <button onClick={() => signIn("google")}>sign in</button>
        )}
        {status === "authenticated" && (
          <div>
            you are <span>{data.user?.name}</span> |&nbsp;
            <button onClick={() => signOut()}>sign out</button>
          </div>
        )}
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {
      session: await getSession(ctx),
      //session: await getServerSession(ctx, authOptions),
    },
  };
};

export default Home;
