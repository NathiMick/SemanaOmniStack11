import React from 'react'; 
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const AppStack = createStackNavigator();
import Incidents from './pages/Incidents';
import Detail from './pages/Detail';


//cadastrando as rotas:

export default function Routes() {
    return ( //igual ao BrowserRouter do sistema web
        <NavigationContainer>
            <AppStack.Navigator screenOptions={{ headerShown: false }}/* headerShown para desabilitar o cabeçalho */ > 
                <AppStack.Screen name="Incidents" component={Incidents}/>
                <AppStack.Screen name="Detail" component={Detail}/>
            </AppStack.Navigator>
        </NavigationContainer>
    );
}