const SSLCommerz = require("ssl-commerz-node");
const PaymentSession = SSLCommerz.PaymentSession;
const shortid = require("shortid");
const Order = require("../../models/PaymentModel/PaymentModel");
require("dotenv").config();

// For live payment set first parameter `false` and for sandbox set it `true`

// STORE_ID=thesc621d932555ad7
// STORE_PASSWORD=thesc621d932555ad7@ssl

const payment = new PaymentSession(
  false,
  process.env.STORE_ID,
  process.env.STORE_PASSWORD
);
console.log(payment);

exports.SSLCommerz_payment_init = async (req, res) => {
  const { totalAmount, deliveryMethod, customerInfo, shippingInfo } = req.body;

  const transactionId = `transaction_${shortid.generate()}`;
  // let paymentDone = false;

  try {
    // Set the urls
    //SERVER_URL=http://localhost:5000/
    payment.setUrls({
      // success: "yoursite.com/success", // If payment Succeed
      success: `${process.env.SERVER_URL}/payment/checkout/success?transactionId=${transactionId}`, // If payment Succeed
      fail: `${process.env.SERVER_URL}/payment/checkout/fail`, // If payment failed
      cancel: `${process.env.SERVER_URL}/payment/checkout/cancel`, // If user cancel payment
      ipn: `${process.env.SERVER_URL}/ipn`, // SSLCommerz will send http post request in this link
    });
    // Set order details
    payment.setOrderInfo({
      total_amount: 500, // Number field
      currency: "BDT", // Must be three character string
      tran_id: transactionId, // Unique Transaction id

      multi_card_name: "internetbank", // Do not Use! If you do not customize the gateway list,
      allowed_bin: "371598,371599,376947,376948,376949", // Do not Use! If you do not control on transaction
    });

    // Set customer info
    const { studentName, studentEmail, studentId, studentClass, studentPhone } =
      customerInfo;
    payment.setCusInfo({
      name: studentName,
      email: studentEmail,
      studentId: studentId,
      studentClass: studentClass,
      studentPhone: studentPhone,
    });

    // Set shipping info
    const { adress, road, permentAdress } = shippingInfo;
    payment.setShippingInfo({
      method: "deliveryMethod", //Shipping method of the order. Example: YES or NO or Courier
      adress: adress,
      road: road,
      permentAdress: permentAdress,
    });

    // Set Product Profile
    payment.setProductInfo({
      product_category: "School fees",
      product_profile: "general",
    });

    // Initiate Payment and Get session key
    payment.paymentInit().then(async (response) => {
      console.log(response);
      res.send(response["GatewayPageURL"]);
      // paymentDone = response["status"] === "SUCCESS";

      const newOrder = new Order({
        _id: transactionId,

        totalAmount,
        deliveryMethod,

        customerInfo,
        shippingInfo,
        transactionId,
        // paymentDone,
      });
      const save = await newOrder.save();
    });
  } catch (err) {
    return res.status(400).json({ err });
  }
};

exports.SSLCommerz_payment_success = async (req, res) => {
  const { transactionId } = req.query;

  if (!transactionId) {
    return res.json({ message: "transactionId must be required" });
  } else {
    const currentOrder = Order.findByIdAndUpdate(transactionId, {
      paymentDone: true,
      updatedAt: Date.now(),
    });

    currentOrder.exec((err, result) => {
      if (err) console.log(err);
      res.redirect(
        `${process.env.CLIENT_URL}/checkout/success/${transactionId}`
      );
    });
  }
};

exports.SSLCommerz_payment_fail = (req, res) => {
  res.redirect(`${process.env.CLIENT_URL}/checkout/fail`);
};

exports.SSLCommerz_payment_cancel = (req, res) => {
  res.redirect(`${process.env.CLIENT_URL}/checkout/cancel`);
};

// -------------------------------- After Success

// console.log(response['sessionkey']);
//     D37CD2C0A0D322991531D217E194F981

// console.log(response['GatewayPageURL']);
//     https://sandbox.sslcommerz.com/EasyCheckOut/testcded37cd2c0a0d322991531d217e194f981

// -------------------------------- After Failure (Wrong Store ID)

// console.log(response['status']);
//     FAILED

// console.log(response['failedreason']);
//     Store Credential Error Or Store is De-active
