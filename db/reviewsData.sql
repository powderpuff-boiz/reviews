
DROP FUNCTION IF EXISTS getTheReviews;
DROP TABLE IF EXISTS characteristic_reviews;
DROP TABLE IF EXISTS characteristics;
DROP TABLE IF EXISTS photos;
DROP TABLE IF EXISTS reviews CASCADE;

/* Table 'reviews' */
CREATE TABLE reviews(
  id SERIAL NOT NULL,
  product_id varchar NOT NULL,
  rating integer NOT NULL,
  date BIGINT NOT NULL,
  summary text,
  body text,
  recommend boolean DEFAULT true,
  reported boolean DEFAULT false,
  reviewer_name varchar NOT NULL,
  reviewer_email varchar NOT NULL,
  response text,
  helpfulness integer DEFAULT 0,
  PRIMARY KEY(id)
);

copy reviews(id, product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness)
from '/Users/annapeberdy/Desktop/SDC/reviews/seeders/reviewsData/reviews.csv'
delimiter ','
csv header;
-- select setval('reviews_id_seq', select max(id) from reviews);
-- SET max_value = (SELECT MAX('id') FROM 'reviews');
-- SELECT setval('reviews_id_seq', max_value);
SELECT setval('reviews_id_seq', (SELECT MAX(id) FROM reviews));


/* Table 'photos' */
CREATE TABLE photos(
  id SERIAL,
  reviews_id integer NOT NULL,
  url text NOT NULL,
  PRIMARY KEY(id)
);

/* Relation 'reviews_photos' */
ALTER TABLE photos
  ADD CONSTRAINT reviews_photos FOREIGN KEY (reviews_id) REFERENCES reviews (id);

copy photos(id, reviews_id, url)
from '/Users/annapeberdy/Desktop/SDC/reviews/seeders/reviewsData/reviews_photos.csv'
delimiter ','
csv header;
SELECT setval('photos_id_seq', (SELECT MAX(id) FROM photos));


/* Table 'characteristics' */
CREATE TABLE "characteristics"(
  id SERIAL,
  product_id varchar(10) NOT NULL,
  "name" varchar NOT NULL,
  PRIMARY KEY(id)
);

copy characteristics(id, product_id, name)
from '/Users/annapeberdy/Desktop/SDC/reviews/seeders/reviewsData/characteristics.csv'
delimiter ','
csv header;
SELECT setval('characteristics_id_seq', (SELECT MAX(id) FROM characteristics));


/* Table 'characteristic_reviews' */
CREATE TABLE characteristic_reviews(
  id SERIAL,
  "value" integer NOT NULL,
  reviews_id integer NOT NULL,
  characteristic_id integer NOT NULL,
  PRIMARY KEY(id)
);



/* Relation 'reviews_characteristic_reviews' */
ALTER TABLE characteristic_reviews
  ADD CONSTRAINT reviews_characteristic_reviews
    FOREIGN KEY (reviews_id) REFERENCES reviews (id);

/* Relation 'characteristics_characteristic_reviews' */
ALTER TABLE characteristic_reviews
  ADD CONSTRAINT characteristics_characteristic_reviews
    FOREIGN KEY (characteristic_id) REFERENCES "characteristics" (id);

    copy characteristic_reviews(id, value, reviews_id, characteristic_id)
from '/Users/annapeberdy/Desktop/SDC/reviews/seeders/reviewsData/characteristic_reviews.csv'
delimiter ','
csv header;
SELECT setval('characteristic_reviews_id_seq', (SELECT MAX(id) FROM characteristic_reviews));


CREATE FUNCTION getTheReviews(
          page INTEGER = NULL,
          count INTEGER = NULL,
          productid TEXT = NULL
          )
          RETURNS SETOF reviews AS
          $BODY$
          DECLARE
           PageOffset INTEGER :=0;
          BEGIN

           PageOffset := ((page-1) * count);

           RETURN QUERY
            SELECT *
            FROM reviews
            WHERE product_id = productid
            ORDER BY date DESC
            LIMIT count
            OFFSET PageOffset;
         END;
         $BODY$
         LANGUAGE plpgsql;

