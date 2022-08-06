import { IconContext } from "react-icons/lib";
import { FcDocument } from "react-icons/fc";
import { signOut, useSession } from "next-auth/react";

function Header() {
  const { data: session, status } = useSession();

  return (
    <div className="sticky top-0 z-50 flex items-center px-4 py-2 shadow-md bg-white justify-around">
      <div className="hidden md:block">
        <IconContext.Provider
          className="hidden md:block"
          value={{ size: "70px" }}
        >
          <div>
            <FcDocument />
          </div>
        </IconContext.Provider>
      </div>
      <div className="md:hidden">
        <IconContext.Provider value={{ size: "45px" }}>
          <div>
            <FcDocument />
          </div>
        </IconContext.Provider>
      </div>

      <h1 className="hidden md:inline-flex ml-2 text-gray-700 text-4xl font-bold font-mono">
        Light Docs
      </h1>
      <img
        onClick={signOut}
        loading="lazy"
        className="cursor-pointer h-12 w-12 rounded-full"
        src={session?.user?.image}
        alt="Profile Image"
      />
    </div>
  );
}

export default Header;
