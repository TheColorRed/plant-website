import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { QueryBuilderModule } from '@hasura-query-builder/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { LogPipe } from './pipes/log.pipe';
import { HasuraInterceptorService } from './services/interceptors/hasura-interceptor.service';
import { FAModule } from './ui/font-awesome/font-awesome.module';
import { UiModule } from './ui/ui.module';

@NgModule({
  declarations: [AppComponent, LoginComponent, WelcomeComponent, RegisterComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HasuraInterceptorService,
      multi: true,
    },
  ],
  imports: [
    BrowserModule,
    UiModule,
    ComponentsModule,
    AppRoutingModule,
    LogPipe,
    HttpClientModule,
    FormsModule,
    FAModule,
    ReactiveFormsModule,
    QueryBuilderModule.forRoot({
      connections: {
        default: new URL('v1/graphql', 'https://polite-macaque-72.hasura.app'),
        public: {
          url: new URL('v1/graphql', 'https://polite-macaque-72.hasura.app'),
          headers: { public: 'true' },
          settings: { cache: false },
        },
      },
      settings: {
        engine: 'mysql',
      },
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
