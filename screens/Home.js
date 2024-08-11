import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ImageBackground
} from "react-native";
import TodoForm from "../components/TodoForm";
import Todos from "../components/Todos";

export default function Home() {
  // const [lists, setLists] = useState([
  //   { id: 1, title: "Hello", description: "Welcome here", state: false },
  //   { id: 2, title: "GYM", description: "Go to gym", state: false },
  // ]);
  // const [displayed, setDisplayed] = useState([]);

  // useEffect(() => {
  //   setDisplayed(lists);
  //   console.log(lists);
  // }, [lists]);


  //AsyncStorage

  // useEffect(() => {
  //   console.log(getData);
  // }, [getData]);

  // const StoreData = async (todos) => {
  //   try {
  //     await AsyncStorage.setItem("todo", JSON.stringify(todos));
  //   } catch (error) {
  //     ("Error saving data");
  //   }
  // };

  // const LoadData = async () => {
  //   try {
  //     const todos = await AsyncStorage.getItem("todo");
  //     return todos != null ? setGetData(JSON.parse(todos)) : [];
  //   } catch (error) {
  //     ("Error loading data");
  //     return [];
  //   }
  // };

  return (
  <SafeAreaView style={styles.container}>
      
    <ImageBackground source={{uri:"https://images.stockcake.com/public/5/5/6/55693698-733b-4366-bfb7-2f22eef7b328_large/mystical-music-emergence-stockcake.jpg"}} resizeMode="cover" style={{flex:1,justifyContent:"center",alignItems:"center",width:"100%"}}>
      <View style={styles.box}>
        <Text style={styles.header}>To-Do List App</Text>

        <TodoForm/>

        <Todos/>

        {/* AsyncStorage */}
        {/* <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            width: "90%",
            marginVertical: 10,
          }}
        >
          <TouchableOpacity
            style={{
              ...styles.listButtons,
              marginRight: 10,
              backgroundColor: "orange",
            }}
            onPress={() => {
              StoreData(lists);
            }}
          >
            <Text style={{ color: "white", fontSize: "15" }}>Set Data</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ ...styles.listButtons, backgroundColor: "orange" }}
            onPress={() => {
              LoadData();
            }}
          >
            <Text style={{ color: "white", fontSize: "15" }}>Get Data</Text>
          </TouchableOpacity>
        </View> */}
      </View>
    </ImageBackground>
  </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(54, 162, 171)",
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#fff",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.6)",
    width: "80%",
    height: "80%",
    borderRadius: "30px",
    padding: 15,
    overflow:"hidden"
  },
  header: {
    color: "rgb(33, 110, 78)",
    fontSize: "30px",
    fontWeight: "700",
  }
});
