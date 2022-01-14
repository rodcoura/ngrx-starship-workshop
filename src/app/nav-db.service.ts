/**
 * this file is a fake HTTP service for some "navigation data"
 */
import { Injectable } from "@angular/core";
import { delay, Observable, of, take } from "rxjs";
import { SolarSystemLocation } from "./challenge.service";

/**
 * this is primarily required for the viewscreen
 */
export interface NavigationData{
    location: SolarSystemLocation,
    leftImage: string|undefined,
    centerImage: string|undefined,
    rightImage: string|undefined
}

@Injectable({
    providedIn: 'root'
})
export class NavDBService{
    constructor(
    ){}

    /**
     * fake HTTP call for navigation data
     * 
     * it describes the initial state of "locations" and their images to display in the viewscreen
     * @returns 
     */
    public getNavigationData(): Observable<NavigationData[]>{
        //don't copy this data or move it into a publically accessible place!
        return of([
            {
                location: 'LEO',
                leftImage: undefined,
                centerImage: '/assets/planet.png',
                rightImage: '/assets/spaceStation.png'
            } as NavigationData,
            {
                location: 'LunaOrbit',
                leftImage: '/assets/satellite.png',
                centerImage: '/assets/luna.png',
                rightImage: undefined
            } as NavigationData,
            {
                location: 'AsteroidBelt',
                leftImage: '/assets/asteroid.png',
                centerImage: '/assets/asteroid.gif',
                rightImage: '/assets/asteroid.png'
            } as NavigationData
        ]).pipe(
            delay(200),
            take(1)
        )
    }
}