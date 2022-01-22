/**
 * computer reducer file!
 * 
 * all main computer logic should go in this file
 */
import { createReducer, on } from "@ngrx/store";
import { SolarSystemLocation } from "../challenge.service";
import { NavigationData } from "../nav-db.service";
import { disengageDockingClamp, disengageEngines, disengageLasers, disengageShields, disengageTractorbeam, echo, engageDockingClamp, engageTractorbeam, fullyEngageEngines, fullyEngageLasers, fullyEngageShields, halfwayEngageEngines, halfwayEngageLasers, halfwayEngageShields, loadNavDataSuccess, plotCourseAsteroidBelt, plotCourseLEO, plotCourseLunaOrbit, slowlyEngageEngines, slowlyEngageLasers, slowlyEngageShields } from "./computer.actions";

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
}

export const InitialComputerState: ComputerState = {
    echoMessages: [],
    locationPlace: 'LEO',
    shield: 0,
    engine: 0,
    laser: 0,
    docking: true,
    tractor: false,
    locations: []
}

export const computerReducer = createReducer<ComputerState>(
    InitialComputerState,
    on(echo, (state, action) => {
        return {
            ...state,
            echoMessages: [
                action.message,
                ...state.echoMessages
            ]
        };
    }),
    on(loadNavDataSuccess, (state, action) => {
        return {
            ...state,
            locations: action.navs
        };
    }),
    on(disengageDockingClamp, (state, action) => {
        return {
            ...state,
            docking: false
        }
    }),
    on(disengageEngines, (state, action) => {
        return {
            ...state,
            engine: 0,
            locationPlace: state.course?.location,
            course: undefined
        }
    }),
    on(disengageShields, (state, action) => {
        return {
            ...state,
            shield: 0
        }
    }),
    on(disengageLasers, (state, action) => {
        return {
            ...state,
            laser: 0
        }
    }),
    on(disengageTractorbeam, (state, action) => {
        return {
            ...state,
            tractor: false
        }
    }),
    on(engageDockingClamp, (state, action) => {
        return {
            ...state,
            docking: true
        }
    }),
    on(engageTractorbeam, (state, action) => {
        return {
            ...state,
            tractor: true
        }
    }),
    on(fullyEngageEngines, (state, action) => {
        return {
            ...state,
            engine: 10,
            shield: 0,
            laser: 0,
        }
    }),
    on(halfwayEngageEngines, (state, action) => {
        return {
            ...state,
            engine: 5
        }
    }),
    on(slowlyEngageEngines, (state, action) => {
        return {
            ...state,
            engine: 1
        }
    }),
    on(fullyEngageShields, (state, action) => {
        return {
            ...state,
            shield: 10,
            engine: 0,
            laser: 0,
        }
    }),
    on(halfwayEngageShields, (state, action) => {
        return {
            ...state,
            shield: 5
        }
    }),
    on(slowlyEngageShields, (state, action) => {
        return {
            ...state,
            shield: 1
        }
    }),
    on(fullyEngageLasers, (state, action) => {
        return {
            ...state,
            laser: 10,
            engine: 0,
            shield: 0,
        }
    }),
    on(halfwayEngageLasers, (state, action) => {
        return {
            ...state,
            laser: 5
        }
    }),
    on(slowlyEngageLasers, (state, action) => {
        return {
            ...state,
            laser: 1
        }
    }),
    on(plotCourseLEO, (state, action) => {
        return {
            ...state,
            course: state.locations.find(a => a.location == 'LEO'),
            locationPlace: undefined
        }
    }),
    on(plotCourseLunaOrbit, (state, action) => {
        return {
            ...state,
            course: state.locations.find(a => a.location == 'LunaOrbit'),
            locationPlace: undefined
        }
    }),
    on(plotCourseAsteroidBelt, (state, action) => {
        return {
            ...state,
            course: state.locations.find(a => a.location == 'AsteroidBelt'),
            locationPlace: undefined
        }
    }),
);

