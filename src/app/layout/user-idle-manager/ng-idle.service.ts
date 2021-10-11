import { LoginService } from './../projectcompononts/services/login.service';
import { Injectable, NgZone, OnDestroy } from '@angular/core';
import { Observable, interval, BehaviorSubject } from 'rxjs';
import { map, takeWhile } from 'rxjs/operators';
declare var $: any;

const STORE_KEY = 'userLastAction';

@Injectable({
  providedIn: 'root'
})
export class NgIdleService {
  public static runTimer: boolean;
  public static runSecondTimer: boolean;

  // very important for idle 
  // date 11-2-2020 
  // developer dhammadeep dahiwale
  public USER_IDLE_TIMER_VALUE_IN_MIN: number = 15;
  public userIdlenessChecker: BehaviorSubject<string>;
  public secondLevelUserIdleChecker: BehaviorSubject<string>;

  private sessionForIdle: Observable<number>;
  private userActivityChangeCallback: ($event) => void;

  public clockForIdle: Observable<number>;

  constructor(private zone: NgZone, loginService: LoginService) {
    if (!this.userIdlenessChecker) {
      this.userIdlenessChecker = new BehaviorSubject<string>('INITIATE_TIMER');
    }

    if (!this.secondLevelUserIdleChecker) {
      this.secondLevelUserIdleChecker = new BehaviorSubject<string>('INITIATE_SECOND_TIMER');
    }

    this.initilizeSessionTimeout()
  }

  public initilizeSessionTimeout(): void {
    NgIdleService.runTimer = true;

    if (this.USER_IDLE_TIMER_VALUE_IN_MIN === 0) {
      this.userIdlenessChecker.thrownError('Please provide USER_IDLE_TIMER_VALUE in minuite');
      return;
    }

    this.reset();
    this.initListener();
    this.initInterval();
    // console.log(this.USER_IDLE_TIMER_VALUE_IN_MIN + " in initialize session timeout")
    // alert(this.USER_IDLE_TIMER_VALUE_IN_MIN)
  }

  get lastAction(): number {
    return parseInt(localStorage.getItem(STORE_KEY), 10);
  }

  set lastAction(value) {
    localStorage.setItem(STORE_KEY, value.toString());
  }

  private initListener(): void {
    this.zone.runOutsideAngular(() => {
      this.userActivityChangeCallback = ($event) => this.handleUserActiveState($event);
      window.document.addEventListener('click', this.userActivityChangeCallback.bind(this), true);
      window.document.addEventListener('mousemove', this.userActivityChangeCallback.bind(this), true);
    });
  }

  handleUserActiveState(event): void {
    this.reset();
  }

  public reset(): void {
    this.lastAction = Date.now();
    if (this.userIdlenessChecker) {
      this.userIdlenessChecker.next('RESET_TIMER');
    }
    // console.log('idle reset at time ' + this.lastAction)
  }

  private initInterval(): void {
    const intervalDuration = 1000;
    this.sessionForIdle = interval(intervalDuration).pipe(
      map((tick: number) => {
        return tick;
      }),
      takeWhile(() => NgIdleService.runTimer)
    );

    this.check();
  }

  check(): boolean {
    let timeout: boolean;
    timeout = false;
    this.sessionForIdle
      .subscribe(() => {
        const now = Date.now();
        const timeleft = this.lastAction + this.USER_IDLE_TIMER_VALUE_IN_MIN * 60 * 1000;
        const diff = timeleft - now;
        const isTimeout = diff < 0;

        var urlstring = window.location.href;
        var content = urlstring.includes("login");
        if (content == true) {        }
        else {
          this.userIdlenessChecker.next(`${diff}`);
        }

        if (isTimeout) {
          $('.bd-example-modal-sm').modal('show');

          timeout = true;
          window.document.removeEventListener('click', this.userActivityChangeCallback, true);
          this.zone.run(() => {
            if (this.userIdlenessChecker) {
              this.userIdlenessChecker.next('STOPPED_TIMER');
            }
            NgIdleService.runTimer = false;
          });
          return timeout;
        }
      });
    return timeout;
  }

  public removeActionFromStore(): void {
    localStorage.removeItem(STORE_KEY);
  }

  private executeFinalTimer = () => {
    NgIdleService.runSecondTimer = true;
    this.initializeFinalTimer();
  }

  private initializeFinalTimer(): void {
    const intervalDuration = 1000;
    this.clockForIdle = interval(intervalDuration).pipe(
      map((tick: number) => {
        return tick;
      }),
      takeWhile(() => NgIdleService.runSecondTimer)
    );

    this.checkUserActionTime();
  }

  private checkUserActionTime(): void {

  }

  ngOnDestroy(): void {
    if (this.userIdlenessChecker) {
      this.userIdlenessChecker.unsubscribe();
      this.userIdlenessChecker = undefined;
    }

    if (this.secondLevelUserIdleChecker) {
      this.secondLevelUserIdleChecker.unsubscribe();
      this.secondLevelUserIdleChecker = undefined;
    }
  }
}
