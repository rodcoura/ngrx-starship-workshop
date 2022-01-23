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
        const location = state.locations.find(a => a.location == state.locationPlace);

        console.warn('location', state.locationPlace)
        console.warn('course', state.course?.location)
        console.warn('satellite correct', state.hasSatellite || state.tractorbeam)
        console.warn('satellite Attempt I', state.locationPlace === 'LunaOrbit' || state.tractorbeam)
        console.warn('satellite Attempt II', state.locationPlace === 'LunaOrbit' || state.course?.location !== 'AsteroidBelt' || state.tractorbeam)
        console.log('interaction')
        
        const view: ViewscreenState = {
            location: state.locationPlace,
            course: state.course?.location,
            leftImage: state.hasSatellite || state.tractorbeam ? location?.leftImage : undefined,
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
        return state.engine;
    }
);

export const selectShields = createSelector(
    selectComputer,
    (state: ComputerState) => {
        return state.shield;
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

