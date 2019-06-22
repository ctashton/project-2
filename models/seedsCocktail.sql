--For neat_db fifth idea--

USE neat_db;

CREATE TABLE cocktail_tab (
  id INT NOT NULL,
  name VARCHAR(100) NOT NULL,
  category VARCHAR(100) NULL,
  glass VARCHAR(100) NULL,
  instructions VARCHAR(255) NULL,
  picture VARCHAR(100) NULL,
  ing VARCHAR(8000) NOT NULL, 
  PRIMARY KEY (id)
);

CREATE TABLE user_tab(
  id INT NOT NULL,
  name VARCHAR(100) NOT NULL,
  password VARCHAR(100) NOT NULL,
  PRIMARY KEY (id)
);


--1--
INSERT INTO cocktail_tab (name, category, glass, picture, instructions, ing)
VALUES ("Mojito" , "Cocktail" , "Highball glass" , "https://www.thecocktaildb.com/images/media/drink/rxtqps1478251029.jpg" , "Muddle mint leaves with sugar and lime juice. Add a splash of soda water and fill the glass with cracked ice. Pour the rum and top with soda water. Garnish and serve with straw.","Light rum, 2 -Lime, Juice of 1 -Sugar, 2 tsp -Mint, 3 -Soda water ");
--2--
INSERT INTO cocktail_tab (name, category, glass, picture, instructions, ing)
VALUES ("Old Fashioned" , "Cocktail" , "Old-fashioned glass" , "https://www.thecocktaildb.com/images/media/drink/vrwquq1478252802.jpg" , "Place sugar cube in old fashioned glass and saturate with bitters, add a dash of plain water. Muddle until dissolved.\r\nFill the glass with ice cubes and add whiskey.\r\n\r\nGarnish with orange twist, and a Cocktail_tab cherry." , "Bourbon, 4.5 cL -Angostura bitters, 2 dashes -Sugar, 1 cube -Water, dash ");
--3--
INSERT INTO cocktail_tab (name, category, glass, picture, instructions, ing)
VALUES ("Long Island Tea" , "Ordinary Drink" , "Highball glass" , "https://www.thecocktaildb.com/images/media/drink/ywxwqs1439906072.jpg" , "Combine all ingredients (except cola) and pour over ice in a highball glass. Add the splash of cola for color. Decorate with a slice of lemon and serve." , "Vodka, 1/2 oz -Light rum, 1/2 oz -Gin, 1/2 oz -Tequila, 1/2 oz -Lemon water, Juice of 1/2 -Coca-Cola, 1 splash  ");
--4--
INSERT INTO cocktail_tab (name, category, glass, picture, instructions, ing)
VALUES ("Negroni" , "Ordinary Drink" , "Old-fashioned glass" , "https://www.thecocktaildb.com/images/media/drink/tutwwv1439907127.jpg" , "Stir into glass over ice, garnish and serve." , "Gin, 1 oz /Campari, 1 oz /Sweet Vermouth, 1 oz ");
--5--
INSERT INTO cocktail_tab (name, category, glass, picture, instructions, ing)
VALUES ("Whiskey Sour" , "Ordinary Drink" , "Old-fashioned glass" , "https://www.thecocktaildb.com/images/media/drink/o56h041504352725.jpg" , "Shake with ice. Strain into chilled glass, garnish and serve. If served 'On the rocks', strain ingredients into old-fashioned glass filled with ice." ,"Blended whiskey, 2 oz -Lemon, Juice of 1/2 -Powdered sugar, 1/2 tsp -Cherry, 1 -Lemon , 1/2 slice ");
--6-- 
INSERT INTO cocktail_tab (name, category, glass, picture, instructions, ing)
VALUES ("Dry Martini" , "Cocktail" , "Cocktail glass" , "https://www.thecocktaildb.com/images/media/drink/71t8581504353095.jpg" ,"Gin, 2/3 oz -Dry Vermouth, 1/3 oz -Olive, 1 ");
--7--
