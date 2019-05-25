import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';

import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  // matrial data source.
  @Input() dataSource = new MatTableDataSource(null);
  // columns configuration.
  @Input() columns: string[];
  // column action.
  @Input() actionColumn: string[];
  // from which sourec it has been called.
  @Input() source: string;
  // mat paginator for providing the pagination.
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // mat sort  for providing the sorting.
  @ViewChild(MatSort) matSort: MatSort;

  constructor() {}

  ngOnInit() {}
}
