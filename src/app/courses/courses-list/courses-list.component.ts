import { ActivatedRoute, Router } from '@angular/router';
import { Courses } from './../models/courses';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit {

  @Input() courses: Courses[] =[];
  @Output () add = new EventEmitter(false);
  @Output () edit = new EventEmitter(false);
  @Output () delete = new EventEmitter(false);
  readonly displayedColumns = ['_id','name','category','actions'];
  constructor(){}

  ngOnInit(): void {}

  onAdd() {
    this.add.emit(true);
  }

  onEdit(courses: Courses){
    this.edit.emit(courses);
  }

  onDelete(courses: Courses){
    this.delete.emit(courses);
  }

}


