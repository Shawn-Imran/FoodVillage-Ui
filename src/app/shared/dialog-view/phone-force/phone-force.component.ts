import { Component,Inject, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserDataService} from '../../../services/user-data.service';
import {UiService} from '../../../services/ui.service';
import {ReloadService} from '../../../services/reload.service';
import {UtilsService} from '../../../services/utils.service';
import {User} from '../../../interfaces/user';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-phone-force',
  templateUrl: './phone-force.component.html',
  styleUrls: ['./phone-force.component.scss']
})
export class PhoneForceComponent implements OnInit {


  public formData: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userDataService: UserDataService,
    private uiService: UiService,
    private reloadService: ReloadService,
    public utilsService: UtilsService,
    public dialogRef: MatDialogRef<PhoneForceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    ) { }

  ngOnInit(): void {

    this.formData = this.fb.group({
      phoneNo: [null, Validators.required],
    });

    this.setFormData();

  }


  private setFormData() {
    this.formData.patchValue(this.data);
  }

  /**
   * ON SUBMIT FORM
   */

  onSubmit() {
    if (this.formData.invalid) {
      this.uiService.warn('Please complete all the required field');
      return;
    }
    // const mData = {
    //   birthdate: this.utilsService.getDateWithCurrentTime(this.formData.value.birthdate),
    // };
    const finalData = {...this.formData.value};
    this.updateLoggedInUserPhoneNo(finalData);
  }

  updateLoggedInUserPhoneNo(data: User) {
    this.userDataService.updateLoginUserPhoneNo(data)
      .subscribe((res) => {
        this.uiService.success(res.message);
        this.reloadService.needRefreshUser$();
        this.dialogRef.close();
        // this.matDialog.closeAll();
      }, error => {
        console.log(error);
      });
  }
}
