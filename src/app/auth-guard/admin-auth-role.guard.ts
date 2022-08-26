import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {AdminService} from '../services/admin.service';
import {AdminRoleEnum} from '../enum/admin-role.enum';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthRoleGuard implements CanActivate {
  constructor(
    private adminService: AdminService,
    private router: Router,
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const role = this.adminService.getAdminRole();

    if (role && role === AdminRoleEnum.ADMIN) {
      this.router.navigate([environment.adminBaseUrl, 'dashboard']);
    }
    return true;
  }
}
