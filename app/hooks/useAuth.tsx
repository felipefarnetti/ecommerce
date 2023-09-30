import { useSession } from "next-auth/react";
import { SessionUserProfile } from "@app/types";

interface Auth {
  isAdmin: boolean;
  loading: boolean;
  loggedIn: boolean;
  profile?: SessionUserProfile | null;
}

export default function useAuth() {
  const session = useSession();
  // console.log(session.data?.user);
  const user = session.data?.user;

  return {
    loading: session.status === "loading",
    loggedIn: session.status === "authenticated",
    isAdmin: user?.role === "admin",
    profile: user,
  };
}
