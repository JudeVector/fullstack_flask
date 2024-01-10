from flask import Flask, request, jsonify, make_response
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from os import environ

app = Flask(__name__)
CORS(app)
app.config["SQLALCHEMY_DATABASE_URI"] = environ.get("DATABASE_URL")
db = SQLAlchemy(app)


class Topic(db.Model):
    __tablename__ = "topics"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120))
    description = db.Column(db.String(120))

    def json(self):
        return {"id": self.id, "title": self.title, "description": self.description}


db.create_all()


# Create a test route
@app.route("/test", methods=["GET"])
def test():
    return jsonify({"message": "The server is running"})


# Create a user route
@app.route("/api/v1/topics", methods=["POST"])
def create_topic():
    try:
        data = request.get_json()
        new_topic = Topic(title=data["title"], description=data["description"])
        db.session.add(new_topic)
        db.session.commit()

        return (
            jsonify(
                {
                    "id": new_topic.id,
                    "title": new_topic.title,
                    "description": new_topic.description,
                }
            ),
            201,
        )
    except Exception as e:
        return make_response(
            jsonify({"message": "Error creating topics", "error": str(e)}), 500
        )


# Get all users
@app.route("/api/v1/topics", methods=["GET"])
def get_topic():
    try:
        topics = Topic.query.all()
        topics_data = [
            {"id": topics.id, "title": topics.title, "description": topics.description}
            for topics in topics
        ]
        return jsonify(topics_data), 200
    except Exception as e:
        return make_response(
            jsonify({"message": "Error getting users", "error": str(e)}), 500
        )


# Get a user by id
@app.route("/api/v1/topics/<id>", methods=["GET"])
def get_topic_id(id):
    try:
        topic = Topic.query.filter_by(id=id).first()
        if topic:
            return make_response(jsonify({"topic": topic.json()}), 200)
        return make_response(jsonify({"message": "Topic not found"}), 404)
    except Exception as e:
        return make_response(
            jsonify({"message": "Internal Server Error", "error": str(e)}), 500
        )


# Update user by id
@app.route("/api/v1/topics/<id>", methods=["PUT"])
def update_topic(id):
    try:
        topic = Topic.query.filter_by(id=id).first()
        if topic:
            data = request.get_json()
            topic.title = data["title"]
            topic.description = data["description"]
            db.session.commit()
            return make_response(jsonify({"message": "topic updated"}), 200)
        return make_response(jsonify({"message": "topic not found"}), 404)
    except Exception as e:
        return make_response(
            jsonify({"message": "Internal Server Error", "error": str(e)}), 500
        )


# Delete a user
@app.route("/api/v1/topics/<id>", methods=["DELETE"])
def delete_topic(id):
    try:
        topic = Topic.query.filter_by(id=id).first()
        if topic:
            db.session.delete(topic)
            db.session.commit()
            return make_response(
                jsonify({"message": "Topic deleted successfully"}), 200
            )
        return make_response(jsonify({"message": "Topic not found"}), 404)
    except Exception as e:
        return make_response(
            jsonify({"message": "Internal Server Error", "error": str(e)}), 500
        )
