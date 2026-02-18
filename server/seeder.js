const mongoose = require("mongoose");
const { couponModel } = require("./models/couponModel");
const { foodCategoryModel } = require("./models/foodCategoryModel");
const { foodItemModel } = require("./models/foodItemModel");
const { restaurantModel } = require("./models/restaurantModel");

require("dotenv").config();
const MONGO_URL = process.env.MONGO_URL;

const foodCategories = [
  "Pizza",
  "Pasta",
  "Burger",
  "Fries",
  "Cheese",
  "Sandwich",
  "Mac n Cheese",
  "Cheese Balls",
  "Tacos",
  "Quesadilla",
];
const categoryImages = {
  Pizza: "https://res.cloudinary.com/dsul1oc7e/image/upload/v1752392982/pizza_dt6cz3.png",     
  Pasta: "https://res.cloudinary.com/dsul1oc7e/image/upload/v1752392978/pasta_sghdpa.png",       
  Burger: "https://res.cloudinary.com/dsul1oc7e/image/upload/v1752392979/burger_chxia8.png",        
  Fries: "https://res.cloudinary.com/dsul1oc7e/image/upload/v1752392979/fries_za6itr.png",
  Cheese: "https://res.cloudinary.com/dsul1oc7e/image/upload/v1752392962/cheese_pddp31.png",
  Sandwich: "https://res.cloudinary.com/dsul1oc7e/image/upload/v1752392977/sandwich_ylgsg6.png",
  "Mac n Cheese": "https://res.cloudinary.com/dsul1oc7e/image/upload/v1752392980/macaroni_pasta_j940rp.png",
  "Cheese Balls": "https://res.cloudinary.com/dsul1oc7e/image/upload/v1752392975/cheese_balls_mynf54.png",
  Tacos:"https://res.cloudinary.com/dsul1oc7e/image/upload/v1752392978/tacos_avsska.png",
  Quesadilla: "https://res.cloudinary.com/dsul1oc7e/image/upload/v1752392977/quesadilla_qntxey.png"
};

const restaurants = [
  {
    name: "Cheezy Bites",
    city: "Delhi",
    address: "Rajouri Garden",
    rating: 4.5,
    categories: ["Pizza", "Burger", "Fries"],
    deliveryTime: "30 mins",
    image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092"
  },
  {
    name: "Pasta Nation",
    city: "Mumbai",
    address: "Bandra",
    rating: 4.3,
    categories: ["Pasta", "Sandwich", "Quesadilla"],
    deliveryTime: "25 mins",
    image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092"
  },
  {
    name: "Burger Bliss",
    city: "Bangalore",
    address: "Indiranagar",
    rating: 4.7,
    categories: ["Burger", "Cheese Balls", "Tacos"],
    deliveryTime: "35 mins",
    image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092"
  },
  {
    name: "Cheezy Mania",
    city: "Chennai",
    address: "T Nagar",
    rating: 4.1,
    categories: ["Cheese", "Pizza", "Fries"],
    deliveryTime: "20 mins",
    image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092"
  },
  {
    name: "Mac & Melt",
    city: "Delhi",
    address: "Saket",
    rating: 4.6,
    categories: ["Mac n Cheese", "Cheese Balls", "Pasta"],
    deliveryTime: "28 mins",
    image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092"
  },
  {
    name: "Melt House",
    city: "Hyderabad",
    address: "Jubilee Hills",
    rating: 4.4,
    categories: ["Pizza", "Sandwich", "Tacos"],
    deliveryTime: "30 mins",
    image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092"
  },
  {
    name: "Crust Corner",
    city: "Pune",
    address: "Koregaon Park",
    rating: 4.2,
    categories: ["Pizza", "Pasta", "Quesadilla"],
    deliveryTime: "32 mins",
    image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092"
  },
  {
    name: "Grill & Cheese",
    city: "Jaipur",
    address: "MI Road",
    rating: 4.0,
    categories: ["Burger", "Sandwich", "Fries"],
    deliveryTime: "27 mins",
    image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092"
  },
  {
    name: "Melted Magic",
    city: "Ahmedabad",
    address: "Navrangpura",
    rating: 4.3,
    categories: ["Quesadilla", "Cheese", "Cheese Balls"],
    deliveryTime: "29 mins",
    image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092"
  },
  {
    name: "The Cheddar Club",
    city: "Kolkata",
    address: "Salt Lake",
    rating: 4.5,
    categories: ["Pizza", "Mac n Cheese", "Tacos"],
    deliveryTime: "33 mins",
    image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092"
  },
];

const couponList = [
  { code: "CHEESE10", discount: 10 },
  { code: "MELT20", discount: 20 },
  { code: "GRILLED30", discount: 30 },
  { code: "NACHOS15", discount: 15 },
  { code: "EXTRACHEESE", discount: 25 },
];

const imageMap = {
  Pizza: {
    Margherita: "https://res.cloudinary.com/dsul1oc7e/image/upload/v1752392958/margherita_zyiabw.png",
    Pepperoni: "https://res.cloudinary.com/dsul1oc7e/image/upload/v1752392953/pepperoni_pizza_uuzck5.png",
    "Four Cheese":
      "https://res.cloudinary.com/dsul1oc7e/image/upload/v1752392950/four_cheese_pizza_f4q6ap.png",
    "BBQ Paneer":
      "https://res.cloudinary.com/dsul1oc7e/image/upload/v1752392951/bbq_paneer_pizza_uv1fi7.png",
    "Cheese Burst":
      "https://res.cloudinary.com/dsul1oc7e/image/upload/v1752392952/cheese_burst_pizza_zwtq8y.png",
  },
  Pasta: {
    Alfredo: "https://res.cloudinary.com/dsul1oc7e/image/upload/v1752392928/alfredo_zi1hra.png",
    Arrabbiata: "https://res.cloudinary.com/dsul1oc7e/image/upload/v1752392932/arrabiata_e61nu5.png",
    Macaroni: "https://res.cloudinary.com/dsul1oc7e/image/upload/v1752392980/macaroni_pasta_j940rp.png",
    "Penne Cheese":
      "https://res.cloudinary.com/dsul1oc7e/image/upload/v1752399123/cheese_burger_q8ctnd.png",
    "Spaghetti Melt":
      "https://res.cloudinary.com/dsul1oc7e/image/upload/v1752392933/sphagetti_melt_hnuior.png",
  },
  Burger: {
    "Cheese Burger":
      "https://res.cloudinary.com/dsul1oc7e/image/upload/v1752392939/double_cheese_burger_qsggsj.png",
    "Veg Melt": "https://res.cloudinary.com/dsul1oc7e/image/upload/v1752392961/veg_melt_burger_jsymlz.png",
    "Crispy Paneer":
      "https://res.cloudinary.com/dsul1oc7e/image/upload/v1752392936/crispy_paneer_burger_chxkag.png",
    "Double Cheese":
      "https://res.cloudinary.com/dsul1oc7e/image/upload/v1752392939/double_cheese_burger_qsggsj.png",
    "Chipotle Melt":
      "https://res.cloudinary.com/dsul1oc7e/image/upload/v1752392940/chipotle_melt_burger_d8mwen.png",
  },
  Fries: {
    "Loaded Fries":
      "https://res.cloudinary.com/dsul1oc7e/image/upload/v1752392936/loaded_fries_xc2qps.png",
    "Cheese Garlic":
      "https://res.cloudinary.com/dsul1oc7e/image/upload/v1752392938/cheese_garlic_fries_vba9m2.png",
    "Curly Melt":
      "https://res.cloudinary.com/dsul1oc7e/image/upload/v1752392931/curly_fries_yopuk9.png",
    "Masala Melt":
      "https://res.cloudinary.com/dsul1oc7e/image/upload/v1752392936/masala_melt_fries_kcfwwx.png",
    "Chilli Cheese":
      "https://res.cloudinary.com/dsul1oc7e/image/upload/v1752392935/chilli_cheese_fries_nz2qzv.png",
      },
  Cheese: {
    "Cheddar":
      "https://res.cloudinary.com/dsul1oc7e/image/upload/v1752392962/cheese_pddp31.png",
    "Mozzarella":
      "https://res.cloudinary.com/dsul1oc7e/image/upload/v1752392958/mozarella_jb7f2d.png",
    "Parmesan":
      "https://res.cloudinary.com/dsul1oc7e/image/upload/v1752392960/parmesan_c83kir.png",
    "Gouda":
      "https://res.cloudinary.com/dsul1oc7e/image/upload/v1752392964/gouda_bo7dva.png",
    "Ricotta":
      "https://res.cloudinary.com/dsul1oc7e/image/upload/v1752392959/ricotta_cheese_cnt16n.png",
  },
  Sandwich: {
    "Grilled Cheese":
      "https://res.cloudinary.com/dsul1oc7e/image/upload/v1752392943/grilled_cheese_sandwich_x7dld8.png",
    "Paneer Melt":
      "https://res.cloudinary.com/dsul1oc7e/image/upload/v1752392943/paneer_sandwich_acaqov.png",
    "Tomato Basil":
      "https://res.cloudinary.com/dsul1oc7e/image/upload/v1752392942/tomato_basil_sandwich_bqtpl9.png",
    "Veggie Stuff":
      "https://res.cloudinary.com/dsul1oc7e/image/upload/v1752392940/veggie_stuff_sandwich_rhkavg.png",
    "Corn Mayo": "https://res.cloudinary.com/dsul1oc7e/image/upload/v1752392942/corn_mayo_sandwich_dclory.png",
  },
  "Mac n Cheese": {
    "Classic Mac":
      "https://res.cloudinary.com/dsul1oc7e/image/upload/v1752392953/classic_mac_iyu84n.png",
    "Truffle Mac":
      "https://res.cloudinary.com/dsul1oc7e/image/upload/v1752392947/truffle_mac_voy0f9.png",
    "Jalapeno Mac":
      "https://res.cloudinary.com/dsul1oc7e/image/upload/v1752392947/truffle_mac_voy0f9.png",
    "Smokey Mac":
      "https://res.cloudinary.com/dsul1oc7e/image/upload/v1752392947/smokey_mac_zegqex.png",
    "Baked Mac": "https://res.cloudinary.com/dsul1oc7e/image/upload/v1752392947/baked_mac_egwjhw.png",
  },
  "Cheese Balls": {
    "Fried Cheese Balls":
      "https://res.cloudinary.com/dsul1oc7e/image/upload/v1752392950/fried_cheese_balls_koasvx.png",
    "Chilli Cheese Balls":
      "https://res.cloudinary.com/dsul1oc7e/image/upload/v1752392943/chilli_cheese_balls_cwnt99.png",
    "Garlic Melt":
      "https://res.cloudinary.com/dsul1oc7e/image/upload/v1752392953/garlic_melt_cheese_balls_kmmasw.png",
    "Crunchy Balls":
      "https://res.cloudinary.com/dsul1oc7e/image/upload/v1752392946/crunchy_cheese_balls_tzxn6u.png",
    "Mozzarella Bombs":
      "https://res.cloudinary.com/dsul1oc7e/image/upload/v1752392944/mozarella_bombs_f99tkn.png",
  },
  Tacos: {
    "Cheese Tacos":
      "https://res.cloudinary.com/dsul1oc7e/image/upload/v1752392931/cheese_tacos_zslmtm.png",
    "Spicy Veg Tacos":
      "https://res.cloudinary.com/dsul1oc7e/image/upload/v1752392931/spicy_veg_tacos_zqapst.png",
    "Loaded Melt":
      "https://res.cloudinary.com/dsul1oc7e/image/upload/v1752392932/sour_cream_tacos_e7beau.png",
    "Sour Cream Taco":
      "https://res.cloudinary.com/dsul1oc7e/image/upload/v1752392929/loaded_melt_tacos_qyqxn1.png",
    "Crispy Bean":
      "https://res.cloudinary.com/dsul1oc7e/image/upload/v1752392931/crispy_bean_tacos_implls.png",
  },
  Quesadilla: {
    "Classic Quesadilla":
      "https://res.cloudinary.com/dsul1oc7e/image/upload/v1752392964/classic_quesadilla_erysrv.png",
    "Veg Melt Quesadilla":
      "https://res.cloudinary.com/dsul1oc7e/image/upload/v1752392959/veg_melt_quesadilla_dxr8nj.png",
    "Corn Cheese":
      "https://res.cloudinary.com/dsul1oc7e/image/upload/v1752392957/corn_cheese_quesadilla_bzn4sh.png",
    "Mushroom Melt":
      "https://res.cloudinary.com/dsul1oc7e/image/upload/v1752392956/mushroom_melt_quesadilla_uj8reo.png",
    "Bean Explosion":
      "https://res.cloudinary.com/dsul1oc7e/image/upload/v1752392957/bean_queasdilla_nquprq.png",
  },
}

const generateFoodItems = (restaurant, category) => {
  const baseNames = {
    Pizza: [
      "Margherita",
      "Pepperoni",
      "Four Cheese",
      "BBQ Paneer",
      "Cheese Burst",
    ],
    Pasta: [
      "Alfredo",
      "Arrabbiata",
      "Macaroni",
      "Penne Cheese",
      "Spaghetti Melt",
    ],
    Burger: [
      "Cheese Burger",
      "Veg Melt",
      "Crispy Paneer",
      "Double Cheese",
      "Chipotle Melt",
    ],
    Fries: [
      "Loaded Fries",
      "Cheese Garlic",
      "Curly Melt",
      "Masala Melt",
      "Chilli Cheese",
    ],
    Cheese: [
      "Cheddar", 
      "Mozzarella", 
      "Parmesan", 
      "Gouda", 
      "Ricotta",
    ],
    Sandwich: [
      "Grilled Cheese",
      "Paneer Melt",
      "Tomato Basil",
      "Veggie Stuff",
      "Corn Mayo",
    ],
    "Mac n Cheese": [
      "Classic Mac",
      "Truffle Mac",
      "Jalapeno Mac",
      "Smokey Mac",
      "Baked Mac",
    ],
    "Cheese Balls": [
      "Fried Cheese Balls",
      "Chilli Cheese Balls",
      "Garlic Melt",
      "Crunchy Balls",
      "Mozzarella Bombs",
    ],
    Tacos: [
      "Cheese Tacos",
      "Spicy Veg Tacos",
      "Loaded Melt",
      "Sour Cream Taco",
      "Crispy Bean",
    ],
    Quesadilla: [
      "Classic Quesadilla",
      "Veg Melt Quesadilla",
      "Corn Cheese",
      "Mushroom Melt",
      "Bean Explosion",
    ],
  };

  const selectedItems = baseNames[category] || [];

  return selectedItems.map((name) => ({
    name,
    category,
    restaurantID: restaurant._id,
    price: Math.floor(Math.random() * 150 + 100),
    isVeg: Math.random() < 0.7, //means randomly 70% chance of it being veg
    image: imageMap[category]?.[name] ,
  }));
};

const seedDB = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("connected to db");

    //clear collections
    await foodCategoryModel.deleteMany();
    await restaurantModel.deleteMany();
    await foodItemModel.deleteMany();
    await couponModel.deleteMany();

    //insert categories
    await foodCategoryModel.insertMany(
      foodCategories.map((name) => ({
        name,
        image: categoryImages[name] || fallbackImage(name),
      }))
    );
    console.log("inserted categories");

    const insertedRestaurants = await restaurantModel.insertMany(restaurants);
    console.log(insertedRestaurants);

    //insert food items
    let allItems = [];
    insertedRestaurants.forEach((restaurant) => {
      restaurant.categories.forEach((cat) => {
        const items = generateFoodItems(restaurant, cat);
        allItems.push(...items);
      });
    });

    await foodItemModel.insertMany(allItems);
    console.log(`Inserted ${allItems.length} food items`);

    // Insert coupons
    const coupons = couponList.map((c) => ({
      ...c,
      restaurantIDs: insertedRestaurants
        .sort(() => 0.5 - Math.random()) // shuffle
        .slice(0, 3) // pick 3 random restaurants
        .map((r) => r._id),
    }));

    await couponModel.insertMany(coupons);
    console.log("inserted coupons");
    console.log("dummy data seeded successfully");
    process.exit();
  } catch (error) {
    console.log("seeding failed", error);
    process.exit(1);
  }
};
seedDB();
