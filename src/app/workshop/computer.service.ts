import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "../app.state";
import { IComputerDirective, SolarSystemLocation } from "../challenge.service";
import * as act from "./computer.actions";
import { ComputerAction } from "./computer.actions";
import { CourseLocation } from "./computer.reducer";

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
        let messages: string[] = [];
        let parsedDirectives: ComputerAction[] = directives
            .filter(d => directives.length == 1 || !this.unusedActions.some(u => JSON.stringify(u) == JSON.stringify(d)))
            .map(directive => {
                messages.push(this.directiveToComputerMessage(directive));
                return this.parseDirectiveToAction(directive);
            });

            parsedDirectives.forEach(parsedDirective => {
            this.store.dispatch({ type: `[computer] ${parsedDirective.action}`, ...parsedDirective.toDispatchParameters() });
        })

        this.store.dispatch(act.echo({ messages }));
        messages = [];
    }

    private unusedActions = [
        { verb: 'disengage', directObject: 'docking clamp' },
        { adverb: 'halfway', verb: 'engage', directObject: 'shields' },
        { adverb: 'halfway', verb: 'engage', directObject: 'engines' },
        { verb: 'disengage', directObject: 'engines' },
        { adverb: 'fully', verb: 'engage', directObject: 'engines' },
        { verb: 'disengage', directObject: 'shields' }
    ];

    private parseDirectiveToAction(directive: IComputerDirective): ComputerAction {
        const paramKey: string = directive.directObject.split(' ')[0].replace('course', 'courseLocation');
        let paramValue: number | boolean | CourseLocation | undefined;

        //Parse possible adverb value
        switch (directive.adverb) {
            case 'fully': paramValue = 10; break;
            case 'halfway': paramValue = 5; break;
            case 'slowly': paramValue = 1; break;
            default: paramValue = (directive.verb == 'engage' ? true : false); break;
        }

        //Parse possible adjectivalPhrase value
        switch (directive.adjectivalPhrase) {
            case 'to Luna orbit': paramValue = CourseLocation.LunaOrbit; break;
            case 'to the asteroid belt': paramValue = CourseLocation.AsteroidBelt; break;
            case 'to LEO': paramValue = CourseLocation.LEO; break;
            default: break;
        }

        const actionFinale = new ComputerAction(directive.verb, paramKey);

        if (paramKey && paramKey != 'docking' && paramKey != 'tractorbeam') {
            actionFinale.addParam(paramKey, paramValue);
        }

        return actionFinale;
    }

    private directiveToComputerMessage(d: IComputerDirective): string {
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