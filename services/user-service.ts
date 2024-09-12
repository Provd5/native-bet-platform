import { onAuthStateChanged, Unsubscribe } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

import { UserInterface } from "~/types/users";

import { auth, store } from "~/firebase.config";
import { useAppDispatch } from "~/hooks/redux";
import { ERROR_ENUM } from "~/lib/constants";
import { setUserData } from "~/lib/features/session-user-slice";

const COLLECTION_NAME = "users";

export class UserService {
  private dispatch = useAppDispatch();

  private getRef = (userId: string) => {
    return doc(store, COLLECTION_NAME, userId);
  };

  // GET
  getUser = async (userId: string): Promise<UserInterface | null> => {
    try {
      const user = await getDoc(this.getRef(userId));
      if (!user.exists()) return null;
      const userData = user.data() as UserInterface;

      return userData;
    } catch (e) {
      console.error("Error getting user data:", e);
      throw new Error(
        "Nie udało się pobrać danych użytkownika." +
          ` ${ERROR_ENUM.TRY_AGAIN_LATER}.`,
      );
    }
  };

  // POST
  createUser = async (userId: string, username: string): Promise<void> => {
    try {
      await setDoc(this.getRef(userId), {
        username,
        isActive: false,
      });
    } catch (e) {
      console.error("Error creating user:", e);
      throw new Error(
        "Nie udało się utworzyć użytkownika. Sprawdź swoje dane wejściowe i spróbuj ponownie.",
      );
    }
  };

  // SUBSCRIBE
  subscribeToAuthChanges = (): Unsubscribe =>
    onAuthStateChanged(auth, (user) => {
      try {
        if (!user) {
          this.dispatch(setUserData({ dbUserData: null, fsUserData: null }));
          return;
        }

        (async () => {
          const { email, emailVerified, uid } = user;
          await this.getUser(user.uid).then((dbUser) => {
            if (dbUser) {
              this.dispatch(
                setUserData({
                  dbUserData: dbUser,
                  fsUserData: { uid, email, emailVerified },
                }),
              );
            }
          });
        })();
      } catch (e) {
        console.error("Error subscribing to auth changes:", e);
        this.dispatch(setUserData({ dbUserData: null, fsUserData: null }));
      }
    });
}
