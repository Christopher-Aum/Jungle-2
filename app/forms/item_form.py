from flask_wtf import FlaskForm
from wtforms import StringField, FileField
from wtforms.validators import DataRequired, ValidationError
from ..s3_helpers import ALLOWED_EXTENSIONS
from flask_wtf.file import FileField, FileAllowed

def body_validations(form, field):
    body = field.data
    if len(body) < 30:
        raise ValidationError('Body must have at least 30 characters.')

def title_validations(form, field):
    title = field.data
    if len(title) <= 1:
        raise ValidationError('Title must have more than one character.')

class ItemForm(FlaskForm):
    title = StringField("Title", validators=[DataRequired(message="Title is required."), title_validations])
    body = StringField("Body", validators=[DataRequired(message="Body is required."), body_validations])
    type = StringField('Type', validators=[DataRequired(message='Type is required.')])
    image = FileField('image', validators=[FileAllowed(ALLOWED_EXTENSIONS)])
