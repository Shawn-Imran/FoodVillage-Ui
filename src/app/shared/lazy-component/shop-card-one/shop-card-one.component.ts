import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-shop-card-one',
  templateUrl: './shop-card-one.component.html',
  styleUrls: ['./shop-card-one.component.scss']
})
export class ShopCardOneComponent implements OnInit {

  @Input() isLocalShop = false;

  @Input() data: any = null;

  constructor() { }

  ngOnInit(): void {
  }

}
