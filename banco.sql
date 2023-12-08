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
FOREIGN KEY(categoria_id) REFERENCES categorias(id),
disponivel BOOLEAN DEFAULT TRUE
);

CREATE TABLE pedidos_pacotes(
pedido_id INT NOT NULL ,
pacote_id INT NOT NULL ,
preco DOUBLE,
quantidade DOUBLE,
PRIMARY KEY (pedido_id, pacote_id),
foreign key(pedido_id) references pedidos (id),
foreign key(pacote_id) references pacotes (id)
);

-- Fazer trigger para decrementar a quantidade do pacote quando uma viagem for escolhida
DELIMITER //

CREATE TRIGGER decrementar_quantidade
AFTER INSERT ON pedidos_pacotes
FOR EACH ROW
BEGIN
    DECLARE pacote_quantidade_atual DOUBLE;
    
    -- Obter a quantidade atual do pacote
    SELECT quantidade INTO pacote_quantidade_atual
    FROM pacotes
    WHERE id = NEW.pacote_id;
    
    -- Verificar se a quantidade é maior que zero antes de decrementar
    IF pacote_quantidade_atual > 0 THEN
        -- Decrementar a quantidade do pacote
        UPDATE pacotes
        SET quantidade = pacote_quantidade_atual - NEW.quantidade
        WHERE id = NEW.pacote_id;
    END IF;
END;

//

DELIMITER ;


-- Fazer trigger para quando tiver um update em pedidos_pacotes para a quantidade do pacote ser atualizada conforme a diferença (somar a quantidade de pacotes mais a diferença entre o OLD e NEW do pedidos_pacotes)
DELIMITER //

CREATE TRIGGER atualizar_quantidade
AFTER UPDATE ON pedidos_pacotes
FOR EACH ROW
BEGIN
    DECLARE pacote_quantidade_atual DOUBLE;
    DECLARE diferenca_quantidade DOUBLE;
    
    -- Obter a quantidade atual do pacote
    SELECT quantidade INTO pacote_quantidade_atual
    FROM pacotes
    WHERE id = NEW.pacote_id;
    
    -- Calcular a diferença na quantidade
    SET diferenca_quantidade = NEW.quantidade - OLD.quantidade;
    
    -- Atualizar a quantidade do pacote
    UPDATE pacotes
    SET quantidade = pacote_quantidade_atual + diferenca_quantidade
    WHERE id = NEW.pacote_id;
END;

//

DELIMITER ;
