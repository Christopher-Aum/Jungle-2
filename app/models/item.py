from .db import environment, db, SCHEMA, add_prefix_for_prod
from datetime import datetime
from enum import Enum

class Type(Enum):
    Electronics = 'Electronics'
    Home = 'Home'
    Computers = 'Computers'
    Music = 'Music'
    Gaming = 'Gaming'

# Class for item table
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

    user = db.relationship('User', back_populates='items')
    comments = db.relationship('Comment', back_populates='item', cascade='all, delete')

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'body': self.body,
            'image': self.image,
            'owner': self.user.username,
            'type': self.type.name,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
