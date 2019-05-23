import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import { ColumnConfig } from 'material-dynamic-table';
import { MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  @Input() dataSource;
  simpletale = new MatTableDataSource(null);
  @Input() columns: ColumnConfig[];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor() {}

  ngOnInit() {}
}
