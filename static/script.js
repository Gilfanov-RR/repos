document.addEventListener('DOMContentLoaded', () => {
    loadContacts(); // Загружаем контакты при загрузке страницы
});

function loadContacts() {
    fetch('/contacts')
        .then(response => response.json())
        .then(contacts => {
            const contactList = document.getElementById('contactList');
            contactList.innerHTML = '';

            contacts.forEach(contact => {
                const listItem = document.createElement('div');
                listItem.innerHTML = `
                    <strong>${contact.name} ${contact.surname}</strong>
                    <button onclick="showEditContactForm(${contact.id})">Редактировать</button>
                    <button onclick="deleteContact(${contact.id})">Удалить</button>
                `;
                contactList.appendChild(listItem);
            });
        });
}

function showAddContactForm() {
    document.getElementById('addContactForm').style.display = 'block';
}

function hideForms() {
    document.getElementById('addContactForm').style.display = 'none';
}

function addContact(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", document.getElementById('name').value);
    formData.append("surname", document.getElementById('surname').value);
    formData.append("email", document.getElementById('email').value);
    formData.append("home_phone", document.getElementById('home_phone').value);
    formData.append("address", document.getElementById('address').value);
    formData.append("birthdate", document.getElementById('birthdate').value);

    fetch('/contacts', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(() => {
        hideForms();
        loadContacts();
    });
}

function showEditContactForm(id) {
    // С этой функции вам нужно будет загрузить данные контакта и отобразить их для редактирования
}

function updateContact(id) {
    // Добавьте ваш код для обновления контакта
}

function deleteContact(id) {
    fetch(`/contacts/${id}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            loadContacts();
        } else {
            console.error('Не удалось удалить контакт');
        }
    });
}
