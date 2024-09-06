import { useRouter } from "expo-router";
import { signOut, UserCredential } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

import { UserInterface } from "~/types/users";

import { auth, store } from "~/firebase.config";

export default function useUserActions() {
  const router = useRouter();

  const signOutUser = async () => {
    try {
      await signOut(auth).then(() => {
        router.replace("/sign-in");
      });
    } catch (e) {
      console.log(e);
    }
  };

  const createUser = async (
    userCredential: UserCredential,
    username: string,
  ): Promise<void> => {
    try {
      const usersRef = doc(store, "users", userCredential.user.uid);
      setDoc(usersRef, {
        username,
        isActive: false,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const getUser = async (userId: string): Promise<UserInterface | null> => {
    try {
      const usersRef = doc(store, "users", userId);
      const user = await getDoc(usersRef);
      if (!user.exists()) return null;
      const userData = user.data() as UserInterface;

      return userData;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  return { signOutUser, getUser, createUser };
}
