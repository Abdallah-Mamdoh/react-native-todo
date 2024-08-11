import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity
  } from "react-native";
import TodoItems from "./TodoItems";
import { useDispatch, useSelector } from "react-redux";
import { activeTodos, allTodos, doneTodos } from "../redux/Slices/todoSlice";

export default Todos = ()=>{
    const {allState,activeState,doneState} = useSelector((state)=>state.todo)
    const dispatch = useDispatch();
    
      // buttons func
      const getAll =()=> {
        dispatch(allTodos())
      };
      const getActive = () => {
        dispatch(activeTodos())
      };
      const getDone = () => {
        dispatch(doneTodos())
      };


    return(
        <View>
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
            <View style={{height:"65%"}}>
               <TodoItems/>
            </View>
        </View>
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
    }
  });
  