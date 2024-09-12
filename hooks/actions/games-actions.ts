import { useEffect } from "react";

import { GamesService } from "~/services/games-service";

export function useFetchGamesSubscriber() {
  const gamesService = new GamesService();

  useEffect(() => {
    const unsubscribe = gamesService.subscribeToFetchGames();
    return () => unsubscribe();
  }, []);
}
