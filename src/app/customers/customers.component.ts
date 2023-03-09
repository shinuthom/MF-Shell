import { Component } from '@angular/core';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent {
  sendData() {
    const event1 = new CustomEvent('event1', { detail: 'Hello am from Shell'});
    dispatchEvent(event1);
  }
}
