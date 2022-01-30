/**
 * computer selector file!
 * 
 * all main computer selectors go in this file
 * 
 * this file should be free of any business logic or Math.random() calls!
 */
import { createSelector } from "@ngrx/store";
import { selectComputer } from "../app.state";
import { SolarSystemLocation } from "../challenge.service";
import { ComputerState } from "./computer.reducer";
import { ViewscreenState } from "./viewscreen/viewscreen.component";

// https://ngrx.io/guide/store/selectors

export const selectViewscreen = createSelector(
    selectComputer,
    (state: ComputerState) => {
        const splitNavigation = state.courseLocation.split('|');

        const stateCourse = (splitNavigation[0] ? splitNavigation[0] : undefined) as SolarSystemLocation | undefined;
        const stateLocation = (splitNavigation[1] ? splitNavigation[1] : undefined) as SolarSystemLocation | undefined;
        
        const location = state.locations.find(a => a.location == (stateLocation ?? stateCourse));

        const view: ViewscreenState = {
            location: stateLocation,
            course: stateCourse,
            leftImage: location?.leftImage,
            centerImage: location?.centerImage,
            rightImage: location?.rightImage,
            laser: state.laser > 0,
            tractor: state.tractorbeam,
        };

        return view;
    }
);

export const selectEngine = createSelector(
    selectComputer,
    (state: ComputerState) => {
        return state.engines;
    }
);

export const selectShields = createSelector(
    selectComputer,
    (state: ComputerState) => {
        return state.shields;
    }
);

export const selectLasers = createSelector(
    selectComputer,
    (state: ComputerState) => {
        return state.laser;
    }
);

export const selectDockingClamp = createSelector(
    selectComputer,
    (state: ComputerState) => {
        return state.docking;
    }
);

export const selectTractorbeam = createSelector(
    selectComputer,
    (state: ComputerState) => {
        return state.tractorbeam;
    }
);

