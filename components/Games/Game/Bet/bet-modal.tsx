import React, { type FC, useState } from "react";
import { Modal, Pressable, View } from "react-native";

import { type BetInterface, type GameInterface } from "~/types/games";

import { Button } from "~/components/ui/button";
import { P } from "~/components/ui/typography";

import { GameCard } from "../game-card";
import { Bet } from "./bet";

interface BetModalProps {
  sessionBet: BetInterface | undefined;
  game: GameInterface;
}

export const BetModal: FC<BetModalProps> = ({ sessionBet, game }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <Pressable onPress={() => setModalVisible(true)}>
        <View>
          <GameCard game={game} sessionBet={sessionBet} />
        </View>
      </Pressable>
      <Modal
        transparent
        animationType="fade"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View className="flex-1 items-center justify-center bg-black/80 p-2">
          <View className="w-full max-w-3xl rounded-lg border border-border bg-background p-6 shadow-lg shadow-foreground/10">
            <Bet game={game} sessionBet={sessionBet} />
            <Button
              className="mx-auto w-full max-w-xs"
              variant={"secondary"}
              onPress={() => setModalVisible(false)}
            >
              <P>Zamknij</P>
            </Button>
          </View>
        </View>
      </Modal>
    </>
  );
};
