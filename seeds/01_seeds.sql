INSERT INTO  users
  (name, email, password)
VALUES
  ("Gabi", "GabiGeollege@Email.com", "$2a$10$FB
/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u."),
  ("Dat Boi", "DatBoi@Email.com", "$2a$10$FB
/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u."),
  ("Doge", "Doge@Email.com", "$2a$10$FB
/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.");

INSERT INTO properties
  (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
VALUES
  (1, "speed lamp", description, "https:images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350)", "https:images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg", 930.61, 6, 4, 8, "Canada", "536 Namsub
  Highway", "Sotboske", "Quebec", "V0N3A7", true), 
  (1, "Blank corner", description, "https:images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350)", "https:images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg", 24.98, 4, 1, 9, "Canada", "6208 Baillie Rd", "Sechelt", "British Columbia", "V0N3A7", true),
  (2, "habit mix", description, "https:images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350)", "https:images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg", 600.90, 10, 20, 40, "Canada", "123 Main Street", "Vancouver", "British Columbia", "V0N3A7", true
);

INSERT INTO reservations
  (start_date, end_date, property_id, guest_id)
VALUES
  ('2018-09-11', '2018-09-26', 1, 1),
  ('2019-01-04', '2019-02-01', 2, 2),
  ('2021-10-01', '2021-10-14', 3, 3);

INSERT INTO property_reviews
  (guest_id, property_id, reservation_id, rating, message)
VALUES
  (2, 1, 3, 3, message),
  (1, 2, 1, 5, message),
  (3, 3, 2, 4, message);

