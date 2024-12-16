# services/producer_service.py
from models import db, Producer, Movie

# services/producer_service.py
def get_all_producers():
    producers = Producer.query.all()
    producers_list = []
    
    for producer in producers:
        producers_list.append({
            "id": producer.id,
            "name": producer.name,
            "links": [
                {
                    "rel": "self",
                    "href": f"/api/producers/{producer.id}",
                    "method": "GET"
                },
                {
                    "rel": "movies",
                    "href": f"/api/producers/{producer.id}/movies",
                    "method": "GET"
                }
            ]
        })
    
    return producers_list

def create_producer(name):
    # Cria um novo produtor e o adiciona ao banco de dados
    new_producer = Producer(name=name)
    db.session.add(new_producer)
    db.session.commit()
    return new_producer


def get_producers_with_winning_movies():
    # Consulta para obter todos os produtores e seus filmes vencedores
    producers = Producer.query.all()
    
    # Formatar a saída
    producer_movies = []
    for producer in producers:
        winning_movies = [movie.title for movie in producer.movies if movie.gra_winner]
        producer_movies.append({
            'id': producer.id,
            'name': producer.name,
            'winning_movies': winning_movies
        })
    
    return producer_movies



def get_producer_winning_years():
    # Consulta para obter os anos em que os filmes de cada produtor foram vencedores
    results = (
        db.session.query(
            Producer.name.label('producer'),
            Movie.gra_year.label('winning_year')
        )
        .join(Movie.producers)  # Supondo que você tenha uma relação entre Movie e Producer
        .filter(Movie.gra_winner == True)
        .all()
    )

    # Processar os resultados para agrupar os anos por produtor
    producer_years = {}
    for producer, winning_year in results:
        if producer not in producer_years:
            producer_years[producer] = []
        producer_years[producer].append(winning_year)

    return producer_years


def get_producers_with_all_movies():
    # Consulta para obter todos os produtores e seus filmes
    producers = Producer.query.all()
    
    # Formatar a saída
    producer_movies = []
    for producer in producers:
        all_movies = [movie.title for movie in producer.movies]  # Obtém todos os filmes do produtor
        producer_movies.append({
            'id': producer.id,
            'name': producer.name,
            'movies': all_movies
        })
    
    return producer_movies

def get_producer_win_intervals():
    # Consulta para obter todos os produtores e seus filmes vencedores
    producers = Producer.query.all()
    
    intervals = []
    
    for producer in producers:
        winning_years = sorted([movie.gra_year for movie in producer.movies if movie.gra_winner])
        
        # Ignora produtores com apenas um prêmio
        if len(winning_years) < 2:
            continue
        
        # Calcula os intervalos entre os prêmios
        for i in range(1, len(winning_years)):
            interval = winning_years[i] - winning_years[i - 1]
            intervals.append({
                "producer": producer.name,
                "interval": interval,
                "previousWin": winning_years[i - 1],
                "followingWin": winning_years[i]
            })
    
    # Ordena os intervalos de forma ascendente pelo intervalo
    intervals.sort(key=lambda x: x['interval'])
    
    return intervals

def get_min_max_intervals():
    intervals = get_producer_win_intervals()  # Obtém todos os intervalos

    if not intervals:
        return {"min": [], "max": []}  # Retorna vazio se não houver intervalos

    # Encontra o intervalo mínimo e máximo
    min_interval = min(intervals, key=lambda x: x['interval'])
    max_interval = max(intervals, key=lambda x: x['interval'])

    # Filtra todos os produtores que têm o mesmo intervalo mínimo e máximo
    min_producers = [interval for interval in intervals if interval['interval'] == min_interval['interval']]
    max_producers = [interval for interval in intervals if interval['interval'] == max_interval['interval']]

    return {
        "min": min_producers,
        "max": max_producers
    }


{
    "max": [
        {
            "followingWin": 2015,
            "interval": 13,
            "previousWin": 2002,
            "producer": "Matthew Vaughn"
        }
    ],
    "min": [
        {
            "followingWin": 1991,
            "interval": 1,
            "previousWin": 1990,
            "producer": "Joel Silver"
        }
    ]
}


def get_movies_by_producer(producer_id):
    producer = Producer.query.get_or_404(producer_id)
    movies = producer.movies
    movies_list = []
    
    for movie in movies:
        movies_list.append({
            "id": movie.id,
            "title": movie.title,
            "distributor": movie.distributor,
            "gra_year": movie.gra_year,
            "gra_winner": movie.gra_winner,
            "links": [
                {
                    "rel": "self",
                    "href": f"/api/movies/{movie.id}",
                    "method": "GET"
                },
                {
                    "rel": "producer",
                    "href": f"/api/producers/{producer.id}",
                    "method": "GET"
                }
            ]
        })
    
    # Adiciona os dados do produtor à resposta
    producer_data = {
        "id": producer.id,
        "name": producer.name,
        "links": [
            {
                "rel": "self",
                "href": f"/api/producers/{producer.id}",
                "method": "GET"
            },
            {
                "rel": "movies",
                "href": f"/api/producers/{producer.id}/movies",
                "method": "GET"
            }
        ]
    }
    
    return {
        "producer": producer_data,
        "movies": movies_list
    }

# services/producer_service.py
from models import db, Producer

def get_producer_by_id(producer_id):
    producer = Producer.query.get_or_404(producer_id)
    return {
        "id": producer.id,
        "name": producer.name,
        "links": [
            {
                "rel": "self",
                "href": f"/api/producers/{producer.id}",
                "method": "GET"
            },
            {
                "rel": "movies",
                "href": f"/api/producers/{producer.id}/movies",
                "method": "GET"
            }
        ]
    }