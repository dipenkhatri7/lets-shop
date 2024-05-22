import { View, Text, StyleSheet, useWindowDimensions } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import LottieView from "lottie-react-native";

const RenderItem = ({ item, index, x }) => {
  const { width: windowWidth } = useWindowDimensions();
  const circleAnimationStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      x.value,
      [
        (index - 1) * windowWidth,
        index * windowWidth,
        (index + 1) * windowWidth,
      ],
      [1, 4, 4],
      Extrapolation.CLAMP
    );
    return {
      transform: [{ scale: scale }],
    };
  });

  const lottieAnimationStyle = useAnimatedStyle(() => {
    const translateYAnimation = interpolate(
      x.value,
      [
        (index - 1) * windowWidth,
        index * windowWidth,
        (index + 1) * windowWidth,
      ],
      [200, 0, -200],
      Extrapolation.CLAMP
    );
    return {
      transform: [{ translateY: translateYAnimation }],
    };
  });

  return (
    <View style={[styles.itemContainer, { width: windowWidth }]}>
      <View style={styles.circleContainer}>
        <Animated.View
          style={[
            {
              width: windowWidth,
              height: windowWidth,
              backgroundColor: item.backgroundColor,
              borderRadius: windowWidth / 2,
            },
            circleAnimationStyle,
          ]}
        />
      </View>
      <Animated.View style={lottieAnimationStyle}>
        <LottieView
          source={item.animation}
          style={{
            width: windowWidth * 0.88,
            height: windowWidth * 0.88,
          }}
          autoPlay={true}
          loop={true}
        />
        <Text style={[{ color: item.textColor }, styles.textitem]}>
          {item.title}
        </Text>
      </Animated.View>
      <Text style={[{ color: item.textColor }, styles.textDescription]}>
        {item.description}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 120,
  },
  circleContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  textitem: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 38,
    fontWeight: "bold",
    marginHorizontal: 20,
  },
  textDescription: {
    textAlign: "center",
    fontSize: 20,
    marginHorizontal: 30,
    // paddingBottom: 80,
  },
});

export default RenderItem;
