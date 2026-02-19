import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

const INITIAL_PRODUCTS = [
  { id: 1, title: 'iPhone 9', description: 'An apple mobile which is nothing like apple', price: 549, discountPercentage: 12.96, rating: 4.69, stock: 94, brand: 'Apple', category: 'smartphones', thumbnail: 'https://images.macrumors.com/t/LOfu9VLk4WvjtKmnQtzdS67Rr3w=/800x0/smart/article-new/2016/05/iphone8gold.jpg?lossy' },
  { id: 2, title: 'iPhone X', description: 'SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology', price: 899, discountPercentage: 17.94, rating: 4.44, stock: 34, brand: 'Apple', category: 'smartphones', thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSEu51wJJmnZgTnbNcLPZBICU9qHU8IfY2wA&s' },
  { id: 3, title: 'Samsung Universe 9', description: "Samsung's new variant which goes beyond Galaxy to the Universe", price: 1249, discountPercentage: 15.46, rating: 4.09, stock: 36, brand: 'Samsung', category: 'smartphones', thumbnail: 'https://pbs.twimg.com/media/Dr2wz4AU4AEXQeN.jpg' },
  { id: 4, title: 'OPPO F19', description: 'OPPO F19 is officially announced on April 2021.', price: 280, discountPercentage: 17.91, rating: 4.30, stock: 123, brand: 'OPPO', category: 'smartphones', thumbnail: 'https://refitglobal.com/cdn/shop/files/OppoF19MidnightBlueC.jpg?v=1770116646&width=1946' },
  { id: 5, title: 'Huawei P30', description: "Huawei's re-badged P30 Pro New Edition officially unveiled in Germany.", price: 499, discountPercentage: 10.58, rating: 4.09, stock: 32, brand: 'Huawei', category: 'smartphones', thumbnail: 'https://m.media-amazon.com/images/I/616+kGLMqJL.jpg' },
  { id: 6, title: 'MacBook Pro', description: 'MacBook Pro 2021 with mini-LED display', price: 1749, discountPercentage: 11.02, rating: 4.57, stock: 83, brand: 'Apple', category: 'laptops', thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIwZV5o054zY90s83_GnGiJT4OwCAu72RL9Q&s' },
  { id: 7, title: 'Samsung Galaxy Book', description: 'Samsung Galaxy Book is the latest device that Samsung has launched.', price: 1499, discountPercentage: 4.15, rating: 4.25, stock: 50, brand: 'Samsung', category: 'laptops', thumbnail: 'https://gizmologi.id/wp-content/uploads/2021/04/Samsung-Galaxy-Book-Pro-360-001.jpg' },
  { id: 8, title: 'Microsoft Surface Laptop 4', description: 'Style and speed. Stand out on Zoom and focus in the office.', price: 1499, discountPercentage: 10.23, rating: 4.43, stock: 68, brand: 'Microsoft', category: 'laptops', thumbnail: 'https://images-cdn.ubuy.co.id/69396e27d2b080844808ab70-microsoft-surface-laptop-4-13-5.jpg' },
  { id: 9, title: 'Infinix INBOOK', description: 'Infinix Inbook X1 Ci3 10th 8GB 256GB 14 Win10 Grey – 1 Year Warranty', price: 1099, discountPercentage: 11.83, rating: 4.54, stock: 96, brand: 'Infinix', category: 'laptops', thumbnail: 'https://gizmologi.id/wp-content/uploads/2021/05/Infinix-INBook-X1-003.jpg' },
  { id: 10, title: 'HP Pavilion 15-DK1056WM', description: 'HP Pavilion 15 Gaming Laptop 10th Gen Core i5, 8GB, 256GB SSD, GTX 1650 4GB', price: 1099, discountPercentage: 6.18, rating: 4.43, stock: 89, brand: 'HP Pavilion', category: 'laptops', thumbnail: 'https://images-cdn.ubuy.co.id/64bf829c0630e75cfc57f001-hp-pavilion-15-6-fhd-gaming-laptop.jpg' },
  { id: 11, title: 'Perfume Oil', description: 'Mega Discount, Impression of Acqua Di Gio by GiorgioArmani concentrated attar perfume Oil', price: 13, discountPercentage: 8.4, rating: 4.26, stock: 65, brand: 'Impression of Acqua Di Gio', category: 'fragrances', thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZMoaRlRpe5detSrdXHJTrowAHDGY4GIFZqQ&s' },
  { id: 12, title: 'Brown Perfume', description: 'Royal_Mirage Sport Brown Perfume for Men & Women - 120ml', price: 40, discountPercentage: 15.66, rating: 4.00, stock: 52, brand: 'Royal_Mirage', category: 'fragrances', thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBEe_-4RPD4WRlxwV8R3JFJaGDJG5d8caS9g&s' },
  { id: 13, title: 'Fog Scent Xpressio Perfume', description: 'Product details of Best Fog Scent Xpressio Perfume 100ml For Men cool long lasting perfumes for Men', price: 13, discountPercentage: 8.14, rating: 4.59, stock: 61, brand: 'Fog Scent Xpressio', category: 'fragrances', thumbnail: 'https://favo.id/cdn/shop/files/FOGPAR10017_Fogg-Men-Scent-Premium-Xpressio-Perfume---100-mL.jpg?v=1757320595' },
  { id: 14, title: 'Non-Alcoholic Concentrated Perfume Oil', description: 'Original Al Munakh by Mahal Al Musk | Our Impression of Climate | 6ml Non-Alcoholic Concentrated Perfume Oil', price: 120, discountPercentage: 15.6, rating: 4.21, stock: 114, brand: 'Al Munakh', category: 'fragrances', thumbnail: 'https://mushkmahal.com/cdn/shop/files/o.jpg?v=1739270089' },
  { id: 15, title: 'Eau De Perfume Spray', description: 'Genuine Al-Rehab spray perfume from UAE/Saudi Arabia/Yemen High Quality', price: 30, discountPercentage: 10.99, rating: 4.70, stock: 105, brand: 'Lord - Al-Rehab', category: 'fragrances', thumbnail: 'https://img.lazcdn.com/live/id/p/bd4ab04962070b875215feb2a229fa65.jpg_720x720q80.jpg' },
  { id: 16, title: 'Hyaluronic Acid Serum', description: "L'Oreal Paris introduces Hyaluron Expert Replumping Serum formulated with 1.5% Hyaluronic Acid", price: 19, discountPercentage: 13.31, rating: 4.83, stock: 110, brand: "L'Oreal Paris", category: 'skincare', thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQa9h_HwJJep_a6e82CHcK5unr1e59PL-7S5Q&s' },
  { id: 17, title: 'Tree Oil 30ml', description: 'Tea tree oil contains a number of compounds, including terpinen-4-ol, that have been shown to kill certain bacteria', price: 12, discountPercentage: 4.09, rating: 4.52, stock: 78, brand: 'Hemani Tea', category: 'skincare', thumbnail: 'https://m.media-amazon.com/images/I/51Brs8PkX-L._AC_UF1000,1000_QL80_.jpg' },
  { id: 18, title: 'Oil Free Moisturizer 100ml', description: 'Dermive Oil Free Moisturizer with SPF 20 is specifically formulated with ceramides, hyaluronic acid & sunscreen.', price: 40, discountPercentage: 13.1, rating: 4.56, stock: 88, brand: 'Dermive', category: 'skincare', thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQzA7QoQFx6YLpizjKks1BT9mHgceStjj18g&s' },
  { id: 19, title: 'Skin Beauty Serum', description: 'Product name: rorec collagen hyaluronic acid white face serum rice. Net weight: 15ml', price: 46, discountPercentage: 10.68, rating: 4.42, stock: 54, brand: 'ROREC White Rice', category: 'skincare', thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRY8thURZmdATtA6COJRfOw5z1kthSbmvcLQw&s' },
  { id: 20, title: 'Freckle Treatment Cream 15gm', description: "Fair & Clear is Pakistan's only pure Freckle cream which helps fade Freckles, Darkspots and pigments.", price: 70, discountPercentage: 16.99, rating: 4.06, stock: 140, brand: 'Fair & Clear', category: 'skincare', thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzApRn1kRZn_xFS9bwauYWfh6VSiDy2FE1bQ&s' },
  { id: 21, title: 'Daal Masoor 500 grams', description: 'Fine quality Branded Product Keep in a cool and dry place', price: 20, discountPercentage: 4.81, rating: 4.44, stock: 133, brand: 'Saaf & Khaas', category: 'groceries', thumbnail: 'https://static-01.daraz.pk/p/3002b155e4cf5b11a786d8ac022b933f.jpg' },
  { id: 22, title: 'Elbow Macaroni - 400 gm', description: 'Product details of Bake Parlor Big Elbow Macaroni - 400 gm', price: 14, discountPercentage: 15.58, rating: 4.57, stock: 146, brand: 'Bake Parlor Big', category: 'groceries', thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMNjZbOc-Uef9ebAPziXwMOwrC6ImzEmEFcg&s' },
  { id: 23, title: 'Orange Essence Food Flavour', description: 'Specifications of Orange Essence Food Flavour For Cakes and Baking Food Item', price: 14, discountPercentage: 8.04, rating: 4.85, stock: 26, brand: 'Baking Food Items', category: 'groceries', thumbnail: 'https://5.imimg.com/data5/SELLER/Default/2021/11/FT/XU/VT/135046750/orange-food.jpg' },
  { id: 24, title: 'Cereals Muesli Fruit Nuts', description: 'Original fauji cereal muesli 250gm box pack original fauji cereals muesli fruit nuts flakes breakfast cereal', price: 46, discountPercentage: 16.8, rating: 4.94, stock: 113, brand: 'fauji', category: 'groceries', thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZpbfIaug0SjjUf2E2yo2OWTjxpauE4OgiVw&s' },
  { id: 25, title: 'Gulab Powder 50 Gram', description: 'Dry Rose Flower Powder Gulab Powder 50 Gram - Treats Wounds', price: 70, discountPercentage: 13.58, rating: 4.87, stock: 47, brand: 'Dry Rose', category: 'groceries', thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdfX_Q2-AWgHRzrYggba8EBvPmQewP8KZqoA&s' },
  { id: 26, title: 'Plant Hanger For Home', description: 'Boho Decor Plant Hanger For Home Wall Decoration Macrame Wall Hanging Shelf', price: 41, discountPercentage: 17.86, rating: 4.08, stock: 131, brand: 'Boho Decor', category: 'home-decoration', thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRjSaDARQel4EjLzCSajHY_I0U8JyrnlGmkg&s' },
  { id: 27, title: 'Flying Wooden Bird', description: 'Package Include 6 Birds with Adhesive Tape Shape: 3D Shaped Wooden Birds Material: Wooden MDF, Laminated 3.5mm', price: 51, discountPercentage: 15.58, rating: 4.41, stock: 17, brand: 'Flying Wooden', category: 'home-decoration', thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLnX-cSfHZKk5McmfMHNz-OoDeQoFlqoZvsA&s' },
  { id: 28, title: '3D Embellishment Art Lamp', description: '3D led lamp sticker Wall sticker 3d wall art light on/off button cell operated (included)', price: 20, discountPercentage: 16.49, rating: 4.82, stock: 54, brand: 'LED Lights', category: 'home-decoration', thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUMOUsZK9oxt-TychIORYcTL7D42j3e8lxrw&s' },
  { id: 29, title: 'Handcraft Chinese Style', description: 'Handcraft Chinese style art luxury palace hotel villa mansion home decor ceramic vase with brass fruit plate', price: 60, discountPercentage: 15.34, rating: 4.44, stock: 7, brand: 'luxury palace', category: 'home-decoration', thumbnail: 'https://m.media-amazon.com/images/I/612-zFiHT3L._AC_UF1000,1000_QL80_.jpg' },
  { id: 30, title: 'Key Holder', description: 'Attractive Design Metallic material Four key hooks Reliable & Durable Premium Quality', price: 30, discountPercentage: 2.92, rating: 4.92, stock: 54, brand: 'Golden', category: 'home-decoration', thumbnail: 'https://m.media-amazon.com/images/I/61XnxcDHqxL.jpg' },
]

export const useProductStore = defineStore('product', () => {
  const products = ref(JSON.parse(JSON.stringify(INITIAL_PRODUCTS)))
  const nextId = ref(11)

  const categories = computed(() =>
    [...new Set(products.value.map((p) => p.category))].sort()
  )

  function addProduct(data) {
    products.value.push({ ...data, id: nextId.value++ })
  }

  function updateProduct(id, data) {
    const idx = products.value.findIndex((p) => p.id === id)
    if (idx !== -1) products.value[idx] = { ...data, id }
  }

  function deleteProduct(id) {
    products.value = products.value.filter((p) => p.id !== id)
  }

  return { products, categories, addProduct, updateProduct, deleteProduct }
})
