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
        let parsedDirectives : ComputerAction[] = directives
            .filter(d => 
                directives.length == 1 || !this.unusedActions.some(u => JSON.stringify(u) == JSON.stringify(d))
            )
            .map(directive => {
                messages.push(this.directiveToComputerMessage(directive));
                return this.parseDirectiveToAction(directive);
            }
        );

        // if(parsedDirectives.every(a => a.action == parsedDirectives[0].action)) {
        //     let actionParams : any = {
        //         keyIDs: [],
        //         params: {}
        //     };

        //     parsedDirectives.forEach(parsedDirective => {
        //         const computedParam = parsedDirective.toDispatchParameters();
        //         actionParams.keyIDs.push(computedParam.keyID);
        //         actionParams.params = {
        //             ...actionParams.params,
        //             ...computedParam.param
        //         }
        //     });
        //     console.log(actionParams);
        //     this.store.dispatch({ type: `[computer] ${parsedDirectives[0].action}`, ...actionParams });
        // } else {
            parsedDirectives.forEach(parsedDirective => {
                this.store.dispatch({ type: `[computer] ${parsedDirective.action}`, ...parsedDirective.toDispatchParameters() });
            })  
        // }

        this.store.dispatch(act.echo({ messages }));
        messages = [];
    }

    private unusedActions = [
        { verb: 'disengage', directObject: 'docking clamp' },
        { adverb: 'halfway', verb: 'engage', directObject: 'shields' },
        { verb: 'disengage', directObject: 'engines' },
        { adverb: 'fully', verb: 'engage', directObject: 'engines' }
    ];

    private parseDirectiveToAction(directive: IComputerDirective): ComputerAction {
        const paramKey: string = directive.directObject.split(' ')[0].replace('course', 'courseLocation');
        let paramValue: number | boolean | SolarSystemLocation | undefined;

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

        const actionFinale = new ComputerAction(directive.verb, paramKey);

        if(paramKey) {
            actionFinale.addParam(paramKey, paramValue);
        }

        return actionFinale;
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