module.exports = {
  inventory: (variant_raw) => {
    return {
      "productId" : variant_raw.product_id,
      "variantId" : variant_raw.id,
      "stock" : 0
    }
  },
  
  product: (product_raw) => {
    return {
      "code" : product_raw.id, 
      "title" : product_raw.title,
      "vendor" : product_raw.vendor,
      "bodyHtml" : product_raw.bodyHtml,
      "variants" : product_format_variants(product_raw.variants),
      "images" : product_format_images(product_raw.variants),
    }
  },  
  error: (error_message) =>{
    return {
      "message": error_message
    }
  }
}

  //product helper to create variants
  function product_format_variants(product_variants) {
    let variants = [];
    product_variants.forEach(product_variant => {
      variants.push(variant(product_variant));
    });
    return variants;
  }
  
  //product helper to create images
  function product_format_images(product_variants) {
    let images_data = [];
    product_variants.forEach(product_variant => {
      product_variant.images.forEach(variant_image => {
        images_data.push(image(product_variant.id, variant_image));
      });
    });
    return images_data;
  }
  
  function variant(variant_raw) {
    return {
      "id" : variant_raw.id.toString(),
      "title" : variant_raw.title,
      "sku" : variant_raw.sku,
      "available" : false,
      "inventory_quantity" : 0,
      "weight" : weight(variant_raw),
    }
  }
  
  function weight(variant_raw) {
    return {
      "value" : Number(variant_raw.weight),
      "unit" : variant_raw.weight_unit
    }
  }
  
  function image(variant_id, image) {
    return {
      "source" : image.src,
      "variantId" : variant_id
    }
  }

