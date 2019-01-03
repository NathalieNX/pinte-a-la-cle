import { Component, OnInit } from '@angular/core';
import { Upload } from '../upload/upload';
import { UploadService } from '../../upload.service';

@Component({
  selector: 'app-view-uploads',
  templateUrl: './view-uploads.component.html',
  styleUrls: ['./view-uploads.component.css']
})
export class ViewUploadsComponent implements OnInit {
  uploads : Upload[];

  constructor(private uploadService : UploadService) { }

  ngOnInit() {
    this.getUploads();
  }

  getUploads(): void {
    /* wait until Observable getItems() is successful
    *  then execute function passed in callback : given items, assign items to this.items  */
    this.uploadService.getUploads().subscribe(uploads => this.uploads = uploads);
  }
    
  modifyUpload(upload: Upload): void {
    this.uploads = this.uploads.filter(h => h !== upload);
    // If you neglect to subscribe(), the service will not send the modify request to the server! As a rule, an Observable does nothing until something subscribes!
    // When updateUpload saves successfully, subscribe callback receives new item and pushes it into to items list for display
    this.uploadService.updateUpload(upload).subscribe(upload => 
      {this.uploads.push(upload);}
    );
  }

  deleteUpload(upload: Upload): void {
    this.uploads = this.uploads.filter(h => h !== upload);
    // If you neglect to subscribe(), the service will not send the delete request to the server! As a rule, an Observable does nothing until something subscribes!
    this.uploadService.deleteUpload(upload).subscribe();
  }
}

