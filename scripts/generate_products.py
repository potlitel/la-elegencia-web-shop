#!/usr/bin/env python3
"""Genera 275 productos únicos para La Elegancia con nombres, descripciones y datos realistas."""

import json
import random

random.seed(42)

# ──────────────────────────────────────────────────────────────────────────────
# Paleta de colores por categoría (nombres + hex)
# ──────────────────────────────────────────────────────────────────────────────

VESTIDO_COLORS = [
    ("Negro", "#1c1917"), ("Blanco", "#ffffff"), ("Rojo", "#dc2626"),
    ("Rosa", "#f9a8d4"), ("Fucsia", "#d946ef"), ("Burdeos", "#800020"),
    ("Coral", "#ff7f50"), ("Naranja", "#f97316"), ("Dorado", "#d4af37"),
    ("Verde", "#16a34a"), ("Menta", "#99e2c8"), ("Turquesa", "#2dd4bf"),
    ("Azul", "#3b82f6"), ("Celeste", "#a3c4f3"), ("Lavanda", "#d8b4fe"),
    ("Lila", "#c084fc"), ("Champán", "#f6e6c6"), ("Crema", "#f5daa8"),
    ("Beige", "#e6d5b8"), ("Gris", "#a8a29e"), ("Mostaza", "#eab308"),
    ("Terracota", "#c2703e"), ("Oliva", "#6b8e23"), ("Arena", "#d4c5a9"),
    ("Coral oscuro", "#cd5c5c"), ("Rosa viejo", "#bc8f8f"), ("Azul marino", "#000080"),
    ("Vino", "#722f37"), ("Petroleo", "#008080"), ("Salmón", "#fa8072"),
]

BLUSA_COLORS = [
    ("Blanco", "#ffffff"), ("Negro", "#1c1917"), ("Crema", "#f5daa8"),
    ("Rosa", "#ffc0cb"), ("Rosa viejo", "#bc8f8f"), ("Lavanda", "#d8b4fe"),
    ("Menta", "#99e2c8"), ("Celeste", "#a3c4f3"), ("Azul", "#3b82f6"),
    ("Verde", "#16a34a"), ("Amarillo", "#fbbf24"), ("Naranja", "#f97316"),
    ("Coral", "#ff7f50"), ("Terracota", "#c2703e"), ("Beige", "#e6d5b8"),
    ("Arena", "#d4c5a9"), ("Gris", "#a8a29e"), ("Lila", "#c084fc"),
    ("Mostaza", "#eab308"), ("Champán", "#f6e6c6"), ("Turquesa", "#2dd4bf"),
    ("Fucsia", "#d946ef"), ("Oliva", "#6b8e23"), ("Burdeos", "#800020"),
    ("Denim", "#4f6d9f"),
]

PANTALON_COLORS = [
    ("Negro", "#1c1917"), ("Denim", "#4f6d9f"), ("Celeste", "#a3c4f3"),
    ("Crudo", "#f5f0e1"), ("Gris", "#a8a29e"), ("Azul marino", "#000080"),
    ("Verde", "#2f4f4f"), ("Oliva", "#6b8e23"), ("Beige", "#e6d5b8"),
    ("Arena", "#d4c5a9"), ("Blanco", "#ffffff"), ("Burdeos", "#800020"),
    ("Terracota", "#c2703e"), ("Chocolate", "#7b3f00"),
]

FALDA_COLORS = [
    ("Negro", "#1c1917"), ("Rosa palo", "#f4a6b0"), ("Blanco", "#ffffff"),
    ("Azul", "#3b82f6"), ("Denim", "#4f6d9f"), ("Rojo", "#dc2626"),
    ("Verde", "#16a34a"), ("Lavanda", "#d8b4fe"), ("Mostaza", "#eab308"),
    ("Beige", "#e6d5b8"), ("Burdeos", "#800020"), ("Celeste", "#a3c4f3"),
    ("Coral", "#ff7f50"), ("Menta", "#99e2c8"),
]

ACCESORIO_COLORS = [
    ("Negro", "#1c1917"), ("Marrón", "#8b4513"), ("Caramelo", "#d2691e"),
    ("Oro", "#d4af37"), ("Plata", "#c0c0c0"), ("Rojo", "#dc2626"),
    ("Blanco", "#ffffff"), ("Burdeos", "#800020"), ("Azul marino", "#000080"),
    ("Beige", "#e6d5b8"), ("Chocolate", "#7b3f00"), ("Cobre", "#b87333"),
]

# ──────────────────────────────────────────────────────────────────────────────
# Data pools para nombres, descripciones, tags
# ──────────────────────────────────────────────────────────────────────────────

VESTIDO_NAMES = [
    "Vestido Floral Primavera", "Vestido Negro Elegante", "Vestido Largo Elegante",
    "Vestido Cóctel Brillante", "Vestido Midi Floral", "Vestido Lino Natural",
    "Vestido Asimétrico Fiesta", "Vestido Cruzado Oficina", "Vestido Camisero Algodón",
    "Vestido Bohemio Largo", "Vestido Trainera Verano", "Vestido Entallado Clásico",
    "Vestido Volantes Romántico", "Vestido Martini Elegante", "Vestido Satén Premium",
    "Vestido Tunino Floral", "Vestido Crepe Dorado", "Vestido Tul Especial",
    "Vestido Hilado Ligero", "Vestido Neón Fiesta", "Vestido Maxi Playero",
    "Vestido Bodycon Fucsia", "Vestido Algodón Básico", "Vestido Lana Invierno",
    "Vestido Jersey Cómodo", "Vestido Mezclilla Casual", "Vestido Rasgado Lateral",
    "Vestido Acuarela Artístico", "Vestido Geométrico Moderno", "Vestido Corte Princesa",
    "Vestido Grecia Drapeado", "Vestido Imperio Floral", "Vestido Recto Minimalista",
    "Vestido A-France Clásico", "Vestido Sapito Elegante", "Vestido Sabrina Hombros",
    "Vestido Manga Abullonada", "Vestido Portofino Mar", "Vestido Palma Tropical",
    "Vestido Corina Fiesta", "Vestido Rumba Colorido", "Vestido Samba Dorado",
    "Vestido Tropicana Verde", "Vestido Varadero Azul", "Vestido Habana Rosa",
    "Vestido Santiago Rojo", "Vestido Trinidad Beige", "Vestido Viñales Verde",
    "Vestido Cayo Blanco", "Vestido Malecón Azul", "Vestido Esmeralda Largo",
    "Vestido Zafiro Noche", "Vestido Rubí Passion", "Vestido Ámbar Cálido",
]

VESTIDO_DESCRIPTIONS = [
    "Vestido largo con estampado floral artesanal, confeccionado en tela ligera. Ideal para bodas y ocasiones especiales.",
    "El clásico vestido negro ajustado. Silueta sofisticada para cenas y eventos formales.",
    "Vestido largo de satén con caída fluida. Perfecto para galas y celebraciones nocturnas.",
    "Vestido de cóctel con destellos sutiles. Brilla sin exagerar en cada paso.",
    "Vestido midi con estampado floral delicado. Equilibrio perfecto entre casual y elegante.",
    "Vestido de lino natural con corte recto. Transpirable y fresco para el calor cubano.",
    "Vestido asimétrico con un hombro descubierto. Diseño moderno para noches especiales.",
    "Vestido cruzado con cinturón integrado. Profesional y favorecedor para la oficina.",
    "Vestido camisero de algodón peinado. Cómodo, versátil y siempre con estilo.",
    "Vestido bohemio con bordados étnicos. Libertad y feminidad en una sola prenda.",
    "Vestido trainera corto con volantes. Fresco y juvenil para el verano.",
    "Vestido entallado que realza la silueta. Un clásico que nunca pasa de moda.",
    "Vestido con volantes en la falda. Movimiento y romance en cada paso.",
    "Vestido tipo martini con corte recto. Elegancia minimalista para eventos de día.",
    "Vestido de satén con brillo sutil. Lujo accesible para ocasiones especiales.",
    "Vestido tunino con estampado tropical. Alegría caribeña en cada detalle.",
    "Vestido de crepe con detalles dorados. Sofisticación para cenas elegantes.",
    "Vestido de tul con forro interior. Volumen y drama para eventos de gala.",
    "Vestido de hilado ligero con textura. Comodidad y estilo para el día a día.",
    "Vestido neón con colores vibrantes. Atrevimiento y energía para fiestas.",
    "Vestido maxi playero con corte holgado. Comfort y estilo para la playa.",
    "Vestido bodycon que marca la figura. Fucsia audaz para noches de fiesta.",
    "Vestido de algodón básico multifunción. El comodín de cualquier armario.",
    "Vestido de lino con forro de seda. Calidez y elegancia para días frescos.",
    "Vestido de jersey elástico. Cómodo como una segunda piel, elegante como un traje.",
    "Vestido de mezclilla casual con bordados. Estilo rural chic moderno.",
    "Vestido con rasgado lateral alto. Coquetería y movimiento en cada paso.",
    "Vestido con estampado acuarela único. Cada pieza es una obra de arte.",
    "Vestido geométrico con líneas modernas. Diseño contemporáneo y vanguardista.",
    "Vestido con corte princesa clásico. Silueta atemporal para eventos formales.",
    "Vestido estilo Grecia con drapeado. Elegancia mitológica en tela moderna.",
    "Vestido de corte imperio bajo el busto. Romántico y favorecedor para todas.",
    "Vestido recto minimalista sin adornos. Less is more en su máxima expresión.",
    "Vestido A-France con caída amplia. Clásico europeo con sabor caribeño.",
    "Vestido sapito con escote en V. Elegancia estructurada para eventos formales.",
    "Vestido Sabrina con hombros al descubierto. Fragilidad y fuerza en un diseño.",
    "Vestido manga abullonada con elástico. Volumen romántico en las mangas.",
    "Vestido Portofino con estampado marino. Evoca viajes y verano eterno.",
    "Vestido Palma con hojas tropicales. Paraíso en cada estampado.",
    "Vestido Corina con lentejuelas. Brillo y glamour para celebraciones.",
    "Vestido Rumba con colores vibrantes. Ritmo y pasión en cada tono.",
    "Vestido Samba dorado con flecos. Festival y alegría en una prenda.",
    "Vestido Tropicana verde esmeralda. Naturaleza y elegancia fusionadas.",
    "Vestido Varadero azul turquesa. El color del mar caribeño en tu piel.",
    "Vestido Habana rosa viejo. Nostalgia y modernidad de la capital cubana.",
    "Vestido Santiago rojo apasionado. Fuego y temperamento santiaguero.",
    "Vestido Trinidad beige colonial. Historia y encanto de la ciudad patrimonio.",
    "Vestido Viñales verde montaña. Naturaleza y tranquilidad en cada tejido.",
    "Vestido Cayo blanco pristine. Pureza y frescura para el verano.",
    "Vestido Malecón azul infinito. El océano como telón de fondo.",
    "Vestido Esmeralda largo con escote. Piedra preciosa convertida en moda.",
    "Vestido Zafiro para eventos nocturnos. Azul profundo que cautiva.",
    "Vestido Rubí pasión con corte recto. Rojo intenso que no pasa inadvertido.",
    "Vestido Ámbar cálido con tonos tierra. Calidez otoñal para días frescos.",
]

VESTIDO_TAGS = [
    ["verano", "elegante"], ["clásico", "formal"], ["fiesta", "largo"],
    ["cóctel", "brillante"], ["midi", "floral"], ["lino", "verano"],
    ["asimétrico", "moderno"], ["oficina", "profesional"], ["casual", "camisero"],
    ["bohemio", "étnico"], ["trainera", "juvenil"], ["entallado", "clásico"],
    ["volantes", "romántico"], ["martini", "minimalista"], ["satén", "premium"],
    ["tropical", "alegre"], ["crepe", "sofisticado"], ["tul", "gala"],
    ["textura", "comodo"], ["neón", "fiesta"], ["playero", "maxi"],
    ["bodycon", "audaz"], ["básico", "versátil"], ["lino", "fresco"],
    ["jersey", "cómodo"], ["mezclilla", "rural"], ["rasgado", "coqueto"],
    ["acuarela", "artístico"], ["geométrico", "moderno"], ["princesa", "formal"],
    ["grecia", "drapeado"], ["imperio", "romántico"], ["minimalista", "clean"],
    ["a-france", "europeo"], ["sapito", "elegante"], ["sabrina", "hombros"],
    ["mangas", "romántico"], ["marino", "viajes"], ["tropical", "hojas"],
    ["lentejuelas", "glamour"], ["rumba", "ritmo"], ["samba", "festival"],
    ["tropicana", "naturaleza"], ["varadero", "mar"], ["habana", "capital"],
    ["santiago", "pasión"], ["trinidad", "colonial"], ["viñales", "montaña"],
    ["cayo", "playa"], ["malecón", "océano"], ["esmeralda", "precioso"],
    ["zafiro", "noche"], ["rubí", "intenso"], ["ámbar", "otoño"],
]

BLUSA_NAMES = [
    "Blusa Bohemia Estampada", "Blusa Seda Premium", "Blusa Lino Natural",
    "Blusa Crema Botones", "Blusa Básica Algodón", "Blusa Naranja Cálida",
    "Blusa Vuelo Manga", "Blusa Cuello V Elegante", "Blusa Marino Rayas",
    "Blusa Floral Verano", "Blusa Satén Brillo", "Blusa Bordado Étnico",
    "Blusa Lazo Hombro", "Blusa Tunica Larga", "Blusa Crop Top Moderna",
    "Blusa Peter Pan Colegial", "Blusa Offset Asimétrica", "Blusa Guiño Fiesta",
    "Blusa Tara Hem Sublime", "Blusa Almendro Elegante", "Blusa Ceiba Natural",
    "Blusa Siboney Bordado", "Blusa Taino Estampado", "Blusa Guajira Fresca",
    "Blusa Criolla Tropical", "Blusa Habanera Clásica", "Blusa Yoruba Colorida",
    "Blusa Campesina Rústica", "Blusa Marina Rayas", "Blusa Paloma Blanca",
    "Blusa Sol Naranja", "Blusa Luna Plateada", "Blusa Estrella Dorada",
    "Blusa Trópico Verde", "Blusa Caribe Azul", "Blusa Sierra Majestuosa",
    "Blusa Valle Fértil", "Blusa Costa Azul", "Blusa Isla Paraíso",
    "Blusa Puerto Libre", "Blusa Bahía Turquesa", "Blusa Río Cristalino",
    "Blusa Cenote Profundo", "Blusa Selva Exuberante", "Blusa Coral Mar",
    "Blusa Perla Oriental", "Blusa Ámbar Dorado", "Blusa Cobre Antiguo",
    "Blusa Plata Brillante", "Blusa Oro Rosa", "Blusa Titanium Moderna",
    "Blusa Acero Inoxidable", "Blusa Hierro Forjado", "Blusa Bronce Clásico",
]

BLUSA_DESCRIPTIONS = [
    "Blusa suelta con estampado único, bolsillos laterales y manga ancha. Fresca y versátil.",
    "Blusa de satén con acabado brillante. Caída perfecta que eleva cualquier look.",
    "Blusa de lino natural con botones frontales y corte holgado. Transpirable y elegante.",
    "Blusa crema con botones perla. Detalles sutiles que marcan la diferencia.",
    "Camiseta básica de algodón peinado, cuello redondo y tiro al cuerpo.",
    "Blusa en naranja cálido con corte moderno. Color y actitud para destacar.",
    "Blusa con vuelo de manga amplio. Movimiento y feminidad en cada gesto.",
    "Blusa con corte en V que estiliza el rostro. Elegancia sin esfuerzo.",
    "Blusa marinera con rayas azul y blanco. Estilo náutico atemporal.",
    "Blusa floral con estampado de pequeñas flores. Primavera eterna en tu clóset.",
    "Blusa de satén con brillo sutil. Perfecta para transitar del día a la noche.",
    "Blusa con bordado étnico a mano. Artesanía y tradición en cada puntada.",
    "Blusa con lazo al hombro. Diseño original que despierta conversaciones.",
    "Blusa túnica larga hasta la rodilla. Comodidad y estilo en una sola prenda.",
    "Blusa crop top con corte moderno. Joven y atrevida para el verano.",
    "Blusa con cuello Peter Pan. Retro y adorable para cualquier ocasión.",
    "Blusa asimétrica con un hombro más alto. Diseño vanguardista y femenino.",
    "Blusa con destellos y lentejuelas. Para noches donde quieres brillar.",
    "Blusa con detalle sublimado en la orilla. Acabado premium y único.",
    "Blusa corte almendro que ensancha la cintura visualmente. Favorecedora.",
    "Blusa de fibra natural con textura rústica. Eco-friendly y con estilo.",
    "Blusa bordada a mano con motivos criollos. Tradición y modernidad.",
    "Blusa con estampado taino inspirado en la naturaleza cubana.",
    "Blusa guajira con colores tierra. Fresca y conectada con la naturaleza.",
    "Blusa criolla con estampado tropical vibrante. Alegría caribeña.",
    "Blusa habanera con corte clásico moderno. La elegancia de La Habana.",
    "Blusa yoruba con colores saturados. Ritmo y culturalidad afrocubana.",
    "Blusa campesina confección rústica. Simplicidad y funcionalidad.",
    "Blusa marinera con rayas horizontales. Estilo náutico impecable.",
    "Blusa blanca paloma con corte limpio. Pureza y frescura.",
    "Blusa sol naranja con radial sol. Energía y calidez en cada día.",
    "Blusa luna plateada con brillo sutil. Elegancia nocturna sofisticada.",
    "Blusa estrella dorada con aplicaciones metálicas. Brillo y glamour.",
    "Blusa trópico verde con hojas estampadas. Naturaleza viva en tu piel.",
    "Blusa caribe azul turquesa. El color del mar en tu armario.",
    "Blusa sierra con tonos verdes montañosos. Naturaleza y aventura.",
    "Blusa valle con tonos fértiles y verdes. Conexión con la tierra.",
    "Blusa costa con azul profundo del océano. Mar y frescura.",
    "Blusa isla paraíso con estampado de palmeras. Vacaciones permanentes.",
    "Blusa puerto libre con estampado de anclas. Navegación y libertad.",
    "Blusa bahía turquesa con tonos agua. Refrescante y femenina.",
    "Blusa río cristalino con transparencias sutiles. Frescura líquida.",
    "Blusa cenote azul profundo. Misterio y belleza natural.",
    "Blusa selva exuberante con verdes intensos. Exuberancia tropical.",
    "Blusa coral mar con tonos rosados. Suavidad y ternura.",
    "Blusa perla oriental con brillo nacarado. Lujo accesible.",
    "Blusa ámbar dorado con tonos cálidos. Calidez y elegancia.",
    "Blusa cobre antiguo con textura envejecida. Vintage y sofisticado.",
    "Blusa plata brillante con acabado metálico. Modernidad y estilo.",
    "Blusa oro rosa con tonos rosados dorados. Tendencia y feminidad.",
    "Blusa titanium con grey metálico. Industrial y chic.",
    "Blusa acero inoxidable con brillo frió. Minimalismo extremo.",
    "Blusa hierro forjado con textura rústica. Artesanal y resistente.",
    "Blusa bronce clásico con tonos cobrizos. Calidez atemporal.",
]

BLUSA_TAGS = [
    ["casual", "verano"], ["premium", "oficina"], ["lino", "fresco"],
    ["clásico", "elegante"], ["básico", "algodón"], ["colorido", "verano"],
    ["mangas", "romántico"], ["elegante", "estiliza"], ["marino", "náutico"],
    ["floral", "primavera"], ["satén", "noche"], ["étnico", "artesanal"],
    ["original", "diseño"], ["túnica", "comodo"], ["crop", "joven"],
    ["retro", "colegial"], ["asimétrico", "moderno"], ["fiesta", "brillante"],
    ["sublimado", "premium"], ["almendro", "favorecedor"], ["natural", "eco"],
    ["bordado", "tradición"], ["taino", "naturaleza"], ["guajira", "fresco"],
    ["criollo", "tropical"], ["habanero", "clásico"], ["yoruba", "cultural"],
    ["campesino", "rústico"], ["marinero", "náutico"], ["blanco", "puro"],
    ["sol", "energía"], ["luna", "noche"], ["estrella", "glamour"],
    ["trópico", "naturaleza"], ["caribe", "mar"], ["sierra", "aventura"],
    ["valle", "tierra"], ["costa", "océano"], ["isla", "playa"],
    ["puerto", "libertad"], ["bahía", "refrescante"], ["río", "fresco"],
    ["cenote", "misterio"], ["selva", "exuberante"], ["coral", "ternura"],
    ["perla", "lujo"], ["ámbar", "calidez"], ["cobre", "vintage"],
    ["plata", "moderno"], ["oro", "femenino"], ["titanium", "industrial"],
    ["acero", "minimalista"], ["hierro", "artesanal"], ["bronce", "atemporal"],
]

PANTALON_NAMES = [
    "Pantalón Mom Jeans", "Pantalón Palazzo", "Pantalón Denim Slim",
    "Pantalón Cargo Militar", "Pantalón Wide Leg", "Pantalón Cropped Recto",
    "Pantalón Alfombra Recto", "Pantalón Flare Clásico", "Pantalón Jogger Deportivo",
    "Pantalón Dress Clásico", "Pantalón Paperbag Cinturón", "Pantalón Culottes Moda",
    "Pantalón Plisado Elegante", "Pantalón Mezclilla Recto", "Pantalón Lincoln Recto",
    "Pantalón Maxi Fluido", "Pantalón Bermuda Casual", "Pantalón Chino Clásico",
    "Pantalón Sastrero Elegante", "Pantalón Piloto Militar", "Pantalón Vaquero Clásico",
    "Pantalón Hawaiano Cómodo", "Pantalón Gaucho Argentino",     "Pantalón Bombachas",
    "Pantalón Dril Frío", "Pantalón Gabardina Oficina", "Pantalón Lino Verano",
    "Pantalón Algodón Elástico", "Pantalón Jean Straight", "Pantalón Mom Roto",
    "Pantalón High Waist Skinny", "Pantalón Boyfriend Relaxed", "Pantalón Pegao Clásico",
    "Pantalón Suelto Cómodo", "Pantalón Recto Premium", "Pantalón Flare Estampado",
    "Pantalón Cargo Verde", "Pantalón Denim Oscuro", "Pantalón Celeste Clásico",
    "Pantalón Crudo Natural", "Pantalón Negro Elegante", "Pantalón Burdeos Oscuro",
    "Pantalón Verde Oliva", "Pantalón Mostaza Vibrante", "Pantalón Coral Suave",
    "Pantalón Lila Moderno", "Pantalón Terracota Cálido", "Pantalón Beige Versátil",
    "Pantalón Arena Claro", "Pantalón Gris Perla", "Pantalón Chocolate Profundo",
    "Pantalón Cobre Metálico", "Pantalón Bronce Cálido", "Pantalón Plata Brillante",
]

PANTALON_DESCRIPTIONS = [
    "Mom jeans de talle alto con bastilla recta. Cómodo, durable y con estilo retro.",
    "Pantalón palazzo de tela ligera con elástico en la cintura. Fluido y femenino.",
    "Pantalón denim slim de talle medio con elasticidad. Ajuste moderno y cómodo.",
    "Pantalón cargo con bolsillos laterales. Estilo militar adaptado a la moda femenina.",
    "Pantalón wide leg con caída amplia. Comodidad extrema y estilo contemporáneo.",
    "Pantalón cropped recto que llega al tobillo. Perfecto con tenis o tacones.",
    "Pantalón alfombra recto de talle alto. Silueta alargada y elegante.",
    "Pantalón flare que ensancha en la rodilla. Retro y favorecedor.",
    "Pantalón jogger deportivo con elástico en tobillo. Comodidad para el día a día.",
    "Pantalón dress clásico para oficina. Corte impecable y tela premium.",
    "Pantalón paperbag con cinturón integrado. Cintura marcada y estilo único.",
    "Pantalón culottes anchos hasta la rodilla. Fresco y versátil para verano.",
    "Pantalón plisado con pliegues perfectos. Elegancia para eventos de día.",
    "Pantalón mezclilla recto de talle alto. Denim resistente y cómodo.",
    "Pantalón lincoln recto con dobladillo acabado. Básico premium indispensable.",
    "Pantalón maxi fluido que arrastra. Dramatismo y elegancia en cada paso.",
    "Pantalón bermuda casual hasta la rodilla. Fresh y cómodo para el calor.",
    "Pantalón chino de algodón con corte clásico. Versátil del trabajo a la cena.",
    "Pantalón sastrero con pinces y corte limpio. Profesional y favorecedor.",
    "Pantalón piloto con bolsillos militar. Estilo aventurero femenino.",
    "Pantalón vaquero clásico de mezclilla. El eterno denim que nunca falla.",
    "Pantalón hawaiano con estampado tropical. Vacaciones y relajo total.",
    "Pantalón gaucho con corte amplio y pierna ancha. Libertad y estilo.",
    "Pantalón bombachas con elástico en tobillo. Cómodo como pijama, elegante como traje.",
    "Pantalón dril frío para el verano cubano. Transpirable y resistente.",
    "Pantalón gabardina para oficina. Tela que no se arruga y corte perfecto.",
    "Pantalón lino verano con elástico en cintura. Fresco y natural.",
    "Pantalón algodón elástico cómodo. Comodidad extrema sin perder estilo.",
    "Pantalón jean straight recto clásico. Denim que estiliza la figura.",
    "Pantalón mom roto con desgaste intencional. Casual y con personalidad.",
    "Pantalón high waist skinny ajustado. Talle alto que alarga las piernas.",
    "Pantalón boyfriend relajado de talla baja. Comodidad masculina con corte femenino.",
    "Pantalón pegao clásico ajustado. Silueta marcada y femenina.",
    "Pantalón suelto cómodo para todo el día. Comodidad sin renunciar al estilo.",
    "Pantalón recto premium con tela de calidad. Básico que eleva cualquier look.",
    "Pantalón flare estampado con fantasía. Movimiento y color en cada paso.",
    "Pantalón cargo verde militar. Estilo utilitario con toque femenino.",
    "Pantalón denim oscuro elegante. Denim que passa del casual al formal.",
    "Pantalón celeste clásico de mezclilla. Fresco y versátil.",
    "Pantalón crudo natural sin teñir. Auténtico y con personalidad.",
    "Pantalón negro elegante para cualquier ocasión. El comodín del armario.",
    "Pantalón burdeos oscuro sofisticado. Color profundo para eventos nocturnos.",
    "Pantalón verde oliva militar. Estilo combat chic moderno.",
    "Pantalón mostaza vibrante llamativo. Color que ilumina cualquier outfit.",
    "Pantalón coral suave y delicado. Tonos primaverales femeninos.",
    "Pantalón lila moderno y trending. Púrpura que marca tendencia.",
    "Pantalón terracota cálido otoñal. Tonos tierra elegantes.",
    "Pantalón beige versátil combina con todo. Básico indispensable.",
    "Pantalón arena claro fresco. Perfecto para días de sol.",
    "Pantalón gris perla sofisticado. Neutro elegante para oficina.",
    "Pantalón chocolate profundo cálido. Tonos marrones ricos y profundos.",
    "Pantalón cobre metálico brillante. Toque futurista y llamativo.",
    "Pantalón bronce cálido con tonos cobrizos. Calidez y elegancia.",
    "Pantalón plata brillante metalizado. Atrevido y moderno.",
]

PANTALON_TAGS = [
    ["casual", "denim"], ["palazzo", "fresco"], ["denim", "slim"],
    ["militar", "cargo"], ["wide-leg", "moderno"], ["cropped", "versátil"],
    ["alfombra", "elegante"], ["flare", "retro"], ["deportivo", "cómodo"],
    ["oficina", "clásico"], ["paperbag", "cinturón"], ["culottes", "moda"],
    ["plisado", "elegante"], ["mezclilla", "recto"], ["lincoln", "premium"],
    ["maxi", "dramático"], ["bermuda", "fresco"], ["chino", "versátil"],
    ["sastrero", "profesional"], ["piloto", "aventura"], ["vaquero", "clásico"],
    ["hawaiano", "tropical"], ["gaucho", "libertad"], ["bombachas", "cómodo"],
    ["dril", "frío"], ["gabardina", "oficina"], ["lino", "verano"],
    ["algodón", "elástico"], ["straight", "recto"], ["mom", "roto"],
    ["high-waist", "skinny"], ["boyfriend", "relajado"], ["pegao", "ajustado"],
    ["suelto", "cómodo"], ["recto", "premium"], ["flare", "estampado"],
    ["cargo", "militar"], ["denim", "oscuro"], ["celeste", "fresco"],
    ["crudo", "natural"], ["negro", "versátil"], ["burdeos", "sofisticado"],
    ["oliva", "militar"], ["mostaza", "vibrante"], ["coral", "suave"],
    ["lila", "moderno"], ["terracota", "otoño"], ["beige", "neutro"],
    ["arena", "claro"], ["gris", "perla"], ["chocolate", "profundo"],
    ["cobre", "metálico"], ["bronce", "cálido"], ["plata", "brillante"],
]

FALDA_NAMES = [
    "Falda Plisada Rosa Pal", "Falda Jeans Recta", "Falda Midi Floral",
    "Falda Lápiz Oficina", "Falda Envolvente Elegante", "Falda godet Volantes",
    "Falda Playera Corta", "Falda Deportiva Clásica", "Falda Tyvek Geométrica",
    "Falda Mezclilla Clásica", "Falda Negra Básica", "Falda Blanca Fresca",
    "Falda Azul Mar", "Falda Roja Pasión", "Falda Verde Esmeralda",
    "Falda Lavanda Suave", "Falda Mostaza Cálida", "Falda Beige Natural",
    "Falda Burdeos Elegante", "Falda Celeste Claro", "Falda Coral Primavera",
    "Falda Menta Refrescante", "Falda Lila Moderna", "Falda Terracota Cálida",
    "Falda Arena Dorada", "Falda Chocolate Oscuro", "Falda Óxido Vintage",
    "Falda Cobre Brillante", "Falda Plata Metalizada", "Falda Oro Rosa",
    "Falda Safari Militar", "Falda Sastrera Elegante", "Falda Plisada Etnica",
    "Falda Contrafuerte Formal", "Falda Tabla Cubana", "Falda Gasa Ligera",
    "Falda Lino Natural", "Falda Algodón Cómoda", "Falda Seda Premium",
    "Falda Encaje Romántica", "Falda Tul Especial", "Falda Piel Sintética",
    "Falda Camuflaje Moderna", "Falda Rayas Náuticas", "Falda Estampado Tropical",
]

FALDA_DESCRIPTIONS = [
    "Falda plisada con caída perfecta. Elegancia y movimiento en cada paso.",
    "Falda jeans recta de mezclilla resistente. Casual y duradera para el día a día.",
    "Falda midi con estampado floral delicado. Feminidad y color para la primavera.",
    "Falda lápiz ajustada para oficina. Corte impecable que estiliza la figura.",
    "Falda envolvente con cierre lateral. Elegancia y ajuste personalizado.",
    "Falda godet con volantes en la base. Movimiento y romance en cada paso.",
    "Falda playera corta de tela ligera. Fresca y práctica para la playa.",
    "Falda deportiva con elástico en cintura. Comodidad para entrenar o el día a día.",
    "Falda tyvek con estampado geométrico. Material innovador y diseño único.",
    "Falda mezclilla clásica recta. Denim resistente que nunca pasa de moda.",
    "Falda negra básica multifunción. El comodín de cualquier armario femenino.",
    "Falda blanca fresca para verano. Pureza y ligereza en cada movimiento.",
    "Falda azul con tonos marinos. Elegancia náutica para eventos de día.",
    "Falda roja apasionada y llamativa. Color que no pasa inadvertido.",
    "Falda verde esmeralda lujosa. Piedra preciosa convertida en moda.",
    "Falda lavanda suave y delicada. Tono relajante para el día a día.",
    "Falda mostaza cálida otoñal. Color vibrante que ilumina los días grises.",
    "Falda beige natural versátil. Neutro perfecto para combinar con todo.",
    "Falda burdeos elegante para eventos. Color profundo y sofisticado.",
    "Falda celeste clara refrescante. Azul suave que evoca cielo despejado.",
    "Falda coral primaveral y fresca. Tono que realza el bronceado.",
    "Falda menta refrescante para verano. Cool y moderna en cada paso.",
    "Falda lila moderna y trending. Púrpura que marca tendencia.",
    "Falda terracota cálida y acogedora. Tonos tierra elegantes.",
    "Falda arena dorada brillante. Tono neutro con toque luminoso.",
    "Falda chocolate oscuro sofisticado. Marrón profundo para eventos.",
    "Falda óxido vintage con textura envejecida. Retro y con personalidad.",
    "Falda cobre brillante metalizada. Toque futurista y llamativo.",
    "Falda plata metalizada con brillo frió. Modernidad extrema.",
    "Falda oro rosa delicada. Tendencia femenina y elegante.",
    "Falda safari militar con bolsillos. Estilo aventurero práctico.",
    "Falda sastrera elegante con pinces. Profesional y favorecedora.",
    "Falda plisada étnica con bordados. Tradición y color en cada pliegue.",
    "Falda contrafuerte formal con corte recto. Elegancia estructurada.",
    "Falda tabla cubana con estampado criollo. Sabor y tradición caribeña.",
    "Falda gasa ligera con transparencia sutil. Suavidad y romanticismo.",
    "Falda lino natural con textura rústica. Frescura y estilo eco.",
    "Falda algodón cómoda con elástico. Comodidad para todo el día.",
    "Falda seda premium con caída fluida. Lujo accesible para ocasiones especiales.",
    "Falda encaje romántica con forro interior. Detalles exquisitos y femeninos.",
    "Falda tul para eventos especiales. Volumen y drama en cada movimiento.",
    "Falda piel sintética con textura de cuero. Edge y modernidad.",
    "Falda camuflaje moderna con corte femenino. Militar chic actualizado.",
    "Falda rayas náuticas azul y blanco. Estilo marinero atemporal.",
    "Falda estampado tropical vibrante. Alegría caribeña en cada paso.",
]

FALDA_TAGS = [
    ["plisado", "elegante"], ["jeans", "casual"], ["midi", "floral"],
    ["lápiz", "oficina"], ["envolvente", "ajustada"], ["godet", "volantes"],
    ["playera", "fresco"], ["deportiva", "cómoda"], ["tyvek", "geométrico"],
    ["mezclilla", "clásico"], ["negro", "básico"], ["blanco", "fresco"],
    ["azul", "marino"], ["rojo", "pasión"], ["verde", "esmeralda"],
    ["lavanda", "suave"], ["mostaza", "cálido"], ["beige", "natural"],
    ["burdeos", "elegante"], ["celeste", "claro"], ["coral", "primavera"],
    ["menta", "refrescante"], ["lila", "moderno"], ["terracota", "cálido"],
    ["arena", "dorado"], ["chocolate", "oscuro"], ["óxido", "vintage"],
    ["cobre", "brillante"], ["plata", "metalizado"], ["oro", "rosa"],
    ["safari", "militar"], ["sastrero", "formal"], ["étnico", "bordado"],
    ["contrafuerte", "formal"], ["tabla", "cubano"], ["gasa", "ligero"],
    ["lino", "natural"], ["algodón", "cómodo"], ["seda", "premium"],
    ["encaje", "romántico"], ["tul", "especial"], ["piel", "moderno"],
    ["camuflaje", "militar"], ["rayas", "náutico"], ["tropical", "vibrante"],
]

ACCESORIO_NAMES = [
    "Bolso Bandolera Piel", "Reloj Elegante Dama", "Collar Perlas Clásico",
    "Bolso Tote Lona", "Cinturón Cuero Fino", "Aretes Aro Dorados",
    "Pulsera Cadena Oro", "Anillo Compromiso Zirconia", "Bolso Clutch Satén",
    "Sombrero Panamá", "Bufanda Seda Estampada", "Gafas de Sol Clásicas",
    "Bolso Mochila Juvenil", "Collar Cordón Minimalista", "Pulsera Macramé Artesanal",
    "Bolso Mano Nudo", "Cartera Larga Piel", "Llavero Corazón Plata",
    "Bolso Crossbody Mini", "Gorro Invierno Lana", "Banda Cabello Terciopelo",
    "Tocado Floral Fiesta", "Cinta Cabello Satén", "Vincha Deportiva",
    "Bolso CartUCHERA", "Estuche Maquillaje", "Bolsa Cosméticos",
    "Neceser Viaje", "Organizador Equipaje", "Funda Celular Piel",
    "Soporte Tablet", "Billetera Mini", "Tarjetero Cuero",
    "Porta Pasaporte", "Bolsa Zapatos Viaje", "Tapa Bípedo Joyas",
    "Bolso Playa Rafia", "Cesta Mercado Natural", "Canasta Frutas Junco",
    "Bandana Algodón Estampada", "Pañuelo Cuello Poliéster", "Chal Lana Invierno",
    "Mantoncillo Manila Floral", "Rebozo Seda Natural", "Foulard Hermès Style",
    "Bolso Basket Rattan", "Cartera Cheque Cuero", "Neceser Maquillaje",
    "Organizador Lencería", "Bolsa Lavable Ropa", "Funda Zapatos Transparente",
]

ACCESORIO_DESCRIPTIONS = [
    "Bandolera de piel sintética con correa ajustable y cierre de seguridad.",
    "Reloj de pulsera con esfera minimalista y caja metálica.",
    "Collar de perlas cultivadas con cierre oro. Clásico atemporal.",
    "Bolso tote de lona resistente con asas reforzadas. Espacioso y práctico.",
    "Cinturón de cuero fino con hebilla metálica. Detalle que marca la cintura.",
    "Aretes aro dorados con cierre de presión. Brillo y elegancia.",
    "Pulsera de cadena oro 18k con eslabones delicados. Lujo accesible.",
    "Anillo de compromiso con zirconia cúbica. Brillantez y romántismo.",
    "Bolso clutch de satén con cierre magnético. Perfecto para eventos de noche.",
    "Sombrero panamá de paja toquilla. Protección y estilo para el verano.",
    "Bufanda de seda estampada con motivo floral. Versátil y elegante.",
    "Gafas de sol con montura de acetato clásica. Protección UV y estilo.",
    "Bolso mochila juvenil con múltiples compartimentos. Práctica y moderna.",
    "Collar de cordón minimalista con dije. Simple y con personalidad.",
    "Pulsera de macramé tejida a mano. Artesanal y bohemia.",
    "Bolso mano con nudo decorativo. Diseño original y femenino.",
    "Cartera larga de piel con compartimentos para tarjetas. Organización y estilo.",
    "Llavero de corazón en plata con grabado. Detalle romántico y personal.",
    "Bolso crossbody mini con correa ajustada. Compacto y práctico.",
    "Gorro de lana para invierno con pompon. Caliente y con estilo.",
    "Banda de cabello de terciopelo con moño. Elegancia para el cabello.",
    "Tocado floral para fiestas y eventos. Volumen y color en la cabeza.",
    "Cinta de cabello de satén con lazo. Detalle femenino y delicado.",
    "Vincha deportiva absorbente de sudor. Práctica para entrenar.",
    "Bolso cartuchera con compartimentos organizados. Funcional y compacto.",
    "Estuche de maquillaje con espejo interior. Organización para tus productos.",
    "Bolsa de cosméticos impermeable. Protege y organiza tu rutina de belleza.",
    "Neceser de viaje con múltiples bolsillos. Practicidad para tus viajes.",
    "Organizador de equipaje con divisiones. Orden en tu maleta.",
    "Funda de celular de piel sintética con cierre. Protección y estilo.",
    "Soporte de tablet con cierre magnético. Funcional y elegante.",
    "Billetera mini con cierre de cremallera. Compacta para lo esencial.",
    "Tarjetero de cuero con ranuras para tarjetas. Organización minimalista.",
    "Porta pasaporte de piel con RFID blocking. Seguridad y estilo.",
    "Bolsa de zapatos para viaje con cierre. Mantén tus zapatos separados.",
    "Tapa bípedo para joyas con compartimentos. Protección para tus tesoros.",
    "Bolso de playá de rafia tejida a mano. Fresco y artesanal.",
    "Cesta de mercado de fibras naturales. Ecológica y resistente.",
    "Canasta de frutas de junco tejido. Artesanal y funcional.",
    "Bandana de algodón estampada con motivo floral. Versátil y colorida.",
    "Pañuelo de cuello de poliéster con protecció UV. Práctico para el sol.",
    "Chal de lana para invierno. Calidez y elegancia en los días fríos.",
    "Mantoncillo manila con flores bordadas. Tradición y color cubano.",
    "Rebozo de seda natural con flecos. Elegancia mexicana contemporánea.",
    "Foulard estilo Hermès con estampado geométrico. Lujo y sofisticación.",
    "Bolso basket de rattan tejido. Fresco y natural para verano.",
    "Cartera de cheque de cuero con cierre. Profesional y elegante.",
    "Neceser de maquillaje con espejo ampliado. Práctico y funcional.",
    "Organizador de lencería con compartimentos. Orden en tu cajón.",
    "Bolsa lavable de ropa sucia con cierre. Práctica para viajes.",
    "Funda de zapatos transparente con cierre. Visual y protectora.",
]

ACCESORIO_TAGS = [
    ["bolsos", "cuero"], ["relojes", "elegante"], ["perlas", "clásico"],
    ["tote", "lona"], ["cinturones", "cuero"], ["aretes", "dorados"],
    ["pulseras", "oro"], ["anillos", "compromiso"], ["clutch", "satén"],
    ["sombreros", "verano"], ["bufandas", "seda"], ["gafas", "sol"],
    ["mochilas", "juvenil"], ["collares", "minimalista"], ["pulseras", "artesanal"],
    ["mano", "nudo"], ["carteras", "largo"], ["llaveros", "plata"],
    ["crossbody", "mini"], ["gorros", "invierno"], ["bandas", "terciopelo"],
    ["tocados", "fiesta"], ["cintas", "satén"], ["vinchas", "deportivo"],
    ["cartUCHERA", "organizado"], ["estuche", "maquillaje"], ["cosméticos", "belleza"],
    ["neceser", "viaje"], ["organizador", "equipaje"], ["funda", "piel"],
    ["soporte", "tablet"], ["billeteras", "mini"], ["tarjeteros", "cuero"],
    ["pasaporte", "viaje"], ["zapatos", "viaje"], ["joyas", "protección"],
    ["playa", "rafia"], ["cesta", "natural"], ["canasta", "junco"],
    ["bandana", "algodón"], ["pañuelo", "UV"], ["chal", "invierno"],
    ["mantoncillo", "tradicional"], ["rebozo", "seda"], ["foulard", "sofisticado"],
    ["basket", "rattan"], ["cartera", "cheque"], ["neceser", "maquillaje"],
    ["organizador", "lencería"], ["bolsa", "lavable"], ["funda", "zapatos"],
]

# ──────────────────────────────────────────────────────────────────────────────
# Funciones auxiliares
# ──────────────────────────────────────────────────────────────────────────────

def slugify(name):
    """Convierte nombre a slug."""
    import unicodedata
    text = unicodedata.normalize('NFD', name)
    text = ''.join(c for c in text if unicodedata.category(c) != 'Mn')
    text = text.lower().strip()
    text = ''.join(c if c.isalnum() or c == ' ' else '-' for c in text)
    return '-'.join(text.split())[:50]


def random_colors(pool, n):
    """Selecciona n colores aleatorios del pool."""
    return random.sample(pool, min(n, len(pool)))


def random_sizes(category):
    """Retorna tamaños apropiados por categoría."""
    if category == "accesorios":
        return ["Única"]
    all_sizes = ["XS", "S", "M", "L", "XL"]
    n = random.randint(2, 5)
    return sorted(random.sample(all_sizes, n))


def random_rating():
    """Retorna rating realista."""
    weights = [5, 4, 3, 2, 1]
    r = random.choices(weights, weights=[40, 35, 15, 7, 3])[0]
    return round(r + random.uniform(0, 0.9), 1)


def random_stock():
    """Retorna stock realista."""
    r = random.random()
    if r < 0.1:
        return random.randint(0, 2)
    elif r < 0.4:
        return random.randint(3, 8)
    elif r < 0.8:
        return random.randint(9, 18)
    else:
        return random.randint(19, 35)


def random_price(category):
    """Retorna precio realista por categoría en CUP."""
    ranges = {
        "vestidos": (1500, 4500),
        "blusas": (800, 2800),
        "pantalones": (1200, 3500),
        "faldas": (900, 2600),
        "accesorios": (600, 4000),
    }
    low, high = ranges[category]
    return random.randint(low, high)


def random_old_price(price):
    """Ocasionalmente retorna un precio anterior más alto."""
    if random.random() < 0.2:
        return price + random.randint(200, 600)
    return None


def random_is_new():
    """20% de probabilidad de ser nuevo."""
    return random.random() < 0.2


def generate_review(author_seed, product_id):
    """Genera una reseña única basada en semilla."""
    review_templates = [
        "Excelente calidad, superó mis expectativas. Totalmente recomendado.",
        "Muy bonito y bien confeccionado. El color es igual a la foto.",
        "Buena relación calidad-precio. Llegó rápido y bien empacado.",
        "El mejor producto que he comprado este año. Atención de 10.",
        "Perfecto para la ocasión que lo necesitaba. Cómodo y elegante.",
        "Tela de primera, el corte es favorecedor. Me encantó.",
        "Segunda vez que compro aquí y no me decepciona.",
        "Lo usé en un evento y recibí muchos cumplidos.",
        "Diseño original y moderno. No se consigue en otro lado.",
        "Material resistente y acabados impecables. Vale cada peso.",
        "Llegó antes de lo esperado. El empaque es muy cuidadoso.",
        "Lo regalé y quedaron encantadas. Siempre acierto comprando aquí.",
        "Corte favorecedor que estiliza la figura. Muy conforme.",
        "Colores vibrantes que no se deslavas. Calidad garantizada.",
        "Prenda versátil que combino de muchas formas. Imprescindible.",
        "Elástico cómodo que no aprieta. Perfecto para todo el día.",
        "Acabados premium que se nota en cada detalle. Exquisito.",
        "Talla exacta, no necesita ajustes. Muy satisfecha.",
        "Lo pedí sin esperar mucho y me sorprendió la calidad.",
        "Diseño que recibe halagos donde quiera que lo use.",
        "Fresco y ligero, ideal para el clima cubano.",
        "Elegante sin exagerar. Perfecto para oficina o cena.",
        "Color que ilumina la cara. Me siento hermosa con él.",
        "Bordados hermosos, se nota el trabajo artesanal.",
        "Práctico y bonito. Lo uso a diario sin problemas.",
        "Cierre funcionando perfecto, buenos materiales.",
        "Elástico que se mantiene después de varios lavados.",
        "Tela que no transparenta, transpirable y cómoda.",
        "Corte moderno que sigue la tendencia actual.",
        "Regalo perfecto, la calidad habla por sí sola.",
        "He comprado varios colores, todos igual de buenos.",
        "Llegó en perfecto estado, empaque de primera.",
        "Me encanta el diseño, muy original y diferente.",
        "Calidad consistente en todas mis compras anteriores.",
        "Perfecta para regalar, siempre acierto con esta tienda.",
        "Prenda que uso constantemente, no me canso de ella.",
        "Los colores son exactos como en la foto.",
        "Buen material, no se deforma después de lavar.",
        "Elegancia y comodidad en una sola prenda.",
        "Siempre superan mis expectativas. Compra segura.",
    ]
    idx = hash(author_seed + str(product_id)) % len(review_templates)
    return review_templates[idx]


def generate_author_names(n):
    """Genera n nombres de autor únicos cubanos."""
    first_names = [
        "Dania", "Mayra", "Yordanka", "Yunieris", "Liset", "Geidy", "Anays",
        "Osmara", "Amara", "Nayka", "Idania", "Yuliana", "Oslaidys", "Damaris",
        "Yenia", "Yorel", "Leidys", "Yanet", "Yaritza", "Marialegna", "Nairobis",
        "Yarelys", "Ilia", "Yuliet", "Yakelin", "Daysiannys", "Lianna", "Yoandra",
        "Celina", "Yosleny", "Yaneisi", "Raquel", "Yulieska", "Giselle", "Laritza",
        "Yarima", "Graciela", "Yusimi", "Betsy", "Niurka", "Yanelis", "Yudelkis",
        "Dayana", "Annel", "Odalys", "Yenifer", "Lisneidy", "Yusnaydi", "Yaily",
        "Milena", "Yosimara", "Kenia", "Yaneisy", "Rosmery", "Yudelmis", "Maily",
        "Yainet", "Yaritza", "Dailyn", "Yarelys", "Yamilka", "Lianet", "Yennefer",
        "Yanet", "Greysis", "Yoenis", "Daysi", "Yordanka", "Yilianis", "Yoanka",
        "Milagros", "Yudith", "Yarlenis", "Yomara", "Yeida", "Yankayla", "Yuleidys",
        "Yosneidis", "Yaile", "Yenit", "Yadira", "Yamila", "Yanira", "Yosvany",
        "Yudith", "Yurislay", "Yenysi", "Yamile", "Yanisleidi", "Yosmara",
    ]
    last_initials = list("ABCDEFGHIJKLMNOPQRSTUVWXYZ")
    authors = set()
    while len(authors) < n:
        fn = random.choice(first_names)
        li = random.choice(last_initials)
        authors.add(f"{fn} {li}.")
    return list(authors)


def generate_reviews(product_id, product_name):
    """Genera 4 reseñas únicas por producto."""
    authors = generate_author_names(4)
    reviews = []
    dates = ["hace 1 día", "hace 3 días", "hace 1 semana", "hace 2 semanas"]
    for i, author in enumerate(authors):
        r = random.randint(3, 5)
        reviews.append({
            "author": author,
            "date": dates[i],
            "rating": r,
            "text": generate_review(author, product_id),
        })
    return reviews


# ──────────────────────────────────────────────────────────────────────────────
# Generación principal
# ──────────────────────────────────────────────────────────────────────────────

def generate_products():
    """Genera 275 productos únicos."""
    products = []
    reviews_by_product = {}

    used_names = {
        "vestidos": set(),
        "blusas": set(),
        "pantalones": set(),
        "faldas": set(),
        "accesorios": set(),
    }

    id_counter = 1

    # Distribución: 55 vestidos, 55 blusas, 45 pantalones, 35 faldas, 85 accesorios
    distributions = [
        ("vestidos", 55, VESTIDO_NAMES, VESTIDO_DESCRIPTIONS, VESTIDO_TAGS, VESTIDO_COLORS),
        ("blusas", 55, BLUSA_NAMES, BLUSA_DESCRIPTIONS, BLUSA_TAGS, BLUSA_COLORS),
        ("pantalones", 45, PANTALON_NAMES, PANTALON_DESCRIPTIONS, PANTALON_TAGS, PANTALON_COLORS),
        ("faldas", 35, FALDA_NAMES, FALDA_DESCRIPTIONS, FALDA_TAGS, FALDA_COLORS),
        ("accesorios", 85, ACCESORIO_NAMES, ACCESORIO_DESCRIPTIONS, ACCESORIO_TAGS, ACCESORIO_COLORS),
    ]

    for category, count, names, descriptions, tags_pool, colors_pool in distributions:
        for i in range(count):
            name = names[i] if i < len(names) else f"{category.title()} Especial {id_counter}"
            slug = slugify(name)

            # Asegurar slug único
            base_slug = slug
            counter = 2
            while slug in used_names[category]:
                slug = f"{base_slug}-{counter}"
                counter += 1
            used_names[category].add(slug)

            description = descriptions[i] if i < len(descriptions) else f"Prenda de alta calidad en la categoría {category}."
            tags = tags_pool[i % len(tags_pool)]

            price = random_price(category)
            old_price = random_old_price(price)

            # Seleccionar colores (2-4)
            n_colors = random.randint(2, 4)
            selected_colors = random_colors(colors_pool, n_colors)
            colors = [{"name": c[0], "hex": c[1]} for c in selected_colors]

            # Imagen base
            image = f"/images/{slug}.jpg"

            product = {
                "id": id_counter,
                "slug": slug,
                "name": name,
                "category": category,
                "price": price,
                "oldPrice": old_price,
                "sizes": random_sizes(category),
                "colors": colors,
                "rating": random_rating(),
                "reviews": random.randint(5, 250),
                "stock": random_stock(),
                "isNew": random_is_new(),
                "image": image,
                "description": description,
                "tags": tags,
            }

            products.append(product)
            reviews_by_product[id_counter] = generate_reviews(id_counter, name)

            id_counter += 1

    return products, reviews_by_product


def main():
    products, reviews = generate_products()

    # Escribir productos
    with open("src/data/products.json", "w", encoding="utf-8") as f:
        json.dump(products, f, ensure_ascii=False, indent=2)

    # Escribir reseñas
    with open("src/data/reviews.json", "w", encoding="utf-8") as f:
        json.dump(reviews, f, ensure_ascii=False, indent=2)

    print(f"Generados {len(products)} productos en src/data/products.json")
    print(f"Generadas {sum(len(r) for r in reviews.values())} reseñas en src/data/reviews.json")

    # Estadísticas
    by_cat = {}
    for p in products:
        cat = p["category"]
        by_cat[cat] = by_cat.get(cat, 0) + 1
    for cat, n in sorted(by_cat.items()):
        print(f"  {cat}: {n}")


if __name__ == "__main__":
    main()
