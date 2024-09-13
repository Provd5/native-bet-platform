import { type FC, useState } from "react";
import { Modal, Pressable, View } from "react-native";

import { Button } from "./ui/button";
import { P } from "./ui/typography";

interface ModalWrapperProps {
  children: React.ReactNode;
  triggerChildren: React.ReactNode;
}

export const ModalWrapper: FC<ModalWrapperProps> = ({
  children,
  triggerChildren,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <Pressable onPress={() => setModalVisible(true)}>
        {triggerChildren}
      </Pressable>
      <Modal
        transparent
        animationType="fade"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View className="flex-1 items-center justify-center bg-black/80 p-2">
          <View className="h-auto max-h-full w-full max-w-3xl rounded-lg border border-border bg-background p-6 pb-[72px] shadow-lg shadow-foreground/10">
            {children}
            <View className="absolute inset-x-0 bottom-0 bg-background p-2 pb-6">
              <Button
                className="mx-auto w-full max-w-xs"
                variant={"secondary"}
                onPress={() => setModalVisible(false)}
              >
                <P>Zamknij</P>
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};
