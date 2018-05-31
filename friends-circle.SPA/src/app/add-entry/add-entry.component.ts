import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-add-entry',
  templateUrl: './add-entry.component.html',
  styleUrls: ['./add-entry.component.scss']
})
export class AddEntryComponent implements OnInit {
  @Input() onClick

  model = {
    content: ''
  }

  constructor() { }

  ngOnInit() {
  }

}
