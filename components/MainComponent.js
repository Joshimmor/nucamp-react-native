import React ,{Component} from 'react';
import Directory from  "./DirectoryComponent";
import CampsiteInfo from "./Campsiteinfo";
import {createStackNavigator, createDrawerNavigator} from "react-navigation"
import {View, Platform} from "react-native";
import {HomeComponent} from "./HomeComponent";

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
        //stackNav
        const HomeNavigator = createStackNavigator(
            {
                Home: { screen: Home },
                
            }, 
            {
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

        //DrawNav

        const MainNavigator = createDrawerNavigator (
            {
                Home:{screeen: HomeNavigator},
                Directory: {screen: DirectoryNavigator}
            },
            {
                drawBackgroundColor: '#CEC8FF'
            }

        );

//Main
class Main extends Component {
    render() {
        return (
            <View style={{flex: 1, paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight }}>
                <MainNavigator />
            </View>
        );
    }
}

export default Main;