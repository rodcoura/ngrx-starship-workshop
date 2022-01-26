/**
 * computer selector file!
 * 
 * all main computer selectors go in this file
 * 
 * this file should be free of any business logic or Math.random() calls!
 */
import { createSelector } from "@ngrx/store";
import { selectComputer } from "../app.state";
import { ComputerState } from "./computer.reducer";
import { ViewscreenState } from "./viewscreen/viewscreen.component";

// https://ngrx.io/guide/store/selectors

export const selectViewscreen = createSelector(
    selectComputer,
    (state: ComputerState) => {
        const location = state.locations.find(a => a.location == (state.location ?? state.course));

        const showLeftImage = state.hasSatellite || (state.location && (state.tractorbeam || state.location == 'AsteroidBelt'));
        const showCenterImage = state.location && !(state.location == 'AsteroidBelt' && state.shields == 10);
        const showRightImage = !!state.location;
        const asteroidExploding = state.location == 'AsteroidBelt' && state.laser >= 5;
        //const showCenterImage = (location?.location == 'AsteroidBelt' && !state.asteroidInRange);

        const view: ViewscreenState = {
            location: state.location,
            course: state.course,
            leftImage: showLeftImage ? location?.leftImage : undefined,
            centerImage: asteroidExploding ? '/assets/real_explode.gif' : showCenterImage ? location?.centerImage : undefined,
            rightImage: showRightImage ? location?.rightImage : undefined,
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

