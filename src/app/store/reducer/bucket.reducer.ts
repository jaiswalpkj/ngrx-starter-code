import { createReducer, on } from "@ngrx/store";
import { Bucket } from "../../../models/bucket.model";
import { addToBucket, removeItemFromBucket } from "../actions/bucket.action";

const initialState: Bucket[] = [];

export const bucketReducer = createReducer(initialState, on(addToBucket, (state, actionPayload) => {
    const bucketItem = state.find(item => item.id === actionPayload.id);
    if (bucketItem) {
        return state.map(item => {
            return item.id === actionPayload.id ? { ...item, quantity: item.quantity + actionPayload.quantity } : item
        })
    } else {
        return [...state, actionPayload]
    }
}),
    on(removeItemFromBucket, (state, action) => {
        const bucketItem = state.find(item => item.id === action.payload.id);
        if (bucketItem && bucketItem.quantity > 1) {
            return state.map(item => {
                return item.id === action.payload.id ? { ...item, quantity: item.quantity - 1 } : item
            })
        } else {
            return state.filter(item => item.id !== action.payload.id)
        }
    })
)
