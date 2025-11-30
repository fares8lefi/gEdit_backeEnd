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
    res.status(201).json({ success: true, suppliers });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.updateSuppliers = async function (req, res) {
  try {
    const { name, code, email, phone, address } = req.body;
    const id = req.params.id;
    const verifId = await supplierModel.find({id});
    if (!verifId) {
      res.status(400).json({ success: false, message: "suppliers not found " });
    }
    await supplierModel.findByIdAndUpdate(id, {
      name,
      code,
      email,
      phone,
      address,
    });
    const suppliers = await supplierModel.findById(id);
    res.status(201).json({ success: true, supplier:suppliers });
  } catch (error) {
    console.log("error===>",error)
    res.status(500).json({ message: error.message });
  }
};

module.exports.deleteSuppliers = async function (req, res) {
  try {
    const id = req.params.id;

    const verifId = await supplierModel.find({ id });

    if (!verifId || verifId.length === 0) {
      res.status(400).json({ success: false, message: "suppliers not found " });
    }
    await supplierModel.findOneAndDelete(id);
    res
      .status(201)
      .json({ success: true, message: "suppliers delete successflly" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports.getActiveSuppliers = async function(req,res){
  try{
      const suppliers = await  supplierModel.find({ is_active : true})
      if(suppliers.length ===0){
        res.status(400).json({ success: false, message: " no suppliers found " });
      }
         res .status(201).json({ success: true, suppliers });
  }catch(error){
    res.status(500).json({ message: error.message });
  }
}