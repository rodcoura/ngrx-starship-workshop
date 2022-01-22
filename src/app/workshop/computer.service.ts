import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "../app.state";
import { IComputerDirective, SolarSystemLocation } from "../challenge.service";
import { echo, loadNavData } from "./computer.actions";

/**
 * computer service to interface between captain's commands and ngrx store
 * 
 * this service is fully customizable, but all logic should be in the actions/reducers
 */
@Injectable({
    providedIn: 'root'
})
export class ComputerService {
    constructor(private store: Store<AppState>) { }

    inCourse: boolean = false;
    interaction: number = 0;
    /**
     * this is called on the captain's very first voice event
     */
    public Initialize() {
        this.store.dispatch(loadNavData());
    }
    /**
     * this is called when the captain commands the computer to do one or more things
     */
    public InterpretDirectives(directives: IComputerDirective[]) {
        this.interaction = 0;
        //TODO: decide which actions to dispatch based on the directives passed in!
        directives.forEach(directive => {
            const parsedDirective = this.parseDirectiveToAction(directive);
            this.store.dispatch(echo({ message: parsedDirective }));
            this.store.dispatch({ type: parsedDirective });
        });

        this.interaction++;
    }

    private parseDirectiveToAction(directive: IComputerDirective): string {
        const directiveT = [
            directive.adverb,
            directive.verb,
            directive.directObject,
            directive.adjectivalPhrase
        ].filter(a => a);

        return `[computer] ${directiveT.join(' ')}`;
    }
} 