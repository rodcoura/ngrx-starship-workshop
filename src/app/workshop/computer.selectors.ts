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

        const showLeftImageCases = state.hasSatellite || state.tractorbeam || state.locationPlace == 'AsteroidBelt';
        const showCenterImageCases = (state.locationPlace == 'AsteroidBelt' && (state.laser == 5 || state.shields == 10));
        //const showCenterImageCases = (location?.location == 'AsteroidBelt' && !state.asteroidInRange);

        const view: ViewscreenState = {
            location: state.locationPlace,
            course: state.course,
            leftImage: showLeftImageCases ? location?.leftImage : undefined,
            centerImage: showCenterImageCases ? '/assets/real_explode.gif' : location?.centerImage,
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

