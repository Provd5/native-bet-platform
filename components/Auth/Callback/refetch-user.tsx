import React, { type FC } from "react";
import { View } from "react-native";
import { router } from "expo-router";

import { RefetchButton } from "~/components/refetch-button";
import { H4, P } from "~/components/ui/typography";
import { useGetUser } from "~/hooks/actions/user-actions";
import { useAppDispatch } from "~/hooks/redux";
import { setDbUserData } from "~/lib/features/session-user-slice";

interface RefetchUserProps {
  userId: string;
}

export const RefetchUser: FC<RefetchUserProps> = ({ userId }) => {
  const dispatch = useAppDispatch();

  const user = useGetUser(userId);

  const refetchFunc = async () => {
    try {
      const freshUser = (await user.refetch()).data ?? null;
      dispatch(setDbUserData(freshUser));
      if (freshUser?.isActive) router.replace("/games");
    } catch (e) {
      console.error("Error refetching user:", e);
    }
  };

  return (
    <View className="max-w-md px-2 pb-3">
      <P>
        {`Twoje konto nie zostało jeszcze przez nas aktywowane.\nMożliwe, że bedziesz musiał poczekać kilka chwil.`}
      </P>
      <View className="mt-6 flex-row items-center gap-3">
        <RefetchButton refetchFunc={refetchFunc} />
        <H4>{`Konto powinno być już aktywne?\nSpróbuj odświeżyć!`}</H4>
      </View>
    </View>
  );
};
