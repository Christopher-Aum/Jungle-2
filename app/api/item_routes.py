from flask import Blueprint, request
from app.models import Item, db, User, Comment
import app.s3_helpers as s3
from flask_login import login_required, current_user
from app.forms import ItemForm, CommentForm
from datetime import datetime

item_routes = Blueprint('items', __name__)

def post_item(itemForm):
    item = itemForm.data['image']
    item.filename = s3.get_unique_filename(item.filename)
    upload_item = s3.upload_file_to_s3(item)
    print('UPLOADITEM', upload_item)
    user = User.query.get(current_user.id)
    new_item = Item(
        user = user,
        title = itemForm.data['title'],
        body = itemForm.data['body'],
        type = itemForm.data['type'],
        image = upload_item['url']
    )

    db.session.add(new_item)
    db.session.commit()
    return new_item

@item_routes.route('/')
def items():
    items = Item.query.all()
    return {item.id:item.to_dict() for item in items}

@item_routes.route('/<int:id>')
def single_item(id):
    item = Item.query.get(id)
    return item.to_dict()

@item_routes.route('/', methods=['POST'])
@login_required
def post_item_route():
    form = ItemForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_item= post_item(form)
        return new_item.to_dict()

    return {'errors': form.errors}, 401

@item_routes.route('/<int:id>/', methods=['POST'])
@login_required
def update_item(id):
    item = Item.query.get(id)

    if not item:
        return {'errors': 'Item not found'}, 404

    updated_item = ItemForm()
    updated_item['csrf_token'].data = request.cookies['csrf_token']
    print('updated item is: ', updated_item)

    if updated_item.validate_on_submit():
        item.title = updated_item.title.data
        item.body = updated_item.body.data
        item.type = updated_item.type.data
        if updated_item.image:
            image = updated_item.data['image']
            image.filename = s3.get_unique_filename(image.filename)
            image = s3.upload_file_to_s3(image)
            s3.remove_file_from_s3(item.image)
            item.image = image['url']


        db.session.add(item)
        db.session.commit()
        return item.to_dict()
    return {'errors': updated_item.errors}, 403

@item_routes.route('/<int:id>/', methods=['DELETE'])
@login_required
def delete_item(id):
    item= Item.query.get(id)
    if not item:
        return {'Error': 'Item not found'}, 404

    db.session.delete(item)
    db.session.commit()

    return {'Message': 'Successfully Deleted'}

@item_routes.route('/<int:id>/comments/', methods=['POST'])
@login_required
def post_item_comment(id):
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        comment = Comment(
            body = form.data['body'],
            user_id = current_user.id,
            item_id = id,
            created_at = datetime.utcnow(),
            updated_at = datetime.utcnow()
        )
        db.session.add(comment)
        db.session.commit()
        return comment.to_dict()
    return {'Error': 'Unable to create comment'}, 401

@item_routes.route('/<int:id>/comments/<int:c_id>/', methods=['POST'])
@login_required
def edit_item_comment(id, c_id):
    comment = Comment.query.get(c_id)
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit() and comment.user_id == current_user.id:
        comment.body = form.data['body']
        comment.updated_at = datetime.utcnow()
        db.session.add(comment)
        db.session.commit()
        return comment.to_dict()
    else :
        
        print(form.errors)
        print(comment.user_id)
        return {'Error': 'Could not edit comment'}, 401

@item_routes.route('/<int:id>/comments/<int:c_id>/', methods=['DELETE'])
@login_required
def delete_item_comment(id, c_id):
    comment = Comment.query.get(c_id)
    if not comment:
        return {'Error': 'Cannot find comment'}
    db.session.delete(comment)
    db.session.commit()
    return {'message': 'Deleted successfully'}
