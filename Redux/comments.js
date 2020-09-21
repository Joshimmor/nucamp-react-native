import * as ActionTypes from './ActionTypes';

export const comments = (state = { errMess: null, comments: []}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_COMMENTS:
            return {...state, errMess: null, comments: action.payload};

        case ActionTypes.COMMENTS_FAILED:
            return {...state, errMess: action.payload};
        case ActionTypes.ADD_COMMENT:
            const {payload} = action;
            console.log(payload)
            const comment = {...payload, id: state.comments.length +1};
            const commentsArray = state.comments.concat(comment)
            return {...state, comments: commentsArray}
         default:
            return state;
    }
};