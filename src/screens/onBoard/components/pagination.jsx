import { View } from "react-native";
import Dot from "./dot";
function Pagination({ data, x }) {
  return (
    <View className="flex-row h-30 justify-center items-center">
      {data.map((_, index) => {
        return <Dot key={index} index={index} x={x} />;
      })}
    </View>
  );
}

export default Pagination;
