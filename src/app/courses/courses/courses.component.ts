import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { CoursesRoutingModule } from './../courses-routing.module';
import { CoursesService } from './../services/courses.service';
import { Courses } from './../models/courses';
import { Component, OnInit } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
courses$: Observable <Courses[]> | null = null;

//CoursesService: CoursesService;
constructor (private CoursesService: CoursesService, public dialog: MatDialog, private router: Router, private route: ActivatedRoute, private snackBar: MatSnackBar, ) {
  this.refresh();
}

refresh(){
  this.courses$ = this.CoursesService.listadecursos().pipe(
    catchError (error =>
      {
        this.onError('Erro ao Carregar Cursos!');
        return of ([])
      })
  );
}

onError(errorMsg:string) {
  this.dialog.open(ErrorDialogComponent, {
    data: errorMsg
  });
}

ngOnInit(): void {
}

onAdd() {
  this.router.navigate(['new'], {relativeTo:this.route});
}

onEdit(courses: Courses){
  this.router.navigate(['edit',courses._id], {relativeTo:this.route});
}

onDelete(courses: Courses){
  const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
    data: 'Tem Certeza que Deseja Remover Esse Curso?',
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result){
      this.CoursesService.delete(courses._id).subscribe(
        ()=>{
          this.refresh();
          this.snackBar.open('Curso Deletado com Sucesso!','X',{duration:5000, verticalPosition:'top',horizontalPosition:'center'});
        },
      error=> this.onError('Erro ao Tentar Remover Curso!')
      )
    }
  });
}
}

