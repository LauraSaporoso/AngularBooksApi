import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [MatTabsModule, MatInputModule, MatButtonModule],
  exports: [MatTabsModule, MatInputModule, MatButtonModule],
})
export class MaterialModule {}
