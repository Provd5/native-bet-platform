import { BetFinals } from "~/components/Games/Finals/bet-finals";
import { BetFinalsUsers } from "~/components/Games/Finals/bet-finals-users";
import { FINALS_BETTING_CLOSING_DATE } from "~/constants/current-event";
import { useFetchTeamsSubscriber } from "~/hooks/actions/teams-actions";

export default function FinalsPage() {
  useFetchTeamsSubscriber();
  const isFinished = Date.now() > FINALS_BETTING_CLOSING_DATE;

  return isFinished ? <BetFinalsUsers /> : <BetFinals />;
}
