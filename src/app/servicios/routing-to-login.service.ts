import {Injectable} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoutingToLoginService {

  constructor(private route: ActivatedRoute,
              private router: Router) {
  }

  navigateToLogin() {
    this.router.navigate(['login'], {queryParams: {'expiredAuth': true}});
  }

}
