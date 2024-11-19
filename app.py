from flask import Flask, request, jsonify, render_template
import json
import os

app = Flask(__name__)

# Путь к файлу phonebook.json
PHONEBOOK_FILE = 'phonebook.json'

# Загрузка контактов из файла
def load_contacts():
    if os.path.exists(PHONEBOOK_FILE):
        with open(PHONEBOOK_FILE, 'r', encoding='utf-8') as f:
            return json.load(f)
    return []

# Сохранение контактов в файл
def save_contacts(contacts):
    with open(PHONEBOOK_FILE, 'w', encoding='utf-8') as f:
        json.dump(contacts, f, ensure_ascii=False, indent=4)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/contacts', methods=['GET'])
def get_contacts():
    contacts = load_contacts()
    return jsonify(contacts)

@app.route('/contacts', methods=['POST'])
def add_contact():
    data = request.form.to_dict()
    contacts = load_contacts()

    # Создаем новый контакт
    new_contact = {
        'id': len(contacts) + 1,
        'name': data['name'],
        'surname': data['surname'],
        'email': data['email'],
        'home_phone': data['home_phone'],
        'address': data['address'],
        'birthdate': data['birthdate'],
        'profile_image': data.get('profile_image', '')
    }

    contacts.append(new_contact)
    save_contacts(contacts)
    return jsonify(new_contact)

@app.route('/contacts/<int:contact_id>', methods=['PUT'])
def update_contact(contact_id):
    contacts = load_contacts()
    for contact in contacts:
        if contact['id'] == contact_id:
            contact.update(request.form.to_dict())
            save_contacts(contacts)
            return jsonify(contact)
    return jsonify({'error': 'Contact not found'}), 404

@app.route('/contacts/<int:contact_id>', methods=['DELETE'])
def delete_contact(contact_id):
    contacts = load_contacts()
    for i, contact in enumerate(contacts):
        if contact['id'] == contact_id:
            contacts.pop(i)
            save_contacts(contacts)
            return jsonify({'result': 'Contact deleted'})
    return jsonify({'error': 'Contact not found'}), 404

if __name__ == '__main__':
    app.run(debug=True)
