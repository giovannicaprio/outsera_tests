from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

# Tabela associativa para a relação muitos-para-muitos
movie_producer = db.Table('movie_producer',
    db.Column('movie_id', db.Integer, db.ForeignKey('movie.id'), primary_key=True),
    db.Column('producer_id', db.Integer, db.ForeignKey('producer.id'), primary_key=True)
)

class Producer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    movies = db.relationship('Movie', secondary=movie_producer, back_populates='producers')

    def __repr__(self):
        return f"<Producer {self.name}>"

class Movie(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    distributor = db.Column(db.String(255), nullable=True)
    gra_year = db.Column(db.Integer, nullable=False)  # Alterado para gra_year
    gra_winner = db.Column(db.Boolean, nullable=True)  # Alterado para gra_winner
    producers = db.relationship('Producer', secondary=movie_producer, back_populates='movies')

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'distributor': self.distributor,
            'gra_year': self.gra_year,
            'gra_winner': self.gra_winner,
            'producers': [producer.name for producer in self.producers]
        }