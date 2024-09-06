import { View } from "react-native";

import { Button } from "~/components/ui/button";
import { P } from "~/components/ui/typography";
import useUserActions from "~/hooks/actions/useUserActions";

export default function AuthCallbackPage() {
  const { signOutUser } = useUserActions();

  return (
    <View>
      <Button onPress={async () => await signOutUser()}>
        <P>Wyloguj</P>
      </Button>
      <P>AuthCallbackPage</P>
    </View>
  );
}
