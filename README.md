# CakeShop

CakeShop is an e-commerce website for browsing and purchasing cakes. The platform allows users to explore various cake categories, place orders, and manage their shopping cart.

## Features
- Browse a variety of cakes
- Add cakes to the cart
- User authentication
- Secure checkout process
- Admin panel for managing products and orders

## Technologies Used
- Frontend: React.js
- Backend: PHP
- Database: MySQL
- Styling: Tailwind CSS

## Installation

### Prerequisites
- Node.js & npm installed
- PHP & Composer installed
- Database setup (MySQL)

### Steps to Install
1. Clone the repository:
   ```sh
   git clone https://github.com/fredrick-mwaura/CakeShop.git
   cd CakeShop
   ```
2. Install dependencies:
   ```sh
   npm install  # For frontend dependencies
   composer install  # For backend dependencies
   ```
3. Set up environment variables:
   ```sh
   cp .env.example .env
   ```
   - Update database credentials in `.env`

4. Run database migrations:
   ```sh
   php artisan migrate --seed
   ```
5. Start the development server:
   ```sh
   npm run dev   # Start frontend (React.js)
   php artisan serve  # Start PHP backend
   ```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
This project is licensed under the MIT License.

## Contact
For any inquiries, reach out via GitHub issues.

[fredrickmwaura691@gmail.com]
