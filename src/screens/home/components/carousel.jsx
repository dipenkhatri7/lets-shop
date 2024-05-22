import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  Image,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";

const { width } = Dimensions.get("window");

const CarouselSlider = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [randomItems, setRandomItems] = useState([]);

  useEffect(() => {
    if (items.length > 0) {
      // setRandomItems(shuffleAndSelectItems(items, 5));
      setRandomItems(selectLastItems(items, 5));
    }
  }, [items]);

  const selectLastItems = (array, count) => {
    return array.slice(-count);
  };

  // const shuffleAndSelectItems = (array, count) => {
  //   const shuffled = array.sort(() => 0.5 - Math.random());
  //   return shuffled.slice(0, count);
  // };

  const renderItem = ({ item }) => (
    <View style={styles.slide}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text
        className="text-center font-urbanist-medium text-lg px-5 my-5"
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {item.title}
      </Text>
    </View>
  );

  const onViewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  };

  const viewabilityConfig = {
    viewAreaCoveragePercentThreshold: 50,
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={randomItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />
      <View style={styles.pagination}>
        {randomItems.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              currentIndex === index ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },
  slide: {
    width: width,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
  },
  pagination: {
    marginTop: 10,
    flexDirection: "row",
    alignSelf: "center",
  },
  dot: {
    width: 11,
    height: 11,
    borderRadius: 5,
    marginHorizontal: 8,
  },
  activeDot: {
    backgroundColor: "black",
  },
  inactiveDot: {
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
});

export default CarouselSlider;
