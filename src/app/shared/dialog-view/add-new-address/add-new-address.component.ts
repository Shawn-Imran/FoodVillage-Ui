import {Component, Inject, OnInit} from '@angular/core';
import {AddressEnum} from '../../../enum/address.enum';
import {UserDataService} from '../../../services/user-data.service';
import {UiService} from '../../../services/ui.service';
import {ReloadService} from '../../../services/reload.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {UtilsService} from '../../../services/utils.service';
import {Address} from '../../../interfaces/address';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-new-address',
  templateUrl: './add-new-address.component.html',
  styleUrls: ['./add-new-address.component.scss']
})
export class AddNewAddressComponent implements OnInit {

  public dataForm: FormGroup;

  addressTypes = [
    {value: AddressEnum.HOME, viewValue: 'Home'},
    {value: AddressEnum.OFFICE, viewValue: 'Office'},
    {value: AddressEnum.OTHERS, viewValue: 'Other'}
  ];

  cities = ['Barisal', 'Bhairab', 'Bogra', 'Brahmanbaria', 'Chandpur', 'Chittagong', 'Chowmuhani', 'Chuadanga', 'Comilla', 'Cox\'s Bazar', 'Dhaka', 'Dinajpur', 'Faridpur', 'Feni', 'Gazipur', 'Jamalpur', 'Jessore', 'Jhenaidah', 'Kaliakair', 'Khulna', 'Kishoreganj', 'Kushtia', 'Maijdee', 'Manikganj', 'Mymensingh', 'Naogaon', 'Narayanganj', 'Narsingdi', 'Nawabganj', 'Pabna', 'Rajshahi', 'Rangpur', 'Saidpur', 'Satkhira', 'Savar', 'Siddhirganj', 'Sirajganj', 'Sreepur', 'Sylhet', 'Tangail', 'Tongi'];


  constructor(
    private fb: FormBuilder,
    private userDataService: UserDataService,
    private uiService: UiService,
    private utilsService: UtilsService,
    private reloadService: ReloadService,
    public dialogRef: MatDialogRef<AddNewAddressComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
  }

  ngOnInit(): void {

    this.dataForm = this.fb.group({
      addressType: [1, Validators.required],
      name: [null, Validators.required],
      phoneNo: [null, Validators.required],
      email: [null, Validators.email],
      postCode: [null],
      alternativePhoneNo: [null],
      city: [null, Validators.required],
      area: [null],
      zone: [null],
      shippingAddress: [null, Validators.required]
    });

    if (this.data) {
      this.setdataFormData();
    }

  }


  private setdataFormData() {
    this.dataForm.patchValue(this.data);
  }



  /**
   * ON SUBMIT dataForm
   */

  onSubmitAddress() {

    if (this.dataForm.invalid) {
      this.uiService.warn('Please complete all the required field');
      return;
    }

    if (!this.utilsService.checkValidPhone(this.dataForm.value.phoneNo) || this.dataForm.value.phoneNo.length !== 11) {
      this.dataForm.get('phoneNo').setErrors({invalid: true});
      this.uiService.warn('Please enter a valid 11 digit phone no');
      return;
    }

    const finalData = {...this.dataForm.value};

    if (this.data) {
      this.editAddress();
    } else {
      this.addAddress(finalData);
    }

  }

  addAddress(data: Address) {
    this.userDataService.addToAddress(data)
      .subscribe((res) => {
        this.uiService.success(res.message);
        this.reloadService.needRefreshAddress$();
        this.dialogRef.close();
        // this.matDialog.closeAll();
      }, error => {
        console.log(error);
      });
  }

  editAddress() {
    const finalData = {...this.dataForm.value, ...{_id: this.data._id}};
    this.userDataService.editAddress(finalData)
      .subscribe((res) => {
        this.uiService.success(res.message);
        this.reloadService.needRefreshAddress$();
        this.dialogRef.close();
        // this.matDialog.closeAll();
      }, error => {
        console.log(error);
      });
  }


}
