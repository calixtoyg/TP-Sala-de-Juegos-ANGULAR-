import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-menu-card-principal',
  templateUrl: './menu-card-principal.component.html',
  styleUrls: ['./menu-card-principal.component.css']
})
export class MenuCardPrincipalComponent implements OnInit {
  @Input() title: string;
  @Input() body: string;
  @Input() imagePath: string;
  @Input() routingPath: string;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  goTo() {
    this.router.navigate([this.routingPath]);
  }
}
