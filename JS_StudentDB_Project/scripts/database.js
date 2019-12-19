class Course {
  constructor(course_name, hour, date, classes) {
    this.course_name = course_name;
    this.hour = hour;
    this.date = date;
    this.classes = classes;
  }

  toString() {
    return `name: ${this.course_name} \n hour: ${this.hour} \n date: ${this.date} \n classes: ${this.classes} \n\n`;
  }
}

class Student {
  constructor(student_id, name, grade, courses) {
    this.student_id = student_id;
    this.name = name;
    this.grade = grade;
    this.courses = courses;
  }

  toString() {
    return `\n\nID: ${this.student_id} \n name: ${this.name} \n grade: ${this.grade} \n courses : ${this.courses} \n`;
  }
}

class Database {
  students_url = "https://maeyler.github.io/JS/data/Students.txt";
  courses_url = "https://maeyler.github.io/JS/data/Courses.txt";

  constructor() {
    this.students = new Map();
    this.courses = new Map();
  }

  PrepareData(dataType) {
    //true for student, null or false for course
    fetch(dataType ? this.students_url : this.courses_url)
      .then(res => {
        res.text().then(text => {
          this.fillMap(text, dataType);
          //let map = dataType ? this.students : this.courses;
          //map.forEach(element => console.log(element));
        });
      })
      .catch(err => console.log(err));
  }

  fillMap(text, mapType) {
    let lines = text.split("\n");
    let map = mapType ? this.students : this.courses;
    let parser = mapType ? DBUtils.parseStudent : DBUtils.parseCourse;
    for (let line of lines) {
      let info = line.split("\t");
      map.set(info[0], parser(info));
    }
  }

  Random() {
    console.log("random num: " + Math.floor(Math.random() * 3000))
    return [...this.students.values()][Math.floor(Math.random() * 3000)]
  }

  getExamSchedule(student_id){
     let student = this.students.get(student_id);
     let course_names = student.courses;
     let courses = [];
     for (const course_name of course_names) {
        courses.push(this.courses.get(course_name));
     }
     return courses;
  }

  getStudentsTaking(course_name){
    let Allstudents = [...this.students.values()];
    let StudentsofCourse = [];
    for (const student of Allstudents) {
      if(student.courses.includes(course_name)){
        StudentsofCourse.push(student);
      }
    }
    return StudentsofCourse;
  }

  getCourse(course_name) {
    return this.courses.get(course_name);
  }

  getCourses(student_id){
    return this.students.get(student_id).courses;
  }

  getBelowGPA(gpa) {
    return [...this.students.values()].filter(student => student.grade < gpa)
  }

  getAboveGPA(gpa) {
    return [...this.students.values()].filter(student => student.grade > gpa)
  }

  getCoursesForRoom(exam_room) {
    let AllCourses = [...this.courses.values()];
    let coursesOfExam = [];
    for (const course of AllCourses) {
        if(course.classes.includes(exam_room)){
          coursesOfExam.push(course);
        }
    }
    return coursesOfExam;
  }

  getCourseCount(exam_room) {
    let AllCourses = [...this.courses.values()];
    let courseCount = 0;
    for (const course of AllCourses) {
        if(course.classes.includes(exam_room)){
          courseCount +=1;
        }
    }
    return courseCount;
  }

}

class DBUtils {
  static parseStudent(info) {
    return new Student(info[0], info[1], info[2], info.slice(3));
  }

  static parseCourse(info) {
    return new Course(info[0], info[1], info[2], info.slice(3));
  }
}

db = new Database();
// Prepare Courses
db.PrepareData();
// Prepare Students
db.PrepareData(true);

function Random(){
 results.innerText = "A Random Student: "+db.Random();
}

function getCourses(){
  results.innerText = `Courses of student ${student_id.value}\n\n ${db.getCourses(student_id.value)}`;
}

function getBelowGPA() {
  results.innerText = `Students below ${student_GPA.value} gpa\n\n ${db.getBelowGPA(student_GPA.value)}`;
}

function getAboveGPA() {
  results.innerText = `Students above ${student_GPA.value} gpa\n\n ${db.getAboveGPA(student_GPA.value)}`;
}

function getExamSchedule() {
  results.innerText = `Exam Schedule for ${exam_schedule.value} \n ${db.getExamSchedule(exam_schedule.value)}`;
}

function getStudentsTaking() {
  results.innerText = `Students Taking ${course_name.value} \n\n ${db.getStudentsTaking(course_name.value)}`;
}

function getCoursesForRoom() {
  results.innerText = `Courses in room ${exam_room.value} \n\n ${db.getCoursesForRoom(exam_room.value)}`;
}

function getCourseCount() {
  results.innerText = `Total Num of Courses for room ${courses_total.value}\n ${db.getCourseCount(courses_total.value)}`;
  }