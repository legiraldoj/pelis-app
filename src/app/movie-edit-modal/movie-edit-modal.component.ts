import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-edit-modal',
  templateUrl: './movie-edit-modal.component.html',
  styleUrls: ['./movie-edit-modal.component.scss']
})
export class MovieEditModalComponent {

  constructor(
    public dialogRef: MatDialogRef<MovieEditModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  onSaveClick(): void {
    this.dialogRef.close(this.data.movieName);
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}