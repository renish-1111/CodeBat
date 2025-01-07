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
    cover_image = db.Column(db.String(200))  # URL for cover image
    description = db.Column(db.Text)  # No length limitation
    user = db.relationship('User', backref=db.backref('blogs', lazy=True))
    
class Language(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), primary_key=True)
    description = db.Column(db.Text , nullable=False) # No length limitation
    cover_image = db.Column(db.Text,nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

class Tutorial(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text)  # No length limitation
    content = db.Column(db.Text, nullable=False)
    language_id = db.Column(db.Integer, db.ForeignKey('language.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    language = db.relationship('Language', backref=db.backref('tutorials', lazy=True))
    user = db.relationship('User', backref=db.backref('tutorials', lazy=True))

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

def update_blog(blog_id, user_id, title, content, description, cover_image):
    blog = Blog.query.filter_by(id=blog_id, user_id=user_id).first()
    if blog:
        blog.title = title
        blog.content = content
        blog.description = description
        blog.cover_image = cover_image
        db.session.commit()

def delete_blog(blog_id, user_id):
    blog = Blog.query.filter_by(id=blog_id, user_id=user_id).first()
    if blog:
        db.session.delete(blog)
        db.session.commit()

def create_tutorial(title, content, language_id, user_id, description=None):
    tutorial = Tutorial(title=title, content=content, language_id=language_id, user_id=user_id, description=description)
    db.session.add(tutorial)
    db.session.commit()

def update_tutorial(tutorial_id, language_id, user_id, title, content, description):
    tutorial = Tutorial.query.filter_by(id=tutorial_id, language_id=language_id, user_id=user_id).first()
    if tutorial:
        tutorial.title = title
        tutorial.content = content
        tutorial.description = description
        db.session.commit()

def delete_tutorial(tutorial_id, language_id, user_id):
    tutorial = Tutorial.query.filter_by(id=tutorial_id, language_id=language_id, user_id=user_id).first()
    if tutorial:
        db.session.delete(tutorial)
        db.session.commit()

def create_language(name, description, cover_image, user_id):
    language = Language(name=name, description=description, cover_image=cover_image, user_id=user_id)
    db.session.add(language)
    db.session.commit()
    
def get_languages():
    # only cover_image and name , description
    languages = Language.query.all()
    return [{'id': lang.id, 'title': lang.name, 'description': lang.description, 'cover_image': lang.cover_image} for lang in languages]
    
def get_languages_by_name(name):
    return Language.query.filter_by(name=name).first()

def get_language_by_name_and_user(language_name, user_id):
    return Language.query.filter_by(name=language_name, user_id=user_id).first()

def get_languages_by_user(user_id):
    return Language.query.filter_by(user_id=user_id).all()

def get_language_by_id(language_id):
    return Language.query.filter_by(id=language_id).first()
    
def update_language( user_id, name, description, cover_image):
    language = Language.query.filter_by(user_id=user_id, name=name).first()
    if language:
        language.description = description
        language.cover_image = cover_image
        db.session.commit()


def delete_language(langName, user_id):
    language = Language.query.filter_by(name=langName, user_id=user_id).first()
    if language:
        db.session.delete(language)
        db.session.commit()


