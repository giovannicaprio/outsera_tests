# Golden Raspberry Awards API

This is a RESTful API designed to manage and provide access to data about the nominees and winners of the Golden Raspberry Awards, specifically focusing on the "Worst Film" category. The API allows users to read data from an in-memory database populated from a CSV file containing movie information.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Features
- Read movie data from a CSV file and store it in an in-memory SQLite database.
- Retrieve a list of all movies and their details.
- Create, update, and delete movie records.
- Get the producer with the largest interval between consecutive awards.
- Get the producer who received two awards in the shortest time.

## Technologies Used
- **Flask**: A lightweight WSGI web application framework for Python.
- **Flask-SQLAlchemy**: An ORM for managing database interactions.
- **Pandas**: A data manipulation library for reading and processing CSV files.
- **SQLite**: An embedded database used for storing movie data in memory.
- **Flask-CORS**: A Flask extension for handling Cross-Origin Resource Sharing (CORS).

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/golden_raspberry_awards.git
   cd golden_raspberry_awards

2. Create a virtual environment (optional but recommended):
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`

3. Install the required dependencies:
   ```bash
   pip install -r requirements.txt

## Usage

1. Ensure you have the CSV file (gra.csv) containing the movie data in the data/ directory.

2. Run the application
   ```bash
   python app.py

3. The API will be available at http://127.0.0.1:5000

## API Endpoints

Movies

- GET /api/movies
Retrieve a list of all movies.
Response example: 
   ```bash
   [
      {
         "distributor": "Associated Film Distribution",
         "gra_winner": true,
         "gra_year": 1980,
         "id": 1,
         "producers": [
               "Allan Carr"
         ],
         "title": "Can't Stop the Music"
      },
      {
         "distributor": "Lorimar Productions, United Artists",
         "gra_winner": null,
         "gra_year": 1980,
         "id": 2,
         "producers": [
               "Jerry Weintraub"
         ],
         "title": "Cruising"
      } 
   ]

POST /api/movies
Create a new movie.
Request Body
   ```bash
   {
   "title": "Movie Title",
   "distributor": "Distributor Name",
   "gra_year": 2023,
   "gra_winner": true
   }

- PUT /api/movies/<id>
Update an existing movie by ID.
Request Body:
```bash
{
  "title": "Updated Movie Title",
  "distributor": "Updated Distributor Name",
  "gra_year": 2023,
  "gra_winner": false
}

DELETE /api/movies/<id>
Delete a movie by ID.

Producers
- GET /api/producers/min_max_intervals
Get the producer with the largest interval between consecutive awards and the one who received two awards the fastest.

Response example:
   ```bash
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

## Testing
To run the integration tests, use the following command:

python -m unittest discover -s tests

Make sure to have the test database set up as described in the tests.

## Contributing
Contributions are welcome! If you have suggestions for improvements or new features, please fork the repository and submit a pull request.

1. Fork the repository.
2. Create a new branch (git checkout -b feature/YourFeature).
3. Make your changes and commit them (git commit -m 'Add some feature').
4. Push to the branch (git push origin feature/YourFeature).
5. Open a pull request.

## License
This project is licensed under the MIT License - see the LICENSE file for details.  markdown

