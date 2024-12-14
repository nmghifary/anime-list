import { signIn, signOut, useSession } from "next-auth/react";

const UserActionButton = () => {
  const { data: session } = useSession();

  return (
    <>
      {/* Login/Logout Button */}
      {session ? (
        // If logged in, show logout button
        <button
          onClick={() => signOut()}
          className="px-4 py-2 rounded bg-slate-800 hover:bg-slate-700 text-red-600 font-bold"
        >
          Sign Out
        </button>
      ) : (
        // If not logged in, show login button
        <button
          onClick={() => signIn("github")}
          className="px-4 py-2 rounded bg-slate-800 hover:bg-slate-700 text-blue-600 font-bold"
        >
          Sign In
        </button>
      )}
    </>
  );
};

export default UserActionButton;
