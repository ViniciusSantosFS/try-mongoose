DROP TABLE IF EXISTS TB_HEROIS;

CREATE TABLE TB_HEROIS (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY NOT NULL,
    nome TEXT NOT NULL,
    poder TEXT NOT NULL
);


INSERT INTO TB_HEROIS (nome, poder) VALUES
('Flash', 'Super Velocidade'),
('Aquaman', 'Falar com os animais'),
('Batman', 'Rico')


UPDATE TB_HEROIS SET nome = 'Goku', poder = 'Deus' WHERE id = 1

DELETE FROM TB_HEROIS WHERE id = 2