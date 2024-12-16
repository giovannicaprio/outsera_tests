from flask import Flask
from models import db, Movie, Producer
import pandas as pd

def create_app():
    app = Flask(__name__)
    # Configuração do banco de dados em memória
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db.init_app(app)

    with app.app_context():
        db.create_all()  # Cria as tabelas no banco de dados
        load_data()      # Carrega os dados do CSV

    return app

def load_data():
    df = pd.read_csv('data/gra.csv', delimiter=';')  # Lê o arquivo CSV com ponto e vírgula como delimitador
    print(df.head())  # Imprime as primeiras linhas do DataFrame para verificação
    print(df.columns)  # Imprime os nomes das colunas para verificação

    # Remover espaços em branco dos nomes das colunas
    df.columns = df.columns.str.strip()

    for _, row in df.iterrows():
        # Processa os produtores
        producer_names = row['producer'].strip() if pd.notnull(row['producer']) else None  # Remove espaços em branco
        if producer_names:
            # Divide os nomes dos produtores por vírgula e remove espaços em branco
            producer_names_list = [name.strip() for name in producer_names.split(',')]
            producers = []
            for producer_name in producer_names_list:
                if producer_name:
                    producer = Producer.query.filter_by(name=producer_name).first()
                    if not producer:
                        producer = Producer(name=producer_name)
                        db.session.add(producer)
                    producers.append(producer)

        # Determina se o filme é um vencedor
        gra_winner = row['gra_winner'].strip() if pd.notnull(row['gra_winner']) else None
        if gra_winner == 'WINNER':
            gra_winner = True
        else:
            gra_winner = None  # Define como None se não for um vencedor

        # Cria o filme
        movie = Movie(
            title=row['title'].strip() if pd.notnull(row['title']) else None,
            distributor=row['distributor'].strip() if pd.notnull(row['distributor']) else None,  # Pode ser None se não houver distribuidor
            gra_year=row['gra_year'],  # Mantém o valor original
            gra_winner=gra_winner  # Atualizado para gra_winner
        )

        # Adiciona os produtores ao filme, se houver
        for producer in producers:
            movie.producers.append(producer)  # Adiciona o produtor ao filme

        db.session.add(movie)  # Adiciona o filme à sessão
    db.session.commit()  # Salva as alterações no banco de dados