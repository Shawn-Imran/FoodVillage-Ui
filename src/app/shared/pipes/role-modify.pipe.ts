import {Pipe, PipeTransform} from '@angular/core';
import {RoleModifyEnum} from '../../enum/role-modify.enum';

@Pipe({
  name: 'roleModify'
})
export class RoleModifyPipe implements PipeTransform {

  transform(status: number, type?: string): unknown {

    switch (status) {
      case RoleModifyEnum.Read : {
        return 'Read';
      }
      case RoleModifyEnum.Write : {
        return 'Write';
      }
      case RoleModifyEnum.Delete : {
        return 'Delete';
      }
      default: {
        return '-';
      }
    }

  }

}
