import { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity
  } from "react-native";
import { useDispatch } from "react-redux";
import { addTodo, allTodos } from "../redux/Slices/todoSlice";

export default TodoForm = ()=>{
    const [title, onChangeTitle] = useState("");
    const [desc, onChangeDesc] = useState("");
    const [error, setError] = useState(false);
    const dispatch = useDispatch();


      // Add lists
      const listAdded = (e) => {
        if(!title){
          e.preventDefault();
          setError(true)
        }else{
          setError(false)
        const data = {
          title,
          desc,
          state: false,
          id: Date.now()
        }

        dispatch(addTodo(data));
        dispatch(allTodos())
        onChangeTitle("");
        onChangeDesc("");
   };}
    return(
      <View style={{width:"95%" , flexDirection:"column"}} >
        <View >
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
                  placeholder="Add comment..."
                ></TextInput>
              </View>
              <TouchableOpacity style={styles.addButton} onPress={listAdded}>
                <Text style={{ color: "white", fontSize: "25" }}>+</Text>
              </TouchableOpacity>
            </View>
        </View>
        {error ?<View style={{backgroundColor:"rgb(255, 103, 103)",borderRadius:"50px",width:200,marginVertical:10}}>
          <Text style={{padding:10}}>Task title is required</Text>
        </View>:null}

      </View>
    )
}

const styles = StyleSheet.create({
    inputBox: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingRight: 30,
      height: 70,
      marginTop:20
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
    }
  });
  