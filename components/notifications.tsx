import * as React from "react";
import { useEffect, useRef } from "react";
import { Toast as ToastType } from "react-hot-toast";
import { useToaster } from "react-hot-toast/headless";
import { Animated, View } from "react-native";
import Constants from "expo-constants";

import { P } from "./ui/typography";

interface ToastProps {
  t: ToastType;
  updateHeight: (toastId: string, height: number) => void;
  offset: number;
}

const Toast: React.FC<ToastProps> = ({ t, updateHeight, offset }) => {
  const fadeAnim = useRef(new Animated.Value(0.5)).current;
  const posAnim = useRef(new Animated.Value(-80)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      useNativeDriver: true,
      toValue: t.visible ? 1 : 0,
      duration: 300,
    }).start();
  }, [fadeAnim, t.visible]);

  useEffect(() => {
    Animated.spring(posAnim, {
      useNativeDriver: true,
      toValue: t.visible ? offset : -80,
    }).start();
  }, [posAnim, offset, t.visible]);

  return (
    <Animated.View
      style={{
        pointerEvents: "none",
        position: "absolute",
        left: 0,
        right: 0,
        zIndex: t.visible ? 9999 : undefined,
        alignItems: "center",
        opacity: fadeAnim,
        transform: [
          {
            translateY: posAnim,
          },
        ],
      }}
    >
      <View
        onLayout={(event) =>
          updateHeight(t.id, event.nativeEvent.layout.height)
        }
        style={{
          margin: Constants.statusBarHeight + 10,
        }}
        className="pointer-events-auto flex-shrink-0 flex-row items-center gap-3 rounded-lg border border-border bg-card px-3 py-2 shadow-md shadow-border/50"
        key={t.id}
      >
        {t.icon && <P>{t.icon}</P>}
        {t.message && <P>{t.message.toString()}</P>}
      </View>
    </Animated.View>
  );
};

export const Notifications = () => {
  const { toasts, handlers } = useToaster();

  return (
    <View className="absolute left-0 right-0 top-0">
      {toasts.map((t) => (
        <Toast
          key={t.id}
          t={t}
          updateHeight={(_, height) => handlers.updateHeight(t.id, height)}
          offset={handlers.calculateOffset(t, {
            reverseOrder: false,
          })}
        />
      ))}
    </View>
  );
};
