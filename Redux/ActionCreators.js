import * as ActionTypes from "./ActionTypes";
import {baseUrl} from "../shared/baseUrl";

// fetching Comments
export const fetchComments = () => dispatch =>{
    return fetch(baseUrl + 'comments')
    .then(response => {
        if(response.ok){
            return response
        }else{
            const error = new Error(`Error${response.status}: ${response.status}`);
        error.response = response
        throw error
        }
    },
    error => {
        const errMess = new Error(error.message);
        throw errMess
    })
    .then(response => response.json())
    .then(comments => dispatch(addComments(comments)))
    .catch(error => dispatch(commentsFailed(error.message)))
};
//commentsFailed 
export const commentsFailed = errMess => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errMess
});
//addingComments
export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments,
});
//PostComment
export const postComment = ({campsiteId, rating, author, text}) => dispatch =>{
    var d = new Date();
    var date = d.toISOString();
    const newComment = {
        campsiteId,
        rating,
        author,
        text,
        date: date
    };
   setTimeout(dispatch(addComment(newComment)),2000)
}
//Add Comment
export const addComment = (comment)=>({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
})
//Fetch Campsite
export const fetchCampsites = () => dispatch => {
     dispatch(campsitesLoading());

     return fetch(baseUrl + 'campsites')
     .then(response => {
         if(response.ok){
             return response
         }else{
             const error = new Error(`Error ${response.status}: S{response.statusText}`);
             error.response = response;
        throw error;
         }
     },
     error => {
        const errMess = new Error(error.message)
        throw errMess
     })
     .then(repsonse => repsonse.json())
     .then(campsites => dispatch(addCampsites(campsites)))
     .catch(error => dispatch(campsitesFailed(error.message)))
 };
//campsitesLoading
export const campsitesLoading = () => ({
    type: ActionTypes.CAMPSITES_LOADING
});
//Failure to Load
export const campsitesFailed = errMess => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errMess
});
// AddingCampsites
export const addCampsites = campsites => ({
    type: ActionTypes.ADD_CAMPSITES,
    payload: campsites,
});
//fetching Promotions
export const fetchPromotions = () => dispatch =>{
    dispatch(promotionsLoading());

    return fetch(baseUrl + 'promotions')
    .then(response => {
        if(response.ok){
            return response
        }else{
            const error = new Error(`Error ${response.status}: ${response.statusText}`);
            error.repsonse = response;
            throw error;
        }
    },
    error=> {
        const errMess = new Error(error.message);
        throw errMess
    })
    .then(response => response.json())
    .then(promotions => dispatch(addPromotions(promotions)))
    .catch(error => dispatch(promotionsFailed(error.message)))
};
//promotions Loading
export const promotionsLoading = () =>({
    type: ActionTypes.PARTNERS_LOADING
});
//promotions Failed
export const promotionsFailed = errMess =>({
    type: ActionTypes.PROMOTIONS_FAILED,
    payload: errMess
});
// adding Promotions
export const addPromotions = promotions => ({
    type: ActionTypes.ADD_PROMOTIONS,
    payload: promotions
});
// fecthing partners

export const fetchPartners = () => dispatch => {
    dispatch(partnersLoading());

    return fetch(baseUrl + 'partners')
    .then(response => {
        if(response.ok){
            return response
        }else{
            const error = new Error(`Error ${response.status}: ${response.statusText}`);
            error.response;
            throw error
        }
    },
    error => {
        const errMess = new Error(error.message);
        throw errMess
    })
    .then(response => response.json())
    .then(partners => dispatch(addPartners(partners)))
    .catch(error => dispatch(partnersFailed(error.message)))
}
//partner Loading
export const partnersLoading = () => ({
    type: ActionTypes.PROMOTIONS_LOADING
});
//partners Failed
export const partnersFailed = errMess => ({
    type: ActionTypes.PARTNERS_FAILED,
    payload: errMess
});
//Partners Adding
export const addPartners = partners => ({
    type: ActionTypes.ADD_PARTNERS,
    payload: partners
})
//favorites
export const postFavorite = campsiteId => dispatch => {
    setTimeout(()=> {
        dispatch(addFavorite(campsiteId));
    },2000)
};

//add Favorites
export const addFavorite = campsiteId => ({
    type: ActionTypes.ADD_FAVORITE,
    payload: campsiteId
});
//delete Favorites
export const deleteFavorite = campsiteId => ({
    type: ActionTypes.DELETE_FAVORITE,
    payload: campsiteId
});