# app.py
from flask import Flask
from flask_cors import CORS
from database import create_app
from controllers.movie_controller import movie_bp
from controllers.producer_controller import producer_bp

app = create_app()
CORS(app)  # This will enable CORS for all routes
app.register_blueprint(movie_bp)
app.register_blueprint(producer_bp)


if __name__ == '__main__':
    app.run(debug=True)