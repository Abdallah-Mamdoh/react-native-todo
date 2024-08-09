import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  FlatList,
  Pressable,
  Alert,
  Modal,
  ImageBackground
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
  const doneIcon = (<Icon name="checkmark-done-outline" size={20} color="white" />);
  const deleteIcon = <Icon name="trash-outline" size={20} color="white" />;
  const navigate = useNavigation();
  const [getData, setGetData] = useState([]);
  const [allState,setAllState] = useState(1)
  const [activeState,setActiveState] = useState(null)
  const [doneState,setDoneState] = useState(null)
  const [modalVisible, setModalVisible] = useState(false);
  const [wantDelete, setWantDelete] = useState();


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
    const prevlist = lists.filter((e) => e.id !== id);
    setLists(prevlist);
    setModalVisible(!modalVisible)
    setAllState(1)
    setActiveState(null)
    setDoneState(null)   
  };

  const prepareDelete = (id)=>{
    setModalVisible(!modalVisible)
    setWantDelete(id)
  }

  //done list
  const handleDone = (id) => {
    const myList = lists.map((e) => (e.id === id ? { ...e, state: true } : e));
    setLists(myList);
    setAllState(1)
    setActiveState(null)
    setDoneState(null)
  };

  // buttons func
  const getAll = () => {
    setDisplayed(lists);
    setAllState(1)
    setActiveState(null)
    setDoneState(null)
  };
  const getActive = () => {
    setDisplayed(lists.filter((e) => e.state === false));
    setAllState(null)
    setActiveState(1)
    setDoneState(null)
  };
  const getDone = () => {
    setDisplayed(lists.filter((e) => e.state === true));
    setAllState(null)
    setActiveState(null)
    setDoneState(1)
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
      
      <ImageBackground source={{uri:"https://images.stockcake.com/public/5/5/6/55693698-733b-4366-bfb7-2f22eef7b328_large/mystical-music-emergence-stockcake.jpg"}} resizeMode="cover" style={{flex:1,justifyContent:"center",alignItems:"center",width:"100%"}}>
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
          <TouchableOpacity style={{...styles.listButtons,backgroundColor: allState ? "rgb(66, 65, 66)" : "rgb(29, 152, 241)"}} onPress={getAll}>
            <Text style={{ color: "white", fontSize: "15"  }}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{...styles.listButtons,backgroundColor: activeState ? "rgb(66, 65, 66)" : "rgb(29, 152, 241)"}} onPress={getActive}>
            <Text style={{ color: "white", fontSize: "15" }}>Active</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{...styles.listButtons,backgroundColor: doneState ? "rgb(66, 65, 66)" : "rgb(29, 152, 241)"}} onPress={getDone}>
            <Text style={{ color: "white", fontSize: "15" }}>Done</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={displayed}
          renderItem={({ item }) => (
            <View style={styles.listBox}>
              <View style={{ flex:2}}>
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
              <View style={{ flexDirection: "row" ,flex:1.5}}>
                {!item.state ?<TouchableOpacity
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
                </TouchableOpacity>:null}
                <View style={{ flexDirection: "row" ,flex:2.5}} >
                    <Modal
                       animationType="slide"
                       transparent={true}
                       visible={modalVisible}
                       onRequestClose={() => {
                         Alert.alert('Modal has been closed.');
                         setModalVisible(!modalVisible);
                       }}>
                       <View style={styles.centeredView}>
                         <View style={styles.modalView}>
                           <Text style={styles.modalText}>Are you sure you want to delete this list?</Text>
                           <View style={{flexDirection:"row"}}>
                              <Pressable
                                style={[styles.button, {backgroundColor:"rgb(54, 162, 171)",marginRight:10,width:70}]}
                                onPress={() => handleDelete(wantDelete)}>
                                <Text style={styles.textStyle}>Yes</Text>
                              </Pressable>

                              <Pressable
                                style={[styles.button, {backgroundColor:"red",width:70}]}
                                onPress={() => setModalVisible(!modalVisible)}>
                                <Text style={styles.textStyle}>No</Text>
                              </Pressable>
                           </View>
                         </View>
                       </View>
                     </Modal>
                    <TouchableOpacity
                      onPress={() => prepareDelete(item.id)}
                      style={{
                        ...styles.listButtons,
                        flex:1.5,
                        width: 35,
                        backgroundColor: "red",
                        borderRadius: "50px",
                      }}
                    >
                      <Text style={{ color: "white", fontSize: "12" }}>
                        {deleteIcon}
                      </Text>
                    </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.id}
          ></FlatList>
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
  },
  header: {
    color: "rgb(33, 110, 78)",
    fontSize: "30px",
    fontWeight: "700",
  },
  inputBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 30,
    height: 70,
    marginVertical:20
  },
  addBox: {
    display: "flex",
    justifyContent: "center",
    width: "90%",
    marginRight: 20,
  },
  textInput: {
    flex:1,
    flexDirection:"column",
    borderWidth: 1,
    marginBottom: 6,
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
    width: 70,
    height: 35,
    borderRadius: "10px",
    flex:2,
    marginRight:10,
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
