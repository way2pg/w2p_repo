import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment.prod";
var _ = require('lodash');


@Injectable()
export class UploadService {

  file_types=environment.image_upload_file_types;
  getToken() {
    return localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
  }

 /* public uploadImage(cssClass:string, $:any) {
    return $("." + cssClass).fileinput({
      uploadUrl: environment.upload_url + this.getToken(), // server upload action
      uploadAsync: true,
      allowedFileExtensions: environment.image_upload_file_types,
      allowedPreviewTypes: ["image"],
      minFileCount: 1,
      maxFileCount: 5,
      initialPreview: [

      ],
      initialPreviewAsData: true,
      uploadExtraData: function (previewId, index) {
        return {key: index};
      },
      fileActionSettings: {
        removeIcon: '<i class="icon-bin"></i>',
        removeClass: 'btn btn-link btn-xs btn-icon',
        uploadIcon: '<i class="icon-upload"></i>',
        uploadClass: 'btn btn-link btn-xs btn-icon',
        indicatorNew: '<i class="icon-point-down"></i>',
        indicatorSuccess: '<i class="icon-checkmark3 file-icon-large text-success"></i>',
        indicatorError: '<i class="icon-cross2 text-danger"></i>',
        indicatorLoading: '<i class="icon-spinner2 spinner text-muted"></i>',
        zoomIcon: '<i class="icon-touch-zoom"></i>',
        zoomClass: 'btn btn-link btn-xs btn-icon',
        dragIcon: '<i class="icon-drag-left-right"></i>',
        dragClass: 'btn btn-link btn-xs btn-icon',
      },
      layoutTemplates: {
        icon: '<i class="icon-file-check"></i>',
        modal: modalTemplate
      },
      deleteUrl: "http://localhost:4200/api/image/delete/",
      initialCaption: "No file selected",
      previewZoomButtonClasses: previewZoomButtonClasses,
      previewZoomButtonIcons: previewZoomButtonIcons,

    })
  }
*/
  public uploadImage(cssClass:string, browserLabel:string, $:any) {

    let $input = $("." + cssClass).fileinput({
      uploadUrl: environment.upload_url, // server upload action
      uploadAsync: true,
      allowedFileExtensions: ['jpg', 'gif', 'png', 'jpeg'],
      allowedPreviewTypes: ["image"],
      minFileCount: 1,
      maxFileCount: 5,
      showCaption: false,
      showPreview: false,
      showRemove: false,
      showUpload: false,
      showCancel: false,
      showUploadedThumbs: true,
      dropZoneEnabled: false,
      layoutTemplates: {progress: ''},
      browseClass: 'btn btn-default',
      browseIcon: '<i class="icon-file-picture position-left"></i> ',
      browseLabel: browserLabel
    })
    return $input;
  }

  public validate(self,$event,file){
    if (!_.isEqual(file.length, 0)) {
      if (!(Number(5242880) > file[0].size)) {
        self.notify.warning('Maximum upload file size is allowed 5 MB');
      } else if (_.isEqual(_.indexOf(this.file_types, file[0].type), -1)) {
        self.notify.warning("Allowed File Extensions ['jpg', 'gif', 'png', 'jpeg'], Please upload valid file");
      } else {
        self.loading="ui basic loading button";
        $event.fileinput("upload");
      }
    } else {
      self.notify.warning("Allowed File Extensions ['jpg', 'gif', 'png', 'jpeg'], Please upload valid file");
    }
  }
}


