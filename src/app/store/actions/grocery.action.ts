import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Grocery } from "../../../models/grocery.model";

export const groceryAction = createActionGroup(
    {
        source: '[Grocery API]',
        events:{
            'Load Groceries': emptyProps(),
            'Load Groceries Completed': props<{payload:Grocery[]}>(),
            'Load Groceries Failure' : emptyProps()
        }
    }
)