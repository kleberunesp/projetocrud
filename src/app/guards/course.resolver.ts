import { Injectable } from '@angular/core';
import { Router,Resolve,RouterStateSnapshot,ActivatedRouteSnapshot } from '@angular/router';
import { Observable,of} from 'rxjs';
import { CoursesService } from '../courses/services/courses.service';
import { Courses } from '../courses/models/courses';

@Injectable ({providedIn: 'root'})
export class courseResolver implements Resolve<Courses>{

  constructor(private service: CoursesService){}
  resolve (route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<Courses>{
  if (route.params && route.params['id'])
  {
    return this.service.loadById(route.params['id']);
  }
  return of ({_id:'', name:'', category:''});
}};
