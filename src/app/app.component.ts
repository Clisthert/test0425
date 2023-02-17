import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild('agGrid') agGrid!: AgGridAngular;

  title = 'project-aggrid';

  //{headerName: 'Make', field: 'make', sortable: true, filter: true, checkboxSelection: true, rowGroup: true },

  columnDefs = [
    { headerName: 'Prod', field: 'name', sortable: true, filter: true },
    {
      headerName: 'Description',
      field: 'description',
      sortable: true,
      filter: true,
    },
    { headerName: 'Price', field: 'price', sortable: true, filter: true },
    { headerName: 'Quantity', field: 'quantity', sortable: true, filter: true },
    { headerName: 'Date', field: 'date', sortable: true, filter: true },
  ];

  autoGroupColumnDef = {
    field: 'Prod',
    suppressMovable: true,
    headerName: 'Prod',
    cellRenderer: 'agGroupCellRenderer',
    // cellRendererParams: {
    //     checkbox: true
    // }
  };

  rowData: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.rowData = this.http.get('http://localhost:5000/prod');

    this.getCandy();
  }

  getCandy() {
    this.http.get('http://localhost:5000/prod').subscribe((data) => {
      console.log('teste>>>>>: ', data);
    });
  }

  // getSelectedRows() {
  //   const selectedNodes = this.agGrid.api.getSelectedNodes();
  //   const selectedData = selectedNodes.map( node => node.data );
  //   const selectedDataStringPresentation = selectedData.map( node => node.make + ' ' + node.model).join(', ');
  //   alert(`Selected nodes: ${selectedDataStringPresentation}`);
  // }

  global: string = '';

  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.global = file;
    console.log('test: ', this.global);
    return file;
  }

  envio(e: any) {
    const send = {
      mensagem: 'texteare',
      file: this.global,
      event: e,
    };
    console.log('envio: ', send);
    return send;
  }
}
