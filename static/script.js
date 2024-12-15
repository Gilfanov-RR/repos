let contacts = []; // Массив для хранения всех контактов

// Функция для загрузки и отображения контактов
function loadContacts() {
    fetch('/contacts')
        .then(response => response.json())
        .then(data => {
            contacts = data; // Сохраняем контакты в локальной переменной
            displayContacts(contacts); // Отображаем все контакты
        })
        .catch(error => console.error('Ошибка при загрузке контактов:', error));
}

// Функция для отображения списка контактов
function displayContacts(contactsToDisplay) {
    const contactList = document.getElementById('contactList');
    contactList.innerHTML = ''; // Очистка списка перед добавлением новых элементов

    contactsToDisplay.forEach(contact => {
        const listItem = document.createElement('div');
        listItem.innerHTML = `
            <strong>${contact.name} ${contact.surname}</strong>
            <img src="${contact.profile_image}" alt="${contact.name}" style="width: 50px; height: 50px;">
            <button onclick="showEditContactForm(${contact.id})">Редактировать</button>
            <button onclick="deleteContact(${contact.id})">Удалить</button>
        `;
        contactList.appendChild(listItem);
    });
}

// Функция для отображения формы редактирования контакта
function showEditContactForm(id) {
    window.location.href = `/edit_contact/${id}`; // Переход к форме редактирования
}

// Функция для удаления контакта
function deleteContact(id) {
    if (confirm('Вы уверены, что хотите удалить этот контакт?')) {
        fetch(`/contacts/${id}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert(data.error);
            } else {
                loadContacts(); // Обновляем список контактов после удаления
            }
        })
        .catch(error => console.error('Ошибка при удалении контакта:', error));
    }
}

// Функция для добавления нового контакта
function addContact(event) {
    event.preventDefault();
    const formData = new FormData(document.getElementById('addContactForm'));

    fetch('/contacts', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(() => {
        loadContacts(); // Загружаем контакты после успешного добавления
        document.getElementById('addContactForm').reset(); // Сбрасываем форму
        window.location.href = '/';
    })
    .catch(error => console.error('Ошибка при добавлении контакта:', error));
}

// Функция для обновления контакта
function updateContact(event, id) {
    event.preventDefault();
    const formData = new FormData(document.getElementById('editContactForm'));

    fetch(`/contacts/${id}`, {
        method: 'PUT',
        body: formData
    })
    .then(response => response.json())
    .then(() => {
        loadContacts(); // Обновляем список контактов после успешного обновления
        window.location.href = '/';
    })
    .catch(error => console.error('Ошибка при обновлении контакта:', error));
}

// Функция для фильтрации контактов по имени и фамилии
function filterContacts() {
    const searchText = document.getElementById('searchInput').value.toLowerCase();
    const filteredContacts = contacts.filter(contact => {
        return contact.name.toLowerCase().includes(searchText) ||
               contact.surname.toLowerCase().includes(searchText);
    });
    displayContacts(filteredContacts); // Обновляем отображаемый список контактов
}

// Начальная загрузка контактов при загрузке страницы и добавление обработчика события для поля поиска
window.onload = function() {
    loadContacts();
    document.getElementById('searchInput').addEventListener('input', filterContacts); // Добавляем обработчик события для поиска
};
