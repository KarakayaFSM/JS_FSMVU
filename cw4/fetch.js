let courses = [];

class Course {
  constructor(derskod, tarih, saat, sınıflar) {
    this.derskod = derskod;
    this.tarih = tarih;
    this.saat = saat;
    this.sınıflar = sınıflar;
  }

  toString() {
    return `derskod: ${this.derskod}\n tarih: ${this.tarih}\n saat: ${this.saat}\n sınıflar: ${this.sınıflar}`;
  }
}

prepareCourses();

function prepareCourses() {
  fetch("https://maeyler.github.io/JS/data/Courses.txt")
    .then(data =>
      data.text().then(text => {
        let lines = text.split("\n");
        for (let line of lines) {
          let props = line.split("	");
          let course = new Course(props[0], props[1], props[2], props.slice(3));
          courses.push(course);
        }
        //printCourses(courses)
      })
    )
    .catch(err => console.log(err));
}

function query(course_name) {
  filterResult = courses.filter(course => course.derskod == course_name);
  if (filterResult[0]) {
    data.innerText = "\n"+filterResult[0];
  } else {
    data.innerText = "\nBöyle bir kurs bulunamadı";
  }
  //console.log(courses.filter(course => course.derskod == course_name))
}

function printCourses(courses) {
  for (let course of courses) {
    console.log(course.derskod);
  }
}

document.onreadystatechange = () => {
  if (document.readyState === 'complete') {
    sample.innerText = prepareCourses.toString();
  }
};