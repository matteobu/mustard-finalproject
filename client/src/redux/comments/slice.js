/// REDUCER -----------------------------------------

export default function commentsReducer(state = null, action) {
    if (action.type == "comment/routeLastTenComments") {
        state = action.payload.data;
    } else if (action.type == "comment/addComment") {
        return [action.payload, ...state];
    }

    return state;
}

// ACTION CREATOR -------------------------------------

export function routeLastTenComments(data) {
    return {
        type: "comment/routeLastTenComments",
        payload: { data },
    };
}
export function addComment(newComment) {
    console.log(`NEW COMMENT ON COMMENT REDUCER`, newComment);
    return {
        type: "comment/addComment",
        payload: newComment,
    };
}
