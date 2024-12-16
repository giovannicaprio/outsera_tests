# services/movie_service.py
from models import db, Movie, Producer
from sqlalchemy import func

def get_all_movies():
    return Movie.query.all()

def create_movie(data):
    new_movie = Movie(
        title=data['title'],
        distributor=data.get('distributor'),
        gra_year=data['gra_year'],
        gra_winner=data.get('gra_winner', False)
    )
    db.session.add(new_movie)
    db.session.commit()
    return new_movie

def update_movie(id, data):
    movie = Movie.query.get_or_404(id)
    movie.title = data['title']
    movie.distributor = data.get('distributor')
    movie.gra_year = data['gra_year']
    movie.gra_winner = data.get('gra_winner', movie.gra_winner)
    db.session.commit()
    return movie

def delete_movie(id):
    movie = Movie.query.get_or_404(id)
    db.session.delete(movie)
    db.session.commit()

def get_years_with_multiple_winners():
    # Query to count winners per year
    results = (
        db.session.query(
            Movie.gra_year,
            func.count(Movie.id).label('winner_count')
        )
        .filter(Movie.gra_winner == True)
        .group_by(Movie.gra_year)
        .having(func.count(Movie.id) > 1)  # Only include years with more than one winner
        .all()
    )

    # Format the results
    years_with_winners = [
        {"year": year, "winnerCount": winner_count} for year, winner_count in results
    ]

    return {"years": years_with_winners}

#TODO - Deveria existir uma estrutura apartada de STUDIOS, assim como existe de producers
def get_top_distributors_with_winning_movies():
    # Query to count winning movies per distributor
    results = (
        db.session.query(
            Movie.distributor,
            func.count(Movie.id).label('win_count')
        )
        .filter(Movie.gra_winner == True)  # Only count winning movies
        .group_by(Movie.distributor)
        .order_by(func.count(Movie.id).desc())  # Order by win count descending
        .limit(3)  # Get top 3 distributors
        .all()
    )

    # Format the results
    top_distributors = [
        {"name": distributor, "winCount": win_count} for distributor, win_count in results
    ]

    return {"studios": top_distributors}

def get_all_movies_by_year(year):
    """
    Retorna os filmes de um determinado ano que atendem ao critério de vencedor.

    :param year: O ano do qual os filmes devem ser retornados.
    :return: Uma lista de filmes que atendem aos critérios.
    """
    results = (
        db.session.query(Movie)
        .filter(Movie.gra_year == year)
        .all()
    )
    return results
