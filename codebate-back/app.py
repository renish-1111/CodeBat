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
    data = request.get_json()
    title, content, user_id = data.get('title'), data.get('content'), data.get('user_id')
    description = data.get('description')
    cover_image = data.get('cover_image')  # URL for cover image

    create_blog(title, content, user_id, description, cover_image)
    
    return jsonify({'message': 'Blog created successfully'}), 200

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

@app.route('/api/blogs/', methods=['GET', 'OPTIONS'])
def get_blog_frontend():
    if request.method == 'OPTIONS':
        response = make_response()
        response.headers['Access-Control-Allow-Origin'] = '*'
        response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
        return response, 200
    
    blogs = Blog.query.filter_by().all()[::-1]  
    if not blogs:
        return jsonify({'message': 'No blogs found'}), 500
    return jsonify({'blogs': [{'id': blog.id, 'title': blog.title, 'content': blog.content, 'description' : blog.description ,'cover_image' : blog.cover_image} for blog in blogs]}), 200

# Get a single blog for frontend
@app.route('/api/blogs/<int:blog_id>', methods=['GET', 'OPTIONS'])
def get_blog_from_id_for_frontend(blog_id):
    if request.method == 'OPTIONS':
        response = make_response()
        response.headers['Access-Control-Allow-Origin'] = '*'
        response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
        return response, 200
    
    blog = Blog.query.filter_by(id=blog_id).first()
    if not blog:
        return jsonify({'message': 'No blog found'}), 500
    return jsonify({'blog': {'title': blog.title, 'content': blog.content, 'description' : blog.description ,'cover_image' : blog.cover_image}}), 200

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
        title, content, description, cover_image = data.get('title'), data.get('content'), data.get('description'),data.get('cover_image')
        update_blog(blog_id, user_id, title, content, description, cover_image)
        return jsonify({'message': 'Blog updated successfully'}), 200

    if request.method == 'DELETE':
        delete_blog(blog_id, user_id)
        return jsonify({'message': 'Blog deleted successfully'}), 200

if __name__ == '__main__':
    app.run(debug=True)
