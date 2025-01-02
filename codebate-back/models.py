from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def init_app(app):
    db.init_app(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)

class Blog(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    content = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    cover_image = db.Column(db.String(200))
    description = db.Column(db.Text)  # No length limitation
    user = db.relationship('User', backref=db.backref('blogs', lazy=True))

def get_user_by_email(email):
    return User.query.filter_by(email=email).first()

def create_user(name, email, hashed_password):
    user = User(name=name, email=email, password=hashed_password)
    db.session.add(user)
    db.session.commit()

def get_blog_by_id_and_user(blog_id, user_id):
    return Blog.query.filter_by(id=blog_id, user_id=user_id).first()

def create_blog(title, content, user_id, description=None, cover_image=None):
    blog = Blog(title=title, content=content, user_id=user_id, description=description, cover_image=cover_image)
    db.session.add(blog)
    db.session.commit()

def update_blog(blog_id, user_id, title, content, description):
    blog = Blog.query.filter_by(id=blog_id, user_id=user_id).first()
    if blog:
        blog.title = title
        blog.content = content
        blog.description = description
        db.session.commit()

def delete_blog(blog_id, user_id):
    blog = Blog.query.filter_by(id=blog_id, user_id=user_id).first()
    if blog:
        db.session.delete(blog)
        db.session.commit()