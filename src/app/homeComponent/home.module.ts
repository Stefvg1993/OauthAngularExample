import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './../shared/material.module';
import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

@NgModule({
    imports: [MaterialModule, ReactiveFormsModule, CommonModule],
    exports: [],
    declarations: [HomeComponent],
    providers: [],
})
export class HomeModule { }
