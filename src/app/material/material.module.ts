import { NgModule } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
@NgModule({
  declarations: [],
  imports: [MatAutocompleteModule, MatFormFieldModule],
  exports: [MatAutocompleteModule, MatFormFieldModule],
})
export class MaterialModule {}
