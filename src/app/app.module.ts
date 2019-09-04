import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared/guard/auth.guard';
import { LanguageTranslationModule } from './shared/modules/language-translation/language-translation.module';
import { HttpClientModule } from '@angular/common/http';
import { FilterComboPipe } from './shared/pipes/filter-combo.pipe';

@NgModule({
  declarations: [
    AppComponent,
    FilterComboPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LanguageTranslationModule,
    AppRoutingModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
