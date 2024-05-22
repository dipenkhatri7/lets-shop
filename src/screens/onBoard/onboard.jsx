import React from "react";
import { View } from "react-native";
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import data from "../../data/data";
import RenderItem from "./components/renderItem";
import Pagination from "./components/pagination";
import CustomButton from "./components/customButton";

function Onboard({ onComplete, navigation }) {
  const handleGetStarted = () => {
    onComplete();
    navigation.navigate("Board");
  };

  const flatListRef = useAnimatedRef();
  const x = useSharedValue(0);
  const flatListIndex = useSharedValue(0);

  const onViewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0 && viewableItems[0].index !== null) {
      flatListIndex.value = viewableItems[0].index;
    }
  };

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      x.value = event.contentOffset.x;
    },
  });

  return (
    <View className="flex-1">
      <Animated.FlatList
        ref={flatListRef}
        data={data}
        onScroll={onScroll}
        keyExtractor={(item) => item.id}
        horizontal={true}
        scrollEventThrottle={16}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <RenderItem item={item} index={index} x={x} />
        )}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{
          minimumViewTime: 300,
          viewAreaCoveragePercentThreshold: 10,
        }}
      />
      <View className="absolute bottom-9 mx-8 py-30 left-0 right-0 flex-row justify-between align-center">
        <Pagination data={data} x={x} />
        <CustomButton
          flatListRef={flatListRef}
          flatListIndex={flatListIndex}
          dataLength={data.length}
          onComplete={handleGetStarted}
          x={x}
        />
      </View>
    </View>
  );
}

export default Onboard;
