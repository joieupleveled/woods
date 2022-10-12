--This file will not run here, only writing it here
--The query here will be ran in the database
--Example queries

--Create wood table
CREATE TABLE woods (
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name varchar(30) NOT NULL,
  type varchar(30) NOT NULL,
  description varchar(200) NOT NULL,
  price integer
);


--Insert woods
INSERT INTO woods
(name, type, description, price)
VALUES
( 'Green Wood', 'Hickory and Cherry', 'Freshly split, needs to be stacked and dried', 100),
( 'Softwood', 'Cedar, Pine, and Juniper', 'Kiln dried and officially ready to burn', 200),
( 'Hardwood', 'Birch, Cherry, and Walnut', ' Perfect for a long slow burn with maximum heat output', 300),
( 'Pellets', ' Hardwood and softwood', 'Highly flammable, burn extremely efficiently and produce very little ash', 300),


--Get information back from the database
SELECT * FROM woods;
