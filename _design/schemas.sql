CREATE TABLE Restaurants (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    thumbnail VARCHAR(255),
    about TEXT,
    allergens_info TEXT,
    telephone VARCHAR(20),
    hygiene_description TEXT,
    hygiene_rating INT,
    hygiene_rating_image VARCHAR(255),
    hygiene_rating_url VARCHAR(255),
    address VARCHAR(255),
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    notes TEXT
);

CREATE TABLE Menu (
    id INT PRIMARY KEY AUTO_INCREMENT,
    restaurant_id INT,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    min_price DECIMAL(10, 2),
    overall_rating DECIMAL(3, 2),
    FOREIGN KEY (restaurant_id) REFERENCES Restaurants(id)
);

CREATE TABLE Menu_Sections (
    id INT PRIMARY KEY AUTO_INCREMENT,
    menu_id INT,
    name VARCHAR(255) NOT NULL,
    FOREIGN KEY (menu_id) REFERENCES Menus(id)
);

CREATE TABLE Products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    menu_section_id INT,
    name VARCHAR(255) NOT NULL,
    thumbnail VARCHAR(255),
    calories VARCHAR(50),
    price DECIMAL(10, 2),
    short_description TEXT,
    description TEXT,
    FOREIGN KEY (section_id) REFERENCES Menu_Sections(id)
);

CREATE TABLE Product_Options (
    id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT,
    option_display_name VARCHAR(255) NOT NULL,
    option_name VARCHAR(255) NOT NULL,
    short_description TEXT,
    option_required_flg TINYINT(1),
    option_selection_type TINYINT(1),
    FOREIGN KEY (product_id) REFERENCES Products(id)
);

CREATE TABLE Option_Items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    option_id INT,
    name VARCHAR(255) NOT NULL,
    allergens TEXT,
    calories INT,
    price DECIMAL(10, 2),
    FOREIGN KEY (option_id) REFERENCES Product_Options(id)
);

CREATE TABLE Reviews (
    id INT PRIMARY KEY AUTO_INCREMENT,
    restaurant_id INT,
    user_id INT,
    rating INT,
    comment TEXT,
    date DATE,
    FOREIGN KEY (restaurant_id) REFERENCES Restaurants(id),
    FOREIGN KEY (user_id) REFERENCES Users(id)
);

CREATE TABLE Users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    avatar VARCHAR(255),
    is_admin TINYINT(1) DEFAULT 0
);

CREATE TABLE Orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    restaurant_id INT,
    total_amount DECIMAL(10, 2),
    status ENUM('pending', 'processing', 'completed', 'cancelled'),
    order_date DATETIME,
    FOREIGN KEY (user_id) REFERENCES Users(id),
    FOREIGN KEY (restaurant_id) REFERENCES Restaurants(id)
);

CREATE TABLE Order_Items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT,
    product_id INT,
    quantity INT,
    price DECIMAL(10, 2),
    FOREIGN KEY (order_id) REFERENCES Orders(id),
    FOREIGN KEY (product_id) REFERENCES Products(id)
);