import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './pages/log-in/log-in.component';
import { MainComponent } from './pages/main/main.component';
import { PageFolderComponent } from './pages/pageFolder/pageFolder.component';

const routes: Routes = [
  {
    component: LogInComponent,
    path: '',
  },
  {
    component: MainComponent,
    path: 'api/folders',
  },
  {
    component: PageFolderComponent,
    path: 'api/folders/:id',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
