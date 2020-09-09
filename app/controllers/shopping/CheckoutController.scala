package controllers.shopping

/**
 * Author: Ievgeniia Ozirna
 *
 * Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
 */

import models.core.{
  AddItem,
  Address,
  Color,
  CountryAtPurchase,
  CreditCard,
  Customer,
  Item,
  CheckoutData1,
  CheckoutData2,
  CheckoutData3,
  CheckoutData4,
  CheckoutData5,
  Order,
  Registration,
  ShoppingBag,
  Size,
  User,
  Transaction,
  CardData,
  ResponseData,
  TransactionID,
  ResponseCode,
  AuthCode,
  AVSResultCode,
  CVVResultCode,
  CAVVResultCode,
  TransHashSha2
}
import java.nio.charset.StandardCharsets
import models.core.services.UserService
import com.mohiva.play.silhouette.api.Silhouette
import com.mohiva.play.silhouette.api.exceptions.ProviderException
import com.mohiva.play.silhouette.impl.exceptions.IdentityNotFoundException
import com.mohiva.play.silhouette.impl.providers.CredentialsProvider
import utils.core.json.APIFormats._
import utils.silhouette.{ BoutiqueEnv, CustomerController }
import utils.core.JSRouter
import utils.core.SomeMethods._
import models.shopping.services.{ItemService, OrderService, TransactionService }
import java.time.Clock
import java.util.UUID
import javax.inject.Inject
import net.ceedubs.ficus.Ficus._
import org.joda.time.DateTime
import play.api.i18n.{ Lang, Messages, MessagesApi }
import play.api.libs.json._
import play.api.libs.mailer.{ Email, MailerClient }
import play.api.mvc._
import play.api.Configuration
import play.api.http.HeaderNames
import reactivemongo.bson.BSONObjectID

import net.authorize.Environment
import net.authorize.api.contract.v1._
import net.authorize.api.controller.CreateTransactionController
import net.authorize.api.controller.base.ApiOperationBase

import scala.math.BigDecimal._
import scala.concurrent.{ ExecutionContext, Future }
import scala.collection.mutable.ArrayBuffer

/**
 * The `Shopping` controller.
 *
 * @param controllerComponents  The Play controller components.
 * @param productService        The products service.
 * @param ex                    The execution context.
 */
class CheckoutController @Inject() (
  val controllerComponents: ControllerComponents,
  val silhouette: Silhouette[BoutiqueEnv[User]],
  orderService: OrderService,
  itemService: ItemService,
  transactionService: TransactionService,
  userService: UserService,
  mailerClient: MailerClient,
  messagesApi: MessagesApi,
  config: Configuration,
  clock: Clock
)(
  implicit
  ex: ExecutionContext
) extends CustomerController {

  private val loginId = config.underlying.getString("gateway.api.login.id")
  private val transKey = config.underlying.getString("gateway.transaction.key")

  ApiOperationBase.setEnvironment(Environment.SANDBOX)
  private val merchAuthType: MerchantAuthenticationType = new MerchantAuthenticationType()
  merchAuthType.setName(loginId)
  merchAuthType.setTransactionKey(transKey)

  private def purchaseTheItems1(
    data: CheckoutData1,
    shoppingBag: ShoppingBag,
    user: User,
    arr: Seq[Item] => ArrayOfLineItem
  )(implicit request: RequestHeader): Future[Result] = {

    val paymentType: PaymentType = new PaymentType()
    val creditCard: CreditCardType = new CreditCardType()
    creditCard.setCardNumber(data.data.cardNumber)
    creditCard.setExpirationDate(data.data.month + data.data.year)
    creditCard.setCardCode(data.data.code)
    paymentType.setCreditCard(creditCard)

    val customer: CustomerDataType = new CustomerDataType()
    customer.setEmail(data.data.email)
    customer.setId(data.userID.toString.replace("BSONObjectID(\"", "").replace("\")", "").substring(0, 20))

    val txnReq: TransactionRequestType = new TransactionRequestType()
    txnReq.setTransactionType(TransactionTypeEnum.AUTH_CAPTURE_TRANSACTION.value())
    txnReq.setPayment(paymentType)
    txnReq.setCustomer(customer)

    val arrLineItems = arr(shoppingBag.addedItems)
    txnReq.setLineItems(arrLineItems)

    txnReq.setAmount(BigDecimal(shoppingBag.total).setScale(2, RoundingMode.CEILING).bigDecimal)
    txnReq.setTaxExempt(true)

    val custShipAddr: NameAndAddressType = new NameAndAddressType()
    custShipAddr.setFirstName(data.data.firstName)
    custShipAddr.setLastName(data.data.lastName)
    custShipAddr.setAddress(data.data.address)
    custShipAddr.setCity(data.data.city)
    custShipAddr.setState(data.data.province)
    custShipAddr.setZip(data.data.zipCode)
    custShipAddr.setCountry(data.data.country)

    txnReq.setShipTo(custShipAddr)

    val apiReq: CreateTransactionRequest = new CreateTransactionRequest()
    apiReq.setMerchantAuthentication(merchAuthType)
    apiReq.setTransactionRequest(txnReq)

    val controller: CreateTransactionController = new CreateTransactionController(apiReq)
    controller.execute()

    var resp: CreateTransactionResponse = new CreateTransactionResponse()
    resp = controller.getApiResponse()

    val newOrder = Order(
      id = shoppingBag.id,
      dateTime = clock.instant(),
      countryByIP = CountryAtPurchase(data.countryByIP),
      shoppingBag = ShoppingBag(
        id = shoppingBag.id,
        addedItems = shoppingBag.addedItems,
        total = shoppingBag.total
      ),
      status = "Order in processing"
    )

    val transaction = Transaction(
      id = newOrder.id,
      dateTime = clock.instant(),
      order = newOrder,
      customer = user,
      cardData = CardData(
        lastFourDigits = data.data.cardNumber takeRight 4,
        expiryDate = data.data.month + data.data.year
      ),
      responseData = None,
      refundTransaction = None,
      voidTransaction = None,
      settled = false
    )

    if (resp != null) {
      if (resp.getMessages().getResultCode() == MessageTypeEnum.OK) {
        val res: TransactionResponse = resp.getTransactionResponse()
        if (res.getMessages() != null) {

          val transID = res.getTransId()
          val responseCode = res.getResponseCode()
          val messageCode = res.getMessages().getMessage().get(0).getCode()
          val descr = res.getMessages().getMessage().get(0).getDescription()
          val authCode = res.getAuthCode()
          val avsRespCode = res.getAvsResultCode()
          val cvvRespCode = res.getCvvResultCode()
          val cavvRespCode = res.getCavvResultCode()
          val transHashSha2Value = res.getTransHashSha2()
          val accNum = res.getAccountNumber()
          val accType = res.getAccountType()

          transactionService.save(transaction.copy(
            responseData = Some(ResponseData(
              transactionID = TransactionID(transID),
              responseCode = Some(ResponseCode(responseCode)),
              messageCode = Some(messageCode),
              description = Some(descr),
              authCode = Some(AuthCode(authCode)),
              avsResultCode = Some(AVSResultCode(avsRespCode)),
              cvvResultCode = Some(CVVResultCode(cvvRespCode)),
              cavResultCode = Some(CAVVResultCode(cavvRespCode)),
              accountNumber = Some(accNum),
              accountType = Some(accType),
              transHashSha2 = Some(TransHashSha2(transHashSha2Value)),
              errorCode = None,
              errorMessage = None
            ))
          ))

          println(s"Successfully created transaction with Transaction ID: $transID")
          println(s"Response Code: $responseCode")
          println(s"Message Code: $messageCode")
          println(s"Description: $descr")
          println(s"Auth Code: $authCode")
          println(s"Address Verification Service Response Code: $avsRespCode")
          println(s"Cardholder Code Verification Response Code: $cvvRespCode")
          println(s"Cardholder Authentication Verification Response Code: $cavvRespCode")
          println(s"TransHash: $transHashSha2Value")
          println(s"Account Number: $accNum")
          println(s"Account Type: $accType")

        } else {
          println("Failed Transaction.")
          if (resp.getTransactionResponse().getErrors() != null) {
            val errCode = resp.getTransactionResponse().getErrors().getError().get(0).getErrorCode()
            val errMsg = resp.getTransactionResponse().getErrors().getError().get(0).getErrorText()

            transactionService.save(transaction.copy(
              responseData = Some(ResponseData(
                transactionID = TransactionID(UUID.randomUUID().toString),
                responseCode = None,
                messageCode = None,
                description = None,
                authCode = None,
                avsResultCode = None,
                cvvResultCode = None,
                cavResultCode = None,
                accountNumber = None,
                accountType = None,
                transHashSha2 = None,
                errorCode = Some(errCode),
                errorMessage = Some(errMsg)
              )))
            )
            println(s"Error Code: $errCode")
            println(s"Error message: $errMsg")
          }
        }
        // Response Result Code is OK, it's impossible to get messages from it
        shoppingBag.addedItems.map { addedItem =>
          updateItemsInStock(addedItem.category, addedItem)
        }

        if(user.title == "SIG." || user.title == "SIG.NA" || user.title == "SIG.RA") {
          mailerClient.send(Email(
            subject = messagesApi("checkout.email.order.confirmation.subject")(Lang("it")),
            from = messagesApi("email.from")(Lang("it")),
            to = Seq(data.data.email),
            bodyText = Some(
              twirl.shopping.views.txt.emails.orderConfirm(user, newOrder, data.data)(messagesApi, Lang("it")).body),
            bodyHtml = Some(
              twirl.shopping.views.html.emails.orderConfirm(user, newOrder, data.data)(messagesApi, Lang("it")).body)
          ))
        } else {
          mailerClient.send(Email(
            subject = messagesApi("checkout.email.order.confirmation.subject")(Lang("en")),
            from = messagesApi("email.from")(Lang("en")),
            to = Seq(data.data.email),
            bodyText = Some(
              twirl.shopping.views.txt.emails.orderConfirm(user, newOrder, data.data)(messagesApi, Lang("en")).body),
            bodyHtml = Some(
              twirl.shopping.views.html.emails.orderConfirm(user, newOrder, data.data)(messagesApi, Lang("en")).body)
          ))
        }

        orderService.save(newOrder)

        user.orders match {
          case Some(ordersSeq) =>
            println("there is some seq of orders")
            userService.save(user.copy(
              orders = Some(newOrder +: ordersSeq),
              shoppingBag = None
            )).map { saved =>
              Ok(ApiResponse(
                "checkout.items.purchased",
                Messages("checkout.items.purchased"),
                Json.toJson(saved)))
            }
          case None =>
            println("creating new seq of orders")
            userService.save(user.copy(
              orders = Some(Seq(newOrder)),
              shoppingBag = None
            )).map { saved =>
              Ok(ApiResponse(
                "checkout.items.purchased",
                Messages("checkout.items.purchased"), Json.toJson(saved)))
            }
        }
      } else {
        println("Failed Transaction.")
        if (resp.getTransactionResponse() != null && resp.getTransactionResponse().getErrors() != null) {
          val errCode = resp.getTransactionResponse().getErrors().getError().get(0).getErrorCode()
          val errMsg = resp.getTransactionResponse().getErrors().getError().get(0).getErrorText()

          transactionService.save(transaction.copy(
            responseData = Some(ResponseData(
              transactionID = TransactionID(UUID.randomUUID().toString),
              responseCode = None,
              messageCode = None,
              description = None,
              authCode = None,
              avsResultCode = None,
              cvvResultCode = None,
              cavResultCode = None,
              accountNumber = None,
              accountType = None,
              transHashSha2 = None,
              errorCode = Some(errCode),
              errorMessage = Some(errMsg)
            )))
          )
          println(s"Error Code: $errCode")
          println(s"Error message: $errMsg")
          Future.successful(BadRequest(
            ApiResponse("shopping.checkout.failed", Messages("shopping.checkout.failed"))
          ))

        } else {
          val errCode = resp.getMessages().getMessage().get(0).getCode()
          val errMsg = resp.getMessages().getMessage().get(0).getText()

          transactionService.save(transaction.copy(
            responseData = Some(ResponseData(
              transactionID = TransactionID(UUID.randomUUID().toString),
              responseCode = None,
              messageCode = None,
              description = None,
              authCode = None,
              avsResultCode = None,
              cvvResultCode = None,
              cavResultCode = None,
              accountNumber = None,
              accountType = None,
              transHashSha2 = None,
              errorCode = Some(errCode),
              errorMessage = Some(errMsg)
            )))
          )
          println(s"Error Code: $errCode")
          println(s"Error message: $errMsg")
          Future.successful(BadRequest(
            ApiResponse("shopping.checkout.failed", Messages("shopping.checkout.failed"))
          ))
        }
      }

    } else {
      val errResp: ANetApiResponse = controller.getErrorResponse()
      println("Failed to get response");
      if (!errResp.getMessages().getMessage().isEmpty()) {
        val errCode = errResp.getMessages().getMessage().get(0).getCode()
        val errMsg = errResp.getMessages().getMessage().get(0).getText()

        transactionService.save(transaction.copy(
          responseData = Some(ResponseData(
            transactionID = TransactionID(UUID.randomUUID().toString),
            responseCode = None,
            messageCode = None,
            description = None,
            authCode = None,
            avsResultCode = None,
            cvvResultCode = None,
            cavResultCode = None,
            accountNumber = None,
            accountType = None,
            transHashSha2 = None,
            errorCode = Some(errCode),
            errorMessage = Some(errMsg)
          )))
        )
        println(s"Error: $errCode \n $errMsg")
      }
      Future.successful(BadRequest(
        ApiResponse("shopping.checkout.failed", Messages("shopping.checkout.failed"))
      ))
    }

  }

  private def purchaseTheItems2(
    data: CheckoutData2,
    shippingAddress: Address,
    shoppingBag: ShoppingBag,
    user: User,
    arr: Seq[Item] => ArrayOfLineItem
  )(implicit request: RequestHeader): Future[Result] = {

    val paymentType: PaymentType = new PaymentType()
    val creditCard: CreditCardType = new CreditCardType()
    creditCard.setCardNumber(data.data.cardNumber)
    creditCard.setExpirationDate(data.data.month + data.data.year)
    creditCard.setCardCode(data.data.code)
    paymentType.setCreditCard(creditCard)

    val customer: CustomerDataType = new CustomerDataType()
    customer.setEmail(shippingAddress.email)
    customer.setId(data.userID.toString.replace("BSONObjectID(\"", "").replace("\")", "").substring(0, 20))

    val txnReq: TransactionRequestType = new TransactionRequestType()
    txnReq.setTransactionType(TransactionTypeEnum.AUTH_CAPTURE_TRANSACTION.value())
    txnReq.setPayment(paymentType)
    txnReq.setCustomer(customer)

    val arrLineItems = arr(shoppingBag.addedItems)
    txnReq.setLineItems(arrLineItems)

    txnReq.setAmount(BigDecimal(shoppingBag.total).setScale(2, RoundingMode.CEILING).bigDecimal)
    txnReq.setTaxExempt(true)

    val custShipAddr: NameAndAddressType = new NameAndAddressType()
    custShipAddr.setFirstName(shippingAddress.firstName)
    custShipAddr.setLastName(shippingAddress.lastName)
    custShipAddr.setAddress(shippingAddress.address)
    custShipAddr.setCity(shippingAddress.city)
    custShipAddr.setState(shippingAddress.state)
    custShipAddr.setZip(shippingAddress.zipCode)
    custShipAddr.setCountry(shippingAddress.country)

    txnReq.setShipTo(custShipAddr)

    val apiReq: CreateTransactionRequest = new CreateTransactionRequest()
    apiReq.setMerchantAuthentication(merchAuthType)
    apiReq.setTransactionRequest(txnReq)

    val controller: CreateTransactionController = new CreateTransactionController(apiReq)
    controller.execute()

    var resp: CreateTransactionResponse = new CreateTransactionResponse()
    resp = controller.getApiResponse()

    val newOrder = Order(
      id = shoppingBag.id,
      dateTime = clock.instant(),
      countryByIP = CountryAtPurchase(data.countryByIP),
      shoppingBag = ShoppingBag(
        id = shoppingBag.id,
        addedItems = shoppingBag.addedItems,
        total = shoppingBag.total
      ),
      status = "Order in processing"
    )

    val transaction = Transaction(
      id = newOrder.id,
      dateTime = clock.instant(),
      order = newOrder,
      customer = user,
      cardData = CardData(
        lastFourDigits = data.data.cardNumber takeRight 4,
        expiryDate = data.data.month + data.data.year
      ),
      responseData = None,
      refundTransaction = None,
      voidTransaction = None,
      settled = false
    )

    if (resp != null) {
      if (resp.getMessages().getResultCode() == MessageTypeEnum.OK) {
        val res: TransactionResponse = resp.getTransactionResponse()
        if (res.getMessages() != null) {

          val transID = res.getTransId()
          val responseCode = res.getResponseCode()
          val messageCode = res.getMessages().getMessage().get(0).getCode()
          val descr = res.getMessages().getMessage().get(0).getDescription()
          val authCode = res.getAuthCode()
          val avsRespCode = res.getAvsResultCode()
          val cvvRespCode = res.getCvvResultCode()
          val cavvRespCode = res.getCavvResultCode()
          val transHashSha2Value = res.getTransHashSha2()
          val accNum = res.getAccountNumber()
          val accType = res.getAccountType()

          transactionService.save(transaction.copy(
            responseData = Some(ResponseData(
              transactionID = TransactionID(transID),
              responseCode = Some(ResponseCode(responseCode)),
              messageCode = Some(messageCode),
              description = Some(descr),
              authCode = Some(AuthCode(authCode)),
              avsResultCode = Some(AVSResultCode(avsRespCode)),
              cvvResultCode = Some(CVVResultCode(cvvRespCode)),
              cavResultCode = Some(CAVVResultCode(cavvRespCode)),
              accountNumber = Some(accNum),
              accountType = Some(accType),
              transHashSha2 = Some(TransHashSha2(transHashSha2Value)),
              errorCode = None,
              errorMessage = None
            ))
          ))

          println(s"Successfully created transaction with Transaction ID: $transID")
          println(s"Response Code: $responseCode")
          println(s"Message Code: $messageCode")
          println(s"Description: $descr")
          println(s"Auth Code: $authCode")
          println(s"Address Verification Service Response Code: $avsRespCode")
          println(s"Cardholder Code Verification Response Code: $cvvRespCode")
          println(s"Cardholder Authentication Verification Response Code: $cavvRespCode")
          println(s"TransHash: $transHashSha2Value")
          println(s"Account Number: $accNum")
          println(s"Account Type: $accType")

        } else {
          println("Failed Transaction.")
          if (resp.getTransactionResponse().getErrors() != null) {
            val errCode = resp.getTransactionResponse().getErrors().getError().get(0).getErrorCode()
            val errMsg = resp.getTransactionResponse().getErrors().getError().get(0).getErrorText()

            transactionService.save(transaction.copy(
              responseData = Some(ResponseData(
                transactionID = TransactionID(UUID.randomUUID().toString),
                responseCode = None,
                messageCode = None,
                description = None,
                authCode = None,
                avsResultCode = None,
                cvvResultCode = None,
                cavResultCode = None,
                accountNumber = None,
                accountType = None,
                transHashSha2 = None,
                errorCode = Some(errCode),
                errorMessage = Some(errMsg)
              )))
            )
            println(s"Error Code: $errCode")
            println(s"Error message: $errMsg")
          }
        }
        // Response Result Code is OK, it's impossible to get messages from it
        shoppingBag.addedItems.map { addedItem =>
          updateItemsInStock(addedItem.category, addedItem)
        }

        if(user.title == "SIG." || user.title == "SIG.NA" || user.title == "SIG.RA") {
          mailerClient.send(Email(
            subject = messagesApi("checkout.email.order.confirmation.subject")(Lang("it")),
            from = messagesApi("email.from")(Lang("it")),
            to = Seq(shippingAddress.email),
            bodyText = Some(
              twirl.shopping.views.txt.emails.orderConfirm2(
                user, newOrder, shippingAddress)(messagesApi, Lang("it")).body),
            bodyHtml = Some(
              twirl.shopping.views.html.emails.orderConfirm2(
                user, newOrder, shippingAddress)(messagesApi, Lang("it")).body)
          ))
        } else {
          mailerClient.send(Email(
            subject = messagesApi("checkout.email.order.confirmation.subject")(Lang("en")),
            from = messagesApi("email.from")(Lang("en")),
            to = Seq(shippingAddress.email),
            bodyText = Some(
              twirl.shopping.views.txt.emails.orderConfirm2(
                user, newOrder, shippingAddress)(messagesApi, Lang("en")).body),
            bodyHtml = Some(
              twirl.shopping.views.html.emails.orderConfirm2(
                user, newOrder, shippingAddress)(messagesApi, Lang("en")).body)
          ))
        }

        orderService.save(newOrder)

        user.orders match {
          case Some(ordersSeq) =>
            println("there is some seq of orders")
            userService.save(user.copy(
              orders = Some(newOrder +: ordersSeq),
              shoppingBag = None
            )).map { saved =>
              Ok(ApiResponse(
                "checkout.items.purchased",
                Messages("checkout.items.purchased"),
                Json.toJson(saved)))
            }
          case None =>
            println("creating new seq of orders")
            userService.save(user.copy(
              orders = Some(Seq(newOrder)),
              shoppingBag = None
            )).map { saved =>
              Ok(ApiResponse(
                "checkout.items.purchased",
                Messages("checkout.items.purchased"), Json.toJson(saved)))
            }
        }
      } else {
        println("Failed Transaction.")
        if (resp.getTransactionResponse() != null && resp.getTransactionResponse().getErrors() != null) {
          val errCode = resp.getTransactionResponse().getErrors().getError().get(0).getErrorCode()
          val errMsg = resp.getTransactionResponse().getErrors().getError().get(0).getErrorText()

          transactionService.save(transaction.copy(
            responseData = Some(ResponseData(
              transactionID = TransactionID(UUID.randomUUID().toString),
              responseCode = None,
              messageCode = None,
              description = None,
              authCode = None,
              avsResultCode = None,
              cvvResultCode = None,
              cavResultCode = None,
              accountNumber = None,
              accountType = None,
              transHashSha2 = None,
              errorCode = Some(errCode),
              errorMessage = Some(errMsg)
            )))
          )
          println(s"Error Code: $errCode")
          println(s"Error message: $errMsg")
          Future.successful(BadRequest(
            ApiResponse("shopping.checkout.failed", Messages("shopping.checkout.failed"))
          ))

        } else {
          val errCode = resp.getMessages().getMessage().get(0).getCode()
          val errMsg = resp.getMessages().getMessage().get(0).getText()

          transactionService.save(transaction.copy(
            responseData = Some(ResponseData(
              transactionID = TransactionID(UUID.randomUUID().toString),
              responseCode = None,
              messageCode = None,
              description = None,
              authCode = None,
              avsResultCode = None,
              cvvResultCode = None,
              cavResultCode = None,
              accountNumber = None,
              accountType = None,
              transHashSha2 = None,
              errorCode = Some(errCode),
              errorMessage = Some(errMsg)
            )))
          )
          println(s"Error Code: $errCode")
          println(s"Error message: $errMsg")
          Future.successful(BadRequest(
            ApiResponse("shopping.checkout.failed", Messages("shopping.checkout.failed"))
          ))
        }
      }
    } else {
      val errResp: ANetApiResponse = controller.getErrorResponse()
      println("Failed to get response");
      if (!errResp.getMessages().getMessage().isEmpty()) {
        val errCode = errResp.getMessages().getMessage().get(0).getCode()
        val errMsg = errResp.getMessages().getMessage().get(0).getText()

        transactionService.save(transaction.copy(
          responseData = Some(ResponseData(
            transactionID = TransactionID(UUID.randomUUID().toString),
            responseCode = None,
            messageCode = None,
            description = None,
            authCode = None,
            avsResultCode = None,
            cvvResultCode = None,
            cavResultCode = None,
            accountNumber = None,
            accountType = None,
            transHashSha2 = None,
            errorCode = Some(errCode),
            errorMessage = Some(errMsg)
          )))
        )
        println(s"Error: $errCode \n $errMsg")
      }
      Future.successful(BadRequest(
        ApiResponse("shopping.checkout.failed", Messages("shopping.checkout.failed"))
      ))
    }

  }

  private def purchaseTheItems3(
    data: CheckoutData3,
    card: CreditCard,
    shoppingBag: ShoppingBag,
    user: User,
    arr: Seq[Item] => ArrayOfLineItem
  )(implicit request: RequestHeader): Future[Result] = {

    val paymentType: PaymentType = new PaymentType()
    val creditCard: CreditCardType = new CreditCardType()

    creditCard.setCardNumber(card.cardNumber)
    creditCard.setExpirationDate(card.expMonth + card.expYear)
    creditCard.setCardCode(data.data.code)
    paymentType.setCreditCard(creditCard)

    val customer: CustomerDataType = new CustomerDataType()
    customer.setEmail(data.data.email)
    customer.setId(data.userID.toString.replace("BSONObjectID(\"", "").replace("\")", "").substring(0, 20))

    val txnReq: TransactionRequestType = new TransactionRequestType()
    txnReq.setTransactionType(TransactionTypeEnum.AUTH_CAPTURE_TRANSACTION.value())
    txnReq.setPayment(paymentType)
    txnReq.setCustomer(customer)

    val arrLineItems = arr(shoppingBag.addedItems)
    txnReq.setLineItems(arrLineItems)

    txnReq.setAmount(BigDecimal(shoppingBag.total).setScale(2, RoundingMode.CEILING).bigDecimal)
    txnReq.setTaxExempt(true)

    val custShipAddr: NameAndAddressType = new NameAndAddressType()
    custShipAddr.setFirstName(data.data.firstName)
    custShipAddr.setLastName(data.data.lastName)
    custShipAddr.setAddress(data.data.address)
    custShipAddr.setCity(data.data.city)
    custShipAddr.setState(data.data.province)
    custShipAddr.setZip(data.data.zipCode)
    custShipAddr.setCountry(data.data.country)

    txnReq.setShipTo(custShipAddr)

    val apiReq: CreateTransactionRequest = new CreateTransactionRequest()
    apiReq.setMerchantAuthentication(merchAuthType)
    apiReq.setTransactionRequest(txnReq)

    val controller: CreateTransactionController = new CreateTransactionController(apiReq)
    controller.execute()

    var resp: CreateTransactionResponse = new CreateTransactionResponse()
    resp = controller.getApiResponse()

    val newOrder = Order(
      id = shoppingBag.id,
      dateTime = clock.instant(),
      countryByIP = CountryAtPurchase(data.countryByIP),
      shoppingBag = ShoppingBag(
        id = shoppingBag.id,
        addedItems = shoppingBag.addedItems,
        total = shoppingBag.total
      ),
      status = "Order in processing"
    )

    val transaction = Transaction(
      id = newOrder.id,
      dateTime = clock.instant(),
      order = newOrder,
      customer = user,
      cardData = CardData(
        lastFourDigits = card.cardNumber takeRight 4,
        expiryDate = card.expMonth + card.expYear
      ),
      responseData = None,
      refundTransaction = None,
      voidTransaction = None,
      settled = false
    )

    if (resp != null) {
      if (resp.getMessages().getResultCode() == MessageTypeEnum.OK) {
        val res: TransactionResponse = resp.getTransactionResponse()
        if (res.getMessages() != null) {

          val transID = res.getTransId()
          val responseCode = res.getResponseCode()
          val messageCode = res.getMessages().getMessage().get(0).getCode()
          val descr = res.getMessages().getMessage().get(0).getDescription()
          val authCode = res.getAuthCode()
          val avsRespCode = res.getAvsResultCode()
          val cvvRespCode = res.getCvvResultCode()
          val cavvRespCode = res.getCavvResultCode()
          val transHashSha2Value = res.getTransHashSha2()
          val accNum = res.getAccountNumber()
          val accType = res.getAccountType()

          transactionService.save(transaction.copy(
            responseData = Some(ResponseData(
              transactionID = TransactionID(transID),
              responseCode = Some(ResponseCode(responseCode)),
              messageCode = Some(messageCode),
              description = Some(descr),
              authCode = Some(AuthCode(authCode)),
              avsResultCode = Some(AVSResultCode(avsRespCode)),
              cvvResultCode = Some(CVVResultCode(cvvRespCode)),
              cavResultCode = Some(CAVVResultCode(cavvRespCode)),
              accountNumber = Some(accNum),
              accountType = Some(accType),
              transHashSha2 = Some(TransHashSha2(transHashSha2Value)),
              errorCode = None,
              errorMessage = None
            ))
          ))

          println(s"Successfully created transaction with Transaction ID: $transID")
          println(s"Response Code: $responseCode")
          println(s"Message Code: $messageCode")
          println(s"Description: $descr")
          println(s"Auth Code: $authCode")
          println(s"Address Verification Service Response Code: $avsRespCode")
          println(s"Cardholder Code Verification Response Code: $cvvRespCode")
          println(s"Cardholder Authentication Verification Response Code: $cavvRespCode")
          println(s"TransHash: $transHashSha2Value")
          println(s"Account Number: $accNum")
          println(s"Account Type: $accType")

        } else {
          println("Failed Transaction.")
          if (resp.getTransactionResponse().getErrors() != null) {
            val errCode = resp.getTransactionResponse().getErrors().getError().get(0).getErrorCode()
            val errMsg = resp.getTransactionResponse().getErrors().getError().get(0).getErrorText()

            transactionService.save(transaction.copy(
              responseData = Some(ResponseData(
                transactionID = TransactionID(UUID.randomUUID().toString),
                responseCode = None,
                messageCode = None,
                description = None,
                authCode = None,
                avsResultCode = None,
                cvvResultCode = None,
                cavResultCode = None,
                accountNumber = None,
                accountType = None,
                transHashSha2 = None,
                errorCode = Some(errCode),
                errorMessage = Some(errMsg)
              )))
            )
            println(s"Error Code: $errCode")
            println(s"Error message: $errMsg")
          }
        }
        // response result code is OK but it's impossible to get messages from it
        shoppingBag.addedItems.map { addedItem =>
          updateItemsInStock(addedItem.category, addedItem)
        }

        if(user.title == "SIG." || user.title == "SIG.NA" || user.title == "SIG.RA") {
          mailerClient.send(Email(
            subject = messagesApi("checkout.email.order.confirmation.subject")(Lang("it")),
            from = messagesApi("email.from")(Lang("it")),
            to = Seq(data.data.email),
            bodyText = Some(
              twirl.shopping.views.txt.emails.orderConfirm3(
                user, newOrder, data.data)(messagesApi, Lang("it")).body),
            bodyHtml = Some(
              twirl.shopping.views.html.emails.orderConfirm3(
                user, newOrder, data.data)(messagesApi, Lang("it")).body)
          ))
        } else {
          mailerClient.send(Email(
            subject = messagesApi("checkout.email.order.confirmation.subject")(Lang("en")),
            from = messagesApi("email.from")(Lang("en")),
            to = Seq(data.data.email),
            bodyText = Some(
              twirl.shopping.views.txt.emails.orderConfirm3(
                user, newOrder, data.data)(messagesApi, Lang("en")).body),
            bodyHtml = Some(
              twirl.shopping.views.html.emails.orderConfirm3(
                user, newOrder, data.data)(messagesApi, Lang("en")).body)
          ))
        }

        orderService.save(newOrder)

        user.orders match {
          case Some(ordersSeq) =>
            println("there is some seq of orders")
            userService.save(user.copy(
              orders = Some(newOrder +: ordersSeq),
              shoppingBag = None
            )).map { saved =>
              Ok(ApiResponse(
                "checkout.items.purchased",
                Messages("checkout.items.purchased"),
                Json.toJson(saved)))
            }
          case None =>
            println("creating new seq of orders")
            userService.save(user.copy(
              orders = Some(Seq(newOrder)),
              shoppingBag = None
            )).map { saved =>
              Ok(ApiResponse(
                "checkout.items.purchased",
                Messages("checkout.items.purchased"), Json.toJson(saved)))
            }
        }
      } else {
        println("Failed Transaction.")
        if (resp.getTransactionResponse() != null && resp.getTransactionResponse().getErrors() != null) {
          val errCode = resp.getTransactionResponse().getErrors().getError().get(0).getErrorCode()
          val errMsg = resp.getTransactionResponse().getErrors().getError().get(0).getErrorText()

          transactionService.save(transaction.copy(
            responseData = Some(ResponseData(
              transactionID = TransactionID(UUID.randomUUID().toString),
              responseCode = None,
              messageCode = None,
              description = None,
              authCode = None,
              avsResultCode = None,
              cvvResultCode = None,
              cavResultCode = None,
              accountNumber = None,
              accountType = None,
              transHashSha2 = None,
              errorCode = Some(errCode),
              errorMessage = Some(errMsg)
            )))
          )
          println(s"Error Code: $errCode")
          println(s"Error message: $errMsg")
          Future.successful(BadRequest(
            ApiResponse("shopping.checkout.failed", Messages("shopping.checkout.failed"))
          ))
        } else {
          val errCode = resp.getMessages().getMessage().get(0).getCode()
          val errMsg = resp.getMessages().getMessage().get(0).getText()

          transactionService.save(transaction.copy(
            responseData = Some(ResponseData(
              transactionID = TransactionID(UUID.randomUUID().toString),
              responseCode = None,
              messageCode = None,
              description = None,
              authCode = None,
              avsResultCode = None,
              cvvResultCode = None,
              cavResultCode = None,
              accountNumber = None,
              accountType = None,
              transHashSha2 = None,
              errorCode = Some(errCode),
              errorMessage = Some(errMsg)
            )))
          )
          println(s"Error Code: $errCode")
          println(s"Error message: $errMsg")
          Future.successful(BadRequest(
            ApiResponse("shopping.checkout.failed", Messages("shopping.checkout.failed"))
          ))
        }
      }
    } else {
      val errResp: ANetApiResponse = controller.getErrorResponse()
      println("Failed to get response");
      if (!errResp.getMessages().getMessage().isEmpty()) {
        val errCode = errResp.getMessages().getMessage().get(0).getCode()
        val errMsg = errResp.getMessages().getMessage().get(0).getText()

        transactionService.save(transaction.copy(
          responseData = Some(ResponseData(
            transactionID = TransactionID(UUID.randomUUID().toString),
            responseCode = None,
            messageCode = None,
            description = None,
            authCode = None,
            avsResultCode = None,
            cvvResultCode = None,
            cavResultCode = None,
            accountNumber = None,
            accountType = None,
            transHashSha2 = None,
            errorCode = Some(errCode),
            errorMessage = Some(errMsg)
          )))
        )
        println(s"Error: $errCode \n $errMsg")
      }
      Future.successful(BadRequest(
        ApiResponse("shopping.checkout.failed", Messages("shopping.checkout.failed"))
      ))
    }

  }

  private def purchaseTheItems4(
    data: CheckoutData4,
    card: CreditCard,
    shippingAddress: Address,
    shoppingBag: ShoppingBag,
    user: User,
    arr: Seq[Item] => ArrayOfLineItem
  )(implicit request: RequestHeader): Future[Result] = {

    val paymentType: PaymentType = new PaymentType()
    val creditCard: CreditCardType = new CreditCardType()

    creditCard.setCardNumber(card.cardNumber)
    creditCard.setExpirationDate(card.expMonth + card.expYear)
    creditCard.setCardCode(data.data.code)
    paymentType.setCreditCard(creditCard)

    val customer: CustomerDataType = new CustomerDataType()
    customer.setEmail(shippingAddress.email)
    customer.setId(data.userID.toString.replace("BSONObjectID(\"", "").replace("\")", "").substring(0, 20))

    val txnReq: TransactionRequestType = new TransactionRequestType()
    txnReq.setTransactionType(TransactionTypeEnum.AUTH_CAPTURE_TRANSACTION.value())
    txnReq.setPayment(paymentType)
    txnReq.setCustomer(customer)

    val arrLineItems = arr(shoppingBag.addedItems)
    txnReq.setLineItems(arrLineItems)

    txnReq.setAmount(BigDecimal(shoppingBag.total).setScale(2, RoundingMode.CEILING).bigDecimal)
    txnReq.setTaxExempt(true)

    val custShipAddr: NameAndAddressType = new NameAndAddressType()
    custShipAddr.setFirstName(shippingAddress.firstName)
    custShipAddr.setLastName(shippingAddress.lastName)
    custShipAddr.setAddress(shippingAddress.address)
    custShipAddr.setCity(shippingAddress.city)
    custShipAddr.setState(shippingAddress.state)
    custShipAddr.setZip(shippingAddress.zipCode)
    custShipAddr.setCountry(shippingAddress.country)

    txnReq.setShipTo(custShipAddr)

    val apiReq: CreateTransactionRequest = new CreateTransactionRequest()
    apiReq.setMerchantAuthentication(merchAuthType)
    apiReq.setTransactionRequest(txnReq)

    val controller: CreateTransactionController = new CreateTransactionController(apiReq)
    controller.execute()

    var resp: CreateTransactionResponse = new CreateTransactionResponse()
    resp = controller.getApiResponse()

    println(s"Shopping ID = ${shoppingBag.id}")

    val newOrder = Order(
      id = shoppingBag.id,
      dateTime = clock.instant(),
      countryByIP = CountryAtPurchase(data.countryByIP),
      shoppingBag = ShoppingBag(
        id = shoppingBag.id,
        addedItems = shoppingBag.addedItems,
        total = shoppingBag.total
      ),
      status = "Order in processing"
    )

    val transaction = Transaction(
      id = newOrder.id,
      dateTime = clock.instant(),
      order = newOrder,
      customer = user,
      cardData = CardData(
        lastFourDigits = card.cardNumber takeRight 4,
        expiryDate = card.expMonth + card.expYear
      ),
      responseData = None,
      refundTransaction = None,
      voidTransaction = None,
      settled = false
    )

    if (resp != null) {
      println("response is not null, trying to get some messages from it")
      if (resp.getMessages().getResultCode() == MessageTypeEnum.OK) {
        val res: TransactionResponse = resp.getTransactionResponse()
        if (res.getMessages() != null) {

          val transID = res.getTransId()
          val responseCode = res.getResponseCode()
          val messageCode = res.getMessages().getMessage().get(0).getCode()
          val descr = res.getMessages().getMessage().get(0).getDescription()
          val authCode = res.getAuthCode()
          val avsRespCode = res.getAvsResultCode()
          val cvvRespCode = res.getCvvResultCode()
          val cavvRespCode = res.getCavvResultCode()
          val transHashSha2Value = res.getTransHashSha2()
          val accNum = res.getAccountNumber()
          val accType = res.getAccountType()

          transactionService.save(transaction.copy(
            responseData = Some(ResponseData(
              transactionID = TransactionID(transID),
              responseCode = Some(ResponseCode(responseCode)),
              messageCode = Some(messageCode),
              description = Some(descr),
              authCode = Some(AuthCode(authCode)),
              avsResultCode = Some(AVSResultCode(avsRespCode)),
              cvvResultCode = Some(CVVResultCode(cvvRespCode)),
              cavResultCode = Some(CAVVResultCode(cavvRespCode)),
              accountNumber = Some(accNum),
              accountType = Some(accType),
              transHashSha2 = Some(TransHashSha2(transHashSha2Value)),
              errorCode = None,
              errorMessage = None
            ))
          ))

          println(s"Successfully created transaction with Transaction ID: $transID")
          println(s"Response Code: $responseCode")
          println(s"Message Code: $messageCode")
          println(s"Description: $descr")
          println(s"Auth Code: $authCode")
          println(s"Address Verification Service Response Code: $avsRespCode")
          println(s"Cardholder Code Verification Response Code: $cvvRespCode")
          println(s"Cardholder Authentication Verification Response Code: $cavvRespCode")
          println(s"TransHash: $transHashSha2Value")
          println(s"Account Number: $accNum")
          println(s"Account Type: $accType")

        } else {
          println("Approved Transaction but it's impossible to get messages from Transaction Response.")
          if (resp.getTransactionResponse().getErrors() != null) {
            val errCode = resp.getTransactionResponse().getErrors().getError().get(0).getErrorCode()
            val errMsg = resp.getTransactionResponse().getErrors().getError().get(0).getErrorText()

            transactionService.save(transaction.copy(
              responseData = Some(ResponseData(
                transactionID = TransactionID(UUID.randomUUID().toString),
                responseCode = None,
                messageCode = None,
                description = None,
                authCode = None,
                avsResultCode = None,
                cvvResultCode = None,
                cavResultCode = None,
                accountNumber = None,
                accountType = None,
                transHashSha2 = None,
                errorCode = Some(errCode),
                errorMessage = Some(errMsg)
              )))
            )
            println(s"Error Code: $errCode")
            println(s"Error message: $errMsg")

          }
        }

        // response result code is OK but it's impossible to get messages from it
        shoppingBag.addedItems.map { addedItem =>
          updateItemsInStock(addedItem.category, addedItem)
        }

        if(user.title == "SIG." || user.title == "SIG.NA" || user.title == "SIG.RA") {
          mailerClient.send(Email(
            subject = messagesApi("checkout.email.order.confirmation.subject")(Lang("it")),
            from = messagesApi("email.from")(Lang("it")),
            to = Seq(shippingAddress.email),
            bodyText = Some(
              twirl.shopping.views.txt.emails.orderConfirm2(
                user, newOrder, shippingAddress)(messagesApi, Lang("it")).body),
            bodyHtml = Some(
              twirl.shopping.views.html.emails.orderConfirm2(
                user, newOrder, shippingAddress)(messagesApi, Lang("it")).body)
          ))
        } else {
          mailerClient.send(Email(
            subject = messagesApi("checkout.email.order.confirmation.subject")(Lang("en")),
            from = messagesApi("email.from")(Lang("en")),
            to = Seq(shippingAddress.email),
            bodyText = Some(
              twirl.shopping.views.txt.emails.orderConfirm2(
                user, newOrder, shippingAddress)(messagesApi, Lang("en")).body),
            bodyHtml = Some(
              twirl.shopping.views.html.emails.orderConfirm2(
                user, newOrder, shippingAddress)(messagesApi, Lang("en")).body)
          ))
        }

        orderService.save(newOrder)

        user.orders match {
          case Some(ordersSeq) =>
            println("there is some seq of orders")
            userService.save(user.copy(
              orders = Some(newOrder +: ordersSeq),
              shoppingBag = None
            )).map { saved =>
              Ok(ApiResponse(
                "checkout.items.purchased",
                Messages("checkout.items.purchased"),
                Json.toJson(saved)))
            }
          case None =>
            println("creating new seq of orders")
            userService.save(user.copy(
              orders = Some(Seq(newOrder)),
              shoppingBag = None
            )).map { saved =>
              Ok(ApiResponse(
                "checkout.items.purchased",
                Messages("checkout.items.purchased"), Json.toJson(saved)))
            }
        }
      } else {
        println("Failed Transaction.")
        if (resp.getTransactionResponse() != null && resp.getTransactionResponse().getErrors() != null) {
          val errCode = resp.getTransactionResponse().getErrors().getError().get(0).getErrorCode()
          val errMsg = resp.getTransactionResponse().getErrors().getError().get(0).getErrorText()

          transactionService.save(transaction.copy(
            responseData = Some(ResponseData(
              transactionID = TransactionID(UUID.randomUUID().toString),
              responseCode = None,
              messageCode = None,
              description = None,
              authCode = None,
              avsResultCode = None,
              cvvResultCode = None,
              cavResultCode = None,
              accountNumber = None,
              accountType = None,
              transHashSha2 = None,
              errorCode = Some(errCode),
              errorMessage = Some(errMsg)
            )))
          )
          println(s"Error Code: $errCode")
          println(s"Error message: $errMsg")

          println("response result code is not OK")
          Future.successful(BadRequest(
            ApiResponse("shopping.checkout.failed", Messages("shopping.checkout.failed"))
          ))
        } else {
          val errCode = resp.getMessages().getMessage().get(0).getCode()
          val errMsg = resp.getMessages().getMessage().get(0).getText()

          transactionService.save(transaction.copy(
            responseData = Some(ResponseData(
              transactionID = TransactionID(UUID.randomUUID().toString),
              responseCode = None,
              messageCode = None,
              description = None,
              authCode = None,
              avsResultCode = None,
              cvvResultCode = None,
              cavResultCode = None,
              accountNumber = None,
              accountType = None,
              transHashSha2 = None,
              errorCode = Some(errCode),
              errorMessage = Some(errMsg)
            )))
          )
          println(s"Error Code: $errCode")
          println(s"Error message: $errMsg")

          println("any error messages")
          Future.successful(BadRequest(
            ApiResponse("shopping.checkout.failed", Messages("shopping.checkout.failed"))
          ))
        }
        println("response result code is not OK - 2")
        Future.successful(BadRequest(
          ApiResponse("shopping.checkout.failed", Messages("shopping.checkout.failed"))
        ))
      }
    } else {
      val errResp: ANetApiResponse = controller.getErrorResponse()
      println("Failed to get response");
      if (!errResp.getMessages().getMessage().isEmpty()) {
        val errCode = errResp.getMessages().getMessage().get(0).getCode()
        val errMsg = errResp.getMessages().getMessage().get(0).getText()

        transactionService.save(transaction.copy(
          responseData = Some(ResponseData(
            transactionID = TransactionID(UUID.randomUUID().toString),
            responseCode = None,
            messageCode = None,
            description = None,
            authCode = None,
            avsResultCode = None,
            cvvResultCode = None,
            cavResultCode = None,
            accountNumber = None,
            accountType = None,
            transHashSha2 = None,
            errorCode = Some(errCode),
            errorMessage = Some(errMsg)
          )))
        )
        println(s"Error: $errCode \n $errMsg")
      }
      println("failed to get response")
      Future.successful(BadRequest(
        ApiResponse("shopping.checkout.failed", Messages("shopping.checkout.failed"))
      ))
    }
  }

  private def updateItemsInStock(category: String, addedItem: Item): Future[Unit] = {
    itemService.retrieve(addedItem.id, category).map { item =>
      addedItem.size.map { sz =>
        itemService.save(item.get.copy(
          size = item.get.size.collect {
            case s if (s.number == sz.number) => s.copy(
              quantity = s.quantity - sz.quantity
            )
            case s if (s.number != sz.number) => s
          },
          inventory = item.get.inventory - addedItem.inventory
        ), category)
      }
    }
  }

  /**
   * Sends the checkout data of the user if no addresses and no cards saved in My Account
   * to the server-side.
   *
   * @param countryByIP The country of the user according to IP Geolocation.
   * @param data The checkout data of the user.
   * @param userID The id of the user.
   * @returns An object indicating if the process was successful or not.
   */
  def fillCheckoutData: Action[JsValue] = SecuredAction(parse.json).async {
    implicit request =>
      request.body.validate[CheckoutData1]
        .fold(
          errors =>
            Future.successful(
              BadRequest(Json.obj("status" -> "KO", "message" -> JsError.toJson(errors)))),
          data => {
            println(data)
            userService.retrieve(data.userID).flatMap {
              case Some(user) if user.loginInfo.exists(_.providerID == CredentialsProvider.ID) =>
                user.shoppingBag match {
                  case Some(shoppingB) =>
                    checkAvailabilityOfProduct(shoppingB, user)
                    userService.retrieve(data.userID).flatMap {
                      case Some(usr) => user.shoppingBag match {
                        case Some(shopping) =>
                          println(shopping.equals(shoppingB))
                          println(s"saved shoppingBag: $shopping, shoppingBag before saving: $shoppingB")
                          if (!shopping.equals(shoppingB)) {
                            Future.successful(Ok(ApiResponse(
                              "shopping.bag.edited",
                              Messages("shopping.bag.edited"),
                              Json.toJson(usr)
                            )))
                          } else purchaseTheItems1(data, shoppingB, user, purchasedItems)
                        case None => Future.successful(BadRequest(ApiResponse(
                          "shopping.bag.not.available",
                          Messages("shopping.bag.not.available")
                        )))
                      }
                      case None => Future.successful(BadRequest(ApiResponse(
                        "user.not.found",
                        Messages("user.not.found")
                      )))
                    }
                  case None => Future.successful(BadRequest(ApiResponse(
                    "shopping.bag.not.available",
                    Messages("shopping.bag.not.available")
                  )))
                }
              case None => Future.failed(new IdentityNotFoundException("Couldn't find user"))
            }.recover {
              case _: ProviderException =>
                BadRequest(ApiResponse("user.not.found", Messages("user.not.found")))
            }
          }
        )
  }

  /**
   * Sends the checkout data of the user if some addresses and no cards saved in My Account
   * to the server-side.
   *
   * @param cardType The type of credit card of the user.
   * @param countryByIP The country of the user according to IP Geolocation.
   * @param data The payment form data of the user.
   * @param shippingAddress The index of seq of shipping addresses of the user saved in the user's account.
   * @param userID The id of the user.
   * @returns An object indicating if the process was successful or not.
   */
  def fillCheckoutData2: Action[JsValue] = SecuredAction(parse.json).async {
    implicit request =>
      request.body.validate[CheckoutData2]
        .fold(
          errors =>
            Future.successful(
              BadRequest(Json.obj("status" -> "KO", "message" -> JsError.toJson(errors)))),
          data => {
            println(data)
            userService.retrieve(data.userID).flatMap {
              case Some(user) if user.loginInfo.exists(_.providerID == CredentialsProvider.ID) =>
                user.addressBook match {
                  case Some(addresses) =>
                    val shippingAddr = addresses(data.shippingAddress.toInt)
                    user.shoppingBag match {
                      case Some(shoppingB) =>
                        checkAvailabilityOfProduct(shoppingB, user)
                        userService.retrieve(data.userID).flatMap {
                          case Some(usr) => user.shoppingBag match {
                            case Some(shopping) =>
                              if (!shopping.equals(shoppingB)) {
                                Future.successful(Ok(ApiResponse(
                                  "shopping.bag.edited",
                                  Messages("shopping.bag.edited"),
                                  Json.toJson(usr)
                                )))
                              } else purchaseTheItems2(data, shippingAddr, shoppingB, user, purchasedItems)
                            case None => Future.successful(BadRequest(ApiResponse(
                              "shopping.bag.not.available",
                              Messages("shopping.bag.not.available")
                            )))
                          }
                          case None => Future.successful(BadRequest(ApiResponse(
                            "user.not.found",
                            Messages("user.not.found")
                          )))
                        }
                      case None => Future.successful(BadRequest(ApiResponse(
                        "shopping.bag.not.available",
                        Messages("shopping.bag.not.available")
                      )))
                    }
                  case None => Future.successful(BadRequest(ApiResponse(
                    "account.address.not.available",
                    Messages("account.address.not.available")
                  )))
                }
              case None => Future.failed(new IdentityNotFoundException("Couldn't find user"))
            }.recover {
              case _: ProviderException =>
                BadRequest(ApiResponse("user.not.found", Messages("user.not.found")))
            }
          }
        )
  }

  /**
   * Sends the checkout data of the user if some cards and no addresses saved in the user's account
   * to the server-side.
   *
   * @param countryByIP The country of the user according to IP Geolocation.
   * @param creditCard The index of seq of credit cards of the user saved in the user's account.
   * @param data The payment form data of the user.
   * @param userID The id of the user.
   * @returns An object indicating if the process was successful or not.
   */
  def fillCheckoutData3: Action[JsValue] = SecuredAction(parse.json).async {
    implicit request =>
      request.body.validate[CheckoutData3]
        .fold(
          errors =>
            Future.successful(
              BadRequest(Json.obj("status" -> "KO", "message" -> JsError.toJson(errors)))),
          data => {
            println(data)
            userService.retrieve(data.userID).flatMap {
              case Some(user) if user.loginInfo.exists(_.providerID == CredentialsProvider.ID) =>
                user.cardWallet match {
                  case Some(cards) =>
                    val card = cards(data.creditCard.toInt)
                    user.shoppingBag match {
                      case Some(shoppingB) =>
                        checkAvailabilityOfProduct(shoppingB, user)
                        userService.retrieve(data.userID).flatMap {
                          case Some(usr) => user.shoppingBag match {
                            case Some(shopping) =>
                              if (!shopping.equals(shoppingB)) {
                                Future.successful(Ok(ApiResponse(
                                  "shopping.bag.edited",
                                  Messages("shopping.bag.edited"),
                                  Json.toJson(usr)
                                )))
                              } else purchaseTheItems3(
                                data, card, shoppingB, user, purchasedItems
                              )
                            case None => Future.successful(BadRequest(ApiResponse(
                              "shopping.bag.not.available",
                              Messages("shopping.bag.not.available")
                            )))
                          }
                          case None => Future.successful(BadRequest(ApiResponse(
                            "user.not.found",
                            Messages("user.not.found")
                          )))
                        }
                      case None => Future.successful(BadRequest(ApiResponse(
                        "shopping.bag.not.available",
                        Messages("shopping.bag.not.available")
                      )))
                    }
                  case None => Future.successful(BadRequest(ApiResponse(
                    "account.address.not.available",
                    Messages("account.address.not.available")
                  )))
                }
              case None => Future.failed(new IdentityNotFoundException("Couldn't find user"))
            }.recover {
              case _: ProviderException =>
                BadRequest(ApiResponse("user.not.found", Messages("user.not.found")))
            }
          }
        )
  }

  /**
   * Sends the checkout data of the user if some cards and some addresses saved in the user's account
   * to the server-side.
   *
   * @param countryByIP The country of the user according to IP Geolocation.
   * @param creditCard The index of seq of credit cards of the user saved in the user's account.
   * @param shippingAddress The index of seq of addresses in the user's account.
   * @param data The payment form data of the user.
   * @param userID The id of the user.
   * @returns An object indicating if the process was successful or not.
   */
  def fillCheckoutData4: Action[JsValue] = SecuredAction(parse.json).async {
    implicit request =>
      request.body.validate[CheckoutData4]
        .fold(
          errors =>
            Future.successful(
              BadRequest(Json.obj("status" -> "KO", "message" -> JsError.toJson(errors)))),
          data => {
            println(data)
            userService.retrieve(data.userID).flatMap {
              case Some(user) if user.loginInfo.exists(_.providerID == CredentialsProvider.ID) =>
                user.cardWallet match {
                  case Some(cards) =>
                    val card = cards(data.creditCard.toInt)
                    user.addressBook match {
                      case Some(addresses) =>
                        val address = addresses(data.shippingAddress.toInt)
                        user.shoppingBag match {
                          case Some(shoppingB) =>
                            checkAvailabilityOfProduct(shoppingB, user)
                            userService.retrieve(data.userID).flatMap {
                              case Some(usr) => user.shoppingBag match {
                                case Some(shopping) =>
                                  if (!shopping.equals(shoppingB)) {
                                    Future.successful(Ok(ApiResponse(
                                      "shopping.bag.edited",
                                      Messages("shopping.bag.edited"),
                                      Json.toJson(usr)
                                    )))
                                  } else purchaseTheItems4(
                                    data, card, address, shoppingB, user, purchasedItems
                                  )
                                case None => Future.successful(BadRequest(ApiResponse(
                                  "shopping.bag.not.available",
                                  Messages("shopping.bag.not.available")
                                )))
                              }
                              case None => Future.successful(BadRequest(ApiResponse(
                                "user.not.found",
                                Messages("user.not.found")
                              )))
                            }
                          case None => Future.successful(BadRequest(ApiResponse(
                            "shopping.bag.not.available",
                            Messages("shopping.bag.not.available")
                          )))
                        }
                      case None => Future.successful(BadRequest(ApiResponse(
                        "account.addresses.not.available",
                        Messages("account.addresses.not.available")
                      )))
                    }
                  case None => Future.successful(BadRequest(ApiResponse(
                    "account.cards.not.available",
                    Messages("account.cards.not.available")
                  )))
                }
              case None => Future.failed(new IdentityNotFoundException("Couldn't find user"))
            }.recover {
              case _: ProviderException =>
                BadRequest(ApiResponse("user.not.found", Messages("user.not.found")))
            }
          }
        )
  }

  private def purchasedItems(addedItems: Seq[Item]): ArrayOfLineItem = {
    val arrLineItem: ArrayOfLineItem = new ArrayOfLineItem()
    for (i <- 0 until addedItems.length - 1) {
      val lineItem: LineItemType = new LineItemType()
      lineItem.setItemId(addedItems(i).id.toString.replace("BSONObjectID(\"", "")
        .replace("\")", "")
        .substring(0, 20))
      lineItem.setName(addedItems(i).name)
      lineItem.setDescription(addedItems(i).description)
      lineItem.setQuantity(BigDecimal(addedItems(i).inventory).bigDecimal)
      lineItem.setUnitPrice(BigDecimal(addedItems(i).price).setScale(2, RoundingMode.CEILING).bigDecimal)
      lineItem.setTaxable(false)
      arrLineItem.getLineItem().add(lineItem)
    }
    arrLineItem
  }

  private def checkAvailabilityOfProduct(shoppingBag: ShoppingBag, user: User) =
    Future.sequence(
      shoppingBag.addedItems.map { addedItem =>
        itemService.retrieve(addedItem.id, addedItem.category).map { item =>
          addedItem.size.map { sz =>
            val itemSizeInStock = item.get.size.find(s => s.number == sz.number).get
            println(s"itemSizeInStock qty: ${itemSizeInStock.quantity}, itemInBag qty: ${sz.quantity}")
            // 1
            if (shoppingBag.addedItems.length > 1) {
              // 2
              if (itemSizeInStock.quantity > 0 && itemSizeInStock.quantity < sz.quantity) {
                println(s"quantity can be edited: ${sz.number} = ${sz.quantity}")
                //
                val newSeqOfSizes = addedItem.size.collect {
                  case sz if (sz.number == itemSizeInStock.number &&
                    itemSizeInStock.quantity < sz.quantity) =>
                    sz.copy(quantity = itemSizeInStock.quantity)

                  case sz if (sz.number == itemSizeInStock.number &&
                    itemSizeInStock.quantity >= sz.quantity) => sz

                  case sz if (sz.number != itemSizeInStock.number) => sz
                }
                println(s"More than 1 item in the bag, updated seq of sizes: $newSeqOfSizes")
                val inv = checkQty(newSeqOfSizes)
                val total = addedItem.price * inv
                val index = shoppingBag.addedItems.indexOf(addedItem)
                val addItem = addedItem.copy(
                  size = newSeqOfSizes,
                  inventory = inv,
                  total = total
                )
                val newSeqOfItems = shoppingBag.addedItems.updated(index, addItem)
                println(s"total for remained seq of items: ${checkTotal(newSeqOfItems)}")
                userService.save(user.copy(
                  shoppingBag = Some(shoppingBag.copy(
                    addedItems = newSeqOfItems,
                    total = checkTotal(newSeqOfItems)
                  ))
                ))
                //
              } else if (itemSizeInStock.quantity == 0) {
                // 3
                if (addedItem.size.length > 1) {
                  println(s"More than 1 item in the bag, more than 1 size selected, N/A: ${sz.number}")
                  val sizeIndex = addedItem.size.indexOf(sz)
                  val index = shoppingBag.addedItems.indexOf(addedItem)
                  val newSeqOfSizes = removeElementFromSeq(addedItem.size, sizeIndex)
                  val inv = checkQty(newSeqOfSizes)
                  val newItem = addedItem.copy(
                    size = newSeqOfSizes,
                    inventory = inv,
                    total = addedItem.price * inv
                  )
                  val newSeqOfItems = shoppingBag.addedItems.updated(index, newItem)
                  println(s"the remained seq of items: ${newSeqOfItems}")
                  println(s"total for remained seq of items: ${checkTotal(newSeqOfItems)}")
                  userService.save(user.copy(
                    shoppingBag = Some(shoppingBag.copy(
                      addedItems = newSeqOfItems,
                      total = checkTotal(newSeqOfItems)
                    ))
                  ))
                } else {
                  println(s"N/A: ${sz.number}, only one size remained in a seq")
                  val index = shoppingBag.addedItems.indexOf(addedItem)
                  val newSeqOfItems = removeElementFromSeq(shoppingBag.addedItems, index)
                  println(s"the remained seq of items: ${newSeqOfItems}")
                  println(s"total for remained seq of items: ${checkTotal(newSeqOfItems)}")
                  userService.save(user.copy(
                    shoppingBag = Some(shoppingBag.copy(
                      addedItems = newSeqOfItems,
                      total = checkTotal(newSeqOfItems)
                    ))
                  ))
                }
                // 3
              }
              // 2
            } else { // else if(shoppingBag.addedItems.length <= 1)
              // 4 - Only one item in the shopping bag
              if (itemSizeInStock.quantity > 0 && itemSizeInStock.quantity < sz.quantity) {
                println(s"quantity can be edited: ${sz.number} = ${sz.quantity}")
                //
                val newSeqOfSizes = addedItem.size.collect {
                  case sz if (sz.number == itemSizeInStock.number &&
                    itemSizeInStock.quantity < sz.quantity) =>
                    sz.copy(quantity = itemSizeInStock.quantity)

                  case sz if (sz.number == itemSizeInStock.number &&
                    itemSizeInStock.quantity >= sz.quantity) => sz
                  case sz if (sz.number != itemSizeInStock.number) => sz
                }
                println(s"only one item in the bag, updated seq of sizes: $newSeqOfSizes")
                val inv = checkQty(newSeqOfSizes)
                val total = addedItem.price * inv
                val index = shoppingBag.addedItems.indexOf(addedItem)
                val addItem = addedItem.copy(
                  size = newSeqOfSizes,
                  inventory = inv,
                  total = total
                )
                val newSeqOfItems = shoppingBag.addedItems.updated(index, addItem)
                println(s"total for remained seq of items: ${checkTotal(newSeqOfItems)}")
                userService.save(user.copy(
                  shoppingBag = Some(shoppingBag.copy(
                    addedItems = newSeqOfItems,
                    total = checkTotal(newSeqOfItems)
                  ))
                ))
                //
              } else if (itemSizeInStock.quantity == 0) {
                if (addedItem.size.length > 1) {
                  println(s"one item in the bag, more than one size selected, N/A: ${sz.number}")
                  val sizeIndex = addedItem.size.indexOf(sz)
                  val index = shoppingBag.addedItems.indexOf(addedItem)
                  val newSeqOfSizes = removeElementFromSeq(addedItem.size, sizeIndex)
                  val inv = checkQty(newSeqOfSizes)
                  val newItem = addedItem.copy(
                    size = newSeqOfSizes,
                    inventory = inv,
                    total = addedItem.price * inv
                  )
                  val newSeqOfItems = shoppingBag.addedItems.updated(index, newItem)
                  println(s"the remained seq of items: ${newSeqOfItems}")
                  println(s"total for remained seq of items: ${checkTotal(newSeqOfItems)}")
                  userService.save(user.copy(
                    shoppingBag = Some(shoppingBag.copy(
                      addedItems = newSeqOfItems,
                      total = checkTotal(newSeqOfItems)
                    ))
                  ))
                } else {
                  println("Only one item in the shopping bag")
                  println(s"N/A: ${sz.number}, only one size remained in a seq")
                  userService.save(user.copy(
                    shoppingBag = None
                  ))
                }
                // 4
              }
            }
            // 1
          } // addedItem size
        }
      }
    )

  private def checkQty(seq: Seq[Size]): Int =
    seq.foldLeft(0) { (sum: Int, s: Size) =>
      sum + s.quantity
    }

  private def checkTotal(seq: Seq[Item]): Double =
    seq.foldLeft(0.0) { (sum: Double, i: Item) =>
      sum + i.inventory * i.price
    }

}
