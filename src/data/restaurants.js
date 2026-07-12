/**
 * Mock data source.
 * Shaped like a typical REST API response so the UI can be swapped
 * to a real backend without changing any component.
 *
 * Menus are assembled from small reusable "pools" of dishes per cuisine,
 * which keeps the data file short and readable.
 */

const POOLS = {
  Indian: [
    { name: 'Butter Chicken', description: 'Tandoori chicken simmered in a silky tomato-butter gravy.', price: 340, isVeg: false, category: 'Main Course', image: '🍛' },
    { name: 'Paneer Tikka Masala', description: 'Charred paneer cubes in a rich onion-tomato masala.', price: 290, isVeg: true, category: 'Main Course', image: '🧆' },
    { name: 'Dal Makhani', description: 'Black lentils slow-cooked overnight with cream.', price: 240, isVeg: true, category: 'Main Course', image: '🥘' },
    { name: 'Tandoori Chicken (Half)', description: 'Yogurt and spice marinated chicken from the clay oven.', price: 320, isVeg: false, category: 'Starters', image: '🍗' },
    { name: 'Hara Bhara Kebab', description: 'Spinach, peas and potato patties with chaat masala.', price: 210, isVeg: true, category: 'Starters', image: '🥬' },
    { name: 'Garlic Naan', description: 'Soft tandoori bread brushed with garlic butter.', price: 70, isVeg: true, category: 'Breads', image: '🫓' },
    { name: 'Hyderabadi Chicken Biryani', description: 'Long grain rice layered with spiced chicken and saffron.', price: 360, isVeg: false, category: 'Biryani', image: '🍚' },
    { name: 'Veg Dum Biryani', description: 'Seasonal vegetables dum-cooked with basmati rice.', price: 280, isVeg: true, category: 'Biryani', image: '🍲' },
  ],
  Pizza: [
    { name: 'Margherita Classic', description: 'San Marzano tomato, fior di latte, fresh basil.', price: 299, isVeg: true, category: 'Pizza', image: '🍕' },
    { name: 'Farmhouse Supreme', description: 'Capsicum, corn, onion, mushroom and olives.', price: 429, isVeg: true, category: 'Pizza', image: '🍕' },
    { name: 'Peri Peri Chicken Pizza', description: 'Grilled chicken, peri peri sauce and jalapenos.', price: 469, isVeg: false, category: 'Pizza', image: '🍕' },
    { name: 'Paneer Makhani Pizza', description: 'Makhani base with paneer tikka and red onion.', price: 449, isVeg: true, category: 'Pizza', image: '🍕' },
    { name: 'Cheesy Garlic Bread', description: 'Baked garlic bread stuffed with mozzarella.', price: 169, isVeg: true, category: 'Starters', image: '🥖' },
    { name: 'Loaded Potato Wedges', description: 'Crispy wedges with cheese sauce and herbs.', price: 189, isVeg: true, category: 'Starters', image: '🥔' },
    { name: 'Creamy Alfredo Pasta', description: 'Penne tossed in a parmesan cream sauce.', price: 329, isVeg: true, category: 'Pasta', image: '🍝' },
    { name: 'Arrabbiata Pasta', description: 'Spicy tomato sauce, chilli flakes and basil.', price: 309, isVeg: true, category: 'Pasta', image: '🍜' },
  ],
  Burgers: [
    { name: 'Classic Veggie Burger', description: 'Crunchy veg patty, lettuce and house mayo.', price: 179, isVeg: true, category: 'Burgers', image: '🍔' },
    { name: 'Double Chicken Cheese Burger', description: 'Two grilled patties with cheddar and smoky sauce.', price: 289, isVeg: false, category: 'Burgers', image: '🍔' },
    { name: 'Paneer Zinger Burger', description: 'Crispy paneer fillet with tandoori mayo.', price: 229, isVeg: true, category: 'Burgers', image: '🍔' },
    { name: 'Mutton Smash Burger', description: 'Smashed mutton patty, caramelised onions, pickles.', price: 329, isVeg: false, category: 'Burgers', image: '🍔' },
    { name: 'Peri Peri Fries', description: 'Skin-on fries tossed in peri peri seasoning.', price: 139, isVeg: true, category: 'Sides', image: '🍟' },
    { name: 'Crispy Chicken Popcorn', description: 'Bite-sized spiced chicken with dip.', price: 199, isVeg: false, category: 'Sides', image: '🍗' },
    { name: 'Cheesy Nachos', description: 'Corn nachos with jalapeno cheese sauce.', price: 189, isVeg: true, category: 'Sides', image: '🧀' },
    { name: 'Chicken Wrap', description: 'Grilled chicken, veggies and mint mayo in a roll.', price: 209, isVeg: false, category: 'Wraps', image: '🌯' },
  ],
  Chinese: [
    { name: 'Veg Hakka Noodles', description: 'Wok-tossed noodles with julienned vegetables.', price: 220, isVeg: true, category: 'Main Course', image: '🍜' },
    { name: 'Chicken Schezwan Fried Rice', description: 'Fiery schezwan rice with shredded chicken.', price: 260, isVeg: false, category: 'Main Course', image: '🍚' },
    { name: 'Chilli Paneer Dry', description: 'Paneer tossed with bell peppers and soy chilli.', price: 250, isVeg: true, category: 'Starters', image: '🧆' },
    { name: 'Chicken Momos (Steamed)', description: 'Eight dumplings served with spicy chutney.', price: 190, isVeg: false, category: 'Starters', image: '🥟' },
    { name: 'Veg Spring Rolls', description: 'Crisp rolls stuffed with cabbage and carrot.', price: 170, isVeg: true, category: 'Starters', image: '🥠' },
    { name: 'Manchow Soup', description: 'Peppery broth topped with fried noodles.', price: 150, isVeg: true, category: 'Soups', image: '🍲' },
    { name: 'Chicken Manchurian', description: 'Crispy chicken balls in a tangy garlic gravy.', price: 280, isVeg: false, category: 'Main Course', image: '🍗' },
    { name: 'Honey Chilli Potato', description: 'Sweet-and-spicy glazed potato fingers.', price: 200, isVeg: true, category: 'Starters', image: '🥔' },
  ],
  Healthy: [
    { name: 'Quinoa Power Bowl', description: 'Quinoa, chickpeas, avocado and lemon dressing.', price: 320, isVeg: true, category: 'Bowls', image: '🥗' },
    { name: 'Grilled Chicken Salad', description: 'Greens, cherry tomato and herb-grilled chicken.', price: 340, isVeg: false, category: 'Salads', image: '🥗' },
    { name: 'Paneer Tikka Bowl', description: 'Brown rice bowl with paneer tikka and hummus.', price: 310, isVeg: true, category: 'Bowls', image: '🍲' },
    { name: 'Avocado Sourdough Toast', description: 'Smashed avocado, chilli flakes and seeds.', price: 260, isVeg: true, category: 'Breakfast', image: '🥑' },
    { name: 'Greek Yogurt Parfait', description: 'Layered yogurt, granola and fresh berries.', price: 230, isVeg: true, category: 'Breakfast', image: '🥣' },
    { name: 'Sprout Chaat Salad', description: 'Moong sprouts with onion, tomato and lime.', price: 180, isVeg: true, category: 'Salads', image: '🥬' },
    { name: 'Oats Idli (4 pcs)', description: 'Steamed oats idli with coconut chutney.', price: 170, isVeg: true, category: 'Breakfast', image: '🍥' },
    { name: 'Cold Pressed Detox Juice', description: 'Spinach, apple, cucumber and ginger.', price: 160, isVeg: true, category: 'Beverages', image: '🥤' },
  ],
  Desserts: [
    { name: 'Molten Chocolate Lava Cake', description: 'Warm cake with a flowing dark chocolate centre.', price: 180, isVeg: true, category: 'Desserts', image: '🍫' },
    { name: 'Gulab Jamun (2 pcs)', description: 'Soft milk dumplings soaked in rose syrup.', price: 120, isVeg: true, category: 'Desserts', image: '🍮' },
    { name: 'Tender Coconut Ice Cream', description: 'Slow-churned ice cream with coconut shavings.', price: 150, isVeg: true, category: 'Desserts', image: '🍨' },
    { name: 'Classic Tiramisu', description: 'Coffee-soaked ladyfingers with mascarpone.', price: 260, isVeg: true, category: 'Desserts', image: '🍰' },
    { name: 'Red Velvet Jar Cake', description: 'Layered red velvet with cream cheese frosting.', price: 190, isVeg: true, category: 'Desserts', image: '🧁' },
    { name: 'Belgian Waffle', description: 'Crisp waffle with chocolate sauce and banana.', price: 210, isVeg: true, category: 'Desserts', image: '🧇' },
    { name: 'Baked Cheesecake Slice', description: 'New York style cheesecake with berry compote.', price: 240, isVeg: true, category: 'Desserts', image: '🍰' },
    { name: 'Filter Coffee', description: 'South Indian style strong brewed coffee.', price: 90, isVeg: true, category: 'Beverages', image: '☕' },
  ],
  Beverages: [
    { name: 'Masala Chai', description: 'Brewed tea with ginger, cardamom and milk.', price: 70, isVeg: true, category: 'Beverages', image: '🍵' },
    { name: 'Iced Hazelnut Latte', description: 'Double espresso, milk and hazelnut syrup.', price: 190, isVeg: true, category: 'Beverages', image: '🧊' },
    { name: 'Mango Lassi', description: 'Thick yogurt smoothie with alphonso mango.', price: 140, isVeg: true, category: 'Beverages', image: '🥛' },
    { name: 'Fresh Lime Soda', description: 'Sweet or salted, served chilled.', price: 90, isVeg: true, category: 'Beverages', image: '🍋' },
    { name: 'Cold Coffee Thickshake', description: 'Blended coffee with vanilla ice cream.', price: 180, isVeg: true, category: 'Beverages', image: '🥤' },
    { name: 'Blueberry Smoothie', description: 'Blueberries, banana and greek yogurt.', price: 200, isVeg: true, category: 'Beverages', image: '🫐' },
    { name: 'Butterscotch Milkshake', description: 'Creamy shake with butterscotch crunch.', price: 175, isVeg: true, category: 'Beverages', image: '🍦' },
    { name: 'Chocolate Brownie', description: 'Fudgy walnut brownie, served warm.', price: 160, isVeg: true, category: 'Desserts', image: '🍫' },
  ],
};

const SEED = [
  { id: 1, name: 'Tandoor Tales', image: '🍛', rating: 4.5, cuisine: ['Indian', 'Biryani'], deliveryTime: 32, priceForTwo: 550, location: 'Baner, Pune', isVeg: false, description: 'North Indian classics from a traditional clay tandoor, cooked to order.', offers: ['50% OFF up to ₹100'], pools: ['Indian', 'Desserts'] },
  { id: 2, name: 'Pizza District', image: '🍕', rating: 4.3, cuisine: ['Pizza', 'Italian'], deliveryTime: 25, priceForTwo: 600, location: 'Koregaon Park, Pune', isVeg: false, description: 'Hand-stretched sourdough pizzas fired at 400°C in a stone oven.', offers: ['Buy 1 Get 1 on medium pizzas'], pools: ['Pizza', 'Beverages'] },
  { id: 3, name: 'The Green Bowl', image: '🥗', rating: 4.6, cuisine: ['Healthy', 'Salads'], deliveryTime: 22, priceForTwo: 450, location: 'Aundh, Pune', isVeg: true, description: 'Calorie-counted bowls, salads and breakfast plates. 100% vegetarian.', offers: ['Flat ₹75 OFF above ₹399'], pools: ['Healthy', 'Desserts'] },
  { id: 4, name: 'Burger Republic', image: '🍔', rating: 4.2, cuisine: ['Burgers', 'American'], deliveryTime: 20, priceForTwo: 400, location: 'Wakad, Pune', isVeg: false, description: 'Smash patties, brioche buns and sauces made in-house every morning.', offers: ['Free fries on orders above ₹349'], pools: ['Burgers', 'Beverages'] },
  { id: 5, name: 'Wok & Roll', image: '🥡', rating: 4.1, cuisine: ['Chinese', 'Asian'], deliveryTime: 28, priceForTwo: 500, location: 'Hinjawadi, Pune', isVeg: false, description: 'Indo-Chinese street food straight off a screaming hot wok.', offers: ['20% OFF on all orders'], pools: ['Chinese', 'Beverages'] },
  { id: 6, name: 'Spice Route', image: '🍲', rating: 4.4, cuisine: ['Indian', 'Mughlai'], deliveryTime: 35, priceForTwo: 700, location: 'Viman Nagar, Pune', isVeg: false, description: 'Slow-cooked Mughlai curries and dum biryanis with heirloom recipes.', offers: [], pools: ['Indian', 'Beverages'] },
  { id: 7, name: 'Sugar & Spoon', image: '🍰', rating: 4.7, cuisine: ['Desserts', 'Bakery'], deliveryTime: 18, priceForTwo: 350, location: 'Kalyani Nagar, Pune', isVeg: true, description: 'A small-batch patisserie baking cakes, jars and brownies daily.', offers: ['Flat ₹50 OFF'], pools: ['Desserts'] },
  { id: 8, name: 'Brew Lane', image: '☕', rating: 4.3, cuisine: ['Beverages', 'Cafe'], deliveryTime: 15, priceForTwo: 300, location: 'FC Road, Pune', isVeg: true, description: 'Single-origin coffee, shakes and cold brews with café bakes.', offers: ['Free cookie with every coffee'], pools: ['Beverages'] },
  { id: 9, name: 'Curry Leaf Kitchen', image: '🥘', rating: 3.9, cuisine: ['Indian', 'South Indian'], deliveryTime: 40, priceForTwo: 380, location: 'Pimpri, Pune', isVeg: true, description: 'Homestyle vegetarian thalis and curries with no-onion-garlic options.', offers: ['₹100 OFF above ₹499'], pools: ['Indian', 'Healthy'] },
  { id: 10, name: 'Crust & Crumb', image: '🥖', rating: 4.0, cuisine: ['Pizza', 'Pasta'], deliveryTime: 30, priceForTwo: 520, location: 'Kharadi, Pune', isVeg: true, description: 'Thin-crust pizzas and baked pastas from a pure veg kitchen.', offers: [], pools: ['Pizza', 'Desserts'] },
  { id: 11, name: 'Dragon Bowl', image: '🍜', rating: 4.5, cuisine: ['Chinese', 'Noodles'], deliveryTime: 26, priceForTwo: 620, location: 'Magarpatta, Pune', isVeg: false, description: 'Pan-Asian noodles, dumplings and burnt garlic rice bowls.', offers: ['30% OFF up to ₹120'], pools: ['Chinese', 'Desserts'] },
  { id: 12, name: 'Grill & Chill', image: '🍗', rating: 4.2, cuisine: ['Burgers', 'Grills'], deliveryTime: 33, priceForTwo: 750, location: 'Balewadi, Pune', isVeg: false, description: 'Charcoal grills, loaded burgers and shareable platters.', offers: ['Flat 15% OFF'], pools: ['Burgers', 'Indian'] },
  { id: 13, name: 'Sprout Story', image: '🥑', rating: 4.4, cuisine: ['Healthy', 'Breakfast'], deliveryTime: 24, priceForTwo: 420, location: 'Bavdhan, Pune', isVeg: true, description: 'All-day breakfast, smoothies and high-protein vegetarian plates.', offers: ['Free smoothie above ₹599'], pools: ['Healthy', 'Beverages'] },
  { id: 14, name: 'Biryani Bazaar', image: '🍚', rating: 3.8, cuisine: ['Biryani', 'Indian'], deliveryTime: 45, priceForTwo: 480, location: 'Chinchwad, Pune', isVeg: false, description: 'Handi biryanis served with salan and raita, packed piping hot.', offers: ['₹125 OFF on first order'], pools: ['Indian', 'Desserts'] },
];

/** Builds a restaurant's menu from its cuisine pools. */
function buildMenu(seed) {
  const dishes = seed.pools.flatMap((pool) => POOLS[pool]);
  return dishes
    .filter((dish) => (seed.isVeg ? dish.isVeg : true))
    .slice(0, 12)
    .map((dish, index) => ({
      ...dish,
      id: `${seed.id}-${index + 1}`,
      isRecommended: index < 3,
    }));
}

export const restaurants = SEED.map(({ pools, ...rest }) => ({
  ...rest,
  menu: buildMenu({ ...rest, pools }),
}));

export const categories = [
  { id: 'pizza', label: 'Pizza', image: '🍕' },
  { id: 'burgers', label: 'Burgers', image: '🍔' },
  { id: 'indian', label: 'Indian', image: '🍛' },
  { id: 'chinese', label: 'Chinese', image: '🥡' },
  { id: 'desserts', label: 'Desserts', image: '🍰' },
  { id: 'healthy', label: 'Healthy', image: '🥗' },
  { id: 'beverages', label: 'Beverages', image: '🧋' },
];
