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

/**
 * Onboarding screen component.
 *
 * Renders a horizontal scrollable list of items with pagination and a custom button.
 * @param {Object} props - Component props
 * @param {Function} props.onComplete - Callback function to execute when onboarding is completed
 * @param {Object} props.navigation - Navigation object for navigating between screens
 * @returns {JSX.Element} Onboarding screen component
 */
function Onboard({ onComplete, navigation }) {
  // Callback function to handle "Get Started" button press
  const handleGetStarted = () => {
    onComplete();
    navigation.replace("Board");
  };

  // Animated values for handling scroll position
  const flatListRef = useAnimatedRef();
  const x = useSharedValue(0);
  const flatListIndex = useSharedValue(0);

  // Function to handle viewable items change
  const onViewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0 && viewableItems[0].index !== null) {
      flatListIndex.value = viewableItems[0].index;
    }
  };

  // Animated scroll handler function
  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      x.value = event.contentOffset.x;
    },
  });

  return (
    <View style={{ flex: 1 }}>
      <Animated.FlatList
        ref={flatListRef}
        data={data}
        onScroll={onScroll}
        keyExtractor={(item) => item.id}
        horizontal
        scrollEventThrottle={16}
        pagingEnabled
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
      <View
        style={{
          position: "absolute",
          bottom: 9,
          marginHorizontal: 8,
          paddingVertical: 30,
          left: 0,
          right: 0,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
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
