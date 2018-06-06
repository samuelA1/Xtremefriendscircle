import { Component, OnInit, Input } from '@angular/core';
import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-add-entry',
  templateUrl: './add-entry.component.html',
  styleUrls: ['./add-entry.component.scss']
})
export class AddEntryComponent implements OnInit {

  @Input() onClick

  model = {
    content: '',
    visibility: 100
  }


  constructor() { }

  ngOnInit() {
  }

  sharePublicly() {
    this.model.visibility = 100;

    this.onClick(this.model);
  }

  shareForFriends() {
    this.model.visibility = 200;

    this.onClick(this.model);
  }
}
