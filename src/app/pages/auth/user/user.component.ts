import { NzMessageService } from 'ng-zorro-antd/message';
import { UserService } from './../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  userForm!: FormGroup;
  pageIndex = 1;
  pageSize = 20;
  loading = true;
  users!: User[];
  totalUsers = 0;
  registerDrawerVisible = false;
  isUserEditVisible = false;
  userId!: number;
  total!: number;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private messageService: NzMessageService,
    private notificationService: NzNotificationService
  ) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      username: [null, Validators.required],
      password: [null, Validators.required],
      email: [null, [Validators.required,
      Validators.pattern(
        '^(?=.*?[a-z])(?=.*?@[a-z]{5,})(?=.*?\\.[a-z]{2,3}).{4,}$'
      )]],
      fullName: [null, Validators.required],
      enabled: [true],
      credentialsNonExpired: [true],
      cellPhoneUser: [false],
      active: [null],
      accountNonExpired: [null],
      accountNonLocked: [null],
      firstLogin: [true],
      roles: this.fb.array([]),
    });

  }

  get user() {
    return this.userForm.value
  }


  getUsers(pageIndex: number,
    pageSize: number,
    sortField: string | undefined,
    sortOrder: string | undefined,
    filter: Array<{ key: string; value: string[] }>) {

    this.userService.getUsers(pageIndex, pageSize, sortField, sortOrder, filter)
      .subscribe(shareholders => {
        this.loading = false;
        this.total = shareholders.page.totalPages
        this.users = shareholders._embedded.userResponseDtoes
      });

  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    console.log(params.filter);
    const { pageSize, pageIndex, sort, filter } = params;
    const currentSort = sort.find(item => item.value !== null);
    const sortField = (currentSort && currentSort.key) || undefined;
    const sortOrder = (currentSort && currentSort.value) || undefined;
    this.getUsers(pageIndex, pageSize, sortField, sortOrder, filter);
  }

  createUser() {
    this.userService.createUser(this.user)
      .subscribe(data => {

      })
  }

  deleteUser(userId: string) {
    this.userService.deleteUser(userId)
      .subscribe(data => {

      })
  }
}