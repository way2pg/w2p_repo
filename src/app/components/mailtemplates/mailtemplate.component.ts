import {Component, OnInit, Input, OnDestroy, AfterViewInit} from '@angular/core';
import {CommonService} from "../../services/common/common.service";
import {Router, ActivatedRoute, Params} from '@angular/router';
import {MailTemplateService} from "../../services/mail/mail_template.service";
import {MailTemplate} from "../../models/mail_templates/mail_templates";


declare var $:any;
var _ = require('lodash');
declare var PNotify:any;

@Component({
  selector: 'app-mailtemplate',
  templateUrl: './mailtemplate.component.html',
  styleUrls: ['./mailtemplate.component.css']
})
export class MailTemplateComponent implements OnInit,OnDestroy,AfterViewInit {

  @Input() mail_template:MailTemplate = new MailTemplate({});

  mail_templates:MailTemplate[] = [];

  constructor(private $common:CommonService,
              private $mail_template:MailTemplateService,
              private route:ActivatedRoute,
              private router:Router) {

  }

  ngOnInit() {
    $('.mail-templates').hide()


  }

  save() {
   /* this.mail_template.template = $('.summernote').summernote("code");
    if (!_.isNull(this.mail_template._id)) {
      this.$mail_template.patch(this.mail_template._id, this.mail_template).then(response => {
        if (!_.isEmpty(response)) {
          this.success("Successfully updated data.")
          $('.summernote').summernote('destroy');
        }
      }).catch(error => {

      })
    }*/
  }



  public ngOnDestroy() {

  }

  ngAfterViewInit() {
    this.$mail_template.find({}).then(mail_templates => {
      if (!_.isEmpty(mail_templates)) {
        this.mail_templates = mail_templates;
        setTimeout(()=>{
          this.activate();
          $('.mail-templates').show()
          $("#spinner").hide();
        }, 50);
      }
    })
  }

  success(message) {
    new PNotify({
      title: 'Success!!',
      text: message,
      addclass: 'alert bg-success alert-styled-left',
    });
  }

  warning(message) {
    new PNotify({
      title: 'Warning!!',
      text: message,
      addclass: 'alert bg-danger alert-styled-left'
    });
  }

  checkAdmin() {
    let isAdmin = false;
    if (!_.isNull(this.$common.user()) && !_.isUndefined(this.$common.user())) {
      isAdmin = (_.isEqual(this.$common.user().role, "admin") || _.isEqual(this.$common.user().role, "superadmin"));
    }
    return isAdmin;
  }

  editTemplate(id){
    this.router.navigate(['/mail_templates/edit', id]);
  }

  private activate() {
    $('.mail-templates').hide()
    $("#spinner").show();
    $.extend($.fn.dataTable.defaults, {
      autoWidth: false,
      columnDefs: [{
        width: '20%',
        targets: 0
      }],
      dom: '<"datatable-header"fBl><"datatable-scroll-wrap"t><"datatable-footer"ip>',
      language: {
        search: '<span>Filter:</span> _INPUT_',
        lengthMenu: '<span>Show:</span> _MENU_',
        paginate: {'first': 'First', 'last': 'Last', 'next': '&rarr;', 'previous': '&larr;'}
      }
    });

    $('.datatable-basic').DataTable({
      buttons: [
        {
          extend: 'colvis',
          text: '<i class="icon-three-bars"></i> <span class="caret"></span>',
          className: 'btn bg-blue btn-icon',
          collectionLayout: 'fixed two-column',
          postfixButtons: [ 'colvisRestore' ]
        }
      ]
    });

    $('.dataTables_filter input[type=search]').attr('placeholder', 'Type to filter...');

    $('.dataTables_length select').select2({
      minimumResultsForSearch: Infinity,
      width: 'auto'
    });

  }
}
