import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, captainSays } from '../app.state';
import { ChallengeService } from '../challenge.service';

@Component({
  selector: 'app-chat-bubbles',
  templateUrl: './chat-bubbles.component.html',
  styleUrls: ['./chat-bubbles.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ height: '0', overflow: 'hidden',padding:'0' }),
        animate('.5s ease-in-out', style({ height: '*',padding:'3px' })),
      ]),
    ]),
  ],
})
export class ChatBubblesComponent implements OnInit {

  constructor(private store: Store<AppState>, private service: ChallengeService) { }

  ngOnInit(): void {
    this.service.VoiceEvents$.subscribe((v) => {
      this.store.dispatch(captainSays({vox: v}));
    });
  }

  public chat$ = this.store.select(x => x.captain.voiceEvents).pipe(
  );
}
