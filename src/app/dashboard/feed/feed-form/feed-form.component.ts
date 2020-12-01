import { Component, OnInit } from '@angular/core';
import { Publication } from '../../../models/publication.model';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-feed-form',
  templateUrl: './feed-form.component.html',
  styleUrls: ['./feed-form.component.scss']
})
export class FeedFormComponent implements OnInit {

  public info: FormControl = new FormControl(null, Validators.required);
  public type: FormControl = new FormControl('post', Validators.required);

  constructor() { }

  ngOnInit(): void {
  }

}
