import { View } from "react-native";

import { RefetchUser } from "~/components/Auth/Callback/refetch-user";
import { H3 } from "~/components/ui/typography";
import { useAppSelector } from "~/hooks/redux";

export default function AuthCallbackPage() {
  const sessionUser = useAppSelector((state) => state.sessionUser);

  return (
    <View className="h-full items-center">
      <H3 className="px-2 py-3 text-center">Konto nieaktywowane!</H3>
      {sessionUser.fsUserData && (
        <RefetchUser userId={sessionUser.fsUserData.uid} />
      )}
    </View>
  );
}
