package models.core

/**
 * Author: Ievgeniia Ozirna
 *
 * Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
 */

import reactivemongo.bson.BSONObjectID

/**
 * The product object.
 *
 * @param id           The unique ID of the item.
 * @param name         The name of the product.
 * @param description  The description of the product.
 * @param quantity     The quantity of the product.
 * @param price        The price of the product.
 * @param attributes   The additional information about the product.
 */
case class Item(
  id: BSONObjectID,
  name: String,
  description: String,
  details: Seq[String],
  composition: Seq[Composition],
  color: Color,
  size: Seq[Size],
  inventory: Int,
  price: Double,
  currency: String,
  nameOfImg: Int,
  category: String,
  subCategory: String,
  stateOfProduct: String,
  department: String,
  typeOfCollection: String,
  links: Seq[String],
  availability: String = "Available to be shipped by 12/12/2020",
  shippingCosts: Double = 0.0,
  total: Double
)

object Item {

  def createItem(item: Item, size: String, quantity: Int): Item = Item(
    id = item.id,
    name = item.name,
    description = item.description,
    details = item.details,
    composition = item.composition,
    color = Color(
      color = item.color.color,
      imgIndex = item.color.imgIndex
    ),
    size = Seq(Size(
      number = size,
      quantity = quantity,
      availability = item.availability
    )),
    inventory = quantity,
    price = item.price,
    currency = item.currency,
    nameOfImg = item.nameOfImg,
    category = item.category,
    subCategory = item.subCategory,
    stateOfProduct = item.stateOfProduct,
    department = item.department,
    typeOfCollection = item.typeOfCollection,
    links = item.links,
    availability = item.availability,
    shippingCosts = item.shippingCosts,
    total = item.total
  )

  def createDressesCollection: Seq[Item] = {
    val item1 = Item(
      id = BSONObjectID.generate,
      name = "Long Halter Tired Cotton Dress",
      description = "Long Halter Tired Cotton Dress",
      details = Seq(
        "Textured style",
        "Halter neck",
        "Side tie fastenings",
        "Shift silhouette",
        "Long length",
        "Sleeveless",
        "Machine wash",
        "Made in Italy"
      ),
      composition = Seq(Composition(
        fabric = "Cotton",
        percentage = "100%"
      )),
      color = Color(
        color = "Brown",
        imgIndex = "brown"
      ),
      size = Seq(
        Size(
          number = "XS",
          quantity = 4
        ),
        Size(
          number = "S",
          quantity = 3
        ),
        Size(
          number = "M",
          quantity = 4
        ),
        Size(
          number = "L",
          quantity = 2
        )
      ),
      inventory = 13,
      price = 567.00,
      currency = "EUR",
      nameOfImg = 1,
      category = "Dresses",
      subCategory = "Halter",
      stateOfProduct = "New Arrivals",
      department = "Fashion",
      typeOfCollection = "Ready-to-Wear",
      links = Seq(
        "halter_1-1.jpg",
        "halter_1-2.jpg",
        "halter_1-3.jpg",
        "halter_1-4.jpg",
        "halter_1-5.jpg"
      ),
      total = 567.00
    )

    val item2 = Item(
      id = BSONObjectID.generate,
      name = "Ribbed Knit Bodycon Dress",
      description = "White Ribbed Knit Wool Bodycon Dress",
      details = Seq(
        "Square neck",
        "Long sleeves",
        "Rear zip fastening",
        "Short length",
        "Gold-tone button detailing",
        "Made in Italy"
      ),
      composition = Seq(
        Composition(
          fabric = "Wool",
          percentage = "94%"
        ),
        Composition(
          fabric = "Polyester",
          percentage = "6%"
        )
      ),
      color = Color(
        color = "White",
        imgIndex = "white"
      ),
      size = Seq(
        Size(
          number = "XS",
          quantity = 4
        ),
        Size(
          number = "S",
          quantity = 2
        ),
        Size(
          number = "M",
          quantity = 3
        ),
        Size(
          number = "L",
          quantity = 2
        )
      ),
      inventory = 11,
      price = 724.00,
      currency = "EUR",
      nameOfImg = 2,
      category = "Dresses",
      subCategory = "Bodycon",
      stateOfProduct = "New Arrivals",
      department = "Fashion",
      typeOfCollection = "Ready-to-Wear",
      links = Seq(
        "bodycon_2-1.jpg",
        "bodycon_2-2.jpg",
        "bodycon_2-3.jpg",
        "bodycon_2-4.jpg",
        "bodycon_2-5.jpg"
      ),
      total = 724.00
    )

    val item3 = Item(
      id = BSONObjectID.generate,
      name = "Floral A-Line Dress",
      description = "Floral Embroidered A-Line Dress",
      details = Seq(
        "Embroidered floral design",
        "A-line shape skirt",
        "Sleeveless",
        "V-line neck",
        "Rear zip fastening",
        "Fitted waist",
        "Scalloped lace hem",
        "Ruffle trimming",
        "Dry clean only",
        "Made in Italy"
      ),
      composition = Seq(Composition(
        fabric = "Polyester",
        percentage = "100%"
      )),
      color = Color(
        color = "Purple",
        imgIndex = "purple"
      ),
      size = Seq(
        Size(
          number = "XS",
          quantity = 4
        ),
        Size(
          number = "S",
          quantity = 3
        ),
        Size(
          number = "M",
          quantity = 4
        ),
        Size(
          number = "L",
          quantity = 2
        )
      ),
      inventory = 13,
      price = 875.00,
      currency = "EUR",
      nameOfImg = 3,
      category = "Dresses",
      subCategory = "A-Line",
      stateOfProduct = "New Arrivals",
      department = "Fashion",
      typeOfCollection = "Ready-to-Wear",
      links = Seq(
        "a-line_3-1.jpg",
        "a-line_3-2.jpg",
        "a-line_3-3.jpg",
        "a-line_3-4.jpg",
        "a-line_3-5.jpg"
      ),
      total = 875.00
    )

    val item4 = Item(
      id = BSONObjectID.generate,
      name = "Mesh-knit Wrap Dress",
      description = "Mesh-knit Wrap Dress",
      details = Seq(
        "Wrap design",
        "V-line neck",
        "Semi-sheer construction",
        "Long sleeves",
        "Elasticated waistband",
        "Fine knit",
        "Dry clean only",
        "Made in Italy"
      ),
      composition = Seq(
        Composition(
          fabric = "Lining: Polyester 100%",
          percentage = ""
        ),
        Composition(
          fabric = "Outer: Cotton 69%, Silk 30%, Spandex/Elastane 1%",
          percentage = ""
        )
      ),
      color = Color(
        color = "Beige",
        imgIndex = "beige"
      ),
      size = Seq(
        Size(
          number = "XS",
          quantity = 3
        ),
        Size(
          number = "S",
          quantity = 4
        ),
        Size(
          number = "M",
          quantity = 3
        ),
        Size(
          number = "L",
          quantity = 2
        )
      ),
      inventory = 12,
      price = 498.00,
      currency = "EUR",
      nameOfImg = 4,
      category = "Dresses",
      subCategory = "Wrap",
      stateOfProduct = "Permanent Collection",
      department = "Fashion",
      typeOfCollection = "Ready-to-Wear",
      links = Seq(
        "wrap_4-1.jpg",
        "wrap_4-2.jpg",
        "wrap_4-3.jpg",
        "wrap_4-4.jpg",
        "wrap_4-5.jpg"
      ),
      total = 498.00
    )

    val item5 = Item(
      id = BSONObjectID.generate,
      name = "Layered Wrap Dress",
      description = "Layered Wrap Dress",
      details = Seq(
        "Wrap Design",
        "Adjustable strap to the side",
        "Layered design",
        "Plunging V-line neck",
        "Long sleeves",
        "Handwash",
        "Made in Italy"
      ),
      composition = Seq(
        Composition(
          fabric = "Polyester",
          percentage = "95%"
        ),
        Composition(
          fabric = "Spandex/Elastane",
          percentage = "5%"
        )
      ),
      color = Color(
        color = "Navy Blue",
        imgIndex = "navy-blue"
      ),
      size = Seq(
        Size(
          number = "XS",
          quantity = 3
        ),
        Size(
          number = "S",
          quantity = 4
        ),
        Size(
          number = "M",
          quantity = 3
        ),
        Size(
          number = "L",
          quantity = 2
        )
      ),
      inventory = 12,
      price = 459.00,
      currency = "EUR",
      nameOfImg = 5,
      category = "Dresses",
      subCategory = "Wrap",
      stateOfProduct = "Permanent Collection",
      department = "Fashion",
      typeOfCollection = "Ready-to-Wear",
      links = Seq(
        "wrap_5-1.jpg",
        "wrap_5-2.jpg",
        "wrap_5-3.jpg",
        "wrap_5-4.jpg",
        "wrap_5-5.jpg"
      ),
      total = 459.00
    )

    val item6 = Item(
      id = BSONObjectID.generate,
      name = "Floral Embroidered Mermaid Gown",
      description = "Cape Sleeve Floral Embroidered Mermaid Gown",
      details = Seq(
        "V-line neck",
        "Ribbon",
        "Fitted waist",
        "Long length",
        "Dry clean only",
        "Made in Italy"
      ),
      composition = Seq(Composition(
        fabric = "Nylon",
        percentage = "100%"
      )),
      color = Color(
        color = "Black",
        imgIndex = "black"
      ),
      size = Seq(
        Size(
          number = "XS",
          quantity = 3
        ),
        Size(
          number = "S",
          quantity = 4
        ),
        Size(
          number = "M",
          quantity = 3
        ),
        Size(
          number = "L",
          quantity = 2
        )
      ),
      inventory = 12,
      price = 1145.00,
      currency = "EUR",
      nameOfImg = 6,
      category = "Dresses",
      subCategory = "Mermaid",
      stateOfProduct = "Permanent Collection",
      department = "Fashion",
      typeOfCollection = "Ready-to-Wear",
      links = Seq(
        "mermaid_6-1.jpg",
        "mermaid_6-2.jpg",
        "mermaid_6-3.jpg",
        "mermaid_6-4.jpg",
        "mermaid_6-5.jpg"
      ),
      total = 1145.00
    )

    val item7 = Item(
      id = BSONObjectID.generate,
      name = "Long Halter Dress",
      description = "Gathered details and an asymmetric hem offer a striking silhouette",
      details = Seq(
        "Turtle neck",
        "Sleeveless",
        "Asymmetric hem",
        "Mid-length",
        "Button fastening",
        "Made in Italy"
      ),
      composition = Seq(Composition(
        fabric = "Polyester",
        percentage = "100%"
      )),
      color = Color(
        color = "Dark Blue",
        imgIndex = "dark-blue"
      ),
      size = Seq(
        Size(
          number = "XS",
          quantity = 3
        ),
        Size(
          number = "S",
          quantity = 4
        ),
        Size(
          number = "M",
          quantity = 3
        ),
        Size(
          number = "L",
          quantity = 2
        )
      ),
      inventory = 12,
      price = 344.00,
      currency = "EUR",
      nameOfImg = 7,
      category = "Dresses",
      subCategory = "Halter",
      stateOfProduct = "New Arrivals",
      department = "Fashion",
      typeOfCollection = "Ready-to-Wear",
      links = Seq(
        "halter_7-1.jpg",
        "halter_7-2.jpg",
        "halter_7-3.jpg",
        "halter_7-4.jpg",
        "halter_7-5.jpg"
      ),
      total = 344.00
    )

    val item8 = Item(
      id = BSONObjectID.generate,
      name = "Floral Print Bodycon Dress",
      description = "Floral Print Bodycon Dress",
      details = Seq(
        "Round neck",
        "Shoulder pads",
        "Long sleeves",
        "Fitted silhouette",
        "Concealed rear fastening",
        "Dry clean only",
        "Made in Italy"
      ),
      composition = Seq(
        Composition(
          fabric = "Viscose",
          percentage = "93%"
        ),
        Composition(
          fabric = "Elastane",
          percentage = "7%"
        )
      ),
      color = Color(
        color = "Floral",
        imgIndex = "floral"
      ),
      size = Seq(
        Size(
          number = "XS",
          quantity = 3
        ),
        Size(
          number = "S",
          quantity = 4
        ),
        Size(
          number = "M",
          quantity = 3
        ),
        Size(
          number = "L",
          quantity = 2
        )
      ),
      inventory = 12,
      price = 873.00,
      currency = "EUR",
      nameOfImg = 8,
      category = "Dresses",
      subCategory = "Bodycon",
      stateOfProduct = "Permanent Collection",
      department = "Fashion",
      typeOfCollection = "Ready-to-Wear",
      links = Seq(
        "bodycon_8-1.jpg",
        "bodycon_8-2.jpg",
        "bodycon_8-3.jpg",
        "bodycon_8-4.jpg",
        "bodycon_8-5.jpg"
      ),
      total = 873.00
    )

    val seq = Seq(item1, item2, item3, item4, item5, item6, item7, item8)
    seq
  }

  def createEveningCollection: Seq[Item] = {

    val item1 = Item(
      id = BSONObjectID.generate,
      name = "Embellished Evening Dress",
      description = "Embellished Evening Dress",
      details = Seq(
        "Sequin embroidery",
        "Fitted waist",
        "Ankle length",
        "Handwash",
        "Made in Italy"
      ),
      composition = Seq(Composition(
        fabric = "Polyester",
        percentage = "100%"
      )),
      color = Color(
        color = "White",
        imgIndex = "white"
      ),
      size = Seq(
        Size(
          number = "XS",
          quantity = 4
        ),
        Size(
          number = "S",
          quantity = 3
        ),
        Size(
          number = "M",
          quantity = 4
        ),
        Size(
          number = "L",
          quantity = 2
        )
      ),
      inventory = 13,
      price = 567.00,
      currency = "EUR",
      nameOfImg = 1,
      category = "Evening",
      subCategory = "Evening",
      stateOfProduct = "Permanent Collection",
      department = "Fashion",
      typeOfCollection = "Ready-to-Wear",
      links = Seq(
        "evening_1-1.jpg",
        "evening_1-2.jpg",
        "evening_1-3.jpg",
        "evening_1-4.jpg",
        "evening_1-5.jpg"
      ),
      total = 567.00
    )

    val item2 = Item(
      id = BSONObjectID.generate,
      name = "Long Evening Dress",
      description = "Black Cotton Long Evening Dress",
      details = Seq(
        "Straight neck",
        "Lace panels",
        "Deep V-back",
        "Made in Italy"
      ),
      composition = Seq(
        Composition(
          fabric = "Silk",
          percentage = "90%"
        ),
        Composition(
          fabric = "Cotton",
          percentage = "10%"
        )
      ),
      color = Color(
        color = "Black",
        imgIndex = "black"
      ),
      size = Seq(
        Size(
          number = "XS",
          quantity = 4
        ),
        Size(
          number = "S",
          quantity = 2
        ),
        Size(
          number = "M",
          quantity = 3
        ),
        Size(
          number = "L",
          quantity = 2
        )
      ),
      inventory = 11,
      price = 724.00,
      currency = "EUR",
      nameOfImg = 2,
      category = "Evening",
      subCategory = "Evening",
      stateOfProduct = "New Arrivals",
      department = "Fashion",
      typeOfCollection = "Ready-to-Wear",
      links = Seq(
        "evening_2-1.jpg",
        "evening_2-2.jpg",
        "evening_2-3.jpg",
        "evening_2-4.jpg",
        "evening_2-5.jpg"
      ),
      total = 724.00
    )

    val seq = Seq(item1, item2)
    seq
  }

  def createJacketsCollection: Seq[Item] = {
    val item1 = Item(
      id = BSONObjectID.generate,
      name = "Multi-pocket Zip Jacket",
      description = "Khaki green and cream silk multi-pocket zip jacket",
      details = Seq(
        "Classic collar",
        "Front zip fastening",
        "Two chest pockets",
        "Front flap pockets",
        "Fitted cuffs",
        "Long sleeves",
        "Dry clean only",
        "Made in Italy"
      ),
      composition = Seq(
        Composition(
          fabric = "Silk",
          percentage = "100%"
        ),
        Composition(
          fabric = "Nylon",
          percentage = "100%"
        )
      ),
      color = Color(
        color = "Khaki Green",
        imgIndex = "khaki-green"
      ),
      size = Seq(
        Size(
          number = "XS",
          quantity = 4
        ),
        Size(
          number = "S",
          quantity = 3
        ),
        Size(
          number = "M",
          quantity = 4
        ),
        Size(
          number = "L",
          quantity = 2
        )
      ),
      inventory = 13,
      price = 567.00,
      currency = "EUR",
      nameOfImg = 1,
      category = "Jackets",
      subCategory = "Jackets",
      stateOfProduct = "Permanent Collection",
      department = "Fashion",
      typeOfCollection = "Ready-to-Wear",
      links = Seq(
        "jackets_1-1.jpg",
        "jackets_1-2.jpg",
        "jackets_1-3.jpg",
        "jackets_1-4.jpg",
        "jackets_1-5.jpg"
      ),
      total = 567.00
    )

    val item2 = Item(
      id = BSONObjectID.generate,
      name = "Metallic Sheen Biker Jacket",
      description = "Metallic Sheen Biker Jacket",
      details = Seq(
        "Notched lapels",
        "Front zip fastening",
        "Long sleeves",
        "Metallic sheen",
        "Side zipped pockets",
        "Specialist Cleaning",
        "Made in Italy"
      ),
      composition = Seq(
        Composition(
          fabric = "Lining: Cotton 100%, Viscose 100%",
          percentage = ""
        ),
        Composition(
          fabric = "Outer: Lamb Skin 100%",
          percentage = ""
        )
      ),
      color = Color(
        color = "Metallic",
        imgIndex = "metallic"
      ),
      size = Seq(
        Size(
          number = "XS",
          quantity = 4
        ),
        Size(
          number = "S",
          quantity = 2
        ),
        Size(
          number = "M",
          quantity = 3
        ),
        Size(
          number = "L",
          quantity = 2
        )
      ),
      inventory = 11,
      price = 724.00,
      currency = "EUR",
      nameOfImg = 2,
      category = "Jackets",
      subCategory = "Jackets",
      stateOfProduct = "Permanent Collection",
      department = "Fashion",
      typeOfCollection = "Ready-to-Wear",
      links = Seq(
        "jackets_2-1.jpg",
        "jackets_2-2.jpg",
        "jackets_2-3.jpg",
        "jackets_2-4.jpg",
        "jackets_2-5.jpg"
      ),
      total = 724.00
    )

    val item3 = Item(
      id = BSONObjectID.generate,
      name = "Metallic Quilted Jacket",
      description = "Silver-tone Feather Down Metallic Quilted Jacket",
      details = Seq(
        "Metallic sheen",
        "Quilted interior",
        "Boxy fit",
        "Short length",
        "Zip fastening",
        "Two front pockets",
        "Hood with drawstring tie fastenings",
        "Dry clean only",
        "Made in Italy"
      ),
      composition = Seq(
        Composition(
          fabric = "Lining: Feather Down 100%, Polyamide 100%",
          percentage = ""
        ),
        Composition(
          fabric = "Outer: Polyamide 100%, Polyester 100%",
          percentage = ""
        )
      ),
      color = Color(
        color = "Metallic",
        imgIndex = "metallic"
      ),
      size = Seq(
        Size(
          number = "XS",
          quantity = 4
        ),
        Size(
          number = "S",
          quantity = 3
        ),
        Size(
          number = "M",
          quantity = 4
        ),
        Size(
          number = "L",
          quantity = 2
        )
      ),
      inventory = 13,
      price = 875.00,
      currency = "EUR",
      nameOfImg = 3,
      category = "Jackets",
      subCategory = "Jackets",
      stateOfProduct = "New Arrivals",
      department = "Fashion",
      typeOfCollection = "Ready-to-Wear",
      links = Seq(
        "jackets_3-1.jpg",
        "jackets_3-2.jpg",
        "jackets_3-3.jpg",
        "jackets_3-4.jpg",
        "jackets_3-5.jpg"
      ),
      total = 875.00
    )

    val seq = Seq(item1, item2, item3)
    seq
  }

}
