const categorieModel = require("../models/categorieModel");
const supplierModel = require("../models/suppliersModel");
const productModel = require("../models/productModel");

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
        const catExists = await categorieModel.findById(catId);
        if (!catExists) {
          return res
            .status(400)
            .json({ message: `Catégorie introuvable: ${catId}` });
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

    return res
      .status(201)
      .json({ message: "Produit ajouté avec succès", product: newProduct });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports.delteProduct = async function (req, res) {
  try {
    const id = req.params.id;
    console.log("id=====================<", id);
    const verifId = await productModel.findById(id);
    if (!verifId) {
      return res.status(400).json({ message: "produit non trouvé" });
    }
    await productModel.findByIdAndDelete(id);
    return res.status(200).json({ message: "Produit supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getAllProduct = async function (req, res) {
  try {
    const products = await productModel.find();
    if (products.length === 0) {
      return res.status(400).json({ message: "aucun produit trouvé" });
    }
    return res.status(200).json({ message: "Produit supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
