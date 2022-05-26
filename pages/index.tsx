import type { GetServerSideProps, NextPage } from "next";
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";

const Home: NextPage = () => {
  // eliminating this call just to get bare minimum repro.
  // const { data, status } = useSession();
  const status = 'broken'
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
      // session: await getSession(ctx),

      //
      // eliminating this call just to get bare minimum repro.
      // session: await getServerSession(ctx, authOptions),
    },
  };
};

export default Home;
