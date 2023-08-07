*All the information regarding this project is in this README file only*

To start the project, 
* first clone this project in your system,
* then run "npm install" command in your terminal to install dependencies,
* Then put command "npm run start" to start the server
* It will start on port 8080.

*Before starting this project, link your local mysql and you can make the tables according to the db_schema provided with this project*

Run the mysql server, initialize it inside db.config.ts and you are ready to go with this app.
You can test this APIs with postman or any other api testing frameworks

In case you didn't get anything about the code or the functionalities then I am available to respond to your queries, my email id is "pp971827@gmail.com".

*API Documentation*

All Routes with their functionalities:

//auth routes
1. POST /api/v1/auth/login,
it is used for login, 
req.params = { 
    email: "test@email.com", 
    password: "testpassword" 
    }

2. GET /api/v1/auth/logout,
it is used for logout,
req.headers.authorization should be there with Bearer token

3. POST /api/v1/auth/signup,
it is used for register,
req.body = {
    name: "test name"
    email: "test@email.com",
    password: "testpassword@123",
    phone: "123456789",
    address: "test city"
}

//products routes
4. GET /api/v1/products/categories,
it is used to get all the product categories,

5. GET /api/v1/products/:category,
it is used to get all the product under the given category
req.query.category = "example category"

6. GET /api/v1/products/:productId,
it is used to get specified product detail by productId,
re.query.productId = "test_product_id"

//cart routes
7. GET /api/v1/cart,
It is used to get all the cart items

8. POST /api/v1/cart/add,
it is used to adding cart item, 
req.params.data = {
    id: "unique ulid",
  user_id: "test user id",
  product_id: "test product id",
  variant: 1
  quantity: 1
}

9. POST /api/v1/cart/update/:productId,
it is used for updating cart item,
req.query.productId = "test product id",
req.params.data = {
    quantity: 2 //you can insert whatever number you want
}

10. POST /api/v1/cart/remove/:productId,
it is used for removing cart item,
req.query.productId = "test product id"

//orders routes
11. GET /api/v1/orders,
It is used to get all the user's past orders

12. POST /api/v1/orders/add,
it is used to adding an order, 
req.params.data = {
  order_id: "unique ulid",
  user_id: "user_id",
  product_id: "product_id",
  status: "status",
  item_subtotal:, 100,
  shipping_price: 50,
  total_price: 150,
  payment_method: "payment_method",
  shipping_address: "shipping_address",
  shipped_to: "shipped_to",
  transaction_id: "transaction_id",
  order_date: 971491943698, //all dates are stored in UTC millisecond format
  delivery_date: 12879813478,
};

13. POST /api/v1/cart/update/:orderId,
it is used for updating an existing order,
req.query.orderId = "test order id",
req.params.data = req.params.data = {
  status: "status",
  shipping_address: "shipping_address",
  shipped_to: "shipped_to",
};