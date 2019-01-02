import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Upload } from '../upload/upload';
import { UploadService } from '../../upload.service';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent implements OnInit {

  newUpload : Upload;

  constructor(
    protected route : ActivatedRoute,
    protected uploadService : UploadService,
    protected location : Location
  ) { }

  ngOnInit() { 
    this.newUpload = new Upload;
  }

  onSubmit(): void {
    console.log("UploadComponont - adding upload");
    this.uploadService.addUpload(this.newUpload).subscribe( () => this.goBack());
    console.log(this.newUpload);
  }

  goBack() : void {
    // load previous URL in history
    this.location.back();
  }

}
