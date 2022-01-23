/**
 * computer action file!
 * 
 * all action definitions go in this file
 */
import { createAction, props } from "@ngrx/store";
import { NavigationData } from "../nav-db.service";

export class ComputerAction {
    action: string;
    keyID: string;
    parameters: { [key: string]: string | number | boolean | undefined }

    /**
     *
     */
    constructor(action: string, keyID: string) {
        this.action = action;
        this.keyID = keyID;
        this.parameters = {};    
    }

    addParam(key: string, value:string | number | boolean | undefined) {
        this.parameters[key] = value; 
    }
}

/**
 * this is an example action, feel free to change it
 */
export const echo = createAction(
    '[computer] echo',
    props<{ messages: string[] }>()
);

// these three actions are for loading Navigation data
export const loadNavData = createAction('[computer] Load Navigation Data');
export const loadNavDataSuccess = createAction('[computer] Load Navigation Data Success', props<{ navs: NavigationData[] }>());
export const loadNavDataError = createAction('[computer] Load Navigation Data Error');

export const engage = createAction('[computer] engage', props<{ keyID: string, [key: string]: string | number | boolean | undefined }>())
export const disengage = createAction('[computer] disengage', props<{ keyID: string, [key: string]: string | number | boolean | undefined }>())
export const plot = createAction('[computer] plot', props<{ keyID: string, [key: string]: string | number | boolean | undefined }>())

export const engageDockingClamp = createAction('[computer] engage docking clamp');
export const disengageDockingClamp = createAction('[computer] disengage docking clamp');
export const engageTractorbeam = createAction('[computer] engage tractorbeam');
export const disengageTractorbeam = createAction('[computer] disengage tractorbeam');
export const fullyEngageEngines = createAction('[computer] fully engage engines');
export const halfwayEngageEngines = createAction('[computer] halfway engage engines');
export const slowlyEngageEngines = createAction('[computer] slowly engage engines');
export const disengageEngines = createAction('[computer] disengage engines');
export const fullyEngageShields = createAction('[computer] fully engage shields');
export const halfwayEngageShields = createAction('[computer] halfway engage shields');
export const slowlyEngageShields = createAction('[computer] slowly engage shields');
export const disengageShields = createAction('[computer] disengage shields');
export const fullyEngageLasers = createAction('[computer] fully engage laser');
export const halfwayEngageLasers = createAction('[computer] halfway engage laser');
export const slowlyEngageLasers = createAction('[computer] slowly engage laser');
export const disengageLasers = createAction('[computer] disengage laser');
export const plotCourseLEO = createAction('[computer] plot course to LEO');
export const plotCourseLunaOrbit = createAction('[computer] plot course to Luna orbit');
export const plotCourseAsteroidBelt = createAction('[computer] plot course to the asteroid belt');

