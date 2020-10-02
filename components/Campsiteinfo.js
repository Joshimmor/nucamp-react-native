import React,{Component} from "react";
import { 
    Text, 
    View, 
    ScrollView, 
    FlatList,
    Modal, 
    Button, 
    StyleSheet,
    Alert, 
    PanResponder, 
    Share } from 'react-native';
import { 
     Card,
     Icon, 
     Rating, 
     Input} from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite, postComment } from '../Redux/ActionCreators';

const mapStateToProps = state => {
    return{
        campsites: state.campsites,
        comments: state.comments,
        favorites: state.favorites
    }
};
const mapDispatchToProps = {
    postFavorite: campsiteId => (postFavorite(campsiteId)),
    postComment:  newComment => (postComment(newComment))
};
//Render Comments
function RenderComments({comments}){
    const renderCommentItem = ({item})=>{
        return(
            <View style={{margin:10}}>
                <Text style={{fontSize: 14}}>{item.text}</Text>
                <Rating
                readonly
                startingValue={item.rating}
                imageSize={10}
                style={{alignItems:'flex-start',
                        paddingVertical:'5%'}}/>
                <Text style={{fontSize: 12}}>{`- - ${item.author},${item.date}`}</Text>
            </View>
        )
    };
    return(
        <Card>
             <FlatList
                data={comments}
                renderItem={renderCommentItem}
                keyExtractor={item => item.id.toString()}/>
        </Card>
       
    )
}
//renders campsite info card 
function RenderCampsite(props){
    const {campsite} = props;
    const view = React.createRef();
    const recognizeDrag = ({dx}) => (dx < -200) ? true : false ;
    const recognizeComment = ({dx}) => (dx < 200) ? true : false ;
     const panResponder = PanResponder.create({
         onStartShouldSetPanResponder: () => true,
         onPanResponderGrant: () => {
            view.current.rubberBand(1000)
            .then(endState => console.log(endState.finished ? 'finished' : 'canceled'));
         },
         onPanResponderEnd: (e, gestureState) => {
         console.log('pan responder end', gestureState);
         if(recognizeDrag(gestureState)) {
                Alert.alert(
                    'Add Favorites',
                    'Are you sure you wish to add ' + campsite.name + ' to favorites?',
                    [
                        {  
                            text: 'Cancel',
                            style: 'cancel',
                            onPress : () => console.log('Cancel Pressed')
                        },
                        {  
                            text: 'OK',
                            onPress : props.favorite ? 
                            console.log('Already set as favorite'): props.markFavorite()
                        }
                    ],
                    { cancelable: false }
                );
            }else if(recognizeComment(gestureState)){
                this.toggleModal()
            }
            return true
        }
     });

     const shareCampsite = (title, message, url)=>{
        Share.share({
            title: title,
            message: `${title}: ${message} ${url}`,
            url: url
        },{
            dialogTitle: 'Share ' + title
        })
     }

    if(campsite){
        return(
            <Animated.View
                animation="fadeInDown"
                duration={2000}
                delay={1000}
                ref={view}
                {...panResponder.panHandlers}>
                <Card
                    featuredTitle={campsite.name}
                    image={{uri:baseUrl + campsite.image}}>
                    <Text style={{margin:10}}>
                        {campsite.description}
                    </Text>
                    <View style={styles.cardRow}>
                        <Icon
                        name={props.favorite ? 'heart': "heart-o"}
                        type="font-awesome"
                        color="#f50"
                        raised
                        reverse
                        onPress={()=> props.favorite?
                        console.log('Already set as a favorite') : props.markFavorite()}/>
                        <Icon 
                        style={styles.cardItem}
                        name="pencil"
                        type="font-awesome"
                        color="#5637DD"
                        raised
                        reverse
                        onPress={()=> props.onShowModal()}
                        />
                        <Icon
                            name={'share'}
                            type='font-awesome'
                            color='#5637DD'
                            style={styles.cardItem}
                            raised
                            reverse
                            onPress={() => shareCampsite(campsite.name, campsite.description, baseUrl + campsite.image)} 
                        />
                    </View>
                </Card> 
            </Animated.View>    
        )
    }
    return(
        <View/>
    ) 
}
//info component
class CampsiteInfo extends Component {
    constructor(props){
        super(props)
        this.state= {
            showModal: false,
            rating: 5,
            author: '',
            text: '',
            campsiteId: this.props.navigation.getParam('campsiteId')
        }
    }
    toggleModal(){
        this.setState({showModal: !this.state.showModal})
    }
    handleSubmission(state){
         console.log(state)
        this.props.postComment(state)
    }
    resetForm(){
        this.setState({
            showModal: false,
            rating: 5,
            author: '',
            text: '',
        })
    }
    static navigationOptions = {
        title: 'Campsite Information'
    };

    markFavorite(campsiteId) {
        this.props.postFavorite(campsiteId)
    };
 render(){
   
            const campsiteId = this.props.navigation.getParam('campsiteId');
            const campsite = this.props.campsites.campsites.filter(campsite => campsite.id === campsiteId)[0];
            const comments = this.props.comments.comments.filter(comment => comment.campsiteId === campsiteId);

            return(
                <ScrollView>
                    <RenderCampsite campsite={campsite}
                    favorite={this.props.favorites.includes(campsiteId)}
                    markFavorite={() => this.markFavorite(campsiteId)}
                    onShowModal={() => this.toggleModal()}
                    />
                <RenderComments
                comments={comments}/>
                 <Modal
                animationType={'slide'}
                transparent={false}
                visible={this.state.showModal}
                onRequestClose={()=> this.toggleModal}>
                    <View style={styles.modal}>
                        <Rating
                        showRating={true}
                        startingValue={this.state.rating}
                        imageSize={40}
                        onFinishRating={(rating)=>this.setState({rating: rating})}
                        style={{paddingVertical: 10}}
                        />
                        <Input
                        placeholder="Author"
                        leftIcon= {
                            <Icon
                            name= "user-o"
                            type='font-awesome'/>
                        }
                        leftIconContainerStyle={{paddingRight: 10}}
                        onChangeText={author=> this.setState({author:author})}
                        //value
                        />
                        <Input
                        placeholder="Comments"
                        leftIcon= {
                            <Icon
                            name= "comment-o"
                            type='font-awesome'/>
                        }
                        leftIconContainerStyle={{paddingRight: 10}}
                        onChangeText={text => this.setState({text:text})}
                        //value
                        />
                        <Button
                                onPress={(campsiteId)=>{
                                    this.handleSubmission({...this.state})
                                    this.resetForm()}}
                                color='#5637DD'
                                title='Submit'/>
                        <View style={{margin: 10}} >
                            <Button
                                onPress={()=>{
                                    this.toggleModal();
                                    this.resetForm();
                                }}
                                color='#808080'
                                title='Cancel'/>
                        </View>
                    </View>
                </Modal>
                </ScrollView>
                 
                 );
            
         }
}
//styles
const styles = StyleSheet.create({
    cardRow: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        margin: 20
    },
    cardItem: {
        flex:1,
        margin:10
    },
    modal:{
        justifyContent: "center",
        margin: 20
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(CampsiteInfo);
