# controllers/movie_controller.py
from flask import Blueprint, jsonify, request
from services.movie_service import (
    get_all_movies, create_movie, update_movie, 
    delete_movie,get_years_with_multiple_winners,
    get_top_distributors_with_winning_movies,
    get_all_movies_by_year
    )

movie_bp = Blueprint('movies', __name__)

@movie_bp.route('/api/movies', methods=['GET'])
def get_movies():
    movies = get_all_movies()
    return jsonify([movie.to_dict() for movie in movies])

@movie_bp.route('/api/movies', methods=['POST'])
def add_movie():
    data = request.get_json()
    new_movie = create_movie(data)
    return jsonify(new_movie.to_dict()), 201

@movie_bp.route('/api/movies/<int:id>', methods=['PUT'])
def edit_movie(id):
    data = request.get_json()
    updated_movie = update_movie(id, data)
    return jsonify(updated_movie.to_dict()), 200

@movie_bp.route('/api/movies/<int:id>', methods=['DELETE'])
def remove_movie(id):
    delete_movie(id)
    return jsonify({'message': 'Movie deleted successfully'}), 204

@movie_bp.route('/api/movies/winner_years', methods=['GET'])  # New endpoint
def get_winner_years():
    years_with_winners = get_years_with_multiple_winners()
    return jsonify(years_with_winners)

@movie_bp.route('/api/movies/top_distributors', methods=['GET'])  # New endpoint for top distributors
def get_top_distributors():
    top_distributors = get_top_distributors_with_winning_movies()
    return jsonify(top_distributors)

@movie_bp.route('/api/movies/year/<int:year>', methods=['GET'])
def get_movies_by_year(year):
    movies = get_all_movies_by_year(year)  # Chama a função para obter todos os filmes do ano
    return jsonify([movie.to_dict() for movie in movies])