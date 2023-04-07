CREATE DATABASE IF NOT EXISTS legal_unal;
USE legal_unal;

DROP TABLE IF EXISTS cuerpo_colegiado;
DROP TABLE IF EXISTS usuario;
DROP TABLE IF EXISTS documento;
DROP TABLE IF EXISTS miembro_cuerpo_colegiado;
DROP TABLE IF EXISTS referencia;

CREATE TABLE cuerpo_colegiado (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL UNIQUE
);

INSERT INTO cuerpo_colegiado VALUES
    (1, "Consejo Superior Universitario"),
    (2, "Rectoría"),
    (3, "Vicerrectoría Sede Medellín"),
    (4, "Decanatura Facultad de Minas Medellín");

CREATE TABLE usuario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombres VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    rol VARCHAR(20) NOT NULL,
    UNIQUE (nombres, apellidos)
);

CREATE TABLE documento (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_cuerpo_colegiado INT NOT NULL,
    id_usuario INT NOT NULL,
    tipo VARCHAR(100) NOT NULL,
    numero INT NOT NULL,
    anio INT NOT NULL,
    informacion TEXT NOT NULL,
    FOREIGN KEY (id_cuerpo_colegiado) REFERENCES cuerpo_colegiado(id),
    FOREIGN KEY (id_usuario) REFERENCES usuario(id),
    UNIQUE (tipo, numero, anio)
);

CREATE TABLE miembro_cuerpo_colegiado (
    id_cuerpo_colegiado INT NOT NULL,
    id_usuario INT NOT NULL,
    rol VARCHAR(100) NOT NULL,
    FOREIGN KEY (id_cuerpo_colegiado) REFERENCES cuerpo_colegiado(id),
    FOREIGN KEY (id_usuario) REFERENCES usuario(id),
    PRIMARY KEY (id_cuerpo_colegiado, id_usuario)
);

CREATE TABLE referencia (
    id_documento_referenciador INT NOT NULL,
    id_documento_referenciado INT NOT NULL,
    FOREIGN KEY (id_documento_referenciador) REFERENCES documento(id),
    FOREIGN KEY (id_documento_referenciado) REFERENCES documento(id),
    PRIMARY KEY (id_documento_referenciador, id_documento_referenciado)
);