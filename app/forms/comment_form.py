from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError

def comment_validation(form, field):
    body = field.data
    if len(body) > 200:
        raise ValidationError('Limit your comment to 200 characters.')

class CommentForm(FlaskForm):
    body = StringField('Body', validators=[DataRequired(message='Comment is required'), comment_validation])
