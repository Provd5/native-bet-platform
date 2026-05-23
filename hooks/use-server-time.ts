import { useEffect, useState } from "react";

import { getServerNow, initServerTimeGuard } from "~/lib/server-time";

const TICK_MS = 1000;

export const useServerTime = (): number => {
  const [serverNow, setServerNow] = useState(getServerNow());

  useEffect(() => {
    let mounted = true;

    initServerTimeGuard().then(() => {
      if (mounted) {
        setServerNow(getServerNow());
      }
    });

    const intervalId = setInterval(() => {
      setServerNow(getServerNow());
    }, TICK_MS);

    return () => {
      mounted = false;
      clearInterval(intervalId);
    };
  }, []);

  return serverNow;
};
