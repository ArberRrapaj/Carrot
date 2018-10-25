import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.sass']
})
export class NavigationComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToProfile(): void {
    const url = '/users/' + localStorage.getItem('currentUser');
    this.router.navigateByUrl(url);
    // this.router.navigate([url]);
  }

}
