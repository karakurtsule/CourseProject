class Course{
    constructor(title,instructor,image,courseID){
        this.title = title;
        this.instructor = instructor;
        this.image = image;
        this.courseID = Math.floor(Math.random()*10000);
    }
}

class UI {
    addList(course){

        const list = document.querySelector('#course-list');
        var html = `
                        <tr>
                            <td><img src="img/${course.image}" style="height:100px; width:180px"></td>
                            <td>${course.title}</td>
                            <td>${course.instructor}</td>
                            <td><a href="#" data-id = "${course.courseID}" class="btn btn-danger btn-sm delete">Delete</a></td>
                        </tr>
                   `;
        list.innerHTML += html;
    }

    deleteCourse(element){
        if(element.classList.contains('delete')){
            element.parentElement.parentElement.remove();
        }
    }

    clearControl(){
        const title = document.querySelector('#title').value = '';
        const instructor = document.querySelector('#instructor').value = '';
        const image = document.querySelector('#image').value = '';
    }
    
    showAlert(message,className){
    
        var alert = `<div class="alert alert-${className}">${message}</div>`;
        var row = document.querySelector('.row');
        row.insertAdjacentHTML('beforeBegin',alert);
    
        setTimeout(() =>{
            document.querySelector('.alert').remove();
        },3000)
    }

}

class Storage{

    static getCourses(){

        let courses;
        if(localStorage.getItem('courses') === null){
            courses = [];
        }
        else{
            courses = JSON.parse(localStorage.getItem('courses'));
        }
        return courses;
    }

    static displayCourses(){

        const courses = Storage.getCourses();
        courses.forEach(course => {
            const ui = new UI();
            ui.addList(course);
        });

    }

    static addCourseLS(course){
        const courses = Storage.getCourses();
        courses.push(course);
        localStorage.setItem('courses',JSON.stringify(courses));
    }

    static deleteCourseLS(element){

        if(element.classList.contains('delete')){
            const id = element.getAttribute('data-id');
            const courses = Storage.getCourses();
            courses.forEach((course,index) =>{
                if(course.courseID == id){
                    courses.splice(index,1);
                }
            })

            localStorage.setItem('courses',JSON.stringify(courses));
        }

    }
}

document.addEventListener('DOMContentLoaded',Storage.displayCourses);



document.querySelector('#new-course').addEventListener('submit',function(e){

    const title = document.querySelector('#title').value;
    const instructor = document.querySelector('#instructor').value;
    const image = document.querySelector('#image').value;

    //create course object

    const course = new Course(title,instructor,image);

    //create ui object

    const ui = new UI();

    if(title ==='' || instructor ==='' || image === ''){
        ui.showAlert('lütfen formu eksiksiz doldurunuz','warning');
    }

    else{
    //ad list

    ui.addList(course);

    //save to LS

    Storage.addCourseLS(course);

    // clear all

    ui.clearControl();
    ui.showAlert('kursunuz eklendi','success');

    }
  

    e.preventDefault();
})


document.querySelector('#course-list').addEventListener('click',function(e){

    const ui = new UI();
    ui.deleteCourse(e.target);
    
    //delete from LS

    Storage.deleteCourseLS(e.target);

    ui.showAlert('sectiginiz kurs silindi','danger');
    e.preventDefault();
   
})