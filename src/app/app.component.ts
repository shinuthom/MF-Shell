import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { filter, fromEvent, map, Observable, shareReplay } from 'rxjs';
import { OKTA_AUTH, OktaAuthStateService } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public name: any = '';
  cart = 0;
  constructor(private router: Router, private oktaStateService: OktaAuthStateService, @Inject(OKTA_AUTH) private oktaAuth: OktaAuth) { }
  ngOnInit() {
    this.name = sessionStorage.getItem("name");
    fromEvent(window, 'event').subscribe((event:any) => {
      console.log(event);
      this.cart = event.detail;
      //this.userServiceService.setMsg(event.detail)
    });
  }
  logout() {
    sessionStorage.removeItem("name");
    this.router.navigate(['/']);
  }
  public isAuthenticated$: Observable<boolean> = this.oktaStateService.authState$
      .pipe(
          filter(authState => !!authState),
          map(authState => authState.isAuthenticated ?? false),
          shareReplay()
      );
  
  public name$: Observable<string> = this.oktaStateService.authState$
      .pipe(
          filter(authState => !!authState && !!authState.isAuthenticated),
          map(authState => authState.idToken?.claims.name ?? '')
      );
  
      public async signIn(): Promise<void> {
        await this.oktaAuth.signInWithRedirect();
      }
    
      public async signOut(): Promise<void> {
        await this.oktaAuth.signOut();
      }
}
