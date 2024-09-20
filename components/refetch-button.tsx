import { type FC, useState } from "react";
import { View } from "react-native";
import { RefreshCw } from "lucide-react-native";

import Icon from "~/lib/icons/Icon";

import { LoadingSpinner } from "./Loaders/spinners";
import { Button } from "./ui/button";

interface RefetchButtonProps {
  refetchFunc: () => void;
}

export const RefetchButton: FC<RefetchButtonProps> = ({ refetchFunc }) => {
  const [isPending, setIsPending] = useState(false);

  const refetch = () => {
    if (isPending) return;

    refetchFunc();
    setIsPending(true);

    setTimeout(() => {
      setIsPending(false);
    }, 1000);
  };

  return (
    <View>
      <Button
        disabled={isPending}
        variant={"outline"}
        size={"icon"}
        onPress={() => refetch()}
      >
        {isPending ? (
          <LoadingSpinner className="text-primary" />
        ) : (
          <Icon LucideIcon={RefreshCw} size={24} />
        )}
      </Button>
    </View>
  );
};
