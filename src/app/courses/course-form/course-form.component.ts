import { Courses } from './../models/courses';
import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators} from '@angular/forms';
import { CoursesService } from '../services/courses.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {

  form = this.formBuilder.group({
    _id: [''],
    name: ['',[Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
    category: ['', [Validators.required]]
  });
  constructor(private formBuilder: NonNullableFormBuilder,
    private service: CoursesService,
    private snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute) {
}

  ngOnInit(): void {
    const course: Courses = this.route.snapshot.data['course'];
    this.form.setValue({
      _id: course._id,
      name: course.name,
      category: course.category
    });
  }

  onSubmit(){
    this.service.save(this.form.value).subscribe(result=>this.onSuccess(), error => this.onError());
  }
  onCancel(){
    this.location.back();
  }

  private onSuccess(){
    this.snackBar.open('Curso Salvo com Sucesso!','',{duration:5000});
    this.onCancel();
  }

  private onError(){
    this.snackBar.open('Erro ao Salvar Curso!','',{duration:5000});
  }

  getErrorMessage(fieldname:string){
    const field = this.form.get(fieldname);
    if (field?.hasError('required')){
      return 'Campo Obrigatório';
    }
    if (field?.hasError('minlength')){
      const requiredLength = field.errors ? field.errors['minlength']['requiredLength']:5;
      return `Tamanho Mínimo Precisa Ser de ${requiredLength} Caracteres`;
    }
    if (field?.hasError('maxlength')){
      const requiredLength = field.errors ? field.errors['maxlength']['requiredLength']:200;
      return `Tamanho Máximo Excedido de ${requiredLength} Caracteres`;
    }
    return 'Campo Inválido';
  }
}
