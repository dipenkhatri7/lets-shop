import { useWindowDimensions } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
} from "react-native-reanimated";

function Dot({ index, x }) {
  const { width: windowWidth } = useWindowDimensions();

  const animatedDotStyle = useAnimatedStyle(() => {
    const widthAnimation = interpolate(
      x.value,
      [
        (index - 1) * windowWidth,
        index * windowWidth,
        (index + 1) * windowWidth,
      ],
      [10, 20, 10],
      Extrapolation.CLAMP
    );
    const opacityAnimation = interpolate(
      x.value,
      [
        (index - 1) * windowWidth,
        index * windowWidth,
        (index + 1) * windowWidth,
      ],
      [0.5, 1, 0.5],
      Extrapolation.CLAMP
    );

    return {
      width: widthAnimation,
      opacity: opacityAnimation,
    };
  });

  const animatedColor = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      x.value,
      [0, windowWidth, windowWidth * 2],
      ["#005b4f", "#1e2169", "#f15937"]
    );

    return {
      backgroundColor: backgroundColor,
    };
  });

  return (
    <Animated.View
      className="h-2.5 rounded-full mx-2.5"
      style={[animatedDotStyle, animatedColor]}
    />
  );
}

export default Dot;
