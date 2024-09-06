export interface PointsInterface {
  currentPoints: number;
  currentLivePoints: number;
  currentAccurateScores: number;
  currentLiveAccurateScores: number;
}

export interface ResultInterface {
  userId: string;
  username: string;
  points: PointsInterface;
  currentPosition: number;
  livePositionAdvance: number;
}
