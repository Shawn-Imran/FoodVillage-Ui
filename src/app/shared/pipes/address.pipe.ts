import { Pipe, PipeTransform } from '@angular/core';
import {AddressEnum} from '../../enum/address.enum';

@Pipe({
  name: 'address'
})
export class AddressPipe implements PipeTransform {

  transform(status: number, type?: string): unknown {

    switch (status) {
      case AddressEnum.HOME : {
        return 'Home';
      }
      case AddressEnum.OFFICE : {
        return 'Office';
      }
      case AddressEnum.OTHERS : {
        return 'Others';
      }
      default: {
        return '-';
      }
    }

  }

}
