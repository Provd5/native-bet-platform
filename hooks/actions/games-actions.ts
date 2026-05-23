import { useEffect } from "react";

import { useAppDispatch } from "~/hooks/redux";
import { GamesService } from "~/services/games-service";

export function useFetchGamesSubscriber() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const gamesService = new GamesService(dispatch);
    const unsubscribe = gamesService.subscribeToFetchGames();
    return () => unsubscribe();
  }, [dispatch]);
}
