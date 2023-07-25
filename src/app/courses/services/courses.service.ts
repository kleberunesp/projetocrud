import { Courses } from './../models/courses';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, first, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private readonly API = 'api/courses';

  constructor (private HttpClient: HttpClient) {}

  listadecursos(){
    return this.HttpClient.get<Courses[]>(this.API).pipe (first(), delay(5000), tap (Courses =>console.log(Courses)));
  }

  loadById(id: string){
  return this.HttpClient.get<Courses>(`${this.API}/${id}`);
  }

  save(course: Partial<Courses>){
    if (course._id){
      return this.update(course);
    }
    return this.create(course);
  }

  private create(course: Partial<Courses>){
    return this.HttpClient.post<Courses>(this.API, course);
  }

  private update(course: Partial<Courses>){
    return this.HttpClient.put<Courses>(`${this.API}/${course._id}`, course);
  }

  delete(id: string){
    return this.HttpClient.delete(`${this.API}/${id}`);
  }

}
