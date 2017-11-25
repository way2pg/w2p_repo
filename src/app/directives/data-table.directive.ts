import {Directive, Input} from '@angular/core';
declare var $:any;

@Directive({selector: '[data-table]'})
export class DataTableDirective {

  @Input('data-table')
  set activate(isactivate:boolean) {
    if (isactivate) this.activateDataTable();
  }

  private activateDataTable() {

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
