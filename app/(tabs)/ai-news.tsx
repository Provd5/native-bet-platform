import { View } from "react-native";

import { AINewsFeed } from "~/components/AINews/ai-news-feed";

export default function AINewsPage() {
  return (
    <View className="h-full items-center bg-background px-2">
      <AINewsFeed />
    </View>
  );
}
