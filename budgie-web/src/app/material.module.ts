import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
    MatButtonModule,
    MatDividerModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule
} from '@angular/material';

const MATERIAL_MODULES = [
    MatButtonModule,
    MatInputModule,
    MatDividerModule,
    MatSelectModule,
    FormsModule,
    MatIconModule
];


@NgModule({
    imports: MATERIAL_MODULES,
    exports: MATERIAL_MODULES
})
export class MaterialModule { }