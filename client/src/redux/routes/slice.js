/// REDUCER -----------------------------------------

export default function routeReducer(state = null, action) {
    if (action.type == "routes/routesReceived") {
        state = action.payload.data;
    } else if (action.type == "routes/specificRoutesReceived") {
        return [action.payload];
    }

    return state;
}

// ACTION CREATOR -------------------------------------

export function routesReceived(data) {
    console.log("ROUTES RECEIVED ON SLICE >> ", data);
    return {
        type: "routes/routesReceived",
        payload: { data },
    };
}

export function specificRoutesReceived(specificData) {
    console.log("SPECIFIC ROUTES RECEIVED ON SLICE >> ", specificData);
    return {
        type: "routes/specificRoutesReceived",
        payload: { specificData },
    };
}
