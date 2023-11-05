import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth-service.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: User | null = null;
  isLoading = true;
  error: any = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe(
      user => {
        this.user = user;
        this.isLoading = false;
      },
      error => {
        console.error('Error fetching user', error);
        this.isLoading = false;
        this.error = error;
      }
    );
  }
}

