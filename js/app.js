// global variables
let employees = [];
const urlAPI = `https://randomuser.me/api/?results=12&inc=name,picture,email,location,phone,dob&noinfo&nat=US`
const gridContainer = document.querySelector(".grid-container");
const overlay = document.querySelector(".overlay");
const modalContainer = document.querySelector(".modal-content");
const modalClose = document.querySelector(".modal-close");
const switchForth = document.querySelector(".switch-forth");
const switchBack = document.querySelector(".switch-back");

// fetch data from API
fetch(urlAPI)
    .then(res => res.json())
 //   .then((res) => console.log(res))
    .then(res => res.results)
    .then(res => displayEmployees(res))
    .catch(err => console.log(err))


// Display employee function:
function displayEmployees(employeeData) {
    employees = employeeData;
    // store the employee HTML as we create it
    let employeeHTML = '';
    // loop through each employee and create HTML markup
    employees.forEach((employee, index) => {
    let name = employee.name;
    let email = employee.email;
    let city = employee.location.city;
    let picture = employee.picture;
    // template literals make this so much cleaner!
    employeeHTML += `
    <div class="card" data-index="${index}">
    <img class="avatar" src="${picture.large}" />
    <div class="text-container">
    <h2 class="name">${name.first} ${name.last}</h2>
    <p class="email">${email}</p>
    <p class="address">${city}</p>
    </div>
    </div>
    `
});

gridContainer.innerHTML = employeeHTML;
}

// Display modal window function:
function displayModal(index) {
    // use object destructuring make our template literal cleaner
    let { name, dob, phone, email, location: { city, street, state, postcode
    }, picture } = employees[index];
    let date = new Date(dob.date);
    const modalHTML = `
    <img class="avatar" src="${picture.large}" />
    <div class="text-container">
    <h2 class="name">${name.first} ${name.last}</h2>
    <p class="email">${email}</p>
    <p class="address">${city}</p>
    <hr />
    <p>${phone}</p>
    <p class="address">${street}, ${state} ${postcode}</p>
    <p>Birthday:
    ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
    </div>
    `;
    overlay.classList.remove("hidden");
    modalContainer.innerHTML = modalHTML;
}

// Event listenet for gridContainer:
gridContainer.addEventListener('click', e => {
    // make sure the click is not on the gridContainer itself
    if (e.target !== gridContainer) {
    // select the card element based on its proximity to actual element clicked
    const card = e.target.closest(".card");
    const index = card.getAttribute('data-index');
    displayModal(index);
    }
});

modalClose.addEventListener('click', () => {
    overlay.classList.add("hidden");
});


//--------------------------------------- EXTRA -----------------------------------------//

//  1. SearchFilter Function:
function searchFilter(e) {
    let searchName = e.target.value.toLowerCase();
    let employeeNames = document.querySelectorAll(".name");

    employeeNames.forEach(employeeName => {
         let name = employeeName.textContent.toLowerCase();
         let nameOfEmployee = employeeName.parentElement.parentElement;

      if(name.includes(searchName)){
        nameOfEmployee.style.display = "";
      } else {
        nameOfEmployee.style.display = "none";
      }
    });
}

search.addEventListener('input', searchFilter);

// 2. Function to switch back and forth between employees in modal view:

let indexOfModal = 0;

switchForth.addEventListener('click', () => {
    if (indexOfModal !== employees.length-1) {
     indexOfModal++;
     displayModal(indexOfModal);
    } else {
     indexOfModal = 0;
    displayModal(indexOfModal);
    }
});

switchBack.addEventListener('click', () => {
    
  if (indexOfModal !== 0) {
    indexOfModal--;
    displayModal(indexOfModal); 
  } else {
    indexOfModal = 11;
    displayModal(indexOfModal);
  }
});