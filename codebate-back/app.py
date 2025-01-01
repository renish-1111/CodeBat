import os
import uuid
import hashlib
from flask import Flask, request, jsonify, make_response
from flask_mysqldb import MySQL  # type: ignore
from werkzeug.utils import secure_filename
from dotenv import load_dotenv  # type: ignore
from flask_cors import CORS

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
CORS(app, resources={r"/admin/*": {"origins": "*", "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"]}})

# MySQL configuration
app.config['MYSQL_HOST'] = os.getenv('MYSQL_HOST')
app.config['MYSQL_USER'] = os.getenv('MYSQL_USER')
app.config['MYSQL_PASSWORD'] = os.getenv('MYSQL_PASSWORD')
app.config['MYSQL_DB'] = os.getenv('MYSQL_DB')

# Upload folder configuration
UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Ensure upload folder exists
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

mysql = MySQL(app)

# Helper function for hashing passwords
def hash_password(password):
    return hashlib.sha256(password.encode()).hexdigest()

# Signup route
@app.route('/admin/signup', methods=['POST'])
def signup():
    data = request.get_json()
    name, email, password = data.get('name'), data.get('email'), data.get('password')
    hashed_password = hash_password(password)

    cur = mysql.connection.cursor()
    cur.execute("SELECT id FROM users WHERE email = %s", (email,))
    if cur.fetchone():
        cur.close()
        return jsonify({'message': 'Email already exists'}), 400

    cur.execute("INSERT INTO users (name, email, password) VALUES (%s, %s, %s)", (name, email, hashed_password))
    mysql.connection.commit()
    cur.close()
    return jsonify({'message': 'User created successfully'}), 200

# Login route
@app.route('/admin/login', methods=['POST'])
def login():
    data = request.get_json()
    email, password = data.get('email'), data.get('password')
    hashed_password = hash_password(password)

    cur = mysql.connection.cursor()
    cur.execute("SELECT id, name, email FROM users WHERE email = %s AND password = %s", (email, hashed_password))
    user = cur.fetchone()
    cur.close()

    if user:
        return jsonify({'message': 'Login successful', 'user': {'id': user[0], 'name': user[1], 'email': user[2]}}), 200
    return jsonify({'message': 'Invalid email or password'}), 401

# Create blog route
@app.route('/admin/blogs', methods=['POST'])
def create_blog():
    data = request.form
    title, content, user_id = data.get('title'), data.get('content'), data.get('user_id')
    cover_image = request.files.get('coverImage')

    cur = mysql.connection.cursor()
    if cover_image:
        file_extension = cover_image.filename.split('.')[-1]
        unique_filename = secure_filename(f"{uuid.uuid4().hex}.{file_extension}")
        cover_image.save(os.path.join(app.config['UPLOAD_FOLDER'], unique_filename))
        cur.execute("INSERT INTO blogs (title, content, user_id, cover_image) VALUES (%s, %s, %s, %s)", (title, content, user_id, unique_filename))
    else:
        cur.execute("INSERT INTO blogs (title, content, user_id) VALUES (%s, %s, %s)", (title, content, user_id))
    
    mysql.connection.commit()
    cur.close()
    return jsonify({'message': 'Blog created successfully'}), 200

# Get all blogs route
@app.route('/blogs', methods=['GET'])
def get_blogs():
    user_id = request.args.get('user_id')
    cur = mysql.connection.cursor()
    cur.execute("SELECT id, title, content, user_id FROM blogs WHERE user_id = %s", (user_id,))
    blogs = [{'id': blog[0], 'title': blog[1], 'content': blog[2], 'user_id': blog[3]} for blog in cur.fetchall()]
    cur.close()
    return jsonify({'blogs': blogs}), 200

# Get, update, or delete a single blog route
@app.route('/admin/blogs/<int:blog_id>', methods=['GET', 'PUT', 'DELETE', 'OPTIONS'])
def manage_blog(blog_id):
    if request.method == 'OPTIONS':
        response = make_response()
        response.headers['Access-Control-Allow-Origin'] = '*'
        response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
        return response
    
    if request.method == 'GET':
        user_id = request.args.get('user_id')
        if not user_id:
            return jsonify({'message': 'User ID is required'}), 400

        cur = mysql.connection.cursor()
        cur.execute("SELECT * FROM blogs WHERE id = %s AND user_id = %s", (blog_id, user_id))
        blog = cur.fetchone()
        cur.close()

        if blog:
            return jsonify({
                'id': blog[0],
                'title': blog[1],
                'content': blog[2],
                'user_id': blog[3],
                'cover_image': blog[4]
            }), 200
        return jsonify({'message': 'Blog not found'}), 404
    
    elif request.method == 'PUT':
        data = request.get_json()
        title, content = data.get('title'), data.get('content')

        cur = mysql.connection.cursor()
        cur.execute("UPDATE blogs SET title = %s, content = %s WHERE id = %s", (title, content, blog_id))
        mysql.connection.commit()
        cur.close()
        return jsonify({'message': 'Blog updated successfully'}), 200
        
    elif request.method == 'DELETE':
        user_id = request.args.get('user_id')
        if not user_id:
            return jsonify({'message': 'User ID is required'}), 400

        cur = mysql.connection.cursor()
        cur.execute("DELETE FROM blogs WHERE id = %s AND user_id = %s", (blog_id, user_id))
        mysql.connection.commit()
        cur.close()

        return jsonify({'message': 'Blog deleted successfully'}), 200

if __name__ == '__main__':
    app.run(debug=True)
