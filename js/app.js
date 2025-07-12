let currentPage = 1;
let employeesPerPage = 10;

function renderEmployees(list) {
  const container = document.getElementById("employee-list");
  if (!container) return;

  const totalPages = Math.ceil(list.length / employeesPerPage);
  currentPage = Math.min(currentPage, totalPages);
  const start = (currentPage - 1) * employeesPerPage;
  const end = start + employeesPerPage;
  const pageEmployees = list.slice(start, end);

  container.innerHTML = "";

  pageEmployees.forEach(emp => {
    const card = document.createElement("div");
    card.className = "employee-card";
    card.innerHTML = `
      <strong>${emp.firstName} ${emp.lastName}</strong><br><br>
      <b>Email:</b> ${emp.email}<br>
      <b>Department:</b> ${emp.department}<br>
      <b>Role:</b> ${emp.role}<br><br>
      <button onclick="editEmployee(${emp.id})">Edit</button>
      <button onclick="deleteEmployee(${emp.id})">Delete</button>
    `;
    container.appendChild(card);
  });

  const pageInfo = document.getElementById("page-info");
  if (pageInfo) {
    pageInfo.textContent = `Page ${currentPage} of ${totalPages || 1}`;
  }
}

function submitForm(event) {
  event.preventDefault();
  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const email = document.getElementById("email").value.trim();
  const department = document.getElementById("department").value;
  const role = document.getElementById("role").value;

  const newEmp = {
    id: Date.now(),
    firstName,
    lastName,
    email,
    department,
    role
  };

  employees.push(newEmp);
  localStorage.setItem("employees", JSON.stringify(employees));
  window.location.href = "index.html";
}

function handleSearch() {
  const query = document.getElementById("search").value.toLowerCase();
  const filtered = employees.filter(e =>
    e.firstName.toLowerCase().includes(query) ||
    e.lastName.toLowerCase().includes(query) ||
    e.email.toLowerCase().includes(query)
  );
  renderEmployees(filtered);
}

function sortEmployees() {
  const sortBy = document.getElementById("sortBy").value;
  if (!sortBy) return renderEmployees(employees);
  const sorted = [...employees].sort((a, b) => a[sortBy].localeCompare(b[sortBy]));
  renderEmployees(sorted);
}

function deleteEmployee(id) {
  const index = employees.findIndex(e => e.id === id);
  if (index !== -1) {
    employees.splice(index, 1);
    localStorage.setItem("employees", JSON.stringify(employees));
    renderEmployees(employees);
  }
}

function changePageSize() {
  employeesPerPage = parseInt(document.getElementById("pageSize").value);
  currentPage = 1;
  renderEmployees(employees);
}

function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    renderEmployees(employees);
  }
}

function nextPage() {
  const totalPages = Math.ceil(employees.length / employeesPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    renderEmployees(employees);
  }
}

window.onload = () => renderEmployees(employees);
