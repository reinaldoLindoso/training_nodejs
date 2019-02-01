DROP TABLE IF EXISTS TB_HEROIS;

CREATE TABLE TB_HEROIS(
    ID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY NOT NULL,
    NOME TEXT NOT NULL,
    PODER TEXT NOT NULL
)

-- Create
insert into TB_HEROIS(nome, poder)
values 
    ('Flash', 'Velocidade'),
    ('Aquaman', 'Falar com animais marinhos'),
    ('Batman', 'Dinheiro')

-- Read
Select * from TB_HEROIS;
Select * from TB_HEROIS where nome = 'Flash';
Select nome from TB_HEROIS where nome = 'Flash';

-- Update
UPDATE TB_HEROIS 
SET NOME = 'Goku', PODER='Deus'
WHERE ID = 1;

-- Delete
DELETE FROM TB_HEROIS WHERE ID = 2;