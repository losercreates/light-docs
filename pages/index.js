import Head from "next/head";
import Image from "next/image";
import Header from "../components/Header";
import { getSession, useSession } from "next-auth/react";
import Login from "../components/Login";
import { useState } from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { db } from "../firebase";
import {
  serverTimestamp,
  addDoc,
  collection,
  orderBy,
  query,
} from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import DocumentRow from "../components/DocumentRow";
import { useRouter } from "next/router";

export default function Home() {
  const { data: session, status } = useSession();

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => {
    setOpen(false);
    setInput("");
  };
  const router = useRouter();
  if (status === "unauthenticated")
    return (
      <div>
        <Head>
          <title>Light Docs</title>
          <meta
            name="description"
            content="A lightweight documents editor to pen down your thoughts and actions"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Login />
      </div>
    );
  const [value, loading, error] = useCollection(
    query(
      collection(db, "userDocs", session?.user?.email, "docs"),
      orderBy("timestamp", "desc")
    )
  );
  const createDocument = () => {
    if (!input) return;
    addDoc(collection(db, "userDocs", session?.user?.email, "docs"), {
      fileName: input,
      timestamp: serverTimestamp(),
    }).then((docRef) => {
      setInput("");
      onCloseModal();
      router.push(`/doc/${docRef.id}`);
    });
  };

  return (
    <div>
      <Head>
        <title>Light Docs</title>
        <meta
          name="description"
          content="A lightweight documents editor to pen down your thoughts and actions"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <section className="bg-[#FBF9FA] pb-10 px-10">
        <div className="nax-w-3x1 mx-auto">
          <div className="flex itens-center justify-between py-6">
            <h2 className="text-gray-780 text-lg">Start a new document</h2>
          </div>
          <div>
            <div className="relative h-52 w-40 border-2 cursor-pointer hover:border-blue-700">
              <Image
                src="/assets/newdoc.png"
                layout="fill"
                onClick={onOpenModal}
              />
              <Modal open={open} onClose={onCloseModal} center>
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  type="text"
                  className="outline-none w-80 bg-slate-100 py-1 px-2"
                  placeholder="Enter name of document..."
                  onKeyDown={(e) => e.key === "Enter" && createDocument()}
                />
                <div className="flex justify-around w-96 mt-10">
                  <button
                    className="bg-red-400 px-3 py-1 rounded-sm w-28"
                    onClick={onCloseModal}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-gray-300 px-3 py-1 rounded-sm w-28"
                    onClick={createDocument}
                  >
                    Create
                  </button>
                </div>
              </Modal>
            </div>
            <p className="ml-2 mt-2 font-semibold text-sm text-gray-700">
              Blank
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white px-10 md:px-8">
        <div className="max-w-3xl mx-auto py-8 text-sm text-gray-780">
          <div className="flex items-center justify-between pb-5">
            <h2 className="font-medium flex-grow">My Documents</h2>
            <p className="font-medium mr-12">Date Created</p>
          </div>
          {value?.docs.map((doc) => (
            <DocumentRow
              key={doc.id}
              id={doc.id}
              fileName={doc.data().fileName}
              date={doc.data().timestamp}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
