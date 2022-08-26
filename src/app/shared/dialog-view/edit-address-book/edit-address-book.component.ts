import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AddressEnum} from '../../../enum/address.enum';
import {UserDataService} from '../../../services/user-data.service';
import {UiService} from '../../../services/ui.service';
import {UtilsService} from '../../../services/utils.service';
import {ReloadService} from '../../../services/reload.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatSelectChange} from '@angular/material/select';
import {ShippingAddress} from '../../../interfaces/shipping-address';

@Component({
  selector: 'app-edit-address-book',
  templateUrl: './edit-address-book.component.html',
  styleUrls: ['./edit-address-book.component.scss']
})
export class EditAddressBookComponent implements OnInit {

  public formData: FormGroup;

  addressTypes = [
    {value: AddressEnum.HOME, viewValue: 'Home'},
    {value: AddressEnum.OFFICE, viewValue: 'Office'},
    {value: AddressEnum.OTHERS, viewValue: 'Other'}
  ];

  locations: any[] = [];

  public cityTemp = null;
  public areaTemp = null;
  public a = null;
  public zoneTemp = null;

  constructor(
    private fb: FormBuilder,
    private userDataService: UserDataService,
    private uiService: UiService,
    private utilsService: UtilsService,
    private reloadService: ReloadService,
    public dialogRef: MatDialogRef<EditAddressBookComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
  }

  ngOnInit(): void {
    this.locations = this.utilsService.locationData;

    this.formData = this.fb.group({
      addressType: [1, Validators.required],
      name: [null, Validators.required],
      phoneNo: [null, Validators.required],
      alternativePhoneNo: null,
      city: [null, Validators.required],
      area: [null, Validators.required],
      zone: [null],
      shippingAddress: [null, Validators.required]
    });

    if (this.data) {
      this.setFormData();
    }
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }

  private setFormData() {
    this.formData.patchValue(this.data);

    // City
    const city = this.data.city;
    this.cityTemp = this.locations.find(o => o.city === city);
    this.formData.patchValue({city: this.cityTemp});

    // Area
    const area = this.data.area;
    this.a = this.cityTemp.area.find(o => o.name === area);
    this.areaTemp = this.cityTemp.area;
    this.formData.patchValue({area: this.a});

    // Zone
    this.zoneTemp = this.a.zone;
    console.log(this.zoneTemp);
  }

  onClickCity() {
    this.formData.patchValue({area: this.areaTemp});
  }

  onSelectCity(event: MatSelectChange) {
    this.cityTemp = event.value.city;
    this.areaTemp = event.value.area;
    this.zoneTemp = null;
    // this.filterDataFields = this.categories.find(x => x._id === event.value._id).filters;
  }

  onSelectArea(event: MatSelectChange) {
    this.zoneTemp = event.value.zone;
    // this.filterDataFields = this.categories.find(x => x._id === event.value._id).filters;
  }

  /**
   * ON SUBMIT FORM
   */

  onSubmitAddress() {
    // const finalData: Address = {
    //   name: this.form.value.name,
    //   phoneNo: this.form.value.phoneNo,
    //   addressType: this.form.value.addressType,
    //   // city: this.registrationForm.value.city,
    //   city: this.form.value.city.city,
    //   // area: this.registrationForm.value.area,
    //   area: this.form.value.area.name,
    //   zone: this.form.value.zone,
    //   shippingAddress: this.form.value.shippingAddress,
    // };
    //
    // if (this.form.invalid) {
    //   return;
    // } else if (this.data) {
    //   this.editAddress(finalData);
    //   console.log(finalData);
    // } else {
    //   this.addAddress(finalData);
    //   console.log(finalData);
    // }

  }

  addAddress(data: ShippingAddress) {
    // this.userDataService.addToAddress(data)
    //   .subscribe((res) => {
    //     this.uiService.success(res.message);
    //     this.reloadService.needRefreshAddress$();
    //     this.dialogRef.close();
    //     // this.matDialog.closeAll();
    //   }, error => {
    //     console.log(error);
    //   });
  }

  editAddress(data: ShippingAddress) {
    // this.userDataService.editAddress(this.data._id, data)
    //   .subscribe((res) => {
    //     this.uiService.success(res.message);
    //     this.reloadService.needRefreshAddress$();
    //     this.dialogRef.close();
    //     // this.matDialog.closeAll();
    //   }, error => {
    //     console.log(error);
    //   });
  }

}
