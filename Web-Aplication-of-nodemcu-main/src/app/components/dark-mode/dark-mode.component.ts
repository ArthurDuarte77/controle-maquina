import { Component } from '@angular/core';

import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-dark-mode',
  templateUrl: './dark-mode.component.html',
  styleUrls: ['./dark-mode.component.scss']
})
export class DarkModeComponent {

  toggleControl = new FormControl(false)

  test(){
    console.log(this.toggleControl)
  }
}
