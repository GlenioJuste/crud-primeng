import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api/menuitem';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  items: MenuItem[];

  constructor() { }

  ngOnInit(): void {

    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-fw pi-home',
      },
      {
        label: 'Cadastros',
        icon: 'pi pi-fw pi-save',
        items: [{
          label: 'New',
          icon: 'pi pi-fw pi-plus',
          items: [
            { label: 'Project' },
            { label: 'Other' },
          ]
        },
        { label: 'Open' },
        { label: 'Quit' }
        ]
      },
      {
        label: 'Processos',
        icon: 'pi pi-fw pi-sitemap',
        items: [
          { label: 'Proc Rel', icon: 'pi pi-fw pi-table' },
          { label: 'Refresh', icon: 'pi pi-fw pi-refresh' }
        ]
      },
      {
        label: 'Relatórios',
        icon: 'pi pi-fw pi-print',
        items: [
          { label: 'Delete', icon: 'pi pi-fw pi-trash' },
          { label: 'Refresh', icon: 'pi pi-fw pi-refresh' }
        ]
      }
    ];

  }

}
