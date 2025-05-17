CREATE DATABASE gerenciamento_de_tarefas;
CREATE TABLE usuario
(
	codigo int NOT NULL AUTO_INCREMENT PRIMARY KEY,
	email varchar(50) NOT NULL,
    nome varchar(50) NOT NULL,
	senha varchar(10) NOT NULL
);
CREATE TABLE tarefa
(
	codigo INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    concluida boolean,
    nome VARCHAR(50),
	usuario_id INT NULL,
    descricao varchar(100) NOT NULL
);
alter table tarefa add concluida boolean;
ALTER TABLE tarefa ADD CONSTRAINT usuario_id FOREIGN KEY (usuario_id) REFERENCES usuario (usuario_id);
ALTER TABLE usuario
MODIFY senha varchar(255);
select * from tarefa;
select * from usuario;
insert INTO tarefa(concluida,nome,usuario_id,descricao) values (false,"a",2,"oi");
INSERT INTO usuario(email,nome,senha) VALUES ("ney@mar","anta","fdr");