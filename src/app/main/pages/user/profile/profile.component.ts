import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/main/services/user.service';
import { enviroment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  id: string = '';
  user: any;
  showUpload: boolean = false;
  apiUrl: string = enviroment.apiUrl;
  uploadedImage: any;
  constructor(
    private userSerive: UserService,
    private route: ActivatedRoute,
    public toast: ToastrService
  ) {
    this.id = this.route.snapshot.params['id'];
  }
}
