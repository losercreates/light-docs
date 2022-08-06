import { useRouter } from "next/dist/client/router";
import { FcDocument } from "react-icons/fc";
import { AiFillDelete } from "react-icons/ai";
import { doc, deleteDoc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { db } from "../firebase";
import { IconContext } from "react-icons/lib";
function DocumentRow({ id, fileName, date }) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const deleteDocument = () => {
    deleteDoc(doc(db, "userDocs", session.user.email, "docs", id));
  };
  return (
    <>
      <div className="flex items-center py-4 rounded-lg hover:bg-gray-100 text-gray-700 text-sm cursor-pointer">
        <IconContext.Provider value={{ size: "25px" }}>
          <div>
            <FcDocument />
          </div>
        </IconContext.Provider>
        <p
          className="flex-grow w-10 pr-10 text-lg font-semibold truncate"
          onClick={() => router.push(`/doc/${id}`)}
        >
          {fileName}
        </p>
        <p className="pr-5 text-sm">{date?.toDate().toLocaleDateString()}</p>
        <IconContext.Provider value={{ size: "25px", color: "red" }}>
          <div className=" hover:bg-red-300 rounded-full p-2">
            <AiFillDelete className="cursor-pointer" onClick={deleteDocument} />
          </div>
        </IconContext.Provider>
      </div>
    </>
  );
}

export default DocumentRow;
