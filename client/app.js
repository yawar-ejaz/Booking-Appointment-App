const form = document.getElementById("form");
const table = document.getElementById("table");
const tableBody = document.getElementById("tableBody");
const submitBtn = document.getElementById("submit-btn");
const updateBtn = document.getElementById("update-btn");

let isEditMode = false;

form.addEventListener("submit", addItem);

async function addItem(e) {
    e.preventDefault();
    if (isEditMode == false) {
        const name = e.target.name.value;
        const phone = e.target.phone.value;
        const date = e.target.date.value;
        e.target.name.value = "";
        e.target.phone.value = "";
        e.target.date.value = "";

        let appointment = {
            name: name,
            phone: phone,
            date: date
        };

        try {
            await axios.post("http://localhost:3000/api/appointments", appointment);
            // console.log(appointment);
            // alert("Data Added!");
            printData()
        } catch (error) {
            console.log(error);
        }
    }
}

async function printData() {
    try {
        const result = await axios.get("http://localhost:3000/api/appointments");
        const appointments = result.data;

        if (appointments.length == 0) {
            table.classList.add("d-none");
        }
        else {
            table.classList.remove("d-none");
        }

        let data = "";
        if (appointments) {
            appointments.forEach((appointment, index) => {
                data = data + `<tr> <th scope="row">${index + 1}</th>
                <td>${appointment.name}</td>
                <td>${appointment.phone}</td>
                <td>${appointment.date}</td>
                <td><button class="btn btn-sm btn-primary" onclick="editItem('${appointment._id}')">Edit</button></td>
                <td><button class="btn btn-sm btn-danger" onclick="deleteItem('${appointment._id}')">Delete</button></td>
                </tr>`;
            });
        }
        tableBody.innerHTML = data;
    } catch (error) {
        console.log(error)
    }
}

async function deleteItem(id) {
    try {
        await axios.delete(`http://localhost:3000/api/appointments/${id}`)
        printData();
    } catch (error) {
        console.log(error)
    }
}

async function editItem(id) {
    try {
        const result = await axios.get(`http://localhost:3000/api/appointments/${id}`)
        const appointment = result.data;
        form.name.value = appointment.name
        form.phone.value = appointment.phone
        form.date.value = appointment.date
        document.getElementById("submit-btn").classList.add("d-none")
        document.getElementById("update-btn").classList.remove("d-none")
        isEditMode = true
        updateBtn.onclick = () => {
            updateItem(appointment._id)
        }
    } catch (error) {
        console.log(error)
    }
}

async function updateItem(id) {
    try {
        // Get the updated values from the form fields
        const updatedName = form.name.value;
        const updatedPhone = form.phone.value;
        const updatedDate = form.date.value;

        // Create an updated appointment object
        const updatedAppointment = {
            name: updatedName,
            phone: updatedPhone,
            date: updatedDate
        };

        // Send a PUT request to update the appointment
        await axios.put(`http://localhost:3000/api/appointments/${id}`,updatedAppointment);

        // Clear the form fields and update the UI
        form.name.value = "";
        form.phone.value = "";
        form.date.value = "";
        document.getElementById("update-btn").classList.add("d-none");
        document.getElementById("submit-btn").classList.remove("d-none");
        isEditMode = false;
        printData(); // Refresh the table

    } catch (error) {
        console.log(error);
    }
}

document.addEventListener("DOMContentLoaded", printData);