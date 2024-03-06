from flask_wtf import FlaskForm
from wtforms import StringField, FileField
from wtforms.validators import DataRequired
from ..s3_helpers import ALLOWED_EXTENSIONS
from flask_wtf.file import FileField, FileAllowed

class ItemForm(FlaskForm):
    title = StringField("Title", validators=[DataRequired(message="Title is required.")])
    body = StringField("Body", validators=[DataRequired(message="Body is required.")])
    type = StringField('Type', validators=[DataRequired(message='Type is required.')])
    item_pic = FileField('Item Pic', validators=[FileAllowed(ALLOWED_EXTENSIONS)])
