import { ActionReducer, createReducer, MetaReducer } from "@ngrx/store";
import { AppState } from "./app.state";
import { SnitchService } from './snitch.service';

export function missionMiddlewareFactory(snitch: SnitchService): MetaReducer<AppState> {
    return (reducer: ActionReducer<any>) => (state, action) => {    
        const newState = reducer(state, action);
    
        if (newState){
            snitch.OnStateChange({
                actions: 1, 
                stateSize: countKeys(newState)
            });
        }

        return newState;
    };
  }



function countKeys(obj: object){
    let count = 0;
    if (obj){
        const keys = Object.keys(obj);
        keys.forEach(k => {
            if (!obj.hasOwnProperty(k) || k === 'echoMessages' || k === 'captain')
                return;
            count++;
            const child = (<any>obj)[k];
            if (typeof child === 'object'){
                count += countKeys(child);
            }
        });
    }
    return count;
}