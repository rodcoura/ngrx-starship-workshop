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
    shield: number,
    /**
     * the amount of power to the engine.
     * 
     * Must be from 0-10
     */
    engine: number,
    /**
     * the amount of power to the laser.
     * 
     * Must be from 0-10
     */
    laser: number,
    locations: NavigationData[],
    locationPlace?: SolarSystemLocation,
    course?: NavigationData,
    docking: boolean,
    tractor: boolean,
    satelliteView: boolean,
    asteroidView: boolean,
}

export const InitialComputerState: ComputerState = {
    echoMessages: [],
    locationPlace: 'LEO',
    shield: 0,
    engine: 0,
    laser: 0,
    docking: true,
    tractor: false,
    locations: [],
    satelliteView: true,
    asteroidView: false,
}

export const computerReducer = createReducer<ComputerState>(
    InitialComputerState,
    on(act.echo, (state, action) => {
        return {
            ...state,
            echoMessages: [
                action.message,
                ...state.echoMessages
            ]
        };
    }),
    on(act.loadNavDataSuccess, (state, action) => {
        return {
            ...state,
            locations: action.navs
        };
    }),
    on(act.disengageDockingClamp, (state, action) => {
        return {
            ...state,
            docking: false
        }
    }),
    on(act.disengageEngines, (state, action) => {
        return {
            ...state,
            engine: 0,
            locationPlace: state.course?.location,
            course: undefined
        }
    }),
    on(act.disengageShields, (state, action) => {
        return {
            ...state,
            shield: 0
        }
    }),
    on(act.disengageLasers, (state, action) => {
        return {
            ...state,
            laser: 0
        }
    }),
    on(act.disengageTractorbeam, (state, action) => {
        return {
            ...state,
            tractor: false,
        }
    }),
    on(act.engageDockingClamp, (state, action) => {
        return {
            ...state,
            docking: true
        }
    }),
    on(act.engageTractorbeam, (state, action) => {
        return {
            ...state,
            tractor: true
        }
    }),
    on(act.fullyEngageEngines, (state, action) => {
        return {
            ...state,
            engine: 10,
            shield: 0,
            laser: 0,
        }
    }),
    on(act.halfwayEngageEngines, (state, action) => {
        return {
            ...state,
            engine: 5
        }
    }),
    on(act.slowlyEngageEngines, (state, action) => {
        return {
            ...state,
            engine: 1
        }
    }),
    on(act.fullyEngageShields, (state, action) => {
        return {
            ...state,
            shield: 10,
            engine: 0,
            laser: 0,
        }
    }),
    on(act.halfwayEngageShields, (state, action) => {
        return {
            ...state,
            shield: 5
        }
    }),
    on(act.slowlyEngageShields, (state, action) => {
        return {
            ...state,
            shield: 1
        }
    }),
    on(act.fullyEngageLasers, (state, action) => {
        return {
            ...state,
            laser: 10,
            engine: 0,
            shield: 0
        }
    }),
    on(act.halfwayEngageLasers, (state, action) => {
        return {
            ...state,
            laser: 5
        }
    }),
    on(act.slowlyEngageLasers, (state, action) => {
        return {
            ...state,
            laser: 1
        }
    }),
    on(act.plotCourseLEO, (state, action) => {
        return {
            ...state,
            course: state.locations.find(a => a.location == 'LEO'),
            locationPlace: "LEO",
            satelliteView: true
        }
    }),
    on(act.plotCourseLunaOrbit, (state, action) => {
        return {
            ...state,
            course: state.locations.find(a => a.location == 'LunaOrbit'),
            locationPlace: "LunaOrbit",
            satelliteView: true
        }
    }),
    on(act.plotCourseAsteroidBelt, (state, action) => {
        return {
            ...state,
            course: state.locations.find(a => a.location == 'AsteroidBelt'),
            locationPlace: undefined,
            satelliteView: false
        }
    }),
);

