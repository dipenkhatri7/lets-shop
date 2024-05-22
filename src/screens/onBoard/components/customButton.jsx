import { Pressable } from "react-native";
import { useWindowDimensions, Text } from "react-native";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";

function CustomButton({
  flatListRef,
  flatListIndex,
  dataLength,
  onComplete,
  x,
}) {
  const { width: windowWidth } = useWindowDimensions();

  const animatedColor = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      x.value,
      [0, windowWidth, windowWidth * 2],
      ["#005b4f", "#1e2169", "#f15937"]
    );
    return {
      backgroundColor,
    };
  });

  const buttonAnimationStyle = useAnimatedStyle(() => {
    return {
      width:
        flatListIndex.value === dataLength - 1
          ? withSpring(165)
          : withSpring(60),
      height: 50,
    };
  });

  const arrowAnimationStyle = useAnimatedStyle(() => {
    return {
      width: 30,
      height: 30,
      opacity:
        flatListIndex.value === dataLength - 1 ? withTiming(0) : withTiming(1),
      transform: [
        {
          translateX:
            flatListIndex.value === dataLength - 1
              ? withTiming(100)
              : withTiming(0),
        },
      ],
    };
  });
  const textAnimationStyle = useAnimatedStyle(() => {
    return {
      opacity:
        flatListIndex.value === dataLength - 1 ? withTiming(1) : withTiming(0),
      transform: [
        {
          translateX:
            flatListIndex.value === dataLength - 1
              ? withTiming(0)
              : withTiming(-100),
        },
      ],
    };
  });
  return (
    <Pressable
      onPress={() => {
        if (flatListIndex.value < dataLength - 1) {
          flatListRef.current?.scrollToIndex({
            index: flatListIndex.value + 1,
          });
        } else {
          // console.log("Get Started");
          onComplete();
        }
      }}
    >
      <Animated.View
        className="p-8 rounded-full w-1.5 h-1.5 justify-center items-center overflow-hidden"
        style={[animatedColor, buttonAnimationStyle]}
      >
        <Animated.Text
          className="text-white absolute text-base"
          style={textAnimationStyle}
        >
          Get Started
        </Animated.Text>
        <Animated.Image
          source={require("../../../../assets/images/right-arrow.png")}
          className="absolute w-8 h-8"
          style={arrowAnimationStyle}
        />
      </Animated.View>
    </Pressable>
  );
}
export default CustomButton;
