import * as React from 'react';
import { Image, View, Text, Button } from 'react-native';
import CarScreen from './screens/CarScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

const Home = (navigation) => {
    return (
        <Drawer.Navigator
            useLegacyImplementation="true"
            initialRouteName="Cars">
            <Drawer.Screen name="Cars" component={CarScreen} />
        </Drawer.Navigator>
    )
}

export default Home;