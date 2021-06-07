import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MycollectionComponent } from './mycollection/mycollection.component';
import { FeaturesCollectionRoutingModule } from './features-collection.routing.module';

@NgModule({
  imports: [CommonModule, FeaturesCollectionRoutingModule],
  declarations: [MycollectionComponent],
})
export class FeaturesCollectionModule {}
