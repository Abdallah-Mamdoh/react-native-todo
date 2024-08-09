import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export default function Home() {
  const [lists, setLists] = useState([
    { id: 1, title: "Hello", description: "Welcome here", state: false },
    { id: 2, title: "GYM", description: "Go to gym", state: false },
  ]);
  const [title, onChangeTitle] = useState("");
  const [displayed, setDisplayed] = useState([]);
  const [desc, onChangeDesc] = useState("");
  const doneIcon = (
    <Icon name="checkmark-done-outline" size={20} color="white" />
  );
  const deleteIcon = <Icon name="trash-outline" size={20} color="white" />;
  const navigate = useNavigation();
  const [getData, setGetData] = useState([]);

  useEffect(() => {
    setDisplayed(lists);
    console.log(lists);
  }, [lists]);

  useEffect(() => {
    console.log(getData);
  }, [getData]);

  //////////////////////////////////////////////////
  // Add lists
  const handleAdd = () => {
    setLists((prevList) => [
      ...prevList,
      { title: title, description: desc, state: false, id: Date.now() },
    ]);
    onChangeTitle("");
    onChangeDesc("");
  };

  // delete lists
  const handleDelete = (id) => {
    const prevlist = lists.filter((e) => e.id != id);
    setLists(prevlist);
  };

  //mark as done
  const handleDone = (id) => {
    const myList = lists.map((e) => (e.id === id ? { ...e, state: true } : e));
    setLists(myList);
  };

  // buttons func
  const getAll = () => {
    setDisplayed(lists);
  };
  const getActive = () => {
    setDisplayed(lists.filter((e) => e.state === false));
  };
  const getDone = () => {
    setDisplayed(lists.filter((e) => e.state === true));
  };

  //AsyncStorage
  const StoreData = async (todos) => {
    try {
      await AsyncStorage.setItem("todo", JSON.stringify(todos));
    } catch (error) {
      ("Error saving data");
    }
  };

  const LoadData = async () => {
    try {
      const todos = await AsyncStorage.getItem("todo");
      return todos != null ? setGetData(JSON.parse(todos)) : [];
    } catch (error) {
      ("Error loading data");
      return [];
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.box}>
        <Text style={styles.header}>To-Do List App</Text>

        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 15 }}
        >
          <View style={{ flex: 1, height: 1, backgroundColor: "black" }} />
          <View>
            <Text style={{ width: 90, textAlign: "center" }}>Add new List</Text>
          </View>
          <View style={{ flex: 1, height: 1, backgroundColor: "black" }} />
        </View>

        <View style={styles.inputBox}>
          <View style={styles.addBox}>
            <TextInput
              style={styles.textInput}
              value={title}
              onChangeText={onChangeTitle}
              placeholder="Add title..."
            ></TextInput>
            <TextInput
              style={styles.textInput}
              value={desc}
              onChangeText={onChangeDesc}
              placeholder="Add description..."
            ></TextInput>
          </View>
          <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
            <Text style={{ color: "white", fontSize: "25" }}>+</Text>
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={{ flex: 1, height: 1, backgroundColor: "black" }} />
          <View>
            <Text style={{ width: 70, textAlign: "center" }}>To-Do List</Text>
          </View>
          <View style={{ flex: 1, height: 1, backgroundColor: "black" }} />
        </View>

        <View
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
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "90%",
            marginVertical: 10,
          }}
        >
          <TouchableOpacity style={styles.listButtons} onPress={getAll}>
            <Text style={{ color: "white", fontSize: "15" }}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.listButtons} onPress={getActive}>
            <Text style={{ color: "white", fontSize: "15" }}>Active</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.listButtons} onPress={getDone}>
            <Text style={{ color: "white", fontSize: "15" }}>Done</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={displayed}
          renderItem={({ item }) => (
            <View style={styles.listBox}>
              <View style={{ display: "flex" }}>
                <TouchableOpacity
                  onPress={() => {
                    navigate.navigate("TodoDetails", { item });
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 17,
                      fontWeight: "bold",
                      paddingBottom: 2,
                    }}
                  >
                    {item.title}
                  </Text>
                  <Text
                    style={{
                      color: "rgba(0,0,0,0.5)",
                      fontSize: 15,
                      fontWeight: "500",
                    }}
                  >
                    {item.description}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  onPress={() => handleDone(item.id)}
                  style={{
                    ...styles.listButtons,
                    width: 35,
                    marginLeft: 5,
                    backgroundColor: "green",
                    borderRadius: "50px",
                  }}
                >
                  <Text style={{ color: "white", fontSize: "15" }}>
                    {doneIcon}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleDelete(item.id)}
                  style={{
                    ...styles.listButtons,
                    width: 35,
                    backgroundColor: "red",
                    marginLeft: 5,
                    borderRadius: "50px",
                  }}
                >
                  <Text style={{ color: "white", fontSize: "12" }}>
                    {deleteIcon}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.id}
        ></FlatList>
      </View>
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
  },
  header: {
    color: "white",
    fontSize: "30px",
    fontWeight: "700",
  },
  inputBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 30,
    height: "20%",
  },
  addBox: {
    display: "flex",
    justifyContent: "center",
    width: "90%",
    height: "30%",
    marginRight: 20,
  },
  textInput: {
    height: "80%",
    borderWidth: 1,
    margin: 10,
    backgroundColor: "rgba(255,255,255,0.6)",
    paddingHorizontal: 10,
    borderRadius: "7px",
    borderColor: "rgb(54, 162, 171)",
  },
  addButton: {
    backgroundColor: "rgb(29, 152, 241)",
    width: 40,
    height: 40,
    borderRadius: "50px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  listButtons: {
    backgroundColor: "rgb(29, 152, 241)",
    width: 70,
    height: 35,
    borderRadius: "10px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  listBox: {
    width: "95%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: "20px",
    backgroundColor: "rgba(54, 162, 171,0.7)",
    padding: 12,
    marginBottom: 10,
  },
});
