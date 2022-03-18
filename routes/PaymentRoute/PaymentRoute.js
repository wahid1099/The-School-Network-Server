// const SSLCommerz = require("ssl-commerz-node");
const router = require("express").Router();
const shortid = require("shortid");
const AddmissionFormCollection = require("../../models/PaymentModel/PaymentModel");
require("dotenv").config();
const { v4: uuidv4 } = require("uuid");
const SSLCommerzPayment = require('sslcommerz-lts'); 
const MonthlyPayment = require('../../models/Principal/PaymentUplaodSchema')
const ObjectId = require('mongodb').ObjectId; 

router.post("/addmissionpayment", async (req, res) => {
  const datas = req.body
  const front = req.files.img.data;

  const encodedpic = front.toString('base64');
  const img = Buffer.from(encodedpic, 'base64');
  const admissiondata = {...datas, img}

  const productInfo = {
      total_amount: req.body.totalAmount,
      currency: 'BDT',
      tran_id: uuidv4(),
      success_url: 'https://blooming-citadel-14218.herokuapp.com/successes',
      fail_url: 'https://blooming-citadel-14218.herokuapp.com/failures',
      cancel_url: 'https://blooming-citadel-14218.herokuapp.com/canceled',
      ipn_url: 'https://blooming-citadel-14218.herokuapp.com/ipn',
      paymentStatus: 'success',
      shipping_method: 'Courier',
      product_name:'ahan',
      product_category: 'Electronic',
      product_profile: 'shool',
      product_image:'ahan',
      cus_name:'ahan',
      cus_email: 'ahan@gmail.com',
      cus_add1: 'Dhaka',
      cus_add2: 'Dhaka',
      cus_city: 'Dhaka',
      cus_state: 'Dhaka',
      cus_postcode: '1000',
      cus_country: 'Bangladesh',
      cus_phone: '01711111111',
      cus_fax: '01711111111',
      ship_name:'ahan',
      ship_add1: 'Dhaka',
      ship_add2: 'Dhaka',
      ship_city: 'Dhaka',
      ship_state: 'Dhaka',
      ship_postcode: 1000,
      ship_country: 'Bangladesh',
      multi_card_name: 'mastercard',
      value_a: 'ref001_A',
      value_b: 'ref002_B',
      value_c: 'ref003_C',
      value_d: 'ref004_D'
  };

  const sslcommer = new SSLCommerzPayment(process.env.STORE_ID, process.env.STORE_PASSWORD, false) 
  sslcommer.init(productInfo).then(data => {

      const info = { ...productInfo, ...data }
      
      if (info.GatewayPageURL) {
        
        res.json(info.GatewayPageURL)
       }
      else {
          return res.status(400).json({
              message: "SSL session was not successful"
          })
      }

  }); 

  router.post("/successes", async (req, res) => {
      const result = new AddmissionFormCollection(admissiondata)
      await result.save()
      
     res.status(200).redirect(`https://the-school-network.web.app/AdmissionSuccess`)
     
  }) 

  router.post("/failures", async (req, res) => {
    
      res.status(400).redirect('https://the-school-network.web.app')

   })
   router.post("/canceled", async (req, res) => {
    
      res.status(400).redirect('https://the-school-network.web.app')

   })

   router.get('/payment/:tran_id', async (req, res) => {
    
      const id = req.params.tran_id;
      const result = await PaymentCollection.findOne({ tran_id: id })
      res.json(result)
  })

});

router.post("/PayMonthlyPayment", async (req, res) => {
    console.log('hitted',  req.body)
    const datas = req.body
    const id = req.body.id;
  
    const productInfo = {
        total_amount: '225',
        currency: 'BDT',
        tran_id: uuidv4(),
        success_url: 'https://blooming-citadel-14218.herokuapp.com/success',
        fail_url: 'https://blooming-citadel-14218.herokuapp.com/failure',
        cancel_url: 'https://blooming-citadel-14218.herokuapp.com/cancel',
        ipn_url: 'https://blooming-citadel-14218.herokuapp.com/ipn',
        paymentStatus: 'success',
        shipping_method: 'Courier',
        product_name:'ahan',
        product_category: 'Electronic',
        product_profile: 'shool',
        product_image:'ahan',
        cus_name:'ahan',
        cus_email: 'ahan@gmail.com',
        cus_add1: 'Dhaka',
        cus_add2: 'Dhaka',
        cus_city: 'Dhaka',
        cus_state: 'Dhaka',
        cus_postcode: '1000',
        cus_country: 'Bangladesh',
        cus_phone: '01711111111',
        cus_fax: '01711111111',
        ship_name:'ahan',
        ship_add1: 'Dhaka',
        ship_add2: 'Dhaka',
        ship_city: 'Dhaka',
        ship_state: 'Dhaka',
        ship_postcode: 1000,
        ship_country: 'Bangladesh',
        multi_card_name: 'mastercard',
        value_a: 'ref001_A',
        value_b: 'ref002_B',
        value_c: 'ref003_C',
        value_d: 'ref004_D'
    };
  
    const sslcommer = new SSLCommerzPayment(process.env.STORE_ID, process.env.STORE_PASSWORD, false) 
    sslcommer.init(productInfo).then(data => {
  
        const info = { ...productInfo, ...data }
        
        if (info.GatewayPageURL) {
            
            res.json(info.GatewayPageURL)
         }
        else {
            return res.status(400).json({
                message: "SSL session was not successful"
            })
        }
  
    }); 
  
    router.post("/success", async (req, res) => {
        const query = {_id: ObjectId(id)}
        const notice = await MonthlyPayment.findOneAndUpdate(query, {
            $set: { paymentStatus: 'PAID',tran_id: uuidv4(),
            paymentNumber: datas.paymentNumber, paymentDate: new Date().toLocaleDateString() }},{ upsert: true });
            
       res.status(200).redirect(`https://the-school-network.web.app/StudentDashboard/StudentPaymentSuccess`)
       
    })    
  
    router.post("/failure", async (req, res) => {
        
        res.status(400).redirect('https://the-school-network.web.app')
  
     })
     router.post("/cancel", async (req, res) => {
        
        res.status(400).redirect('https://the-school-network.web.app')
  
     })
  
     router.get('/payment/:tran_id', async (req, res) => {
  
        const id = req.params.tran_id;
        const result = await PaymentCollection.findOne({ tran_id: id })
        
        res.json(result)
    })
  
  });
  
module.exports = router;