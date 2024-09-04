const studentForm= document.getElementById('input-form');
const studentTable= document.getElementById('studentTable').getElementsByTagName('tbody')[0];

//load students from local storage
loadStudents();
studentForm.addEventListener('submit', function(event){
    event.preventDefault();

    const studentName= document.getElementById('studentName').value.trim();
    const studentId= document.getElementById('studentId').value.trim();
    const emailId= document.getElementById('emailId').value.trim();
    const contactNo= document.getElementById('contactNo').value.trim();

    if(studentName==="" || studentId==="" || emailId==="" || contactNo===""){
        alert('All fields are required.');
        return;
    }

    if(!/^[a-zA-Z\s]+$/.test(studentName)){
        alert('Student name must contain only letters and spaces');
        return;
    }

    const studentRecord= {
        studentName, studentId, emailId, contactNo
    };

    addStudent(studentRecord);
    saveStudents();
    clearForm();
    
});

function addStudent(student){
    const row = studentTable.insertRow();

    row.insertCell(0).innerHTML= student.studentName;
    row.insertCell(1).innerHTML= student.studentId;
    row.insertCell(2).innerHTML= student.emailId;
    row.insertCell(3).innerHTML= student.contactNo;

    const actionCell=  row.insertCell(4);
    const editButton= document.createElement('button');
    editButton.innerHTML ='Edit';
    editButton.className ='edit';
    actionCell.appendChild(editButton);

    const deleteButton= document.createElement('button');
    deleteButton.innerHTML= 'Delete';
    deleteButton.className= 'delete';
    actionCell.appendChild(deleteButton);

    editButton.addEventListener('click', ()=>{
        document.getElementById('studentName').value= student.studentName;
        document.getElementById('studentId').value= student.studentId;
        document.getElementById('emailId').value= student.emailId;
        document.getElementById('contactNo').value= student.contactNo;

        row.remove();
        saveStudents();

    });

    deleteButton.addEventListener('click', ()=>{
        row.remove();
        saveStudents();
    });
}

function saveStudents(){
    const students= [];
    for(let i=0;i<studentTable.rows.length; i++){
        const row= studentTable.rows[i];
        students.push({
            studentName: row.cells[0].innerHTML,
            studentId: row.cells[1].innerHTML,
            emailId: row.cells[2].innerHTML,
            contactNo: row.cells[3].innerHTML
        });
    }
    localStorage.setItem('students', JSON.stringify(students));

}

function loadStudents(){
    const students= JSON.parse(localStorage.getItem('students')) || [];
    students.forEach(addStudent);

}

function clearForm(){
    studentForm.reset();
}




