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
import { ComputerState, CourseLocation } from "./computer.reducer";
import { ViewscreenState } from "./viewscreen/viewscreen.component";

// https://ngrx.io/guide/store/selectors

export const selectViewscreen = createSelector(
    selectComputer,
    (state: ComputerState) => {
        let currentLocation: SolarSystemLocation;

        if ((state.courseLocation & CourseLocation.AsteroidBelt) === CourseLocation.AsteroidBelt) {
            currentLocation = "AsteroidBelt";
        }
        else if ((state.courseLocation & CourseLocation.LunaOrbit) === CourseLocation.LunaOrbit) {
            currentLocation = "LunaOrbit";
        }
        else { // if ((state.courseLocation & CourseLocation.LEO) === CourseLocation.LEO) {
            currentLocation = "LEO";
        }

        const location = state.locations.find(a => a.location == currentLocation);

        const view: ViewscreenState = {
            location: ((state.courseLocation & CourseLocation.InLocation) === CourseLocation.InLocation) ? currentLocation : undefined,
            course: ((state.courseLocation & CourseLocation.OnCourse) === CourseLocation.OnCourse) ? currentLocation : undefined,
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

