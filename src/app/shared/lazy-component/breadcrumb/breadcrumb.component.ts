import {Component, Input, OnInit} from '@angular/core';
import {Breadcrumb} from '../../../interfaces/breadcrumb';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {

  @Input() data: Breadcrumb[] = [];

  constructor() { }

  ngOnInit(): void {
  }


}
