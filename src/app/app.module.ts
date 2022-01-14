import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { StarshipViewComponent } from './starship-view/starship-view.component';
import { ConsoleRowComponent } from './console-row/console-row.component';
import { EngineWidgetComponent } from './engine-widget/engine-widget.component';
import { ViewscreenComponent } from './workshop/viewscreen/viewscreen.component';
import { ShieldsWidgetComponent } from './workshop/shields-widget/shields-widget.component';
import { StarshipCaptainComponent } from './starship-captain/starship-captain.component';
import { StarfieldComponent } from './starfield/starfield.component';
import { LasersWidgetComponent } from './lasers-widget/lasers-widget.component';
import { ChatBubblesComponent } from './chat-bubbles/chat-bubbles.component';
import { ComputerMessagesComponent } from './workshop/computer-messages/computer-messages.component';
import { META_REDUCERS, StoreModule } from '@ngrx/store';
import { reducers } from './app.state';
import { missionMiddlewareFactory } from './mission.reducer';
import { SnitchService } from './snitch.service';
import { MetastatsWidgetComponent } from './metastats-widget/metastats-widget.component';
import { DockingClampWidgetComponent } from './docking-clamp-widget/docking-clamp-widget.component';
import { TractorWidgetComponent } from './workshop/tractor-widget/tractor-widget.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { NavDBEffects } from './workshop/nav-db.effects';

@NgModule({
  declarations: [
    AppComponent,
    MainMenuComponent,
    StarshipViewComponent,
    ConsoleRowComponent,
    EngineWidgetComponent,
    ViewscreenComponent,
    ShieldsWidgetComponent,
    StarshipCaptainComponent,
    StarfieldComponent,
    LasersWidgetComponent,
    ChatBubblesComponent,
    ComputerMessagesComponent,
    MetastatsWidgetComponent,
    DockingClampWidgetComponent,
    TractorWidgetComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    StoreModule.forRoot(
      reducers
    ),
    StoreDevtoolsModule.instrument({
      maxAge: 200, // Retains last 25 states
      logOnly: false,
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    }),
    EffectsModule.forRoot([NavDBEffects])
  ],
  providers: [
    {
      provide: META_REDUCERS,
      deps: [SnitchService],
      useFactory: missionMiddlewareFactory,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
