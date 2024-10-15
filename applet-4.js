class StudentList {
    constructor(dataUrl) {
        this.dataUrl = dataUrl;
        this.students = [];
        this.init();
    }

    async init() {
        await this.fetchData();
        this.renderStudentList(this.students); 
        this.bindSearchEvent();
    }

    async fetchData() {
        try {
            const response = await fetch(this.dataUrl);
            this.students = await response.json();
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    renderStudentList(students) {
        const studentListContainer = document.getElementById('studentList');
        studentListContainer.innerHTML = students.map(student => 
            `<button class="btn btn-primary" style="margin-top:15px; width:25rem" 
                    onclick="alertStudentInfo('${student.student_name}', '${student.student_program}')" 
                    ${this.isSearchEmpty() ? 'disabled' : ''}>
                ${student.student_name} | ${student.student_program}
            </button><br>`
        ).join('');
    }

    bindSearchEvent() {
        const studentSearchBar = document.getElementById('studentSearchBar');
        const studentSearchListContainer = document.getElementById('studentSearchList');

        studentSearchBar.addEventListener('input', () => {
            this.filterStudents(studentSearchBar.value, studentSearchListContainer);
        });

        this.renderStudentList(this.students);
    }

    filterStudents(query, searchListContainer) {
        const filteredStudents = this.students.filter(student => {
            const fullName = `${student.student_name} ${student.student_program}`;
            return fullName.toLowerCase().includes(query.toLowerCase());
        });

        searchListContainer.innerHTML = '';
        this.renderStudentList(filteredStudents);
    }

    isSearchEmpty() {
        const studentSearchBar = document.getElementById('studentSearchBar');
        return studentSearchBar.value.trim() === '';
    }
}


function alertStudentInfo(name, program) {
    alert(`Student Name: ${name}\nProgram: ${program}`);
}


const studentList = new StudentList('applet-4.json');