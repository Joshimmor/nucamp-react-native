import React ,{Component} from 'react';
import Directory from  "./DirectoryComponent";
import CampsiteInfo from "./CampsiteInfo";
import Home from "./HomeComponent";
import AboutComponent from "./AboutComponent";
import ContactComponent from "./ContactComponent";
import Favorites from './FavoritesComponent';
import Reservation from "./ReservationComponent";
import Login from "./LoginComponent";
import { 
    createStackNavigator, 
    createDrawerNavigator,
    DrawerItems } from 'react-navigation';
import { 
    View,
    Platform,
    StyleSheet,
    Text,
    ScrollView,
    Image } from 'react-native';
import { Icon } from 'react-native-elements';
import SafeAreaView from 'react-native-safe-area-view';
import { connect } from 'react-redux';
import { 
     fetchCampsites,
     fetchComments, 
     fetchPromotions,
     fetchPartners } from '../Redux/ActionCreators';

//props
const mapDispatchToProps = {
    fetchCampsites,
    fetchComments,
    fetchPromotions,
    fetchPartners
}
//navigation Stack
//style
const style = StyleSheet.create({
    stackIcon:{
        marginLeft:10,
        color: '#fff',
        fontSize:24
    },
    drawerHeader: {
        backgroundColor: '#5637DD',
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row'
    },
    drawerHeaderText:{
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold'
    },
    drawerImage:{
        margin:10,
        height: 60,
        width:60
    },
    container: {
        flex: 1,
    }
});
//Custom Drawer Content
const CustomDrawConentComponent = props =>(
    <ScrollView>
        <SafeAreaView
        style={style.container}
        forceInset={{top: 'always', horizontal: 'never'}}>
            <View style={style.drawerHeader}>
                <View style={{flex:1}}>
                    <Image source={require('./images/logo.png')} style={style.drawerImage}/>
                </View>
                <View style={{flex:2}}>
                    <Text style={style.drawerHeaderText}>Nucamp</Text>
                </View>
            </View>
            <DrawerItems {...props}/>
        </SafeAreaView>
    </ScrollView>
)
//Login Nav
const LoginNavigator = createStackNavigator(
    {
         Login: { screen: Login }
    },
    {   
        navigationOptions:({navigation})=> ({
            headerStyle: {
                backgroundColor: '#5637DD'
                },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            },
            headerLeft:
            <Icon
            name="sign-in"
            type="font-awesome"
            iconStyle={style.stackIcon}
            onPress={()=> navigation.toggleDrawer()}
            />
        })
    });
//Directory Nav
const DirectoryNavigator = createStackNavigator(
    {
        Directory: { screen: Directory, 
            navigationOptions:({navigation})=>({
                headerLeft:
                <Icon
                name='list'
                type='font-awesome'
                iconStyle={style.stackIcon}
                onPress={()=> navigation.toggleDrawer()}
                />
            }) 
           },
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
    });

    
//About Nav

const AboutNavigator = createStackNavigator(
    {
         About: {screen: AboutComponent}
    },
    {   
        navigationOptions:({navigation})=> ({
            headerStyle: {
                backgroundColor: '#5637DD'
                },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            },
            headerLeft:
            <Icon
            name="info-circle"
            type="font-awesome"
            iconStyle={style.stackIcon}
            onPress={()=> navigation.toggleDrawer()}
            />
        })
    });

    //Contact Nav
const ContactNavigator = createStackNavigator(
    {
            
        Contact: {screen: ContactComponent}
    },
    {
        navigationOptions:({navigation})=>({
        headerStyle: {
        backgroundColor: '#5637DD'
             },
        headerTintColor: '#fff',
        headerTitleStyle: {
        color: '#fff'
            },
        headerLeft:
            <Icon
            name="address-card"
            type="font-awesome"
            iconStyle={style.stackIcon}
            onPress={()=> navigation.toggleDrawer()}
            />
         })
     });
//Favorite Navigation
const FavoritesNavigator = createStackNavigator(
    {
        Favorites: {screen: Favorites}
    },
    {
        navigationOptions:({navigation})=>({
            headerStyle: {
            backgroundColor: '#5637DD'
                 },
            headerTintColor: '#fff',
            headerTitleStyle: {
            color: '#fff'
                },
            headerLeft:
                <Icon
                name="heart"
                type="font-awesome"
                iconStyle={style.stackIcon}
                onPress={()=> navigation.toggleDrawer()}
                />
        })
    }
)
//HOME NAVIGATOR
 const HomeNavigator = createStackNavigator(
    {
        Home: {screen:Home}      
    }, 
    {
        navigationOptions:({navigation})=>({
            headerStyle: {
                backgroundColor: '#5637DD'
                },
            headerTintColor: '#fff',
                headerTitleStyle: {
                    color: '#fff'
                },
            headerLeft: 
                <Icon
                name="home"
                type="font-awesome"
                iconStyle={style.stackIcon}
                onPress={() => navigation.toggleDrawer()}
                />
            })
    });
//Reservation Stack
const ReservationNavigator = createStackNavigator(
    {
        Reservation: { screen: Reservation }
    },
    {
        navigationOptions: ({navigation}) =>({
            headerStyle:{
                backgroundColor: '#5637DD'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                    color: '#fff'
            },
            headerLeft : <Icon
                name='tree'
                type='font-awesome'
                iconStyle={style.stackIcon}
                onPress={() => navigation.toggleDrawer()}
                />
        })
    }
)
 //DrawNav

const MainNavigator = createDrawerNavigator (
    {   
        Login:{
            screen: LoginNavigator,
            navigationOptions: {
                drawerIcon: ({tintColor}) =>(
                    <Icon
                    name='sign-in'
                    type='font-awesome'
                    size={24}
                    color={tintColor}
                    />
                )
            }
        },
        Home:{
            screen: HomeNavigator,
            navigationOptions: {
                drawerIcon: ({tintColor}) =>(
                    <Icon
                    name='home'
                    type='font-awesome'
                    size={24}
                    color={tintColor}
                    />
                )
            }
        },
        Directory: {
            screen: DirectoryNavigator,
            navigationOptions: {
                drawerIcon:({tintColor})=>(
                  <Icon
                    name='list'
                    type='font-awesome'
                    size={24}
                    color={tintColor}
                    />  
                )
            }
        },
        Reservation: {
            screen: ReservationNavigator,
            navigationOptions: {
                drawerLabel: 'Reserve Campsite',
                drawerIcon: ({tintColor}) => (
                    <Icon
                        name='tree'
                        type='font-awesome'
                        size={24}
                        color={tintColor}
                    />
                )
            }
        },
        About: {
            screen:AboutNavigator,
            navigationOptions: {
                drawerLabel: 'About Us',
                drawerIcon: ({tintColor})=>(
                   <Icon
                   name='info-circle'
                   type='font-awesome'
                   size={24}
                   color={tintColor}
                   /> 
                )
            }
        },
        Favorites: {
            screen: FavoritesNavigator,
            navigationOptions: {
                drawerLabel: 'Favorites',
                drawerIcon: ({tintColor})=>(
                   <Icon
                   name='heart'
                   type='font-awesome'
                   size={24}
                   color={tintColor}
                   /> 
                )
            }
        },
        Contact: {
            screen:ContactNavigator,
            navigationOptions: {
                drawerLabel: 'Contact Us',
                drawerIcon: ({tintColor }) => (
                    <Icon
                    name="address-card"
                    type='font-awesome'
                    size={24}
                    color={tintColor}
                    />
                )
            }
        }
    },
    {
        initialRouteName: 'Home',
        drawBackgroundColor: '#CEC8FF',
        contentComponent: CustomDrawConentComponent
    });

//Main
class Main extends Component {
    componentDidMount(){
        this.props.fetchCampsites();
        this.props.fetchComments();
        this.props.fetchPromotions();
        this.props.fetchPartners();
    }
    render() {
        return (
            <View style={{
                flex: 1,
             paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight }}>
                <MainNavigator />
            </View>
        );
    }
}

export default connect(null, mapDispatchToProps)(Main);