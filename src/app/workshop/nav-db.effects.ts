import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { switchMap, map, catchError, of, filter } from "rxjs";
import { NavDBService, NavigationData } from "../nav-db.service";
import { loadNavData, loadNavDataError, loadNavDataSuccess, beforePlot, plot } from "./computer.actions";
import { CourseLocation } from "./computer.reducer";

@Injectable()
export class NavDBEffects {
    constructor(
        private actions$: Actions,
        private service: NavDBService
    ) { }

    loadNavigationData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadNavData),
            switchMap(action => this.service.getNavigationData().pipe(
                map(navs => loadNavDataSuccess({ navs: navs.filter(a => a.location === 'LEO')[0] }),
                catchError(error => of(loadNavDataError())))
            ))
        )
    );

    parseCourse(course: string) : CourseLocation {
        switch (course) {
            case 'LunaOrbit':
                return CourseLocation.LunaOrbit;
            case 'AsteroidBelt':
                return CourseLocation.AsteroidBelt;
            default:
                return CourseLocation.LEO;
        }
    }

    beforePlot$ = createEffect(() =>
        this.actions$.pipe(
            ofType(beforePlot),
            switchMap(action => this.service.getNavigationData().pipe(
                map(navs => plot({ locations: navs.filter(a => a.location === action.course)[0], courseLocation: this.parseCourse(action.course) }),
                catchError(error => of(loadNavDataError())))
            ))
        )
    );
}