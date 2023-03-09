import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { filter, map, Observable, shareReplay } from 'rxjs';
import { OKTA_AUTH, OktaAuthStateService } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private router: Router, private oktaStateService: OktaAuthStateService, @Inject(OKTA_AUTH) private oktaAuth: OktaAuth) { }
  public test: string = "";
  public person: {password: string, email: string} = {
    password: '',
    email: ''
  };
 
  ngOnInit(): void {
    
  }
  submitForm = (form: any) => {
    console.log(form.email)
    
    sessionStorage.setItem("name",form.controls.email.value);
    this.router.navigate(['/']);
  }
  // public isAuthenticated$: Observable<boolean> = this.oktaStateService.authState$
  //     .pipe(
  //         filter(authState => !!authState),
  //         map(authState => authState.isAuthenticated ?? false),
  //         shareReplay()
  //     );
  
  // public name$: Observable<string> = this.oktaStateService.authState$
  //     .pipe(
  //         filter(authState => !!authState && !!authState.isAuthenticated),
  //         map(authState => authState.idToken?.claims.name ?? '')
  //     );
  
  //     public async signIn(): Promise<void> {
  //       await this.oktaAuth.signInWithRedirect();
  //     }
    
  //     public async signOut(): Promise<void> {
  //       await this.oktaAuth.signOut();
  //     }
}
