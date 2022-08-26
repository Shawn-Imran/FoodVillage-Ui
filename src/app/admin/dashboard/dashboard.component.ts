import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private route: ActivatedRoute,private router: Router) { }

  ngOnInit(): void {
  }

  products(){
    this.router.navigate(['/admin/products']);
  }

  orders(){
    this.router.navigate(['/admin/orders']);
  }

  users(){
    this.router.navigate(['/admin/users']);
  }
  admins(){
    
  }
  admin_profile(){
    this.router.navigate(['/admin/admin-profile']);
  }

  image_gallery(){
    this.router.navigate(['/admin/image-gallery']);
  }

  image_folder(){
    this.router.navigate(['/admin/image-folder']);
  }
}
