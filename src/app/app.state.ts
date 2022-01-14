
import { ActionReducerMap, createAction, createReducer, on, props } from "@ngrx/store";
import { IVoiceEvent } from "./challenge.service";
import { computerReducer, ComputerState } from "./workshop/computer.reducer";


export interface CaptainState{
    voiceEvents: IVoiceEvent[]
}
export interface AppState{
    computer: ComputerState,
    captain: CaptainState
}


export const captainSays = createAction(
    '[captain] captainSays', 
    props<{vox: IVoiceEvent}>()
);
export const captainReducer = createReducer<CaptainState>(
    {
        voiceEvents: []
    },
    on(captainSays, (state, action) => {
        return {
            ...state,
            voiceEvents: [
                action.vox, 
                ...state.voiceEvents
            ]
        };
    }),
);


export const selectComputer = (state: AppState) => state.computer;

export const reducers: ActionReducerMap<AppState> = {
    computer: computerReducer,
    captain: captainReducer
};