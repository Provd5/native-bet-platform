import { onAuthStateChanged, Unsubscribe } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

import { UserInterface } from "~/types/users";

import { auth, store } from "~/firebase.config";
import { ERROR_ENUM } from "~/lib/constants";
import { setUserData } from "~/lib/features/session-user-slice";
import type { AppDispatch } from "~/lib/store";

const COLLECTION_NAME = "users";

export class UserService {
  constructor(private dispatch?: AppDispatch) {}

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
  subscribeToAuthChanges = (): Unsubscribe => {
    const dispatch = this.dispatch;

    if (!dispatch) {
      throw new Error("Dispatch is required for auth subscription");
    }

    return onAuthStateChanged(auth, (user) => {
      try {
        if (!user) {
          dispatch(setUserData({ dbUserData: null, fsUserData: null }));
          return;
        }

        (async () => {
          const { email, emailVerified, uid } = user;
          await this.getUser(user.uid).then((dbUser) => {
            if (dbUser) {
              dispatch(
                setUserData({
                  dbUserData: dbUser,
                  fsUserData: { uid, email, emailVerified },
                }),
              );
            }
          });
        })().catch((e) => {
          console.error("Error subscribing to auth changes:", e);
          dispatch(setUserData({ dbUserData: null, fsUserData: null }));
        });
      } catch (e) {
        console.error("Error subscribing to auth changes:", e);
        dispatch(setUserData({ dbUserData: null, fsUserData: null }));
      }
    });
  };
}
