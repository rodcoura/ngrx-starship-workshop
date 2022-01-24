import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "../app.state";
import { IComputerDirective, SolarSystemLocation } from "../challenge.service";
import * as act from "./computer.actions";
import { ComputerAction } from "./computer.actions";

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

    /**
     * this is called on the captain's very first voice event
     */
    public Initialize() {
        this.store.dispatch(act.loadNavData());
    }
    /**
     * this is called when the captain commands the computer to do one or more things
     */
    public InterpretDirectives(directives: IComputerDirective[]) {
        let messages : string[] = [];
        directives.forEach(directive => {
            const parsedDirective = this.parseDirectiveToAction(directive);
            messages.push(this.directiveToComputerMessage(directive));
            this.store.dispatch({ type: `[computer] ${parsedDirective.action}`, ...parsedDirective.toDispatchParameters() });
        });
        this.store.dispatch(act.echo({ messages }));
        messages = [];
    }

    private parseDirectiveToAction(directive: IComputerDirective): ComputerAction {
        let paramKey: string = '';
        let paramValue: number | boolean | SolarSystemLocation | undefined;

        switch (directive.directObject){
            case 'course' : paramKey = 'location'; break;
            default: paramKey = directive.directObject.split(' ')[0]; break;
        }

        //Parse possible adverb value
        switch (directive.adverb) {
            case 'fully': paramValue = 10; break;
            case 'halfway': paramValue = 5; break;
            case 'slowly': paramValue = 1; break;
            default: paramValue = (directive.verb == 'engage' ? true : false); break;
        }

        //Parse possible adjectivalPhrase value
        switch (directive.adjectivalPhrase) {
            case 'to Luna orbit': paramValue = 'LunaOrbit'; break;
            case 'to the asteroid belt': paramValue = 'AsteroidBelt'; break;
            case 'to LEO': paramValue = 'LEO'; break;
            default: break;
        }

        const action = new ComputerAction(directive.verb, paramKey, paramValue);

        return action;
    }

    private directiveToComputerMessage(d: IComputerDirective): string{
        let result = "ACK > ";
        if (d.adverb)
            result += d.adverb.toUpperCase() + " ";
        result += d.verb.toUpperCase();
        result += ' THE ';
        result += d.directObject.toUpperCase();
        if (d.adjectivalPhrase)
            result += " " + d.adjectivalPhrase.toUpperCase();
        return result;
    }
} 