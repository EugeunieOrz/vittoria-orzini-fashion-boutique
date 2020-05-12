Vittoria Orzini Fashion Boutique and Online Store
==================================================

Promo:

* Online shopping store: https://vittoria-orzini-boutique.herokuapp.com
* Administration panel: https://vittoria-orzini-boutique-admin.herokuapp.com

* Development mode forked from: https://github.com/setusoft/silhouette-play-react-seed
* Production mode forked from: https://github.com/yohangz/scala-play-react-seed

#### Features

* Add item to shopping bag and edit item quantity / sizes.
* Add item to wishlist, turn on last item alert notifications.
* Proceed to checkout, use addresses and card details previously saved in My Account.
* Get Order Confirmation email to your inbox.
* Follow your order and check its status.
* Return your order, get refund / partial refund for the purchased items.
* Subscribe to a weekly newsletter.
* Create account, edit and save your personal details in My Account
* Credit card details are encrypted with libsodium
* Transactions are done through sandbox account of Authorize.Net
* Admin panel: view products, customers, orders, transactions

Website is divided into backend written in Scala using Play framework and MongoDB persistence layer
and frontend written in React.js using Redux for managing state.

This repository is only a part of the online boutique. It includes such functionalities as
* Register / Create account, reset password.
* Edit and save your personal details, update your newsletter preferences in My Account.

#### Installation

Install all NPM dependencies for the UI:

```bash
cd app-ui

# With NPM
npm install


#### Run in dev mode

Start the application with the following command.

```
sbt run
```

You can open `http://localhost:9000` which redirects you to `http://localhost:5000`. Or you open the UI directly with `http://localhost:5000`. (Note that mongo must be already started)
