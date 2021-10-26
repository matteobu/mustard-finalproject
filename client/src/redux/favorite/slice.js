/// REDUCER -----------------------------------------

export default function favoriteReducer(state = null, action) {
    if (action.type == "fav/routeFavoriteRoute") {
        state = action.payload.data;
    }

    return state;
}

// ACTION CREATOR -------------------------------------

export function routeFavoriteRoute(data) {
    console.log("routeFavoriteRoute RECEIVED ON SLICE >> ", data);
    return {
        type: "fav/routeFavoriteRoute",
        payload: { data },
    };
}
