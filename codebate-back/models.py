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
    user = db.relationship('User', backref=db.backref('blog', lazy=True))
    
class Language(db.Model):
    id = db.Column(db.Integer, primary_key=True)  # Primary key
    name = db.Column(db.String(200), unique=True, index=True, nullable=False)  # Make name unique and indexed
    description = db.Column(db.Text, nullable=False)
    cover_image = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    user = db.relationship('User', backref=db.backref('languages', lazy=True))


class Tutorial(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    index = db.Column(db.Integer, nullable=False)
    title = db.Column(db.String(200), nullable=False)
    content = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    language_name = db.Column(db.String(200), db.ForeignKey('language.name'), nullable=False)  # Foreign Key referencing Language name
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
        
def create_tutorial(user_id, title, content, language):
    
    max_index = db.session.query(db.func.max(Tutorial.index)).filter_by(language_name=language).scalar()
    index = (max_index + 1) if max_index is not None else 1
    
    tutorial = Tutorial(
        user_id=user_id,
        title=title,
        content=content,
        language_name=language,
        index=index
    )
    # Add the new tutorial and commit changes
    db.session.add(tutorial)
    db.session.commit()
    
def update_tutorial(id, user_id, title, content, language, index):
    # Get the tutorial by ID
    tutorial = Tutorial.query.filter_by(id=id, user_id=user_id).first()
    index = int(index)
    if tutorial:
        if tutorial.index != index:
            max_index = db.session.query(db.func.max(Tutorial.index)).filter_by(language_name=language).scalar()
            if index > max_index:
                index = max_index + 1
            elif tutorial.index < index:
                Tutorial.query.filter_by(language_name=language).filter(Tutorial.index > tutorial.index, Tutorial.index <= index).update({
                    Tutorial.index: Tutorial.index - 1
                })
            else:
                Tutorial.query.filter_by(language_name=language).filter(Tutorial.index < tutorial.index, Tutorial.index >= index).update({
                    Tutorial.index: Tutorial.index + 1
                })
        tutorial.title = title
        tutorial.content = content
        tutorial.language_name = language
        tutorial.index = index
        db.session.commit()
    
def delete_tutorial(id, user_id, language):
    # Get the tutorial by ID
    tutorial = Tutorial.query.filter_by(id=id, user_id=user_id).first()
    delete_tutotial_index = tutorial.index
    db.session.delete(tutorial)
    db.session.commit()
    Tutorial.query.filter_by(language_name=language).filter(Tutorial.index > delete_tutotial_index).update({
        Tutorial.index: Tutorial.index - 1
    })
    db.session.commit()
    
def maxIndex(language):
    return db.session.query(db.func.max(Tutorial.index)).filter_by(language_name=language).scalar()