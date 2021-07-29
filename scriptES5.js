function Course(title,instructor,image){
    this.title = title;
    this.instructor = instructor;
    this.image = image;
}

function UI(){

}

UI.prototype.addList = function(course){

    const list = document.querySelector('#course-list');
    var html = `
                    <tr>
                        <td><img src="img/${course.image}" style="height:100px; width:180px"></td>
                        <td>${course.title}</td>
                        <td>${course.instructor}</td>
                        <td><a href="#" class="btn btn-danger btn-sm delete">Delete</a></td>
                    </tr>
               `;
    list.innerHTML += html;
}

UI.prototype.deleteCourse = function(element){
    if(element.classList.contains('delete')){
        element.parentElement.parentElement.remove();
    }
}

UI.prototype.clearControl = function(){
    const title = document.querySelector('#title').value = '';
    const instructor = document.querySelector('#instructor').value = '';
    const image = document.querySelector('#image').value = '';
}

UI.prototype.showAlert = function(message,className){
    
    var alert = `<div class="alert alert-${className}">${message}</div>`;
    var row = document.querySelector('.row');
    row.insertAdjacentHTML('beforeBegin',alert);

    setTimeout(function(){
        document.querySelector('.alert').remove();
    },3000)
}

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

    // clear all

    ui.clearControl();
    ui.showAlert('kursunuz eklendi','success');

    }
  

    e.preventDefault();
})


document.querySelector('#course-list').addEventListener('click',function(e){

    const ui = new UI();
    ui.deleteCourse(e.target);
    ui.showAlert('sectiginiz kurs silindi','danger');
    e.preventDefault();
   
})