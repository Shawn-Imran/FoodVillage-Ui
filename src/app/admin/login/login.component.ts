import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  username = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);


  constructor(
    private router: Router,
    private fb: FormBuilder,

    private adminService: AdminService,
    ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: this.username,
      password: this.password
    });
  }



  onLogin() {
    if (this.loginForm.invalid) {
      console.log('Invalid Input field!');
      return;
    }
    // Spinner..
    // this.spinner.show();
    // Form Data..
    const username = this.loginForm.value.username.trim().toLowerCase();
    const password = this.loginForm.value.password;

    const data = {username, password};


    this.adminService.adminLogin(data);
  }


  // login_admin(){
  //   let person = {
  //     username: this.dataForm.value.username,
  //     password: this.dataForm.value.password,
  //   };

  //   this.userService.userLogin(person).subscribe((res) => {
  //     console.log(res);

  //     this.router.navigate(['/admin/dashboard']);
  //   },(err) => {
  //     console.log(err);
  //   })

  //   // this.router.navigate(['/']);
  // }

}
