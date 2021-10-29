/// REDUCER -----------------------------------------

export default function routeReducer(state = null, action) {
    if (action.type == "routes/routesReceived") {
        state = action.payload.data;
    } else if (action.type == "routes/specificRoutesReceived") {
        return (state = action.payload.specificData);
    } else if (action.type == "routes/routeProfileInfo") {
        return (state = action.payload.specificData);
    } else if (action.type == "routes/infoReadyForOpenMap") {
        return (state = [...state, action.payload]);
    }
    return state;
}

// ACTION CREATOR -------------------------------------

export function routesReceived(data) {
    return {
        type: "routes/routesReceived",
        payload: { data },
    };
}

export function specificRoutesReceived(specificData) {
    return {
        type: "routes/specificRoutesReceived",
        payload: { specificData },
    };
}
export function routeProfileInfo(specificData) {
    return {
        type: "routes/routeProfileInfo",
        payload: { specificData },
    };
}
export function infoReadyForOpenMap(info) {
    console.log(`info on slice ready for open map`, info);
    return {
        type: "routes/infoReadyForOpenMap",
        payload: info,
    };
}
