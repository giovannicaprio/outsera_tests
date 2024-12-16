# tests/test_app.py
import unittest
import json
from app import app, db
from models import Movie

class MovieAPITestCase(unittest.TestCase):
    def setUp(self):
        # Configura a aplicação para testes
        self.app = app
        self.app.config['TESTING'] = True
        self.app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'  # Usando um banco de dados em memória para testes
        self.client = self.app.test_client()

        with self.app.app_context():
            db.create_all()  # Cria as tabelas no banco de dados

    def tearDown(self):
        with self.app.app_context():
            db.session.remove()
            db.drop_all()  # Remove as tabelas após os testes

    def test_create_movie(self):
        response = self.client.post('/api/movies', json={
            'title': 'Inception',
            'distributor': 'Warner Bros',
            'gra_year': 2010,
            'gra_winner': True
        })
        self.assertEqual(response.status_code, 201)
        self.assertIn('id', response.get_json())

    def test_get_movies(self):
        # Primeiro, cria um filme
        self.client.post('/api/movies', json={
            'title': 'Inception',
            'distributor': 'Warner Bros',
            'gra_year': 2010,
            'gra_winner': True
        })

        response = self.client.get('/api/movies')
        self.assertEqual(response.status_code, 200)
        self.assertIsInstance(response.get_json()['movies'], list)
        self.assertGreater(len(response.get_json()['movies']), 0)

    def test_update_movie(self):
        # Primeiro, cria um filme
        response = self.client.post('/api/movies', json={
            'title': 'Inception',
            'distributor': 'Warner Bros',
            'gra_year': 2010,
            'gra_winner': True
        })
        movie_id = response.get_json()['id']

        # Atualiza o filme
        response = self.client.put(f'/api/movies/{movie_id}', json={
            'title': 'Inception Updated',
            'distributor': 'Warner Bros',
            'gra_year': 2010,
            'gra_winner': True
        })
        self.assertEqual(response.status_code, 200)

        # Verifica se o filme foi atualizado
        response = self.client.get(f'/api/movies/{movie_id}')
        self.assertEqual(response.get_json()['title'], 'Inception Updated')

    def test_delete_movie(self):
        # Primeiro, cria um filme
        response = self.client.post('/api/movies', json={
            'title': 'Inception',
            'distributor': 'Warner Bros',
            'gra_year': 2010,
            'gra_winner': True
        })
        movie_id = response.get_json()['id']

        # Deleta o filme
        response = self.client.delete(f'/api/movies/{movie_id}')
        self.assertEqual(response.status_code, 204)

        # Verifica se o filme foi realmente deletado
        response = self.client.get(f'/api/movies/{movie_id}')
        self.assertEqual(response.status_code, 404)  # O filme não deve ser encontrado

if __name__ == '__main__':
    unittest.main()