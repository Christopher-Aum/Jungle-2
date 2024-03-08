from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

# Class for comment table
class Comment(db.Model):
    __tablename__ = 'comments'

    if environment =='production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    item_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('items.id')), nullable=False)
    body = db.Column(db.Text)
    created_at = db.Column(db.DateTime, nullable = False, default=datetime.utcnow())
    updated_at = db.Column(db.DateTime, nullable = False, default = datetime.utcnow())

    user = db.relationship('User', back_populates='comments')
    item = db.relationship('Item', back_populates='comments')

    def to_dict(self):
        return {
            'id': self.id,
            'body': self.body,
            'user_id': self.user.to_dict(),
            'item_id': self.item_id,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
