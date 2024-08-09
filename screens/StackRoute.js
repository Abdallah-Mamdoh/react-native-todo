import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./Home";
import TodoDetails from "./TodoDetails";

export default StackRoute = ()=>{
const {Navigator , Screen} = createNativeStackNavigator();

return (
    <Navigator>
      <Screen name='Home' component={Home}/>
      <Screen name='TodoDetails' component={TodoDetails}/>
    </Navigator>
)

}