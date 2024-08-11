import {
    StyleSheet,
    View,
    Text,
    SafeAreaView,
  } from "react-native";


export default TodoDetails = ({route})=>{
    const {item} = route.params;
    
return(
    <SafeAreaView >
        <View style={styles.container}>
            <View style={{flexDirection:"column",alignItems:"center",justifyContent:"center",width:"100%",marginVertical:"20%"}}>
               <Text style={{fontSize:"30px", color:"orange"}}>Title: </Text>
               <Text style={{fontSize:"30px", color:"white"}}>{item.title}</Text>
            </View>
            <View style={{flexDirection:"column",alignItems:"center",justifyContent:"center",width:"90%"}}>
               <Text style={{fontSize:"30px", color:"orange"}}>Comment: </Text>
               <Text style={{fontSize:"30px", color:"white"}}>{item.desc}</Text>
            </View>
        </View>
    </SafeAreaView>
)
}

const styles = StyleSheet.create({
    container: {
      display:"flex",
      backgroundColor: "rgb(54, 162, 171)",
      alignItems: "center",
      height:"100%"
    },

  });
  