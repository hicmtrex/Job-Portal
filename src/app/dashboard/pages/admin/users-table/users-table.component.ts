import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from 'src/app/dashboard/services/users.service';
import { UserInfoTypes } from 'src/app/utils/interfaces/user.interface';
import { enviroment } from 'src/environments/environment';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css'],
})
export class UsersTableComponent implements OnInit {
  users: UserInfoTypes[] = [];
  apiUrl: string = enviroment.apiUrl;
  constructor(private userService: UsersService, public toast: ToastrService) {}

  getUsersList() {
    this.userService.getAllUsers().subscribe({
      next: (data: any) => {
        this.users = data;
      },
    });
  }

  deleteUser(id: string) {
    if (window.confirm('Are you sure?')) {
      this.userService.deleteUser(id).subscribe({
        complete: () => {
          this.toast.success('User has been deleted!');
          this.getUsersList();
        },
      });
    }
  }

  ngOnInit(): void {
    this.getUsersList();
  }
}
