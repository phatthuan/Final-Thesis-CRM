import { Component, Input, OnInit } from '@angular/core';
import { generateNavItems } from './sidebar-data';
import { NavItem } from './nav-item/nav-item';
import { NavService } from '../../admin/services/nav.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarMenuComponent implements OnInit {
  navItems!: NavItem[];
  @Input() pageType: string = '';

  constructor(public navService: NavService) { }

  ngOnInit(): void {
    this.navItems = generateNavItems(this.pageType);
  }
}