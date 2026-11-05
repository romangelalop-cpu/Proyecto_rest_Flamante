export type SectionId = 'inicio' | 'menu' | 'ordenar' | 'resenas' | 'contacto';

export const NAV_ITEMS: { id: SectionId; label: string }[] = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'menu', label: 'Menú' },
  { id: 'ordenar', label: 'Ordenar' },
  { id: 'resenas', label: 'Reseñas' },
  { id: 'contacto', label: 'Contacto' },
];

export const SLOGAN = 'Come como un Dios';

export interface MenuItem {
  name: string;
  description: string;
  price: number;
  image: string;
  imageAlt: string;
  tags: string[];
}

export interface MenuCategory {
  id: string;
  name: string;
  items: MenuItem[];
}

export const MENU_CATEGORIES: MenuCategory[] = [
  {
    id: 'desayunos',
    name: 'Desayunos',
    items: [
      {
        name: 'Desayuno Mexicano',
        description: 'Huevos rancheros acompañados de salsa verde o roja, frijoles refritos y guacamole.',
        price: 155,
        image: 'https://images.pexels.com/photos/31823015/pexels-photo-31823015.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        imageAlt: 'Huevos rancheros con aguacate en un plato',
        tags: ['Completo'],
      },
      {
        name: 'Desayuno Ejecutivo',
        description: 'Picaditas, guacamole, huevos al gusto más ensalada.',
        price: 155,
        image: 'https://images.pexels.com/photos/31823018/pexels-photo-31823018.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        imageAlt: 'Desayuno mexicano con huevos y fruta fresca',
        tags: ['Ejecutivo'],
      },
      {
        name: 'Desayuno Supremo',
        description: 'Chilaquiles verdes o rojos, acompañados con bistec, cecina o pechuga.',
        price: 130,
        image: 'https://images.pexels.com/photos/19029777/pexels-photo-19029777.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        imageAlt: 'Chilaquiles con huevo estrellado y hierbas frescas',
        tags: ['Con carne'],
      },
    ],
  },
  {
    id: 'huevos',
    name: 'Huevos',
    items: [
      {
        name: 'Huevos Tradicionales',
        description: 'Huevos revueltos con jamón o chorizo, con frijoles.',
        price: 85,
        image: 'https://images.pexels.com/photos/31823014/pexels-photo-31823014.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        imageAlt: 'Huevos revueltos con frijoles',
        tags: ['Clásico'],
      },
      {
        name: 'Huevos Rancheros',
        description: 'Con dos tortillas bañados con salsa roja, frijoles y pico de gallo.',
        price: 90,
        image: 'https://images.pexels.com/photos/31823015/pexels-photo-31823015.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        imageAlt: 'Huevos rancheros con salsa roja y tortillas',
        tags: ['Ranchero'],
      },
      {
        name: 'Motuleños',
        description: 'Estrellados con tortilla, jamón, salsa roja, plátanos fritos y chícharos.',
        price: 95,
        image: 'https://images.pexels.com/photos/12261174/pexels-photo-12261174.png?auto=compress&cs=tinysrgb&h=650&w=940',
        imageAlt: 'Huevos motuleños con tortilla y plátano',
        tags: ['Yucateco'],
      },
      {
        name: 'Huevos al Albañil',
        description: 'Con salsa verde o roja.',
        price: 85,
        image: 'https://images.pexels.com/photos/31823018/pexels-photo-31823018.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        imageAlt: 'Huevos al albañil con salsa verde',
        tags: ['Picante'],
      },
      {
        name: 'Huevos con Chilaquiles',
        description: 'Estrellados con guarnición de chilaquiles verdes o rojos.',
        price: 85,
        image: 'https://images.pexels.com/photos/19029777/pexels-photo-19029777.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        imageAlt: 'Huevos estrellados con chilaquiles',
        tags: ['Favorito'],
      },
    ],
  },
  {
    id: 'mexicanos',
    name: 'Mexicanos y Carnes',
    items: [
      {
        name: 'Enchiladas Suizas',
        description: 'Salsa cremosa de chile, con tortillas rellenas de pollo con queso manchego gratinado.',
        price: 90,
        image: 'https://images.pexels.com/photos/36429905/pexels-photo-36429905.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        imageAlt: 'Enchiladas suizas con salsa cremosa y queso gratinado',
        tags: ['Suizas'],
      },
      {
        name: 'Cecina a la Tampiqueña',
        description: 'Con enchiladas, guacamole, frijoles y papas a la francesa.',
        price: 160,
        image: 'https://images.pexels.com/photos/28525114/pexels-photo-28525114.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        imageAlt: 'Cecina a la tampiqueña con acompañamientos',
        tags: ['Con carne'],
      },
      {
        name: 'Chuleta de Cerdo o de Res',
        description: 'Con ensalada, arroz, nopales y frijoles.',
        price: 150,
        image: 'https://images.pexels.com/photos/34035528/pexels-photo-34035528.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        imageAlt: 'Chuleta con arroz, nopales y frijoles',
        tags: ['Con carne'],
      },
      {
        name: 'Carne Enchilada',
        description: 'Arroz, nopales, frijoles y cebolla con chile toreado.',
        price: 100,
        image: 'https://images.pexels.com/photos/28525125/pexels-photo-28525125.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        imageAlt: 'Carne enchilada con arroz y nopales',
        tags: ['Picante'],
      },
      {
        name: 'Milanesa',
        description: 'Frijoles, arroz y papas a la francesa.',
        price: 120,
        image: 'https://images.pexels.com/photos/7783364/pexels-photo-7783364.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        imageAlt: 'Milanesa empanizada con acompañamientos',
        tags: ['Clásico'],
      },
      {
        name: 'Enmoladas',
        description: 'Rellenas de pollo, jamón, huevo o queso de hebra, acompañadas de arroz.',
        price: 90,
        image: 'https://images.pexels.com/photos/36429907/pexels-photo-36429907.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        imageAlt: 'Enmoladas con mole y arroz',
        tags: ['Con mole'],
      },
      {
        name: 'Chilaquiles Verdes o Rojos',
        description: 'Con pollo, crema, queso, aguacate y cebolla.',
        price: 85,
        image: 'https://images.pexels.com/photos/19029777/pexels-photo-19029777.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        imageAlt: 'Chilaquiles con pollo, crema y queso',
        tags: ['Vegetariano opt.'],
      },
      {
        name: 'Flautas de Pollo o Queso',
        description: '4 piezas acompañadas de lechuga, jitomate, aguacate, crema y queso.',
        price: 70,
        image: 'https://images.pexels.com/photos/32334353/pexels-photo-32334353.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        imageAlt: 'Flautas de pollo con guarniciones',
        tags: ['4 pzas'],
      },
    ],
  },
  {
    id: 'sandwiches',
    name: 'Sándwiches y Tortas',
    items: [
      {
        name: '¡No Llegues Tarde!',
        description: 'Sándwich con queso de hebra, jamón de pavo, aguacate, mayonesa y frijoles refritos.',
        price: 40,
        image: 'https://images.pexels.com/photos/34822476/pexels-photo-34822476.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        imageAlt: 'Sándwich mexicano con aguacate y frijoles',
        tags: ['Sándwich'],
      },
      {
        name: 'Sándwich Especial',
        description: 'Jamón, queso manchego, tocino, lechuga, jitomate, frijoles refritos y mayonesa.',
        price: 60,
        image: 'https://images.pexels.com/photos/28525148/pexels-photo-28525148.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        imageAlt: 'Sándwich especial de queso y carne servido en plato',
        tags: ['Especial'],
      },
      {
        name: 'Club Sándwich',
        description: 'Jamón de pavo, tocino, pechuga, lechuga, jitomate, queso manchego y aderezo del chef.',
        price: 100,
        image: 'https://images.pexels.com/photos/15662232/pexels-photo-15662232.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        imageAlt: 'Club sándwich en capas con lechuga, jitomate y papas',
        tags: ['Club'],
      },
      {
        name: 'Torta de Milanesa',
        description: 'Queso de hebra, aguacate, lechuga, jitomate, cebolla, frijoles refritos y mayonesa.',
        price: 45,
        image: 'https://images.pexels.com/photos/35020127/pexels-photo-35020127.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        imageAlt: 'Torta de milanesa con aguacate y frijoles',
        tags: ['Torta'],
      },
      {
        name: 'Torta de Salchicha',
        description: 'Queso de hebra, lechuga, jitomate, cebolla, aguacate, frijoles refritos y mayonesa.',
        price: 35,
        image: 'https://images.pexels.com/photos/7479008/pexels-photo-7479008.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        imageAlt: 'Torta mexicana con carne y verduras',
        tags: ['Torta'],
      },
      {
        name: 'Torta de Jamón',
        description: 'Jamón de pavo, lechuga, jitomate, queso de hebra, frijoles refritos y mayonesa.',
        price: 30,
        image: 'https://images.pexels.com/photos/5981144/pexels-photo-5981144.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        imageAlt: 'Torta de jamón con queso y verduras en pan tostado',
        tags: ['Torta'],
      },
    ],
  },
  {
    id: 'bebidas',
    name: 'Bebidas y Postres',
    items: [
      {
        name: 'Café Negro o Americano',
        description: 'Café de olla recién preparado, solo o americano.',
        price: 30,
        image: 'https://images.pexels.com/photos/27754748/pexels-photo-27754748.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        imageAlt: 'Café negro servido en taza de cerámica',
        tags: ['Café'],
      },
      {
        name: 'Café Lechero',
        description: 'Café con leche al estilo veracruzano, cremoso y reconfortante.',
        price: 40,
        image: 'https://images.pexels.com/photos/2096840/pexels-photo-2096840.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        imageAlt: 'Café lechero con espuma servido en taza',
        tags: ['Café'],
      },
      {
        name: 'Chocolate de Agua',
        description: 'Chocolate mexicano tradicional preparado con agua y batido a mano.',
        price: 35,
        image: 'https://images.pexels.com/photos/34837846/pexels-photo-34837846.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        imageAlt: 'Chocolate mexicano caliente en jarro de barro con churros',
        tags: ['Chocolate'],
      },
      {
        name: 'Malteadas',
        description: 'De fresa, vainilla o chocolate. Espumosas y cremosas.',
        price: 45,
        image: 'https://images.pexels.com/photos/39948188/pexels-photo-39948188.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        imageAlt: 'Malteada de chocolate en vaso de restaurante con crema batida',
        tags: ['Malteada'],
      },
      {
        name: 'Jarra de Agua Sabor 1L',
        description: 'Horchata, jamaica o tamarindo. Jarra de un litro para compartir.',
        price: 60,
        image: 'https://images.pexels.com/photos/34508595/pexels-photo-34508595.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        imageAlt: 'Horchata mexicana servida en vaso de vidrio con canela',
        tags: ['1 L'],
      },
      {
        name: 'Limonadas y Naranjadas',
        description: 'Refrescantes, naturales. Limonada o naranjada de $35 a $45.',
        price: 40,
        image: 'https://images.pexels.com/photos/5472319/pexels-photo-5472319.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        imageAlt: 'Limonada natural en vaso de vidrio con limón y hierbabuena',
        tags: ['Natural'],
      },
      {
        name: 'Flan Napolitano',
        description: 'Flan casero con caramelo y toque de vainilla.',
        price: 40,
        image: 'https://images.pexels.com/photos/9501562/pexels-photo-9501562.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        imageAlt: 'Flan napolitano con caramelo',
        tags: ['Postre'],
      },
      {
        name: 'Plátanos Fritos con Crema',
        description: 'Plátanos machos fritos servidos con crema fresca.',
        price: 45,
        image: 'https://images.pexels.com/photos/47062/bananas-dessert-ice-cream-fruit-47062.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        imageAlt: 'Plátanos fritos con crema y chocolate en plato',
        tags: ['Postre'],
      },
      {
        name: 'Duraznos con Crema',
        description: 'Duraznos al almíbar con crema fresca.',
        price: 40,
        image: 'https://images.pexels.com/photos/9093558/pexels-photo-9093558.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        imageAlt: 'Duraznos con crema servidos en plato de cerámica',
        tags: ['Postre'],
      },
      {
        name: 'Rebanada de Pastel',
        description: 'Pastel del día, rebanada generosa.',
        price: 45,
        image: 'https://images.pexels.com/photos/1414234/pexels-photo-1414234.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        imageAlt: 'Rebanada de pastel con crema y frutos rojos en plato',
        tags: ['Postre'],
      },
    ],
  },
];

export const MENU_ITEMS: MenuItem[] = MENU_CATEGORIES.flatMap((category) => category.items);

export interface ExtraOption {
  name: string;
  price: number;
}

export const EXTRA_OPTIONS: ExtraOption[] = [
  { name: 'Extra de queso Oaxaca', price: 25 },
  { name: 'Guacamole extra', price: 30 },
  { name: 'Salsa habanero', price: 10 },
  { name: 'Horchata 1 L', price: 35 },
  { name: 'Refresco', price: 25 },
  { name: 'Orden extra de tortillas', price: 15 },
];

export interface Testimonial {
  name: string;
  city: string;
  rating: number;
  comment: string;
  photo: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Mariana Rojas',
    city: 'Clienta desde 2023',
    rating: 5,
    comment: 'Los desayunos son espectaculares. Los huevos motuleños saben a Yucatán auténtico, y el café lechero es perfecto.',
    photo: 'https://images.pexels.com/photos/31823015/pexels-photo-31823015.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    name: 'Luis Hernández',
    city: 'Pedido a domicilio',
    rating: 5,
    comment: 'La cecina a la tampiqueña llegó calientita y con todos los acompañamientos. La torta de milanesa es gigante.',
    photo: 'https://images.pexels.com/photos/28525114/pexels-photo-28525114.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    name: 'Daniela Ortega',
    city: 'Cliente frecuente',
    rating: 4,
    comment: 'Los chilaquiles verdes con pollo son mi debilidad. El flan napolitano es el mejor que he probado en la ciudad.',
    photo: 'https://images.pexels.com/photos/9501562/pexels-photo-9501562.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
];

export const RESTAURANT_INFO = {
  address: 'Av. Insurgentes Sur 1234, Col. Del Valle, Ciudad de México',
  phone: '+52 55 1234 5678',
  phoneHref: 'tel:+525512345678',
  whatsappHref: 'https://wa.me/525512345678',
  email: 'hola@flamante.mx',
  emailHref: 'mailto:hola@flamante.mx',
  hours: [
    { days: 'Lunes a jueves', time: '8:00 - 22:00' },
    { days: 'Viernes y sábado', time: '8:00 - 23:30' },
    { days: 'Domingo', time: '8:00 - 21:00' },
  ],
  socials: [
    { label: 'Instagram', href: 'https://instagram.com/flamante.mx' },
    { label: 'Facebook', href: 'https://facebook.com/flamante.mx' },
    { label: 'WhatsApp', href: 'https://wa.me/525512345678' },
  ],
};
