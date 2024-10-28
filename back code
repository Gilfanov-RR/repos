from flask import Flask, jsonify, request
import json
import os

app = Flask(__name__)

PHONEBOOK_FILE = "phonebook.json"


def load_contacts():
    if os.path.exists(PHONEBOOK_FILE):
        with open(PHONEBOOK_FILE, "r") as file:
            return json.load(file)
    return []


def save_contacts(contacts):
    with open(PHONEBOOK_FILE, "w") as file:
        json.dump(contacts, file, indent=4)


@app.route('/contacts', methods=['GET'])
def get_contacts():
    contacts = load_contacts()
    return jsonify(contacts)


@app.route('/contacts/<int:id>', methods=['GET'])
def get_contact(id):
    contacts = load_contacts()
    contact = next((c for c in contacts if c["id"] == id), None)
    if contact:
        return jsonify(contact)
    return {"error": "Contact not found"}, 404


@app.route('/contacts', methods=['POST'])
def add_contact():
    contacts = load_contacts()
    new_contact = request.json

    new_contact['id'] = contacts[-1]['id'] + 1 if contacts else 1

    new_contact.setdefault("name", "")
    new_contact.setdefault("surname", "")
    new_contact.setdefault("phone_numbers", [])  # Список для нескольких номеров
    new_contact.setdefault("profile_image", "")
    new_contact.setdefault("email", "")
    new_contact.setdefault("home_phone", "")
    new_contact.setdefault("address", "")
    new_contact.setdefault("birthdate", "")

    contacts.append(new_contact)
    save_contacts(contacts)
    return jsonify(new_contact), 201


@app.route('/contacts/<int:id>', methods=['PUT'])
def update_contact(id):
    contacts = load_contacts()
    contact = next((c for c in contacts if c["id"] == id), None)
    if contact:
        contact.update(request.json)
        save_contacts(contacts)
        return jsonify(contact)
    return {"error": "Contact not found"}, 404


@app.route('/contacts/<int:id>', methods=['DELETE'])
def delete_contact(id):
    contacts = load_contacts()
    updated_contacts = [c for c in contacts if c["id"] != id]
    if len(updated_contacts) == len(contacts):
        return {"error": "Contact not found"}, 404
    save_contacts(updated_contacts)
    return '', 204


if __name__ == '__main__':
    app.run(debug=True)
