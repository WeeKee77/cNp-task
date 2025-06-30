import fetch from 'node-fetch';
import { faker } from '@faker-js/faker';

const endpoint = 'http://localhost:3333/graphql';

const mutation = `
  mutation createManyStarships($newStarshipsData: [NewStarshipInput!]!) {
    createManyStarships(newStarshipsData: $newStarshipsData) {
      crew
    }
  }
`;

const capitalize = ([first, ...rest]) =>
  first.toUpperCase() + rest.join('').toLowerCase();

const randomStarship = (i) => ({
  name: `${capitalize(faker.food.adjective())} ${capitalize(
    faker.food.ingredient()
  )} ${faker.number.int({ max: 100 }) * 10 ** faker.number.int({ max: 10 })}`,
  // model: `Model-${Math.floor(Math.random() * 1000)}`,
  // manufacturer: `Maker-${Math.floor(Math.random() * 100)}`,
  crew: Math.ceil(Math.random() * 1000000) + 1000,
  // hyperdriveRating: parseFloat((Math.random() * 5).toFixed(2)),
  // class: ['Explorer', 'Fighter', 'Transport'][i % 3],
});

const data = Array.from({ length: 100 }, (_, i) => randomStarship(i + 1));

fetch(endpoint, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    query: mutation,
    variables: { newStarshipsData: data },
  }),
})
  .then((res) => res.json())
  .then((res) => {
    if (res.errors) {
      console.error('❌ GraphQL Error:', res.errors);
    } else {
      console.log(`✅ Created ${res.data} starships`);
    }
    console.log(res);
  })
  .catch(console.error);
