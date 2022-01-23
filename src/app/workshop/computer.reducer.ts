/**
 * computer reducer file!
 * 
 * all main computer logic should go in this file
 */
import { createReducer, on } from "@ngrx/store";
import { SolarSystemLocation } from "../challenge.service";
import { NavigationData } from "../nav-db.service";
import * as act from "./computer.actions";

/**
 * This is the "slice" that you need to fill out!
 * 
 * Course data, location data, engine/shield/laser power level, all 
 * of these state properties must reside in this interface!
 * 
 * All of the visual components will select their state from this central
 * state location.
 */
export interface ComputerState {
    /**
     * these messages are displayed by the computer-messages component
     * 
     * they are not required or useful, they are just example of state properties
     * 
     * feel free to change or remove this
     */
    echoMessages: string[],
    /**
     * the amount of power to the shield.
     * 
     * Must be from 0-10
     */
    shields: number,
    /**
     * the amount of power to the engine.
     * 
     * Must be from 0-10
     */
    engines: number,
    /**
     * the amount of power to the laser.
     * 
     * Must be from 0-10
     */
    laser: number,
    locations: NavigationData[],
    locationPlace?: SolarSystemLocation,
    course?: SolarSystemLocation,
    docking: boolean,
    tractorbeam: boolean,
    hasSatellite: boolean,
    asteroidDestroyed?: boolean,
}

export const InitialComputerState: ComputerState = {
    echoMessages: [],
    locationPlace: 'LEO',
    shields: 0,
    engines: 0,
    laser: 0,
    docking: true,
    tractorbeam: false,
    locations: [],
    hasSatellite: true,
    asteroidDestroyed: false,
}

export const computerReducer = createReducer<ComputerState>(
    InitialComputerState,
    on(act.echo, (state, action) => {
        return {
            ...state,
            echoMessages: [
                ...state.echoMessages,
                ...action.messages
            ]
        };
    }),
    on(act.loadNavDataSuccess, (state, action) => {
        return {
            ...state,
            locations: action.navs
        };
    }),
    on(act.engage, (state, action) => {
        let params : { [key: string] : string | number | boolean | undefined } = {};

        if(action.keyID === 'laser' && action.param[action.keyID] == 10) {
            params['engines'] = 0;
            params['shields'] = 0;
        }

        if(action.keyID === 'engines' && action.param[action.keyID] == 10) {
            params['laser'] = 0;
            params['shields'] = 0;
        }

        if(action.keyID === 'shields' && action.param[action.keyID] == 10) {
            params['laser'] = 0;
            params['engines'] = 0;
        }

        return {
            ...state,
            ...action.param,
            ...params
        };
    }),
    on(act.disengage, (state, action) => {
        let params : { [key: string] : string | number | boolean | undefined } = {};
        
        if(action.keyID === 'tractorbeam') {
            params['hasSatellite'] = false;
        }

        if(action.keyID === 'engines') {
            params['locationPlace'] = state.course;
            params['course'] = undefined;
        }

        return {
            ...state,
            ...action.param,
            ...params
        };
    }),
    on(act.plot, (state, action) => {
        let params : { [key: string] : string | number | boolean | undefined | NavigationData } = {};

        params['locationPlace'] = action.param[action.keyID];

        if(action.param[action.keyID] === 'LEO') {
            params['locationPlace'] = 'LEO';
        }

        if(action.param[action.keyID] === 'AsteroidBelt') {
            params['locationPlace'] = 'AsteroidBelt';
            params['hasSatellite'] = false;
        }

        if(action.param[action.keyID] === 'LunaOrbit') {
            params['hasSatellite'] = true;
        }

        return {
            ...state,
            ...action.param,
            ...params
        };
    }),
);