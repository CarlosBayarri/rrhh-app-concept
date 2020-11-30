import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FeedFormComponent } from '../feed-form/feed-form.component';

@Component({
  selector: 'app-feed-main',
  templateUrl: './feed-main.component.html',
  styleUrls: ['./feed-main.component.scss']
})
export class FeedMainComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  createNewPublication() {
    let dialogRef = this.dialog.open(FeedFormComponent, {
      height: '400px',
      width: '600px',
    });
  }
  ngOnInit(): void {
  }

}
