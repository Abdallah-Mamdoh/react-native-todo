import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CompletedTasks from './screens/CompletedTasks';
import StackRoute from './screens/StackRoute';
import "./App.css"
import { Provider } from 'react-redux';
import store from './redux/Store';

export default function App() {
const {Navigator , Screen} = createBottomTabNavigator();

  return (
  <Provider store={store}>
    <NavigationContainer>
      <Navigator screenOptions={{headerShown:false}}>
        <Screen name='Main' component={StackRoute} />
        <Screen name='Completed Tasks' component={CompletedTasks}/>
      </Navigator>
    </NavigationContainer>
  </Provider>
  );
}

