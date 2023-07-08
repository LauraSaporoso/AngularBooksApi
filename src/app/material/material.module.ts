import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@NgModule({
  imports: [
    MatTabsModule,
    MatInputModule,
    MatButtonModule,
    MatAutocompleteModule,
  ],
  exports: [
    MatTabsModule,
    MatInputModule,
    MatButtonModule,
    MatAutocompleteModule,
  ],
})
export class MaterialModule {}
