import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
    MatButtonModule,
    MatDividerModule,
    MatInputModule,
    MatSelectModule
} from '@angular/material';

const MATERIAL_MODULES = [
    MatButtonModule,
    MatInputModule,
    MatDividerModule,
    MatSelectModule,
    FormsModule
];


@NgModule({
    imports: MATERIAL_MODULES,
    exports: MATERIAL_MODULES
})
export class MaterialModule { }