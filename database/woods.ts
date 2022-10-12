// This only simulates a database
// DO NOT COPY THIS FILE FOR THE PROJECT
// Use PostgreSQL-similar to this databas

import { sql } from './connect';

// Define the structure of wood object so we can use it
export type Wood = {
  id: number;
  name: string;
  type: string;
  description: string | null;
  price: number
};

// Calling/Getting all the woods
export async function getWoods() {
  const woods = await sql<Wood[]>`
  SELECT
    *
  FROM
    woods;
`;

  return woods;
}

// How to get the information of a specific/single wood by ID?
export async function getWoodById(id: number) {
  // Pluck something from array without using index(Destructure the array[wood])
  const [wood] = await sql<[Wood]>`
    SELECT
      *
    FROM
      woods
    WHERE
      id = ${id}
  `;
  return wood;
}
// Now, we are getting this data from the database

// export const woods = [
//   {
//     id: 1,
//     name: 'Green Wood',
//     src: 'green wood',
//     Type: 'Hickory and Cherry',
//     Description: 'Freshly split, needs to be stacked and dried',
//     Price: 100,
//   },
//   {
//     id: 2,
//     name: 'Softwood',
//     src: 'softwood',
//     Type: 'Cedar, Pine, and Juniper',
//     Description: 'Kiln dried and officially ready to burn',
//     Price: 200,
//   },
//   {
//     id: 3,
//     name: 'Hardwood',
//     src: 'hardwood',
//     Type: 'Birch, Cherry,  and Walnut',
//     Description: 'Perfect for a long slow burn with maximum heat output',
//     Price: 300,
//   },
//   {
//     id: 4,
//     name: 'Pellets',
//     src: 'pellets',
//     Type: 'Hardwood and softwood',
//     Description:
//       'Highly flammable, burn extremely efficiently and produce very little ash',
//     Price: 300,
//   },
//   {
//     id: 5,
//     name: 'Pellets',
//     src: 'pellets',
//     Type: 'Hardwood and softwood',
//     Description:
//       'Highly flammable, burn extremely efficiently and produce very little ash',
//     Price: 300,
//   },
// ];
