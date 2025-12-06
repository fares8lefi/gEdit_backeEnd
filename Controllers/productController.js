const productModel = require("../models/categorieModel");
const supplierModel = require("../models/suppliersModel");

module.exports.addProduct = async function (req, res) {
  try {
    const {
      code,
      barcode,
      name,
      purchase_price,
      selling_price,
      unit,
      stock_min,
      supplier,
      categories,
    } = req.body;

    // Vérifier si le fournisseur existe
    if (supplier) {
      const supplierExists = await supplierModel.findById(supplier);
      if (!supplierExists) {
        return res.status(400).json({ message: "Fournisseur introuvable" });
      }
    }

    // Vérifier si les catégories existent
    if (categories && categories.length > 0) {
      for (const catId of categories) {
        const catExists = await productModel.findById(catId);
        if (!catExists) {
          return res.status(400).json({ message: `Catégorie introuvable: ${catId}` });
        }
      }
    }

    const newProduct = await productModel.create({
      code,
      barcode,
      name,
      purchase_price,
      selling_price,
      unit,
      stock_min,
      supplier: supplier || null,
      categories: categories || [],
    });

    return res.status(201).json({ message: "Produit ajouté avec succès", product: newProduct });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};
