DROP TABLE IF EXISTS reviews;

CREATE TABLE reviews (
    id SERIAL,
    product_id INTEGER,
    rating INTEGER,
    date BIGINT,
    summary VARCHAR(255),
    body VARCHAR,
    recommend BOOLEAN,
    reported BOOLEAN,
    reviewer_name VARCHAR,
    reviewer_email VARCHAR,
    response VARCHAR(255),
    helpfulness INTEGER
);


-- copy reviews(id, product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness)
-- from '/Users/annapeberdy/Desktop/SDC/reviews/seeders/reviewsData/reviews.csv'
-- delimiter ','
-- csv header;

DROP TABLE IF EXISTS photos;

CREATE TABLE photos (
  id SERIAL,
  review_id VARCHAR(255),
  url TEXT
 id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    review_id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false
    }
)