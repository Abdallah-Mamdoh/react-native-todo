import { StatusBar } from "expo-status-bar";
import { v4 as uuid } from "uuid";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";

export default function App() {
  const [lists, setLists] = useState([]);
  const [title, onChangeTitle] = useState("");
  const [desc, onChangeDesc] = useState("");

  const handleAdd = () => {
    setLists((prevList)=>[...prevList, {title: title, description: desc }]);
    onChangeTitle("");
    onChangeDesc("");
  };

  console.log(title);
  console.log(desc);
  console.log(lists);

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
            justifyContent: "space-between",
            width: "90%",
            marginVertical: 10,
          }}
        >
          <TouchableOpacity style={styles.listButtons}>
            <Text style={{ color: "white", fontSize: "15" }}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.listButtons}>
            <Text style={{ color: "white", fontSize: "15" }}>Active</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.listButtons}>
            <Text style={{ color: "white", fontSize: "15" }}>Done</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={lists}
          renderItem={({ item }) => (
            <View style={styles.listBox}>
              <View style={{ display: "flex" }}>
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
              </View>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  style={{
                    ...styles.listButtons,
                    width: 45,
                    marginLeft: 5,
                    backgroundColor: "green",
                  }}
                >
                  <Text style={{ color: "white", fontSize: "15" }}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    ...styles.listButtons,
                    width: 45,
                    backgroundColor: "red",
                    marginLeft: 5,
                  }}
                >
                  <Text style={{ color: "white", fontSize: "12" }}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          keyExtractor={Date.now}
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
