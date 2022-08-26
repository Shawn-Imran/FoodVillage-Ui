import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';



@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {


  public dataForm: FormGroup;


  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService,

    ) { }

  ngOnInit(): void {
    this.dataForm = this.fb.group({
      first_name: [null, Validators.required],
      last_name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
      confirm_password: [null, Validators.required],
      birthday: [null, Validators.required],
    });

  }


  registerUser(){

    if (this.dataForm.value.password !== this.dataForm.value.confirm_password) {
      console.log('Password and confirm password not matched');
      // this.uiService.warn('Password and confirm password not matched');
      return;
    }

    if (this.dataForm.value.password.length < 6) {
      console.log('Password must be at lest 6 characters!');
      // this.uiService.warn('Password must be at lest 6 characters!');
      return;
    }

    let person: User= {
      first_name: this.dataForm.value.first_name,
      last_name: this.dataForm.value.last_name,
      email: this.dataForm.value.email,
      birthday: this.dataForm.value.birthday,
      password: this.dataForm.value.password,
      confirm_password: this.dataForm.value.confirm_password
    };



    this.userService.userRegistration(person)


    // .subscribe(
    //   res => {

    //     console.log(res);
    //     // localStorage.setItem('token', res.token);
    //     this.router.navigate(['/']);
    // },err => {
    //     console.log(err);
    // })



    // this.userService.userRegistration(this.dataForm.value).subscribe
    //     ((res) => {
    //       console.log(res);
    //       // this.msg= "Successfull";
    //           // this.router.navigate(['/login']);
    //     },(err) => {
    //       console.log(err);
    //       // this.msg= "Please enter valid info";
    // })

  };

  // login(){
  //   this.router.navigate(['/login']);
  // }
}
