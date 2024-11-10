import unittest
import json
import os
from app import app

class PhonebookTestCase(unittest.TestCase):  # Класс для тестирования функций телефонной книги

    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True
        self.phonebook_file = 'phonebook.json'
        with open(self.phonebook_file, 'w') as f:
            json.dump([], f)  # Записываем пустой массив в файл

    def tearDown(self):
        try:
            os.remove(self.phonebook_file)  # Удаляем файл, если он существует
        except OSError:
            pass  # Игнорируем ошибку, если файл не существует

    def test_add_contact(self):
        new_contact = {
            "name": "John",
            "surname": "Doe",
            "phone_numbers": ["123456789"],
            "profile_image": "",
            "email": "john.doe@example.com",
            "home_phone": "",
            "address": "",
            "birthdate": ""
        }
        response = self.app.post('/contacts', json=new_contact)
        self.assertEqual(response.status_code, 201)
        self.assertIn('id', response.get_json())

    def test_get_contacts(self):  # Тест для проверки получения всех контактов
        self.app.post('/contacts', json={"name": "Jane", "surname": "Doe"})
        response = self.app.get('/contacts')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.get_json()), 1)  # Добавлен пропущенный закрывающий скобка

    def test_get_contact(self):  # Тест для проверки получения конкретного контакта по ID
        contact_data = {"name": "Alice", "surname": "Smith"}
        response = self.app.post('/contacts', json=contact_data)
        contact_id = response.get_json().get('id')  # Получаем ID добавленного контакта
        response = self.app.get(f'/contacts/{contact_id}')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.get_json()["name"], "Alice")

    def test_update_contact(self):  # Тест для проверки обновления существующего контакта
        contact_data = {"name": "Alice", "surname": "Smith"}
        response = self.app.post('/contacts', json=contact_data)
        contact_id = response.get_json().get('id')  # Получаем ID добавленного контакта
        update_data = {"name": "Alice Updated", "surname": "Smith Updated"}
        response = self.app.put(f'/contacts/{contact_id}', json=update_data)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.get_json()["name"], "Alice Updated")

    def test_delete_contact(self):  # Тест для проверки удаления контакта
        contact_data = {"name": "Bob", "surname": "Brown"}
        response = self.app.post('/contacts', json=contact_data)
        contact_id = response.get_json().get('id')  # Получаем ID добавленного контакта
        response = self.app.delete(f'/contacts/{contact_id}')
        self.assertEqual(response.status_code, 204)  # Проверяем, что статус ответа - 204 (Нет содержимого)

if __name__ == '__main__':
    unittest.main()
