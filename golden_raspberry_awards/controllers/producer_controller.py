# controllers/producer_controller.py
from flask import Blueprint, jsonify, request
from services.producer_service import (
    get_all_producers, create_producer, get_producer_winning_years,
    get_producers_with_winning_movies, 
    get_producers_with_all_movies, get_producer_win_intervals, get_min_max_intervals,
    get_movies_by_producer, get_producer_by_id)

producer_bp = Blueprint('producer', __name__)

@producer_bp.route('/api/producers', methods=['GET'])
def get_producers():
    producers = get_all_producers()
    return jsonify(producers)

@producer_bp.route('/api/producers/<int:producer_id>', methods=['GET'])
def get_producer_endpoint(producer_id):
    producer_data = get_producer_by_id(producer_id)
    return jsonify(producer_data)

@producer_bp.route('/api/producers', methods=['POST'])
def add_producer():
    data = request.get_json()
    name = data.get('name')
    if not name:
        return jsonify({'error': 'Name is required'}), 400
    
    new_producer = create_producer(name)
    return jsonify({'id': new_producer.id, 'name': new_producer.name}), 201

@producer_bp.route('/api/producers/winning_movies', methods=['GET'])
def get_producers_with_movies():
    producers_with_movies = get_producers_with_winning_movies()
    return jsonify(producers_with_movies)

@producer_bp.route('/api/producers/winning_years', methods=['GET'])
def get_winning_years():
    producer_years = get_producer_winning_years()
    return jsonify(producer_years)

@producer_bp.route('/api/producers/all_movies', methods=['GET'])
def get_producers_with_all_movies_endpoint():
    producers_with_all_movies = get_producers_with_all_movies()
    return jsonify(producers_with_all_movies)

@producer_bp.route('/api/producers/win_intervals', methods=['GET'])
def get_producer_win_intervals_endpoint():
    intervals = get_producer_win_intervals()
    return jsonify(intervals)

@producer_bp.route('/api/producers/min_max_intervals', methods=['GET'])
def get_min_max_intervals_endpoint():
    min_max_intervals = get_min_max_intervals()
    return jsonify(min_max_intervals)

@producer_bp.route('/api/producers/<int:producer_id>/movies', methods=['GET'])
def get_movies_by_producer_endpoint(producer_id):
    movies = get_movies_by_producer(producer_id)
    return jsonify(movies)

