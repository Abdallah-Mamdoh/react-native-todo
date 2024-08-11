import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    TouchableOpacity,
    FlatList,
  } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { completedLists, doneTodo, doneTodos } from "../redux/Slices/todoSlice";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

export default function CompletedTasks() {
  const undoIcon = <Icon name="arrow-undo-outline" size={20} color="orange" />;
  const showIcon = <Icon name="document-outline" size={18} color="orange" />;
  const {filteredLists} = useSelector((state)=>state.todo)
  const navigate = useNavigation();
  const dispatch = useDispatch();

  const handleDone = (id) => {
    dispatch(doneTodo(id))
    dispatch(doneTodos());
    dispatch(completedLists())

  };
  return (
    <View style={styles.container}>
          <ImageBackground source={{uri:"https://images.stockcake.com/public/0/d/e/0de2c021-5520-404f-93c4-df02d65a80c7_large/office-planning-essentials-stockcake.jpg"}} resizeMode="cover" style={{flex:1,justifyContent:"center",alignItems:"center",width:"100%"}}>
          <View style={styles.box}>
          <View>
                  <Text style={{ width: "100%", textAlign: "center",color:"white",fontSize:30,marginVertical:30 }}>Completed Tasks</Text>
          </View>
          {filteredLists.length != 0 ?<FlatList
        data={filteredLists}
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
                    textDecorationLine:"line-through"
                  }}
                >
                  {item.title}
                </Text>
                <Text
                  style={{
                    color: "rgba(0,0,0,0.5)",
                    fontSize: 15,
                    fontWeight: "500",
                    textDecorationLine:"line-through"
                  }}
                >
                  {item.desc}
                </Text>
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
                {undoIcon}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id}
        >  
        </FlatList> : 
        <View>
        <Text style={{color:"rgb(18, 45, 114)",fontSize:25,textAlign:"center",marginTop:50}}>
          There are no completed tasks for now
        </Text>
        <TouchableOpacity style={{backgroundColor:"rgb(54, 162, 171)",width:150,height:55,display:"flex",justifyContent:"center",borderRadius:10,marginLeft:55,marginTop:20}} onPress={()=>navigate.navigate("Home")}>
           <Text style={{ color: "white", fontSize: 18,textAlign:"center" }}>{showIcon}Show tasks</Text>
        </TouchableOpacity>
        </View>
        }

          </View>
          </ImageBackground>
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
  },
  container: {
    flex: 1,
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
  },
  listBox: {
    width: "95%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: "20px",
    backgroundColor: "rgba(54, 162, 171,0.7)",
    padding: 12,
    marginBottom: 15,
    marginLeft:10
  },
});
