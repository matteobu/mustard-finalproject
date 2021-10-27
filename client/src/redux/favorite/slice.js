/// REDUCER -----------------------------------------

export default function favoriteReducer(state = null, action) {
    if (action.type == "fav/routeFavoriteRoute") {
        state = action.payload.data;
    } else if (action.type == "fav/routeFavAdded") {
        return [...state, action.payload];
    }

    return state;
}

// ACTION CREATOR -------------------------------------

export function routeFavoriteRoute(data) {
    return {
        type: "fav/routeFavoriteRoute",
        payload: { data },
    };
}
export function routeFavAdded(newFav) {
    return {
        type: "fav/routeFavAdded",
        payload: { newFav },
    };
}
