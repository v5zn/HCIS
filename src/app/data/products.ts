export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number | null;
  image: string;
  category: 'men' | 'women' | 'kids' | 'accessories';
  description: string;
  images: string[];
  onSale?: boolean;
}

export const allProducts: Product[] = [
  // Men's Products
  {
    id: 1,
    name: "Men's Casual T-Shirt",
    price: 29,
    originalPrice: null,
    image: 'https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/124922s.jpg?im=Resize,width=480',
    category: 'men',
    description: 'A comfortable and stylish casual T-shirt perfect for everyday wear. Made from premium cotton with a modern fit.',
    images: [
      'https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/124922s.jpg?im=Resize,width=480',
      'https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/369510s3.jpg?im=Resize,width=480',
      'https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/122159s4.jpg?im=Resize,width=480'
    ]
  },
  {
    id: 2,
    name: "Men's Leather Jacket",
    price: 139,
    originalPrice: null,
    image: 'https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/F17886s.jpg?im=Resize,width=750',
    category: 'men',
    description: 'Premium leather jacket with a timeless design. Features durable construction and classic styling for any season.',
    images: [
      'https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/F17886s.jpg?im=Resize,width=750',
      'https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/F17886s2.jpg?im=Resize,width=750',
      'https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/F17886s3.jpg?im=Resize,width=480'
    ]
  },
  {
    id: 3,
    name: "Men's Jeans",
    price: 59,
    originalPrice: 90,
    image: 'https://images.unsplash.com/photo-1715758890151-2c15d5d482aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZW4lMjBqZWFucyUyMGRlbmltJTIwcHJvZHVjdHxlbnwxfHx8fDE3NzI3NDc1NzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'men',
    description: 'Modern slim fit jeans crafted from high-quality denim. Comfortable stretch fabric with a contemporary cut.',
    images: [
      'https://images.unsplash.com/photo-1715758890151-2c15d5d482aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZW4lMjBqZWFucyUyMGRlbmltJTIwcHJvZHVjdHxlbnwxfHx8fDE3NzI3NDc1NzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1542272604-787c3835535d?w=1080',
      'https://images.unsplash.com/photo-1604176354204-9268737828e4?w=1080'
    ],
    onSale: true
  },
  {
    id: 4,
    name: "Men's Luxury Watch",
    price: 120,
    originalPrice: 199,
    image: 'https://www.pierrecardinwatches.com/cdn/shop/files/CF.1004.PD.2_3.jpg?v=1731319393&width=3000',
    category: 'accessories',
    description: 'Elegant timepiece with precision movement and sophisticated design. Perfect for formal occasions.',
    images: [
      'https://www.pierrecardinwatches.com/cdn/shop/files/CF.1004.PD.2_3.jpg?v=1731319393&width=3000',
      'https://www.pierrecardinwatches.com/cdn/shop/files/CF.1004.PD.2_Main.jpg?v=1731319391&width=3000',
      'https://www.pierrecardinwatches.com/cdn/shop/files/CF.1004.PD.2_1.jpg?v=1731319391&width=3000'
    ],
    onSale: true
  },
  {
    id: 5,
    name: "Men's Knit Sweater",
    price: 69,
    originalPrice: null,
    image: 'https://cdn11.bigcommerce.com/s-scgdirr/images/stencil/560x736/products/17595/158837/C1347_Black__72672.1760546176.jpg?c=2',
    category: 'men',
    description: 'Cozy knit sweater with a classic design. Soft wool blend keeps you warm in style.',
    images: [
      'https://cdn11.bigcommerce.com/s-scgdirr/images/stencil/560x736/products/17595/158837/C1347_Black__72672.1760546176.jpg?c=2',
      'https://cdn11.bigcommerce.com/s-scgdirr/images/stencil/560x736/products/17595/152229/C1347_Natural_White_1__59619.1771241512.jpg?c=2',
      'https://cdn11.bigcommerce.com/s-scgdirr/images/stencil/560x736/products/17595/152213/C1347_Blackwatch__40068.1759318931.jpg?c=2'
    ]
  },
  {
    id: 6,
    name: "Men's Sports Sneakers",
    price: 89,
    originalPrice: null,
    image: 'https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto,u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/027a6d4e-a3c0-42a0-89ec-89287abb3166/AIR+ZOOM+PEGASUS+42.png',
    category: 'men',
    description: 'Performance sneakers designed for comfort and style. Features cushioned sole and breathable materials.',
    images: [
      'https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto,u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/027a6d4e-a3c0-42a0-89ec-89287abb3166/AIR+ZOOM+PEGASUS+42.png',
      'https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto,u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/c997dbf0-ba90-4225-a439-e469dbde9c1a/AIR+ZOOM+PEGASUS+42.png',
      'https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto,u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/acc6cf9b-75aa-4c57-8db7-8055ed41c39b/AIR+ZOOM+PEGASUS+42.png'
    ]
  },
  {
    id: 21,
    name: "Men's Polo Shirt",
    price: 45,
    originalPrice: 60,
    image: 'https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/W62284s3.jpg?im=Resize,width=480',
    category: 'men',
    description: 'Breathable polo shirt perfect for summer days. Classic fit with moisture-wicking technology.',
    images: [
      'https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/W62284s3.jpg?im=Resize,width=480',
      'https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/W62284s4.jpg?im=Resize,width=480',
      'https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/W62284s10.jpg?im=Resize,width=480'
    ],
    onSale: true
  },
  {
    id: 22,
    name: "Men's Shorts",
    price: 35,
    originalPrice: 49,
    image: 'https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/AL4595s.jpg?im=Resize,width=750',
    category: 'men',
    description: 'Lightweight cotton shorts for hot summer days. Comfortable fit with multiple pockets.',
    images: [
      'https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/AL4595s.jpg?im=Resize,width=750',
      'http://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/AL4596s3.jpg?im=Resize,width=480',
      'https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/AL4593s3.jpg?im=Resize,width=480'
    ],
    onSale: true
  },
  // Women's Products
  {
    id: 7,
    name: "Women's Dress",
    price: 79,
    originalPrice: null,
    image: 'https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/Y13574s6.jpg?im=Resize,width=480',
    category: 'women',
    description: 'Elegant summer dress with floral pattern. Lightweight fabric perfect for warm weather.',
    images: [
      'https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/Y13574s6.jpg?im=Resize,width=480',
      'https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/Y13574s7.jpg?im=Resize,width=480',
      'https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/Y13574s8.jpg?im=Resize,width=480'
    ]
  },
  {
    id: 8,
    name: "Women's Designer Handbag",
    price: 149,
    originalPrice: 199,
    image: 'https://media-tommy.6thstreet.com/media/catalog/product/cache/c25dc84df2cc7ecda14696ab1da1f207/a/w/aw0aw17697_bds_main.jpg',
    category: 'accessories',
    description: 'Luxury handbag with premium leather and gold hardware. Spacious interior with multiple compartments.',
    images: [
      'https://media-tommy.6thstreet.com/media/catalog/product/cache/c25dc84df2cc7ecda14696ab1da1f207/a/w/aw0aw17697_bds_main.jpg',
      'https://media-tommy.6thstreet.com/media/catalog/product/cache/c25dc84df2cc7ecda14696ab1da1f207/a/w/aw0aw17697_bds_alternate1.jpg',
      'https://media-tommy.6thstreet.com/media/catalog/product/cache/c25dc84df2cc7ecda14696ab1da1f207/a/w/aw0aw17697_bds_alternate3.jpg'
    ],
    onSale: true
  },
  {
    id: 10,
    name: "Women's Blazer",
    price: 99,
    originalPrice: 139,
    image: 'https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/H70468s9.jpg?im=Resize,width=480',
    category: 'women',
    description: 'Professional blazer with tailored fit. Perfect for office or formal events.',
    images: [
      'https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/H70468s9.jpg?im=Resize,width=480',
      'https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/H70468s4.jpg?im=Resize,width=480',
      'https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/H70468s8.jpg?im=Resize,width=480'
    ],
    onSale: true
  },
  {
    id: 11,
    name: "Women's Ankle Boots",
    price: 119,
    originalPrice: null,
    image: 'https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/F17924s.jpg?im=Resize,width=750',
    category: 'women',
    description: 'Stylish ankle boots with block heel. Versatile design for any occasion.',
    images: [
      'https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/F17924s.jpg?im=Resize,width=750',
      'https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/F17924s3.jpg?im=Resize,width=480',
      'https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/F17924s5.jpg?im=Resize,width=480'
    ]
  },
  {
    id: 12,
    name: "Women's Sunglasses",
    price: 59,
    originalPrice: 89,
    image: 'https://www.gigipip.com/cdn/shop/files/sunglasses-black-dionne-oval-sunglasses-41081362579587.jpg?v=1762443128&width=600',
    category: 'accessories',
    description: 'Designer sunglasses with UV protection. Classic Oval shape.',
    images: [
      'https://www.gigipip.com/cdn/shop/files/sunglasses-black-dionne-oval-sunglasses-41081362579587.jpg?v=1762443128&width=600',
      'https://www.gigipip.com/cdn/shop/files/black-dionne-oval-sunglasses-40849694163075.jpg?v=1752168851&width=600',
      'https://www.gigipip.com/cdn/shop/files/black-dionne-oval-sunglasses-40849694195843.jpg?v=1752168851&width=600'
    ],
    onSale: true
  },
  {
    id: 26,
    name: "Women's Blouse",
    price: 49,
    originalPrice: 69,
    image: 'https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/Y14155s.jpg?im=Resize,width=750',
    category: 'women',
    description: 'Light and airy summer blouse with delicate details. Perfect for warm weather.',
    images: [
      'https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/Y14155s.jpg?im=Resize,width=750',
      'https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/Y14155s5.jpg?im=Resize,width=480',
      'https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/Y14155s4.jpg?im=Resize,width=480'
    ],
    onSale: true
  },
  {
    id: 28,
    name: "Women's Sneakers",
    price: 75,
    originalPrice: 109,
    image: 'https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/W56418s.jpg?im=Resize,width=750',
    category: 'women',
    description: 'Classic sneakers with minimalist design. Versatile and comfortable for everyday wear.',
    images: [
      'https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/W56418s.jpg?im=Resize,width=750',
      'https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/W56418s2.jpg?im=Resize,width=750',
      'https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/W56418s4.jpg?im=Resize,width=480'
    ],
    onSale: true
  },
  {
    id: 29,
    name: "Women's Denim Jeans",
    price: 68,
    originalPrice: null,
    image: 'https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/V52789s3.jpg?im=Resize,width=480',
    category: 'women',
    description: 'High-quality denim jeans with perfect fit. Classic five-pocket styling.',
    images: [
      'https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/V52789s3.jpg?im=Resize,width=480',
      'https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/V52789s4.jpg?im=Resize,width=480',
      'https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/V52789s5.jpg?im=Resize,width=480'
    ]
  },
  // Kids Products
  {
    id: 13,
    name: "Kids' Graphic T-Shirt",
    price: 19,
    originalPrice: 39,
    image: 'https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/V19432s.jpg?im=Resize,width=750',
    category: 'kids',
    description: 'Fun graphic t-shirt with colorful design. Soft cotton fabric perfect for active kids.',
    images: [
      'https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/V19432s.jpg?im=Resize,width=750',
      'https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/V19432s2.jpg?im=Resize,width=750',
      'https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/V19432s3.jpg?im=Resize,width=480'
    ],
    onSale: true
  },
  {
    id: 14,
    name: "Kids' Winter Jacket",
    price: 69,
    originalPrice: null,
    image: 'https://media-tommy.6thstreet.com/media/catalog/product/cache/c25dc84df2cc7ecda14696ab1da1f207/k/b/kb0kb10079_c1g_main.jpg',
    category: 'kids',
    description: 'Warm winter jacket with insulated lining. Water-resistant outer shell keeps kids dry.',
    images: [
      'https://media-tommy.6thstreet.com/media/catalog/product/cache/c25dc84df2cc7ecda14696ab1da1f207/k/b/kb0kb10079_c1g_main.jpg',
      'https://media-tommy.6thstreet.com/media/catalog/product/cache/c25dc84df2cc7ecda14696ab1da1f207/k/b/kb0kb10079_c1g_alternate10.jpg',
      'https://media-tommy.6thstreet.com/media/catalog/product/cache/c25dc84df2cc7ecda14696ab1da1f207/k/b/kb0kb10079_c1g_alternate5.jpg'
    ]
  },
  {
    id: 15,
    name: "Kids' Sneakers",
    price: 45,
    originalPrice: null,
    image: 'https://cdn.shopify.com/s/files/1/0074/4393/9383/files/5400007A-0760_zoom_9.jpg?v=1767705229&width=300&quality=75&format=pjpg',
    category: 'kids',
    description: 'Comfortable sneakers with velcro straps. Durable design for everyday play.',
    images: [
      'https://cdn.shopify.com/s/files/1/0074/4393/9383/files/5400007A-0760_zoom_9.jpg?v=1767705229&width=300&quality=75&format=pjpg',
      'https://cdn.shopify.com/s/files/1/0074/4393/9383/files/5400007A-0760_zoom_3.jpg?v=1767707303&width=300&quality=75&format=pjpg',
      'https://cdn.shopify.com/s/files/1/0074/4393/9383/files/5400007A-0760_zoom_6.jpg?v=1767707303&width=300&quality=75&format=pjpg'
    ]
  },
  {
    id: 16,
    name: "Kids' Backpack",
    price: 35,
    originalPrice: null,
    image: 'https://theplayfulcollective.com.au/cdn/shop/files/alimasy-small-kids-backpack-dinosaur-pre-order-by-alimasy-the-playful-collective-205845_750x.webp?v=1731896143',
    category: 'accessories',
    description: 'Colorful backpack with multiple compartments. Perfect for school or day trips.',
    images: [
      'https://theplayfulcollective.com.au/cdn/shop/files/alimasy-small-kids-backpack-dinosaur-pre-order-by-alimasy-the-playful-collective-205845_750x.webp?v=1731896143',
      'https://theplayfulcollective.com.au/cdn/shop/files/alimasy-small-kids-backpack-dinosaur-pre-order-by-alimasy-the-playful-collective-764534_750x.webp?v=1731896143',
      'https://theplayfulcollective.com.au/cdn/shop/files/alimasy-small-kids-backpack-dinosaur-pre-order-by-alimasy-the-playful-collective-885365_750x.webp?v=1731896143'
    ]
  },
  {
    id: 17,
    name: "Kids' Denim Jeans",
    price: 29,
    originalPrice: 49,
    image: 'https://www.mumkins.in/cdn/shop/products/jeans-for-boys-bl06466c-lightblue-1_1800x1800.jpg?v=1757337520',
    category: 'kids',
    description: 'Classic denim jeans with adjustable waistband. Durable construction for active wear.',
    images: [
      'https://www.mumkins.in/cdn/shop/products/jeans-for-boys-bl06466c-lightblue-1_1800x1800.jpg?v=1757337520',
      'https://www.mumkins.in/cdn/shop/products/jeans-for-boys-bl06466c-lightblue-2_1800x1800.jpg?v=1757337520',
      'https://www.mumkins.in/cdn/shop/products/jeans-for-boys-bl06466c-lightblue-3_1800x1800.jpg?v=1757337520'
    ],
    onSale: true
  },
  {
    id: 34,
    name: "Kids' Summer Shorts",
    price: 24,
    originalPrice: 32,
    image: 'https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto,u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/ad50641f-ee1e-456a-8b24-984dd0ec8574/B+NK+DF+MULTI+WVN+SHORT+BLOCK.png',
    category: 'kids',
    description: 'Comfortable summer shorts for active play. Elastic waistband for easy wear.',
    images: [
      'https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto,u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/ad50641f-ee1e-456a-8b24-984dd0ec8574/B+NK+DF+MULTI+WVN+SHORT+BLOCK.png',
      'https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto,u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/19cf54dc-3195-441e-a41e-150deedf04b9/B+NK+DF+MULTI+WVN+SHORT+BLOCK.png',
      'https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto,u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/a89f0e1f-903b-417f-a3cf-0c74be707732/B+NK+DF+MULTI+WVN+SHORT+BLOCK.png'
    ],
    onSale: true
  },
  // Additional Accessories
  {
    id: 19,
    name: "Leather Belt",
    price: 39,
    originalPrice: null,
    image: 'https://teakwoodleathers.com/cdn/shop/products/T_BT_473_CfBr_6_1024x1024@2x.jpg?v=1750934390',
    category: 'accessories',
    description: 'Classic leather belt with metal buckle. Versatile accessory for any outfit.',
    images: [
      'https://teakwoodleathers.com/cdn/shop/products/T_BT_473_CfBr_6_1024x1024@2x.jpg?v=1750934390',
      'https://teakwoodleathers.com/cdn/shop/products/T_BT_473_CfBr_1_1024x1024@2x.jpg?v=1750934390',
      'https://teakwoodleathers.com/cdn/shop/products/T_BT_473_CfBr_5_1024x1024@2x.jpg?v=1750934390'
    ]
  },
  {
    id: 20,
    name: "Wool Scarf",
    price: 29,
    originalPrice: null,
    image: 'https://www.blackyak.co.uk/images/shop/more/1500x1974_66480_ba840f5779b8dd41a53991505ae24d90_1696423575ScarveselectricoceanW.jpg',
    category: 'accessories',
    description: 'Soft wool scarf in classic plaid pattern. Keeps you warm in cold weather.',
    images: [
      'https://www.blackyak.co.uk/images/shop/more/1500x1974_66480_ba840f5779b8dd41a53991505ae24d90_1696423575ScarveselectricoceanW.jpg',
      'https://www.blackyak.co.uk/images/shop/more/1500x1500_66480_e82c150106c251e71e5a85278936f866_1696423575ScarveselectricoceanW.jpg',
      'https://www.blackyak.co.uk/images/shop/more/766x1150_66480_d5f8787929fbafba4848668f7c9d8696_1696423575ScarveselectricoceanWS.jpg'
    ]
  },
];

export const getProductsByCategory = (category: string) => {
  if (category === 'sale') {
    return allProducts.filter(p => p.onSale || p.originalPrice !== null);
  }
  if (category === 'trending') {
    // Sort pseudo-randomly but deterministically based on ID to simulate trending
    return [...allProducts].sort((a, b) => ((b.id * 7) % 100) - ((a.id * 7) % 100)).slice(0, 12);
  }
  return allProducts.filter(p => p.category === category);
};

export const getProductById = (id: number) => {
  return allProducts.find(p => p.id === id);
};

export const searchProducts = (query: string) => {
  const lowerQuery = query.toLowerCase().trim();
  if (!lowerQuery) return [];
  
  const synonyms: Record<string, string[]> = {
    shoes: ['shoes', 'sneaker', 'sneakers', 'boot', 'boots', 'sandal', 'sandals'],
    pants: ['pants', 'jeans', 'trousers', 'shorts', 'yoga'],
    shirt: ['shirt', 't-shirt', 'blouse', 'polo', 'sweater', 'cardigan', 'hoodie'],
    bag: ['bag', 'handbag', 'backpack'],
  };

  let searchTerms = [lowerQuery];
  for (const [key, related] of Object.entries(synonyms)) {
    if (key.includes(lowerQuery) || related.some(r => r.includes(lowerQuery))) {
      searchTerms = [...searchTerms, key, ...related];
    }
  }
  
  return allProducts.filter(product => {
    const text = (product.name + ' ' + product.description + ' ' + product.category).toLowerCase();
    return searchTerms.some(term => text.includes(term));
  });
};
