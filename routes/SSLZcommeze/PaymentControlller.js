// const SSLCommerz = require("ssl-commerz-node");
// const SSLCommerzPayment = require("sslcommerz");
const shortid = require("shortid");
const Order = require("../../models/PaymentModel/PaymentModel");
require("dotenv").config();
const router = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const SSLCommerzPayment = require("sslcommerz-lts");

// STORE_ID=thesc621d932555ad7
// STORE_PASSWORD=thesc621d932555ad7@ssl

// exports.SSLCommerz_payment_init = async (req, res) => {};
const sslcommer = new SSLCommerzPayment(
  process.env.STORE_ID,
  process.env.STORE_PASSWORD,
  false
);
router.post("/init", async (req, res) => {
  console.log("hitting");
  const { totalAmount, studentInfo, shippingInfo } = req.body;
  const { studentName, studentEmail, studentId, studentClass, studentPhone } =
    studentInfo;

  const { adress, road, permentAdress } = shippingInfo;
  const transactionId = `transaction_${shortid.generate()}`;
  const data = {
    total_amount: totalAmount,
    currency: "BDT",
    tran_id: transactionId, // use unique tran_id for each api call
    success_url: "http://localhost:5000/success",
    fail_url: "http://localhost:5000/fail",
    cancel_url: "http://localhost:5000/cancel",
    ipn_url: "http://localhost:5000/ipn",
    shipping_method: "Courier",
    product_name: "Computer.",
    product_category: "Electronic",
    product_profile: "general",
    std_name: studentName,
    std_email: studentEmail,
    std_id: studentId,
    std_class: studentClass,
    std_phone: studentPhone,
    cus_add1: "Dhaka",
    cus_city: "Dhaka",
    cus_state: "Dhaka",
    cus_postcode: "1000",
    cus_country: "Bangladesh",
    cus_phone: "01711111111",
    ship_name: "Customer Name",
    ship_add1: "Dhaka",
    ship_add2: "Dhaka",
    ship_city: "Dhaka",
    ship_state: "Dhaka",
    ship_postcode: 1000,
    ship_country: "Bangladesh",
  };
  //fault false for sandbox
  sslcommer.init(data).then((apiResponse) => {
    // Redirect the user to payment gateway
    let GatewayPageURL = apiResponse.GatewayPageURL;
    res.redirect(GatewayPageURL);
    console.log("Redirecting to: ", GatewayPageURL);
  });

  try {
    const newOrder = new Order({
      _id: transactionId,

      totalAmount,
      deliveryMethod,

      studentInfo,
      shippingInfo,

      paymentDone,
    });
    const save = await newOrder.save();
  } catch (e) {}
});

module.exports = router;
