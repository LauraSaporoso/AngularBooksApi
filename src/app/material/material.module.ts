import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  imports: [
    MatTabsModule,
    MatInputModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatIconModule,
    MatExpansionModule,
    MatCardModule,
  ],
  exports: [
    MatTabsModule,
    MatInputModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatIconModule,
    MatExpansionModule,
    MatCardModule,
  ],
})
export class MaterialModule {}
