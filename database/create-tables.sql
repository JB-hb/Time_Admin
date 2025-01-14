CREATE TABLE IF NOT EXISTS users (
	id char(36) UNIQUE,
	name varchar(20),
	password varchar(40),
	mail varchar(50),
	PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS tarea_categories (
	id char(36) UNIQUE,
	description varchar(20),
	user_id char(36),
	PRIMARY KEY (id),
	FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE TABLE IF NOT EXISTS tareas (
	id char(36) UNIQUE,
	description varchar(50),
	user_id char(36),
	category_id char(36),
	day date,
	flag int,
	PRIMARY KEY (id),
	FOREIGN KEY (user_id) REFERENCES users (id),
	FOREIGN KEY (category_id) REFETENCES tarea_categories (id)
);

CREATE TABLE IF NOT EXISTS habits (
	id char(36) UNIQUE,
	description varchar(50),
	frequency int,
	user_id char(36),
	flag int,
	PRIMARY KEY (id),
	FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE TABLE IF NOT EXISTS activities (
	id char(36) UNIQUE,
	description varchar(50),
	day int,
	user_id char(36),
	PRIMARY KEY (id),
	FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE TABLE IF NOT EXISTS rewards (
	id char(36) UNIQUE,
	description varchar(40),
	category int,
	user_id char(36),
	PRIMARY KEY (id),
	FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE TABLE IF NOT EXISTS tareas_completed (
	id char(36) UNIQUE,
	tarea_id char(36),
	created_at timestamp,
	PRIMARY KEY (id),
	FOREIGN KEY (tarea_id) REFERENCES tareas (id)
);

CREATE TABLE IF NOT EXISTS habits_completed (
	id char(36) UNIQUE,
	habit_id char(36),
	created_at timestamp,
	PRIMARY KEY (id),
	FOREIGN KEY (habit_id) REFERENCES habits (id)
);
