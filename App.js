import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CompletedTasks from './screens/CompletedTasks';
import StackRoute from './screens/StackRoute';
import "./App.css"

export default function App() {
const {Navigator , Screen} = createBottomTabNavigator();

  return (
  <NavigationContainer>
    <Navigator screenOptions={{headerShown:false}}>
      <Screen name='Main' component={StackRoute} />
      <Screen name='Completed Tasks' component={CompletedTasks}/>
    </Navigator>
  </NavigationContainer>
  );
}

