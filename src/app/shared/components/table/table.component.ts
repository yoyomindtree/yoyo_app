import { Component, OnInit, Input } from '@angular/core';
import { ColumnConfig } from 'material-dynamic-table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  @Input() dataSource;

  columns: ColumnConfig[] = [
    {
      name: 'userName',
      displayName: 'userName',
      type: 'string',
    },
    {
      name: 'refId',
      displayName: 'refId',
      type: 'string',
    },
    {
      name: 'role',
      displayName: 'role',
      type: 'string',
    },
  ];
  constructor() {}

  ngOnInit() {}
}
