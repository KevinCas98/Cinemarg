CREATE TABLE IF NOT EXISTS movies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    movie_desc TEXT,
    year_released INT,
    genre TEXT
);
INSERT or IGNORE INTO movies(id, title, movie_desc, year_released,genre) VALUES (1, 'Pulp Fiction', 'Las vidas de dos mafiosos, un boxeador, la esposa de un gánster y un par de bandidos se entrelazan en cuatro historias de violencia y redención.','1994','Acción');
INSERT or IGNORE INTO movies(id, title, movie_desc, year_released,genre) VALUES (2, 'John Wick', 'Un ex asesino a sueldo suspende su jubilación para localizar a los mafiosos que mataron a su perro y le quitaron todo.','2014','Acción');
INSERT or IGNORE INTO movies(id, title, movie_desc, year_released,genre) VALUES (3, 'Titanic', 'Una aristócrata de diecisiete años se enamora de un amable pero pobre artista a bordo del lujoso y desafortunado R.M.S. Titanic.','1997','Drama');
INSERT or IGNORE INTO movies(id, title, movie_desc, year_released,genre) VALUES (4, 'Atrápame si puedes', 'Con apenas 21 años, Frank es un hábil falsificador que se ha hecho pasar por médico, abogado y piloto. El agente del FBI Carl se obsesiona con seguir la pista del estafador, que disfruta con la persecución.','2002','Drama');
INSERT or IGNORE INTO movies(id, title, movie_desc, year_released,genre) VALUES (5, 'Jarhead', 'Un estudio psicológico de las operaciones del escudo del desierto y la tormenta del desierto durante la guerra del Golfo; a través de los ojos de un francotirador marino de los Estados Unidos.','2005','Guerra');
INSERT or IGNORE INTO movies(id, title, movie_desc, year_released,genre) VALUES (6, 'Apocalypse now', 'Un oficial del ejército estadounidense que sirve en Vietnam recibe el encargo de asesinar a un coronel renegado de las fuerzas especiales que se ve a sí mismo como un dios.','1979','Guerra');
INSERT or IGNORE INTO movies(id, title, movie_desc, year_released,genre) VALUES (7, 'Por un puñado de dólares', 'Un pistolero errante enfrenta a dos familias rivales en un pueblo desgarrado por la codicia, el orgullo y la venganza.','1964','Western');
INSERT or IGNORE INTO movies(id, title, movie_desc, year_released,genre) VALUES (8, 'Hasta que llegó su hora', 'Un misterioso extraño con una armónica se alía con un famoso forajido para proteger a una bella viuda de un despiadado asesino que trabaja para el ferrocarril.','1968','Western');
