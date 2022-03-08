const mongoose = require("mongoose");
// const shortid = require("shortid");

const AdmissionFormSchema = new mongoose.Schema(
  {
    total_amount:{
      type: String,
      required: false
    },
    currency:{
      type: String,
      required: false
    },
    tran_id:{
      type: String,
      required: false
    },
    success_url:{
      type: String,
      required: false
    },
    fail_url:{
      type: String,
      required: false
    },
    cancel_url:{
      type: String,
      required: false
    },
    ipn_url:{
      type: String,
      required: false
    },
    paymentStatus:{
      type: String,
      required: false
    },
    shipping_method:{
      type: String,
      required: false
    },
    product_name:{
      type: String,
      required: false
    },
    product_category:{
      type: String,
      required: false
    },
    product_profile:{
      type: String,
      required: false
    },
    product_image:{
      type: String,
      required: false
    },
    cus_name:{
      type: String,
      required: false
    },
    cus_email:{
      type: String,
      required: false
    },
    cus_add1:{
      type: String,
      required: false
    },
    cus_add2:{
      type: String,
      required: false
    },
    cus_city:{
      type: String,
      required: false
    },
    cus_state:{
      type: String,
      required: false
    },
    cus_postcode:{
      type: String,
      required: false
    },
    cus_country:{
      type: String,
      required: false
    },
    cus_phone:{
      type: String,
      required: false
    },
    cus_fax:{
      type: String,
      required: false
    },
    ship_name:{
      type: String,
      required: false
    },
    ship_add1:{
      type: String,
      required: false
    },
    ship_add2:{
      type: String,
      required: false
    },
    ship_city:{
      type: String,
      required: false
    },
    ship_state:{
      type: String,
      required: false
    },
    ship_postcode:{
      type: Number,
      required: false
    },
    ship_country: {
      type: String,
      required: false
    },
    multi_card_name:{
      type: String,
      required: false
    },
    value_a:{
      type: String,
      required: false
    },
    value_b:{
      type: String,
      required: false
    },
    value_c:{
      type: String,
      required: false
    },
    value_d:{
      type: String,
      required: false
    },
    firstName:{
      type: String,
      required: false
    },
    lastName:{
      type: String,
      required: false
    },
    fatherName:{
      type: String,
      required: false
    },
    fatherProfession:{
      type: String,
      required: false
    },
    motherName:{
      type: String,
      required: false
    },
    motherProfession:{
      type: String,
      required: false
    },
    phoneNumber:{
      type: String,
      required: false
    },
    birthdate:{
      type: String,
      required: false
    },
    permanentAddress:{
      type: String,
      required: false
    },
    presentAddress:{
      type: String,
      required: false
    },
    birthCertificateNo:{
      type: String,
      required: false
    },
    gender:{
      type: String,
      required: false
    },
    postOffice:{
      type: String,
      required: false
    },
    district:{
      type: String,
      required: false
    },
    img:{
      type: mongoose.Mixed,
      required: false
    },
    totalAmount:{
      type: String,
      required: false
    },
    paymentStatus:{
      type: String,
      required: false
    },
    subMissonDate:{
      type: String,
      required: false
    }
  }
);

module.exports = mongoose.model("AdmissionFormCollection", AdmissionFormSchema);
