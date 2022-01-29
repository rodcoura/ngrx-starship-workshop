import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { switchMap, map, catchError, of } from "rxjs";
import { NavDBService, NavigationData } from "../nav-db.service";
import { loadNavData, loadNavDataError, loadNavDataSuccess } from "./computer.actions";

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
                map(navs => {
                    //Lower state numbers, removing unneeded values
                    const threatenNavs = navs.map(a => {
                        if (!a.leftImage)
                            delete a['leftImage'];
                        if (!a.rightImage)
                            delete a['rightImage'];
                        return a;
                    });
                    return loadNavDataSuccess({ navs: threatenNavs });
                },
                    catchError(error => of(loadNavDataError())))
            ))
        )
    );
}