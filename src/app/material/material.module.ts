import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';

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
    MatDividerModule,
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
    MatDividerModule,
  ],
})
export class MaterialModule {}
