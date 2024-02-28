from .db import environment, db, SCHEMA, add_prefix_for_prod
from datetime import datetime
from enum import Enum

class Type(Enum):
    Electronics = 'Electronics'
    Home = 'Home'
    Clothing = 'Clothing'
    Computers = 'Computers'
    Music = 'Music'
    Gaming = 'Gaming'
    Arts = 'Arts'


class Item(db.Model):
    __tablename__ = 'items'

    if environment =='production':
        __table_args__= {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title=db.Column(db.String(255), nullable=False)
    body = db.Column(db.Text, nullable=False)
    image = db.Column(db.String(255), nullable=False)
    type = db.Column(db.Enum(Type), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow())
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow())
