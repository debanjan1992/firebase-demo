import { Component, OnDestroy } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Subscription, Observable } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnDestroy {
  coursesRef$: AngularFireList<{}>;
  course$;
  courses$;
  authors$;
  // courses: any[];
  // subscription: Subscription;
  constructor(private db: AngularFireDatabase) {
    this.authors$ = db.list('/authors').valueChanges();
    this.coursesRef$ = db.list('/courses');
    this.courses$ = this.coursesRef$.valueChanges();
    this.course$ = db.object('/courses/1').valueChanges();
    // this.subscription = db.list('/courses').valueChanges()
    // .subscribe(courses => {
    //   this.courses = courses;
    //   console.log(this.courses);
    // });
  }

  add(course: HTMLInputElement) {
    this.coursesRef$.push({
      name: course.value,
      price: 180,
      isLive: true,
      sections: [
        { title: 'Components'},
        { title: 'Directives'},
        { title: 'Services'}
      ]
    });
    course.value = '';
  }

  update(course, index) {
    this.db.object('/courses/' + (index + 1)).set(course + ' UPDATED');
  }

  delete(course, index) {
    this.db.object('/courses/' + (index + 1)).remove();
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }
}
