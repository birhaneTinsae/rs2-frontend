import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  loading = false;
  isCollapsed = false;
  isLoading: boolean = false;
  inputValue?: string;


  constructor(
    private authService: AuthService,
    private router: Router
  ) {

  
  }


  ngOnInit(): void {
  }

  logout() {
    this.authService.logout();
    this.router.navigate(["/auth"]);
  }
}
