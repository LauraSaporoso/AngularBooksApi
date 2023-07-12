import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
@NgModule({
  imports: [
    MatTabsModule,
    MatInputModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatIconModule,
  ],
  exports: [
    MatTabsModule,
    MatInputModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatIconModule,
  ],
})
export class MaterialModule {}
