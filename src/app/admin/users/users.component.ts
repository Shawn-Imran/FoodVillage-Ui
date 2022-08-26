import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {


  users: User[] = [];
  productsPerPage = 2;
  totalUsers: number;
  currentPage = 1;
  searchUsers= [];
  
  constructor(private route: ActivatedRoute,private router: Router, private userService: UserService) { }

  ngOnInit(): void {
  }


  getAllUsers(){

    const pagination: any = {
      pageSize: this.productsPerPage.toString(),
      currentPage: this.currentPage.toString()
    };

    this.userService.getAllUsers(pagination)
    .subscribe(res=>{
      this.users = res.data;
      this.totalUsers = res.count;
      console.log(this.users);
    });
  }


  add_user(){
    this.router.navigate(['/admin/users/add-user']);
  }
  edit_user(){
    this.router.navigate(['/admin/users/edit-user-info']);
  }
  view_user(){
    this.router.navigate(['/admin/users/view-user']);
  }
}
