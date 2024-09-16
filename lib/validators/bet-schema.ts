import { z } from "zod";

import { MatchStageArray, MatchWinnerArray } from "../constants";

export type betSchemaType = z.infer<typeof betSchema>;
export const betSchema = z.object({
  home: z.number().min(0),
  away: z.number().min(0),
  winner: z.enum([...MatchWinnerArray, ""]),
});

export type betGameSchemaType = z.infer<typeof betGameSchema>;
export const betGameSchema = z.object({
  gameId: z.union([z.string(), z.number()]),
  timestamp: z.number(),
  stage: z.enum(MatchStageArray),
});

export type betFinalsSchemaType = z.infer<typeof betFinalsSchema>;
export const betFinalsSchema = z.object({
  teams: z.array(
    z.object({
      id: z.union([z.string(), z.number()]),
      name: z.string(),
      icon: z.string(),
      nameCode: z.string(),
    }),
  ),
});
