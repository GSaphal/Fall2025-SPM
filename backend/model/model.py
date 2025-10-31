from datetime import datetime

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

# User model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), nullable=False, unique=True)
    email = db.Column(db.String(100), nullable=False, unique=True)
    password = db.Column(db.String(100), nullable=False)
    role = db.Column(db.String(100), nullable=False)
    # products = db.relationship('Product', backref='owner', lazy=True)

    def __repr__(self):
        return f"<User {self.username}>"

# User Expenditure model
class UserExpenditure(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    amount = db.Column(db.Float)
    date = db.Column(db.DateTime, default=datetime.utcnow)
    product_name = db.Column(db.String(100))

    def __repr__(self):
        return f"<UserExpenditure {self.amount}>"

# Product model
class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    price = db.Column(db.Float, nullable=False)
    discount = db.Column(db.Float, nullable=True)
    date = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    store_id = db.Column(db.Integer, db.ForeignKey('store.id'), nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    # store = db.relationship('Store', backref='products', lazy=True)

    def __repr__(self):
        return f"<Product {self.name}>"

# Store model
class Store(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    location = db.Column(db.String(100), nullable=False)
    # products = db.relationship('Product', backref='store', lazy=True)

    def __repr__(self):
        return f"<Store {self.name}>"
