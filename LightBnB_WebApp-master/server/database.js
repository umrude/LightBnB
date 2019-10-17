const properties = require('./json/properties.json');
const users = require('./json/users.json');
const { Pool } = require('pg');
const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});
/// Users

module.exports = {
  getUserWithEmail:  function(email) {
    return pool.query(`
  SELECT *
  FROM users
  WHERE email = $1;
  `, [email])
      .then(res => res.rows[0])
      .catch(e => console.error(e.stack));
  },
  getUserWithId: function(id) {
    return pool.query(`
  SELECT *
  FROM users
  WHERE id = $1;
  `, [id])
      .then(res => res.rows[0])
      .catch(e => console.error(e.stack));
  },

  addUser:  function(user) {
    const values = [user.name, user.email, user.password];
    return pool.query(`
  INSERT INTO  users (name, email, password)
  VALUES 
  ($1, $2, $3) RETURNING *;`, values)
      .then(res => res.rows[0])
      .catch(e => console.error(e.stack));
  },

  getAllReservations: function(guest_id, limit = 10) {
    return pool.query(`
  SELECT properties.*, avg(property_reviews.rating) as average_rating
FROM reservations
  JOIN properties ON reservations.property_id = properties.id
  JOIN property_reviews ON properties.id = property_reviews.property_id
WHERE reservations.guest_id = $1
  AND reservations.end_date < now()::date
GROUP BY properties.id, reservations.id
ORDER BY reservations.start_date
LIMIT $2;
  `, [Number(guest_id), limit])
      .then(res => res.rows)
      .catch(e => console.error(e.stack));
  },
  getAllProperties: function(options, limit = 10) {
    const queryParams = [];
    // 2
    let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  LEFT JOIN property_reviews ON properties.id = property_id
  `;

    // 3
    if (options.city) {
      queryParams.push(`%${options.city}%`);
      queryString += `WHERE city LIKE $${queryParams.length} `;
    }
    if (options.owner_id) {
      queryParams.push(options.owner_id);
      queryString += `WHERE owner_id = $${queryParams.length} `;
    }
    if (options.minimum_price_per_night) {
      queryParams.push(`${options.minimum_price_per_night * 100}`);
      queryString += `AND properties.cost_per_night >= $${queryParams.length} `;
    }

    if (options.maximum_price_per_night) {
      queryParams.push(`${options.maximum_price_per_night * 100}`);
      queryString += `AND properties.cost_per_night <= $${queryParams.length} `;
    }

    if (options.minimum_rating) {
      queryParams.push(`${options.minimum_rating}`);
      queryString += `AND rating >= $${queryParams.length} `;
    }


    // 4
    queryParams.push(limit);
    queryString += `
  GROUP BY properties.id
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;
    // 5
    console.log(queryString, queryParams);

    // 6
    return pool.query(queryString, queryParams)
      .then(res => res.rows);
  },
  addProperty: function(property) {
    const values =
    [property.owner_id,
      property.title,
      property.description,
      property.thumbnail_photo_url,
      property.cover_photo_url,
      property.cost_per_night,
      property.parking_spaces,
      property.number_of_bathrooms,
      property.number_of_bathrooms,
      property.country,
      property.street,
      property.city,
      property.province,
      property.post_code];

    return pool.query(`
  INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code)
  VALUES 
  ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) 
  RETURNING *;
  `, values)
      .then(res => res.rows[0])
      .catch(e => console.error(e.stack));
  }
};

