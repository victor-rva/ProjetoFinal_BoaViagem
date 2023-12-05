CREATE DATABASE site_viagem;

USE site_viagem;

CREATE TABLE cidades(
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50)
);

CREATE TABLE clientes (
id INT NOT NULL PRIMARY KEY AUTO_INCREMENT ,
nome VARCHAR(100) NOT NULL ,
altura DOUBLE ,
nascimento DATE DEFAULT '1980-01-01' ,
cidade_id INT ,
FOREIGN KEY (cidade_id) REFERENCES cidades(id)
);

CREATE TABLE pedidos (
id INT NOT NULL PRIMARY KEY AUTO_INCREMENT ,
horario DATETIME ,
endereco VARCHAR(100) NOT NULL ,
cliente_id INT ,
FOREIGN KEY (cliente_id) REFERENCES clientes(id)
);

CREATE TABLE categorias(
id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(100) 
);

CREATE TABLE pacotes (
id int NOT NULL primary key auto_increment,
nome VARCHAR(100),
preco DOUBLE,
quantidade DOUBLE,
categoria_id INT,
data_inicio DATE,
data_retorno DATE,
validade DATE,
FOREIGN KEY(categoria_id) REFERENCES categorias(id)
);

CREATE TABLE pedidos_pacotes(
pedido_id INT NOT NULL ,
produto_id INT NOT NULL ,
preco DOUBLE,
quantidade DOUBLE,
PRIMARY KEY (pedido_id, produto_id),
foreign key(pedido_id) references pedidos (id),
foreign key(produto_id) references pacotes (id)
);

-- Fazer trigger para decrementar a quantidade do pacote quando uma viagem for escolhida
-- Fazer trigger para quando tiver um update em pedidos_pacotes para a quantidade do pacote ser atualizada conforme a diferença (somar a quantidade de pacotes mais a diferença entre o OLD e NEW do pedidos_pacotes)
