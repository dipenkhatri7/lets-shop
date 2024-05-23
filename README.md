# Let's Shop

This is a mobile application built with React Native that allows users to browse products, add them to the cart, and proceed to checkout. It fetches product data from an external API and provides features such as product search, cart management, and user authentication.

## Features

- Product listing page with features:
  - Fetches products from the provided API endpoint.
  - Displays a list of products with images, titles, prices, and quantity selection.
  - Allows users to adjust the quantity of products before adding them to the cart.
  - Implements "Add to Cart" functionality.
  - Allows users to favourite the product. 
  - Provides navigation to the cart/checkout page.

- Cart/Checkout page with features:
  - Displays added products with details like images, titles, prices, selected quantities, and total prices.
  - Allows users to adjust the quantity of products or remove them from the cart.
  - Shows the total amount of the cart.

- Additional Features:
  - User authentication/login.
  - User can Search for the product.
  - User can view their favourited products.
 
## Installation and Setup

To run the application locally, follow these steps:

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/dipenkhatri7/lets-shop

2. Navigate to the project directory:

   ```bash
   cd lets-shop
   
3. Install dependencies using npm or yarn:
   ```bash
   npm install
   # or
   yarn install
4. Ensure you have the required development environment set up for React Native. Follow the [official documentation](https://reactnative.dev/docs/getting-started) if you haven't done this before.
5. Connect a mobile device or start an emulator/simulator.
6. Run the application:
    ```bash
    npm start
    # or
    yarn start

## Usage

1. Upon launching the application, you will be directed to the onboarding screen.
2. Log in or register an account, which is done through Firebase.
3. Explore all available products and best offers on the homepage.
4. Utilize the search functionality to find specific products.
5. Access the cart screen to view and manage the products added to your cart, as well as view the total.
6. Favorite products to easily access them later from the favorites screen accessible via the drawer.
7. Log out to clear authentication tokens and enhance app security.
