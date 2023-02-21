import Link from "next/link";
import { auth } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export const Nav = () => {
    const [user,loading]  = useAuthState(auth);

    return (
    <nav className="flex justify-between items-center py-10">
        <Link className="text-lg font-medium" href="/">
            Creative lines
        </Link>
        <ul className="flex items-center gap-10">
            {!user && (
            <Link className="py-2 px-4 text-sm bg-indigo-500 text-white rounded-lg font-medium ml-8" href={"/auth/login"}>
              Join now!
            </Link>)
            }
            {user && (
                <div className="flex items-center gap-6">
                    <Link href="/post">
                        <button className="text-lg font-medium bg-indigo-500 rounded-lg py-2 px-4 text-white">Post</button>
                    </Link>
                    <Link href="/dashboard">
                    <img className="w-10 rounded-full cursor-pointer" src={user.photoURL}/>
                    </Link>
                </div>
            )}
           
        </ul>
    </nav>)
  };