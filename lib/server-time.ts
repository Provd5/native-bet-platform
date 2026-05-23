import { onValue, ref } from "firebase/database";

import { db } from "~/firebase.config";

const SERVER_TIME_OFFSET_PATH = ".info/serverTimeOffset";
const INIT_TIMEOUT_MS = 1500;

let serverTimeOffset = 0;
let initialized = false;
let initPromise: Promise<void> | null = null;

const resolveWithTimeout = (resolve: () => void) => {
  setTimeout(() => {
    if (!initialized) {
      initialized = true;
      resolve();
    }
  }, INIT_TIMEOUT_MS);
};

export const initServerTimeGuard = async (): Promise<void> => {
  if (initialized) return;
  if (initPromise) return initPromise;

  initPromise = new Promise((resolve) => {
    const offsetRef = ref(db, SERVER_TIME_OFFSET_PATH);

    resolveWithTimeout(resolve);

    onValue(
      offsetRef,
      (snapshot) => {
        const value = snapshot.val();

        if (typeof value === "number") {
          serverTimeOffset = value;
        }

        if (!initialized) {
          initialized = true;
          resolve();
        }
      },
      (error) => {
        console.error("Error getting firebase server time offset:", error);

        if (!initialized) {
          initialized = true;
          resolve();
        }
      },
    );
  });

  return initPromise;
};

export const getServerNow = (): number => {
  return Date.now() + serverTimeOffset;
};
