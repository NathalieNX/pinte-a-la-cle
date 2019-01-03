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
    this.newUpload = new Upload();
    //TODO delete this
    //console.log("upload.component - upload is : ", this.newUpload);
  }

  onSubmit(): void {
    console.log("UploadComponont - adding upload");
    console.log(this.newUpload);
    this.uploadService.addUpload(this.newUpload).subscribe( () => this.goBack());
  }

  goBack() : void {
    // load previous URL in history
    this.location.back();
  }

}
