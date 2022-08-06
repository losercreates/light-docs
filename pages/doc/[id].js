// import TextEditor from "../../components/TextEditor":
import { useRouter } from "next/dist/client/router";
import { db } from "../../firebase";
import { useDocument } from "react-firebase-hooks/firestore";
import { getSession, signOut, useSession } from "next-auth/react";
import Login from "../../components/Login";
import TextEditor from "../../components/TextEditor";

import { IconContext } from "react-icons/lib";
import { FcDocument } from "react-icons/fc";
import { doc, query } from "firebase/firestore";
function Doc() {
  const { data: session, status } = useSession();
  if (status === "unauthenticated") return <Login />;

  const router = useRouter();
  const { id } = router.query;
  const [value, loading, error] = useDocument(
    query(doc(db, "userDocs", session.user.email, "docs", id))
  );
  if (!loading & value?.data()?.fileName) {
    router.replace("/");
  }

  return (
    <div>
      <header className="flex justify-between items-center p-3 pb-1">
        <span onClick={() => router.push("/")} className="cursor-pointer">
          <IconContext.Provider value={{ size: "45px" }}>
            <div>
              <FcDocument />
            </div>
          </IconContext.Provider>
        </span>
        <div className="flex-grow px-2">
          <h2>{value?.data()?.fileName}</h2>
        </div>
        <img
          loading="lazy"
          className="cursor-pointer h-12 w-12 rounded-full"
          src={session?.user?.image}
          alt=""
        />
      </header>
      <TextEditor />
    </div>
  );
}

export default Doc;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
