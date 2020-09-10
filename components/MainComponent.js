import React ,{Component} from 'react';
import Directory from  "./DirectoryComponent";
import CampsiteInfo from "./Campsiteinfo";
import {createStackNavigator} from "react-navigation"
import {View, Platform} from "react-native";

//navigation
const DirectoryNavigator = createStackNavigator(
    {
        Directory: { screen: Directory },
        CampsiteInfo: { screen: CampsiteInfo }
    }, 
    {
        initialRouteName: 'Directory',
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#5637DD'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            }
        }
    }
);
//Main
class Main extends Component {
    render() {
        return (
            <View style={{flex: 1, paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight }}>
                <DirectoryNavigator />
            </View>
        );
    }
}

export default Main;