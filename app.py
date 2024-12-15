from flask import Flask, request, jsonify, render_template
from werkzeug.utils import secure_filename
import os
import json

app = Flask(__name__)

# Конфигурация для загрузки изображений
UPLOAD_FOLDER = 'static/uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Путь к файлу phonebook.json
PHONEBOOK_FILE = 'phonebook.json'

# Создание папки для изображений, если она отсутствует
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

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

@app.route('/add_contact', methods=['GET'])
def add_contact_page():
    return render_template('add_contact.html')

@app.route('/contacts', methods=['GET'])
def get_contacts():
    contacts = load_contacts()
    return jsonify(contacts)

@app.route('/contacts', methods=['POST'])
def add_contact():
    data = request.form.to_dict()
    contacts = load_contacts()

    # Обработка загрузки файла изображения
    file = request.files.get('profile_image')
    image_path = ''
    if file:
        filename = secure_filename(file.filename)
        image_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(image_path)

    new_contact = {
        'id': len(contacts) + 1,
        'name': data['name'],
        'surname': data['surname'],
        'email': data['email'],
        'home_phone': data['home_phone'],
        'address': data['address'],
        'birthdate': data['birthdate'],
        'profile_image': image_path
    }

    contacts.append(new_contact)
    save_contacts(contacts)
    return jsonify(new_contact)

@app.route('/contacts/<int:contact_id>', methods=['GET'])
def get_contact(contact_id):
    contacts = load_contacts()
    for contact in contacts:
        if contact['id'] == contact_id:
            return jsonify(contact)
    return jsonify({'error': 'Contact not found'}), 404

@app.route('/contacts/<int:contact_id>', methods=['PUT'])
def update_contact(contact_id):
    contacts = load_contacts()
    for contact in contacts:
        if contact['id'] == contact_id:
            contact.update(request.form.to_dict())
            # Обработка изображения при обновлении
            file = request.files.get('profile_image')
            if file:
                filename = secure_filename(file.filename)
                image_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
                file.save(image_path)
                contact['profile_image'] = image_path
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

@app.route('/edit_contact/<int:contact_id>', methods=['GET'])
def edit_contact(contact_id):
    contacts = load_contacts()
    for contact in contacts:
        if contact['id'] == contact_id:
            return render_template('edit_contact.html', contact=contact)
    return 'Contact not found', 404

if __name__ == '__main__':
    app.run(debug=True)
