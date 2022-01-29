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
    courseLocation: string,
    docking: boolean,
    tractorbeam: boolean,
    hasSatellite: boolean,
    //asteroidInRange?: boolean,
}

export const InitialComputerState: ComputerState = {
    echoMessages: [],
    courseLocation: '|LEO',
    shields: 0,
    engines: 0,
    laser: 0,
    docking: true,
    tractorbeam: false,
    locations: [],
    hasSatellite: true,
    //asteroidInRange: false,
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
    on(act.loadNavDataError, (state, action) => {
        return {
            ...state,
            locations: []
        };
    }),
    on(act.engage, (state, action) => {
        let newState: Partial<ComputerState> = {};

        const splitNavigation = state.courseLocation.split('|');

        if (action.param.laser == 10) {
            newState.engines = 0;
            newState.shields = 0;
        }

        if (action.keyID === 'engines') {

            if (action.param.engines == 5) {
                if (splitNavigation[0] == "AsteroidBelt") {
                    newState.courseLocation = `|${splitNavigation[0]}`;
                }
            }
            else if (action.param.engines == 10) {
                newState.laser = 0;
                newState.shields = 0;

                if (splitNavigation[0] == "LEO") {
                    newState.courseLocation = `|${splitNavigation[0]}`;
                }
            }
        }

        if (action.param.shields == 10) {
            newState.laser = 0;
            newState.engines = 0;
        }

        return {
            ...state,
            ...action.param,
            ...newState
        };
    }),
    on(act.disengage, (state, action) => {
        let newState: Partial<ComputerState> = {};

        const splitNavigation = state.courseLocation.split('|');

        if (action.param.tractorbeam === false) {
            newState.hasSatellite = false;
        }

        if (action.keyID === 'engines') {
            if (splitNavigation[0]) {
                newState.courseLocation = `|${splitNavigation[0]}`;
            }
            newState.engines = 0;
        }

        return {
            ...state,
            ...action.param,
            ...newState
        };
    }),
    on(act.plot, (state, action) => {
        let newState: Partial<ComputerState> = {};

        newState.courseLocation = `${action.param.courseLocation}|`;

        if (action.param.courseLocation === 'AsteroidBelt') {
            newState.hasSatellite = false;
            //newState.asteroidInRange = true;
        }

        if (action.param.courseLocation === 'LunaOrbit') {
            newState.hasSatellite = true;
        }

        return {
            ...state,
            ...action.param,
            ...newState
        };
    }),
);