/**
 * computer reducer file!
 * 
 * all main computer logic should go in this file
 */
import { createReducer, on } from "@ngrx/store";
import { NavigationData } from "../nav-db.service";
import * as act from "./computer.actions";

export enum ShipFeature {
    TractorOnline = 1 << 0,
    TractorOffline = 1 << 1,
    DockingOnline = 1 << 2,
    DockingOffline = 1 << 3,
}

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
    shipFeatures: ShipFeature,
    courseLocation: CourseLocation
}

export enum CourseLocation {
    InLocation = 0,
    OnCourse = 1 << 0,
    LEO = 1 << 1,
    LunaOrbit = 1 << 2,
    AsteroidBelt = 1 << 3,
}

export const InitialComputerState: ComputerState = {
    echoMessages: [],
    courseLocation: CourseLocation.InLocation | CourseLocation.LEO,
    shields: 0,
    engines: 0,
    laser: 0,
    shipFeatures: ShipFeature.DockingOnline | ShipFeature.TractorOffline,
    locations: [],
}

export const computerReducer = createReducer<ComputerState>(
    InitialComputerState,
    on(act.echo, (state, action) => {
        return {
            ...state,
            echoMessages: [
                ...action.messages,
                ...state.echoMessages,
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

        newState.shipFeatures = state.shipFeatures;

        if(action.keyID === 'docking') {
            newState.shipFeatures |= ShipFeature.DockingOnline;
            newState.shipFeatures &= ~ShipFeature.DockingOffline;
        }

        if(action.keyID === 'tractorbeam') {
            newState.shipFeatures |= ShipFeature.TractorOnline;
            newState.shipFeatures &= ~ShipFeature.TractorOffline;
        }
        newState.courseLocation = state.courseLocation;

        if (action.keyID === 'laser' || action.keyID === 'docking') {
            newState.engines = 0;

            if (action.param.laser == 5) {
                newState.courseLocation &= ~CourseLocation.OnCourse;
            }
            else if (action.param.laser == 10) {
                newState.shields = 0;
            }
        }

        //Exploding!
        if(action.param.laser === 5) {
            newState.locations = state.locations?.map(a => {
                if(a.location === 'AsteroidBelt')
                    return <NavigationData>{
                        location: a.location,
                        leftImage: a.leftImage,
                        centerImage: '/assets/real_explode.gif',
                        rightImage: a.rightImage
                    };
                return a;
            });
        }

        if (action.keyID === 'engines') {
            newState.shipFeatures |= ShipFeature.DockingOffline;
            newState.shipFeatures &= ~ShipFeature.DockingOnline;
        
            if (action.param.engines == 5) {
                newState.shields = 5;
                if ((state.courseLocation & CourseLocation.AsteroidBelt) === CourseLocation.AsteroidBelt) {
                    newState.courseLocation |= CourseLocation.InLocation;
                }
            } else if (action.param.engines == 10) {
                newState.laser = 0;
                newState.shields = 0;

                if ((state.courseLocation & CourseLocation.LEO) === CourseLocation.LEO) {
                    newState.courseLocation |= CourseLocation.InLocation;
                }
            }
        }

        if (action.param.shields == 10) {
            newState.laser = 0;
            newState.engines = 0;

            newState.locations = state.locations?.map(a => {
                if(a.location === 'AsteroidBelt')
                    return <NavigationData>{
                        location: a.location,
                        leftImage: a.leftImage,
                        centerImage: undefined,
                        rightImage: a.rightImage
                    };
                return a;
            });
        }

        return {
            ...state,
            ...action.param,
            ...newState
        };
    }),
    on(act.disengage, (state, action) => {
        let newState: Partial<ComputerState> = {};

        newState.courseLocation = state.courseLocation;
        newState.shipFeatures = state.shipFeatures;
        
        if (action.keyID === 'docking') {
            newState.shipFeatures |= ShipFeature.DockingOffline;
            newState.shipFeatures &= ~ShipFeature.DockingOnline;
        }

        if (action.keyID === 'tractorbeam') {
            newState.shipFeatures |= ShipFeature.TractorOffline;
            newState.shipFeatures &= ~ShipFeature.TractorOnline;


            newState.locations = state.locations?.map(a => {
                if(a.location === 'LunaOrbit')
                    return <NavigationData>{
                        location: a.location,
                        centerImage: a.centerImage
                    };
                return a;
            });
        }

        if (action.keyID === 'engines') {
            if ((state.courseLocation & CourseLocation.OnCourse) === CourseLocation.OnCourse) {
                newState.courseLocation |= CourseLocation.OnCourse;
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
        if (action.param.courseLocation) {
            if (action.param.courseLocation === CourseLocation.AsteroidBelt) {
                newState.shields = 5;
                newState.engines = 5;
            }
            else if (action.param.courseLocation === CourseLocation.LunaOrbit) {
                newState.engines = 10;
            }
            else if (action.param.courseLocation === CourseLocation.LEO) {
                newState.shields = 0;
            }
            newState.courseLocation = action.param.courseLocation;
            newState.courseLocation |= CourseLocation.OnCourse;
        }

        return {
            ...state,
            ...action.param,
            ...newState
        };
    }),
);