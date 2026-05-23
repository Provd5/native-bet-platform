import { useEffect } from "react";

import { useAppDispatch } from "~/hooks/redux";
import { TeamsService } from "~/services/teams-service";

export function useFetchTeamsSubscriber() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const teamsService = new TeamsService(dispatch);
    const unsubscribe = teamsService.subscribeToFetchTeams();
    return () => unsubscribe();
  }, [dispatch]);
}
