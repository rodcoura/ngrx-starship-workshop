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
    tractorbeam: boolean,
    hasSatellite: boolean,
    asteroidDestroyed?: boolean,
}

export const InitialComputerState: ComputerState = {
    echoMessages: [],
    locationPlace: 'LEO',
    shield: 0,
    engine: 0,
    laser: 0,
    docking: true,
    tractorbeam: false,
    locations: [],
    hasSatellite: true,
    asteroidDestroyed: false,
}

export const computerReducerNEW = createReducer<ComputerState>(
    InitialComputerState,
);

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
    /* Docking */
    on(act.engageDockingClamp, (state, action) => {
        return {
            ...state,
            docking: true
        }
    }),
    on(act.disengageDockingClamp, (state, action) => {
        return {
            ...state,
            docking: false
        }
    }),
    /* Engines */
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
    on(act.disengageEngines, (state, action) => {
        return {
            ...state,
            engine: 0,
            locationPlace: state.course?.location,
            course: undefined
        }
    }),
    /* Shields */
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
    on(act.disengageShields, (state, action) => {
        return {
            ...state,
            shield: 0
        }
    }),
    /* Lasers */
    on(act.fullyEngageLasers, (state, action) => {
        return {
            ...state,
            laser: 10,
            engine: 0,
            shield: 0,
        }
    }),
    on(act.halfwayEngageLasers, (state, action) => {
        return {
            ...state,
            laser: 5,
        }
    }),
    on(act.slowlyEngageLasers, (state, action) => {
        return {
            ...state,
            laser: 1,
        }
    }),
    on(act.disengageLasers, (state, action) => {
        return {
            ...state,
            laser: 0,
        }
    }),
    /* Tractorbeam */
    on(act.engageTractorbeam, (state, action) => {
        return {
            ...state,
            tractorbeam: true
        }
    }),
    on(act.disengageTractorbeam, (state, action) => {
        return {
            ...state,
            tractorbeam: false,
            hasSatellite: false
        }
    }),
    /* Plot course */
    on(act.plotCourseLEO, (state, action) => {
        return {
            ...state,
            course: state.locations.find(a => a.location == 'LEO'),
            locationPlace: "LEO",
        }
    }),
    on(act.plotCourseLunaOrbit, (state, action) => {
        return {
            ...state,
            course: state.locations.find(a => a.location == 'LunaOrbit'),
            locationPlace: "LunaOrbit",
            hasSatellite: true
        }
    }),
    on(act.plotCourseAsteroidBelt, (state, action) => {
        return {
            ...state,
            course: state.locations.find(a => a.location == 'AsteroidBelt'),
            locationPlace: 'AsteroidBelt',
            hasSatellite: false
        }
    }),
);

