import {Component, Input, OnInit} from '@angular/core';
import {UserDataService} from '../../../services/user-data.service';
import {UiService} from '../../../services/ui.service';

@Component({
  selector: 'app-product-cart-view-one',
  templateUrl: './product-cart-view-one.component.html',
  styleUrls: ['./product-cart-view-one.component.scss']
})
export class ProductCartViewOneComponent implements OnInit {
  @Input() data: any = null;

  constructor(
    private userDataService: UserDataService,
    private uiService: UiService
  ) { }

  ngOnInit(): void {
    // console.log(this.data);

  }

  deleteById(id: string) {
    this.userDataService.removeCartItem(id)
      .subscribe( res => {
        this.uiService.warn(res.message);
      }, error => {
        console.log(error);
      });
  }

}
