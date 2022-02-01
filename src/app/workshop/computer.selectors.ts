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
import { ComputerState, CourseLocation, ShipFeature } from "./computer.reducer";
import { ViewscreenState } from "./viewscreen/viewscreen.component";

// https://ngrx.io/guide/store/selectors

export const selectViewscreen = createSelector(
    selectComputer,
    (state: ComputerState) => {
        let currentLocation: SolarSystemLocation;

        const location = state.locations;

        const view: ViewscreenState = {
            location: ((state.courseLocation & CourseLocation.InLocation) === CourseLocation.InLocation) ? state.locations?.location : undefined,
            course: ((state.courseLocation & CourseLocation.OnCourse) === CourseLocation.OnCourse) ? state.locations?.location : undefined,
            leftImage: location?.leftImage,
            centerImage: location?.centerImage,
            rightImage: location?.rightImage,
            laser: state.laser > 0,
            tractor: (state.shipFeatures & ShipFeature.TractorOnline) === ShipFeature.TractorOnline,
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
        return (state.shipFeatures & ShipFeature.DockingOnline) === ShipFeature.DockingOnline;
    }
);

export const selectTractorbeam = createSelector(
    selectComputer,
    (state: ComputerState) => {
        return (state.shipFeatures & ShipFeature.TractorOnline) === ShipFeature.TractorOnline;
    }
);

