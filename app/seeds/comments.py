from app.models import Comment, db, environment, SCHEMA
from sqlalchemy.sql import text

def comment_seed(all_users, all_items):
    comment1 = Comment(body='Blah blah blah 1', user_id=3, item_id=1)
    comment2 = Comment(body='Blah blah blah 2', user_id=2, item_id=1)
    comment3 = Comment(body='Blah blah blah 3', user_id=3, item_id=2)
    comment4 = Comment(body='Blah blah blah 4', user_id=2, item_id=2)
    comment5 = Comment(body='Blah blah blah 5', user_id=3, item_id=3)
    comment6 = Comment(body='Blah blah blah 6', user_id=2, item_id=3)
    comment7 = Comment(body='Blah blah blah 7', user_id=3, item_id=4)
    comment8 = Comment(body='Blah blah blah 8', user_id=2, item_id=4)
    comment9 = Comment(body='Blah blah blah 9', user_id=3, item_id=5)
    comment10 = Comment(body='Blah blah blah 10', user_id=2, item_id=5)
    # comment11 = Comment(body='Blah blah blah 1', user_id=3, item_id=1)
    # comment12 = Comment(body='Blah blah blah 2', user_id=2, item_id=1)
    # comment13 = Comment(body='Blah blah blah 3', user_id=3, item_id=2)
    # comment14 = Comment(body='Blah blah blah 4', user_id=2, item_id=2)
    # comment15 = Comment(body='Blah blah blah 5', user_id=3, item_id=3)
    # comment16 = Comment(body='Blah blah blah 6', user_id=2, item_id=3)
    # comment17 = Comment(body='Blah blah blah 7', user_id=3, item_id=4)
    # comment18 = Comment(body='Blah blah blah 8', user_id=2, item_id=4)
    # comment19 = Comment(body='Blah blah blah 9', user_id=3, item_id=5)
    # comment20 = Comment(body='Blah blah blah 10', user_id=2, item_id=5)
    # comment21 = Comment(body='Blah blah blah 1', user_id=3, item_id=1)
    # comment22 = Comment(body='Blah blah blah 2', user_id=2, item_id=1)
    # comment23 = Comment(body='Blah blah blah 3', user_id=3, item_id=2)
    # comment24 = Comment(body='Blah blah blah 4', user_id=2, item_id=2)
    # comment25 = Comment(body='Blah blah blah 5', user_id=3, item_id=3)
    # comment26 = Comment(body='Blah blah blah 6', user_id=2, item_id=3)
    # comment27 = Comment(body='Blah blah blah 7', user_id=3, item_id=4)
    # comment28 = Comment(body='Blah blah blah 8', user_id=2, item_id=4)
    # comment29 = Comment(body='Blah blah blah 9', user_id=3, item_id=5)
    # comment30 = Comment(body='Blah blah blah 10', user_id=2, item_id=5)
    # comment31 = Comment(body='Blah blah blah 1', user_id=3, item_id=1)
    # comment32 = Comment(body='Blah blah blah 2', user_id=2, item_id=1)
    # comment33 = Comment(body='Blah blah blah 3', user_id=3, item_id=2)
    # comment34 = Comment(body='Blah blah blah 4', user_id=2, item_id=2)
    # comment35 = Comment(body='Blah blah blah 5', user_id=3, item_id=3)
    # comment36 = Comment(body='Blah blah blah 6', user_id=2, item_id=3)
    # comment37 = Comment(body='Blah blah blah 7', user_id=3, item_id=4)
    # comment38 = Comment(body='Blah blah blah 8', user_id=2, item_id=4)
    # comment39 = Comment(body='Blah blah blah 9', user_id=3, item_id=5)
    # comment40 = Comment(body='Blah blah blah 10', user_id=2, item_id=5)
    # comment41 = Comment(body='Blah blah blah 1', user_id=3, item_id=1)
    # comment42 = Comment(body='Blah blah blah 2', user_id=2, item_id=1)
    # comment43 = Comment(body='Blah blah blah 3', user_id=3, item_id=2)
    # comment44 = Comment(body='Blah blah blah 4', user_id=2, item_id=2)
    # comment45 = Comment(body='Blah blah blah 5', user_id=3, item_id=3)
    # comment46 = Comment(body='Blah blah blah 6', user_id=2, item_id=3)
    # comment47 = Comment(body='Blah blah blah 7', user_id=3, item_id=4)
    # comment48 = Comment(body='Blah blah blah 8', user_id=2, item_id=4)
    # comment49 = Comment(body='Blah blah blah 9', user_id=3, item_id=5)
    # comment50 = Comment(body='Blah blah blah 10', user_id=2, item_id=5)

    all_comments = [ comment1, comment2, comment3, comment4, comment5, comment6, comment7, comment8, comment9, comment10]
    for comment in all_comments:
        comment.item = all_items[comment.item_id-1]
        comment.users = all_users[comment.user_id-1]

    db.session.add_all(all_comments)
    db.session.commit()

def undo_comment_seeds():

    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))

    db.session.commit()
