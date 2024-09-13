import { useEffect } from "react";

import { TeamsService } from "~/services/teams-service";

export function useFetchTeamsSubscriber() {
  const teamsService = new TeamsService();

  useEffect(() => {
    const unsubscribe = teamsService.subscribeToFetchTeams();
    return () => unsubscribe();
  }, []);
}
