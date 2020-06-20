import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {TableModule} from 'primeng/table';
import {PanelModule} from 'primeng/panel';

import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {ToastModule} from 'primeng/toast';
import {CardModule} from 'primeng/card';

import {MenubarModule} from 'primeng/menubar';

import {ConfirmDialogModule} from 'primeng/confirmdialog';

import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';

import {TooltipModule} from 'primeng/tooltip';

import {KeyFilterModule} from 'primeng/keyfilter';
import { MenuComponent } from './menu/menu.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,

    TableModule,
    PanelModule,
    CardModule,

    InputTextModule,
    ButtonModule,
    ToastModule,

    MenubarModule,

    ConfirmDialogModule,

    MessagesModule,
    MessageModule,
    TooltipModule,
    KeyFilterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
