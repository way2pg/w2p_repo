import {Directive, Input} from '@angular/core';
declare var $:any;

@Directive({selector: '[datatable]'})
export class DataTableWithoutCSSDirective {

  @Input('datatable')
  set activate(isactivate:boolean) {
    if (isactivate) this.activateDataTable();
  }

  private activateDataTable() {
//this.activateDataTable();
    // Table setup
    // ------------------------------

    // Setting datatable defaults
    $.extend($.fn.dataTable.defaults, {
      autoWidth: false,
      dom: '<"datatable-scroll"t><"datatable-footer"ip>',
      language: {
        search: '<span>Filter:</span> _INPUT_',
        lengthMenu: '<span>Show:</span> _MENU_',
        paginate: {'first': 'First', 'last': 'Last', 'next': '&rarr;', 'previous': '&larr;'}
      }
    });

    var oTable = $('.datatable-basic').DataTable({
      "ordering": false,
      "pageLength": 8
    });
    // Enable Select2 select for the length option
    $('.dataTables_length select').select2({
      minimumResultsForSearch: Infinity,
      width: 'auto'
    });
  }
}
