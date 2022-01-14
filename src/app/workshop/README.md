# Rules

All the files in this `workshop` folder can be modified within the following rules:

1. ALL the components must still report to the `Snitch` service as intially configured
    * DO NOT change the `tap` and `share` operators after the `select`
1. ALL components must receive their state from the NGRX store via selectors and asynchronous bindings
    * NO local state variables! Everything must be from a selector and subscribed via an `async` pipe in the HTML.

# How It Works

1. The `Starship-Captain` uses the `ChallengeService` to issue events from the captain every `TickRateMS` milliseconds. 
1. Some of these events have commands that are turned into NGRX actions via `ComputerService`.
1. The various visual components `select` their state from selectors and report it to the `SnitchService`.
1. The `ChallengeService` periodically checks expectations of visual state, and if they are not met, increments the Failure count.

## Goal

**Your job is to figure out the state+actions in the middle, so that expectations are all met and the Failure count is 0.**

An additional goal is to use the least Actions and the smallest State (by # of keys) possible (while still having 0 Failures).

# TODO

1. The [`shields-widget`](./shields-widget/shields-widget.component.ts) is missing a selector.
1. The [`tractor-widget`](./tractor-widget/tractor-widget.component.ts) is missing a selector.
1. The [`nav-db.effects`](./nav-db.effects.ts) file is not fully finished.
1. The `interface ComputerState` in [`computer.reducer.ts`](./computer.reducer.ts) is missing all its state properties.
1. The `InitialComputerState` in [`computer.reducer.ts`](./computer.reducer.ts) must be filled out.
1. There should be a lot of actions in [`computer.actions.ts`](./computer.actions.ts).
    * These actions should be modelled after commands that the captain is issuing in [`challenge.service.ts`](../challenge.service.ts).
    * These actions should be dispatched via `ComputerService.InterpretDirectives` in [`computer.service.ts`](./computer.service.ts).
1. The `reducer` in [`computer.reducer.ts`](./computer.reducer.ts) needs lots of work:
    * It needs lots of reducers to implement actions like set course, or set power to engines, etc
    * It needs to store `NavigationData[]` when `loadNavigationDataSuccess` is dispatched
1. The `selectors` in [`computer.selectors.ts`](./computer.selectors.ts) should have their random data removed, and should just select small bits of the main state.
    * Most components have very simple state selectors
    * The `selectViewscreen` is the most complex selector, as it needs to combine `NavigationData[]` and the course or location to make the viewscreen output the correct location and course

# Debugging

This is a complex challenge, but there should be plenty of hints!

1. Use the [Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd) chrome extension to time travel with events!
1. The Captain complains about Failures in his chat bubble.
1. Any Failures are logged to the console using `console.log`, so open up DevTools (F12) to see the expected visual values.
1. The `TickRateMS` variable on line 63 of [`challenge.service`](../challenge.service.ts) can be modified locally to speed up or slow down how fast the voice commands are sent.

# References
* https://ngrx.io/docs
* https://ngrx.io/guide/store/actions
* https://ngrx.io/guide/store/reducers
* https://ngrx.io/guide/store/selectors