/// REDUCER -----------------------------------------

export default function routeReducer(state = null, action) {
    if (action.type == "routes/routesReceived") {
        state = action.payload.data;
    } else if (action.type == "routes/specificRoutesReceived") {
        return (state = action.payload.specificData);
    } else if (action.type == "routes/routeProfileInfo") {
        return (state = action.payload.specificData);
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
export function routeProfileInfo(specificData) {
    console.log("SPECIFIC ROUTES RECEIVED ON SLICE >> ", specificData);
    return {
        type: "routes/routeProfileInfo",
        payload: { specificData },
    };
}
