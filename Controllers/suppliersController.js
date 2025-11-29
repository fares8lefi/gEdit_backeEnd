const supplierModel = require("../models/suppliersModel");

module.exports.addSuppliers = async function (req, res) {
  try {
    const { name, code, email, phone, address } = req.body;
    const suppliers = await supplierModel.create({
      name,
      code,
      email,
      phone,
      address,
    });
    res.status(201).json({success:true,suppliers});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
