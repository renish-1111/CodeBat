import os
import uuid
import hashlib
from flask import Flask, request, jsonify, make_response
from werkzeug.utils import secure_filename
from dotenv import load_dotenv
from flask_cors import CORS
from flask_migrate import Migrate
from models import db, init_app, get_user_by_email, create_user, get_blog_by_id_and_user, create_blog, update_blog, delete_blog, Blog

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)

# Enable CORS for all domains (adjust for production)
CORS(app, resources={r"/*": {"origins": "*"}})

# MySQL configuration
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['UPLOAD_FOLDER'] = os.getenv('UPLOAD_FOLDER', './uploads')

# Initialize database and migrations
init_app(app)
migrate = Migrate(app, db)

# Helper function for hashing passwords
def hash_password(password):
    return hashlib.sha256(password.encode()).hexdigest()

# Signup route
@app.route('/admin/signup', methods=['POST'])
def signup():
    data = request.get_json()
    name, email, password = data.get('name'), data.get('email'), data.get('password')

    if not all([name, email, password]):
        return jsonify({'message': 'All fields are required'}), 400

    if get_user_by_email(email):
        return jsonify({'message': 'Email already exists'}), 400

    create_user(name, email, hash_password(password))
    return jsonify({'message': 'User created successfully'}), 201

# Login route
@app.route('/admin/login', methods=['POST'])
def login():
    data = request.get_json()
    email, password = data.get('email'), data.get('password')

    if not all([email, password]):
        return jsonify({'message': 'Email and password are required'}), 400

    user = get_user_by_email(email)
    if user and user.password == hash_password(password):
        return jsonify({'message': 'Login successful', 'user': {'id': user.id, 'name': user.name, 'email': user.email}}), 200

    return jsonify({'message': 'Invalid email or password'}), 401

# Create blog route
@app.route('/admin/blogs', methods=['POST'])
def create_blog_route():
    data = request.form
    title, content, user_id = data.get('title'), data.get('content'), data.get('user_id')
    description = data.get('description')
    cover_image = request.files.get('coverImage')

    if not all([title, content, user_id]):
        return jsonify({'message': 'Title, content, and user ID are required'}), 400

    if cover_image:
        file_extension = cover_image.filename.split('.')[-1]
        unique_filename = secure_filename(f"{uuid.uuid4().hex}.{file_extension}")
        upload_path = os.path.join(app.config['UPLOAD_FOLDER'], unique_filename)

        os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
        cover_image.save(upload_path)
        create_blog(title, content, user_id, description, unique_filename)
    else:
        create_blog(title, content, user_id, description)

    return jsonify({'message': 'Blog created successfully'}), 201

# Get all blogs route
@app.route('/blogs/', methods=['GET'])
def get_blogs():
    user_id = request.args.get('user_id')
    if not user_id:
        return jsonify({'message': 'User ID is required'}), 400

    blogs = Blog.query.filter_by(user_id=user_id).all()
    if not blogs:
        return jsonify({'message': 'No blogs found'}), 500
    return jsonify({'blogs': [{'id': blog.id, 'title': blog.title, 'content': blog.content, 'user_id': blog.user_id} for blog in blogs]}), 200

# Manage a single blog
@app.route('/admin/blogs/<int:blog_id>/', methods=['GET', 'PUT', 'DELETE', 'OPTIONS'])
def manage_blog(blog_id):
    user_id = request.args.get('user_id')

    if request.method == 'OPTIONS':
        response = make_response()
        response.headers['Access-Control-Allow-Origin'] = '*'
        response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
        return response, 200

    if not user_id:
        return jsonify({'message': 'User ID is required'}), 400

    if request.method == 'GET':
        blog = get_blog_by_id_and_user(blog_id, user_id)
        if blog:
            return jsonify({
                'id': blog.id,
                'title': blog.title,
                'content': blog.content,
                'user_id': blog.user_id,
                'cover_image': blog.cover_image,
                'description': blog.description,
            }), 200
        return jsonify({'message': 'Blog not found'}), 404

    if request.method == 'PUT':
        data = request.get_json()
        title, content, description = data.get('title'), data.get('content'), data.get('description')
        update_blog(blog_id, user_id, title, content, description)
        return jsonify({'message': 'Blog updated successfully'}), 200

    if request.method == 'DELETE':
        delete_blog(blog_id, user_id)
        return jsonify({'message': 'Blog deleted successfully'}), 200

if __name__ == '__main__':
    app.run(debug=True)
