import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DialogService } from '@ngneat/dialog';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/main/services/user.service';
import { enviroment } from 'src/environments/environment';
import { UpdateProfileComponent } from '../update-profile/update-profile.component';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.css'],
})
export class ProfileInfoComponent implements OnInit {
  id: string = '';
  showUpload: boolean = false;
  uploadedImage: any;
  apiUrl: string = enviroment.apiUrl;
  user!: any;

  constructor(
    private dialog: DialogService,
    private userSerive: UserService,
    private toast: ToastrService,
    private route: ActivatedRoute
  ) {
    this.id = this.route.snapshot.params['id'];
  }

  getUserBydId() {
    this.userSerive.getUserBydId(this.id).subscribe({
      next: (data: any) => {
        this.user = data;
      },
    });
  }
  openUpdateModal() {
    const dialogRef = this.dialog.open(UpdateProfileComponent, {
      data: this.user,
    });

    dialogRef.afterClosed$.subscribe((res) => res && this.getUserBydId());
  }

  toggleShowUpload() {
    this.showUpload = !this.showUpload;
  }

  setImage(event: Event) {
    event.preventDefault();
    const value = (event.target as HTMLInputElement).files;
    if (value) this.uploadedImage = value[0];
  }

  updateUserImage() {
    if (!this.uploadedImage) return;
    const formData = new FormData();
    formData.append('image', this.uploadedImage);

    this.userSerive.uploadUserImage(this.id, formData).subscribe({
      complete: () => {
        this.toast.success('Avatar has been updated!');
        this.toggleShowUpload();
        this.getUserBydId();
      },
    });
  }

  ngOnInit(): void {
    this.getUserBydId();
  }
}
