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

INSERT INTO cuerpo_colegiado(nombre) VALUES
    ("Consejo Superior Universitario"),
    ("Rectoría"),
    ("Vicerrectoría Sede Medellín"),
    ("Decanatura Facultad de Minas Medellín");

CREATE TABLE usuario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombres VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    rol VARCHAR(20) NOT NULL,
    UNIQUE (nombres, apellidos)
);

INSERT INTO usuario(nombres, apellidos, email, rol) VALUES
    ("Pepito", "Pérez", "pperez@unal.edu.co", "administrador"),
    ("Fulanito", "de Tal", "fdetal@unal.edu.co", "invitado"),
    ("Johan", "Madronero Cuervo", "jmadronero@unal.edu.co", "miembro"),
    ("Emmanuel", "Lopez Rodriguez", "emlopezr@unal.edu.co", "miembro"),
    ("Cristian", "Giraldo Villegas", "cgiraldo@unal.edu.co", "miembro"),
    ("Marlon Santiago", "Nivia Devia", "mnivia@unal.edu.co", "miembro"),
    ("Melina", "Munoz Gallego", "memunozga@unal.edu.co", "miembro"),
    ("Sebastian", "Rendon Arteaga", "serendona@unal.edu.co", "miembro");

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

INSERT INTO documento(id_cuerpo_colegiado, id_usuario, tipo, numero, anio, informacion) VALUES
    (1, 3, "acuerdo", 3, 2023, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ut ex eros. Mauris eu augue non risus finibus blandit. Nullam tristique mauris quis convallis porttitor. Ut neque diam, convallis non finibus sit amet, convallis convallis lacus. Aliquam ipsum purus, vestibulum vel scelerisque sed, imperdiet in dui. Vivamus ullamcorper in risus in lacinia. In dignissim mattis aliquet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Phasellus non metus velit. Proin suscipit lectus in odio vestibulum, quis lobortis enim porttitor. Nunc sit amet commodo dui."),
    (1, 4, "acta", 2, 2023, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ut ex eros. Mauris eu augue non risus finibus blandit. Nullam tristique mauris quis convallis porttitor. Ut neque diam, convallis non finibus sit amet, convallis convallis lacus. Aliquam ipsum purus, vestibulum vel scelerisque sed, imperdiet in dui. Vivamus ullamcorper in risus in lacinia. In dignissim mattis aliquet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Phasellus non metus velit. Proin suscipit lectus in odio vestibulum, quis lobortis enim porttitor. Nunc sit amet commodo dui."),
    (4, 8, "resolucion", 22, 2021, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ut ex eros. Mauris eu augue non risus finibus blandit. Nullam tristique mauris quis convallis porttitor. Ut neque diam, convallis non finibus sit amet, convallis convallis lacus. Aliquam ipsum purus, vestibulum vel scelerisque sed, imperdiet in dui. Vivamus ullamcorper in risus in lacinia. In dignissim mattis aliquet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Phasellus non metus velit. Proin suscipit lectus in odio vestibulum, quis lobortis enim porttitor. Nunc sit amet commodo dui.");

CREATE TABLE miembro_cuerpo_colegiado (
    id_cuerpo_colegiado INT NOT NULL,
    id_usuario INT NOT NULL,
    rol VARCHAR(100) NOT NULL,
    FOREIGN KEY (id_cuerpo_colegiado) REFERENCES cuerpo_colegiado(id),
    FOREIGN KEY (id_usuario) REFERENCES usuario(id),
    PRIMARY KEY (id_cuerpo_colegiado, id_usuario)
);

INSERT INTO miembro_cuerpo_colegiado(id_cuerpo_colegiado, id_usuario, rol) VALUES
    (2, 3, "delegado"),
    (1, 3, "delegado"),
    (1, 4, "delegado"),
    (1, 5, "miembro"),
    (3, 6, "miembro"),
    (3, 7, "delegado"),
    (4, 8, "delegado");

CREATE TABLE referencia (
    id_documento_referenciador INT NOT NULL,
    id_documento_referenciado INT NOT NULL,
    FOREIGN KEY (id_documento_referenciador) REFERENCES documento(id),
    FOREIGN KEY (id_documento_referenciado) REFERENCES documento(id),
    PRIMARY KEY (id_documento_referenciador, id_documento_referenciado)
);

INSERT INTO referencia(id_documento_referenciador, id_documento_referenciado) VALUES
    (1, 2);
