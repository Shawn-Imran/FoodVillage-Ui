import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public dataForm: FormGroup;

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService
    ) { }
  ngOnInit(): void {
    this.dataForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
    });
  }



  loginUser(){
    let person = {
      email: this.dataForm.value.email,
      password: this.dataForm.value.password,
    };

    this.userService.userLogin(person)

  }
}
