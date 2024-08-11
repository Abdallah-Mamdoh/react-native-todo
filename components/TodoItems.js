import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    FlatList,
    Pressable,
    Alert,
    Modal
  } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { allTodos, completedLists, doneTodo, doneTodos, getDeleteId, modalVisible, removeTodo } from "../redux/Slices/todoSlice";
import { useEffect } from "react";

export default TodoItems = ()=>{
    const doneIcon = <Icon name="checkmark-done-outline" size={20} color="white" />;
    const undoIcon = <Icon name="arrow-undo-outline" size={20} color="orange" />;
    const deleteIcon = <Icon name="trash-outline" size={20} color="white" />;
    const navigate = useNavigation();
    const {lists,modal} = useSelector((state)=>state.todo)
    const dispatch = useDispatch();

     // delete lists
     const handleDelete = () => {
        dispatch(removeTodo());
        dispatch(modalVisible());
        dispatch(allTodos());
        dispatch(completedLists())
     };
     const openModal = () => {
        dispatch(modalVisible());
     };
     const confirmDelete = (id) => {
        dispatch(modalVisible());
        dispatch(getDeleteId(id));
     };
   
     //done list
     const handleDone = (id) => {
       dispatch(doneTodo(id))
       dispatch(doneTodos());
       dispatch(completedLists())
     };
     
     useEffect(()=>{
       console.log(modalVisible());
      },[modalVisible])
   
     
     return(
       <FlatList
       data={lists}
       renderItem={({ item }) => (
         <View style={styles.listBox}>
            <View style={{ flex:2}}>
              <TouchableOpacity
                onPress={() => {
                  navigate.navigate("TodoDetails", { item });
                }}
                >
                {item.state?<Text style={{color: "white",fontSize: 17,fontWeight: "bold",paddingBottom: 2,textDecorationLine:"line-through"}}>
                  {item.title}
                </Text>:<Text
                  style={{
                    color: "white",
                    fontSize: 17,
                    fontWeight: "bold",
                    paddingBottom: 2,
                  }}
                  >
                  {item.title}
                </Text>}
                {item.state?<Text
                  style={{
                    color: "rgba(0,0,0,0.5)",
                    fontSize: 15,
                    fontWeight: "500",
                    textDecorationLine:"line-through"
                  }}
                  >
                  {item.desc}
                </Text>:<Text
                  style={{
                    color: "rgba(0,0,0,0.5)",
                    fontSize: 15,
                    fontWeight: "500",
                  }}
                  >
                  {item.desc}
                </Text>}
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: "row" ,flex:1.5}}>
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
                {!item.state ? doneIcon: undoIcon}
                </Text>
              </TouchableOpacity>
              <View style={{ flexDirection: "row" ,flex:2.5}} >
                  <Modal
                     animationType="slide"
                     transparent={true}
                     visible={modal}
                     onRequestClose={() => {
                       Alert.alert('Modal has been closed.');
                       openModal();
                     }}>
                     <View style={styles.centeredView}>
                       <View style={styles.modalView}>
                         <Text style={styles.modalText}>Are you sure you want to delete this list?</Text>
                         <View style={{flexDirection:"row"}}>
                            <Pressable
                              style={[styles.button, {backgroundColor:"rgb(54, 162, 171)",marginRight:10,width:70}]}
                              onPress={handleDelete}>
                              <Text style={styles.textStyle}>Yes</Text>
                            </Pressable>

                            <Pressable
                              style={[styles.button, {backgroundColor:"red",width:70}]}
                              onPress={openModal}>
                              <Text style={styles.textStyle}>No</Text>
                            </Pressable>
                         </View>
                       </View>
                     </View>
                   </Modal>
                  <TouchableOpacity
                    onPress={() => confirmDelete(item.id)}
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
        >  
        </FlatList>
    )
}

const styles = StyleSheet.create({
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