import bcrypt from "bcryptjs";

export const data = {
    address: [
        {
            name: "Bhabani Shankar Das",
            mobile: 1234567890,
            pinCode: 123456,
            address: "At- Benapura, Rajghat, Po- Md. Nagar, Via- Amarda Road",
            locality: "Benapura, Rajghat",
            city: "Balasore",
            district: "Balasore",
            state: "Odisha",
            country: "India"
        }
    ],
    users: [
        {
            name: "Alex",
            email: "admin@gmail.com",
            password: bcrypt.hashSync("123456"),
            admin: true
        },
        {
            name: "Mercer",
            email: "mercer@gmail.com",
            password: bcrypt.hashSync("123456"),
            admin: false
        }
    ],
    products: [
        {
            id: 1,
            category: "Electronics",
            subCategory: "Camera",
            name: "Sony ZV-1 Digital Camera for Content Creators, Vlogging and YouTube with Flip Screen, Built-in Microphone, 4K HDR Video, Touchscreen Display, Live Video Streaming, Webcam",
            rating: 4.5,
            price: 38400,
            discount: 10,
            shortDescription: "Sony ZV-1 Camera for Content Creators and Vloggers",
            longDescription: [
                "Fast Hybrid Autofocus and Real Time Eye Autofocus and Real-time Autofocus tracking.",
                "Side flip-out 3.0” LCD screen that also tilts up and down for easier to compose selfie shots",
                "Quickly switch between two modes of defocused background bokeh",
                "Product Showcase Setting transitions focus from face to object"
            ],
            image: "https://m.media-amazon.com/images/I/51utPfDooqS._AC_SX466_.jpg",
            colors: [
                "black",
                "white",
            ],
            brand: "Sony",
            stock: 20
        },
        {
            id: 2,
            category: "Electronics",
            subCategory: "Camera",
            name: "Nikon Z50 Compact Mirrorless Digital Camera with Flip Under Selfie-Vlogger LCD, Body",
            rating: 4,
            price: 42050,
            discount: 5,
            shortDescription: "Nikon Z50 Compact Mirrorless Digital Camera Body",
            longDescription: [
                "First DX-format mirrorless camera to use a large 55mm lens mount, offering advantages in high image quality and lowlight performance.",
                "20.9 MP sensor with robust 4K UHD video features",
                "Built-in Wi-Fi and Bluetooth for simple pairing to a smartphone.",
                "Selfie flip down touch LCD screen, great for self-portraits and vlogging."
            ],
            image: "https://m.media-amazon.com/images/I/91tkHspL3ZL._AC_SX425_.jpg",
            colors: [
                "black",
                "grey",
            ],
            brand: "Nikon",
            stock: 20
        },
        {
            id: 3,
            category: "Electronics",
            subCategory: "Headphones",
            name: "Sony WH-1000XM4 Wireless Industry Leading Noise Canceling Overhead Headphones with Mic for Phone-Call and Alexa Voice Control, Black",
            rating: 4,
            price: 20440,
            discount: 12,
            shortDescription: "Industry-leading noise canceling with Dual Noise Sensor technology",
            longDescription: [
                "Up to 30-hour battery life with quick charging (10 min charge for 5 hours of playback)",
                "Touch Sensor controls to pause play skip tracks, control volume, activate your voice assistant, and answer phone calls",
                "Superior call quality with precise voice pickup",
                "Wearing detection pauses playback when headphones are removed"
            ],
            image: "https://m.media-amazon.com/images/I/71o8Q5XJS5L._AC_SY450_.jpg",
            colors: [
                "black",
                "grey",
                "blue"
            ],
            brand: "Sony",
            stock: 20
        },
        {
            id: 4,
            category: "Electronics",
            subCategory: "Headphones",
            name: "Samsung Galaxy Buds Plus, True Wireless Earbuds (Wireless Charging Case Included)",
            rating: 5,
            price: 4745,
            discount: 5,
            shortDescription: "Android & iOS compatible. Pair with smart devices via Bluetooth",
            longDescription: [
                "Exactly what you want to hear. Galaxy Buds+ are the perfect fitting earbuds to isolate you from distracting noises, so you can stay focused on what you want.",
                "22 hours of serious sound. Get up to 11 hours of nonstop music on a single charge, then pop your Galaxy Buds+ in the wireless charging case and get nearly 11 more.",
                "Your voice, loud and clear. Ensure you’re heard clearly."
            ],
            image: "https://m.media-amazon.com/images/I/614bL2rQtcL._AC_SX679_.jpg",
            colors: [
                "black",
                "white",
                "blue"
            ],
            brand: "Samsung",
            stock: 20
        },
        {
            id: 5,
            category: "Computers and Hardwares",
            subCategory: "Tablets",
            name: "Android 10.0 Tablet : MEBERRY 10 Ultra-Fast 4GB RAM,64GB ROM Tablets-8000mAh Battery-WiFi Support - Bluetooth Keyboard | Mouse | M7 Tablet Cover and More Include - Grey",
            rating: 4,
            price: 13140,
            discount: 10,
            shortDescription: "This Android tablet is equipped with a powerful octa-core processor and has an energy saving of 30 days on standby",
            longDescription: [
                "M7 tablet | Case for tablet 2-1 | Bluetooth keyboard | 2.4G wireless mouse | Type C to USB adapter Protective film | Capacitive pen | Instruction manual USA standard charger | Type C data cable",
                "MEBERRY 10.1-inch tablet with integrated 4 GB operating memory and 64 GB storage memory - up to 128 GB (4--128 GB, applicable), screen resolution 1280x800 IPS and support 8000 mAh battery",
                "With GOOGLE GMS certification, we can freely download any APP in the GOOGLE store, games, music, beauty, email, weather, social apps and more: Netflix support"
            ],
            image: "https://m.media-amazon.com/images/I/71g7DbH5lBL._AC_SX679_.jpg",
            colors: [
                "grey",
                "black"
            ],
            brand: "MEBERRY",
            stock: 20
        },
        // {
        //     id: 6,
        //     category: "Computers and Hardwares",
        //     subCategory: "Tablets",
        //     name: "Seagate Portable 2TB External Hard Drive Portable HDD – USB 3.0 for PC, Mac, PS4, & Xbox - 1-Year Rescue Service (STGX2000400)",
        //     rating: 5,
        //     price: 10950,
        //     discount: 8,
        //     shortDescription: "This USB drive provides plug and play simplicity with the included 18 inch USB 3.0 cable",
        //     longDescription: [
        //         "Easily store and access 2TB to content on the go with the Seagate Portable Drive, a USB external hard drive",
        //         "Designed to work with Windows or Mac computers, this external hard drive makes backup a snap just drag and drop",
        //         "To get set up, connect the portable hard drive to a computer for automatic recognition no software required"
        //     ],
        //     image: "https://m.media-amazon.com/images/I/81tjLksKixL._AC_SY450_.jpg",
        //     colors: [
        //         "gold",
        //         "black"
        //     ],
        //     brand: "Seagate",
        //     stock: 20
        // },
        // {
        //     id: 7,
        //     category: "Computers and Hardwares",
        //     subCategory: "Laptops",
        //     name: "Lenovo Legion 5 15 Gaming Laptop, 15.6 FHD (1920 x 1080) Display, AMD Ryzen 7 5800H Processor, 16GB DDR4 RAM, 512GB NVMe SSD, NVIDIA GeForce RTX 3050Ti, Windows 10H, 82JW0012US, Phantom Blue",
        //     rating: 4,
        //     price: 46650,
        //     discount: 2,
        //     shortDescription: "The 15.6 FHD (1920 x 1080) IPS display on the Legion 5 gaming laptop delivers speed and color clarity for full-fidelity gaming",
        //     longDescription: [
        //         "Escalate your game with up to 8 high-performance cores in the AMD Ryzen 7 5800H processor, 16GB DDR4 RAM, and 512GB NVMe SSD storage",
        //         "With NVIDIA GeForce RTX 3050 Ti graphics behind you, you can enjoy the depth and visual fidelity of real-time ray-tracing – RTX Gaming, It's On",
        //         "Legion TrueStrike keyboard with 4-zone RGB backlight; 2 x 2W speakers with Nahimic Audio for Gamers"
        //     ],
        //     image: "https://m.media-amazon.com/images/I/71fzx0pGY5L._AC_SY355_.jpg",
        //     colors: [
        //         "black"
        //     ],
        //     brand: "Lenovo",
        //     stock: 20
        // },
        // {
        //     id: 8,
        //     category: "Computers and Hardwares",
        //     subCategory: "Printers",
        //     name: "Canon TR8620 All-In-One Printer For Home Office | Copier |Scanner| Fax |Auto Document Feeder | Photo and Document Printing | Airprint (R) and Android Printing, Black",
        //     rating: 3,
        //     price: 14527,
        //     discount: 5,
        //     shortDescription: "Print from your favorite mobile devices using theCanon PRINT app[7], Apple AirPrint(R)[8], and Mopria(R)[9].",
        //     longDescription: [
        //         "Easy Setup for smartphone and computer so you can get to work faster.",
        //         'Intuitive control with an effortless user interface & 4.3" LCD touchscreen.',
        //         "Fax, copy and scan multi-page documents fast and easy with the 20 Sheet Auto Document Feeder (ADF)."
        //     ],
        //     image: "https://m.media-amazon.com/images/I/81u9Oh1hgPL._AC_SX355_.jpg",
        //     colors: [
        //         "black"
        //     ],
        //     brand: "Canon",
        //     stock: 20
        // },
        // {
        //     id: 9,
        //     category: "Men Fashion",
        //     subCategory: "Clothing",
        //     name: "Champion Men's Jersey Jogger",
        //     rating: 4,
        //     price: 2190,
        //     discount: 2,
        //     shortDescription: "Comfortable athletic fit with handy side pockets",
        //     longDescription: [
        //         "100% Cotton",
        //         'Imported',
        //         "Drawstring closure",
        //         "Machine Wash"
        //     ],
        //     image: "https://m.media-amazon.com/images/I/71AcCbKg3IL._AC_UY500_.jpg",
        //     colors: [
        //         "black"
        //     ],
        //     sizes: [
        //         "Small",
        //         "Medium",
        //         "Large",
        //         "X-Large"
        //     ],
        //     brand: "Champion",
        //     stock: 20
        // },
        // {
        //     id: 10,
        //     category: "Men Fashion",
        //     subCategory: "Clothing",
        //     name: "Under Armour Men's Tech Golf Polo",
        //     rating: 4,
        //     price: 2920,
        //     discount: 2,
        //     shortDescription: "Where we started? It all started with an idea to build a superior T-shirt",
        //     longDescription: [
        //         "100% Polyester",
        //         'Imported',
        //         "Textured fabric that's soft, light & breathable",
        //         "Material wicks sweat & dries really fast"
        //     ],
        //     image: "https://m.media-amazon.com/images/I/51Y6BRq8r0L._AC_SX522_.jpg",
        //     colors: [
        //         "black",
        //         "blue",
        //         "green",
        //         "graphite",
        //         "white"
        //     ],
        //     sizes: [
        //         "Small",
        //         "Medium",
        //         "Large",
        //         "X-Large",
        //         "XX-Large"
        //     ],
        //     brand: "Champion",
        //     stock: 20
        // },
        // {
        //     id: 11,
        //     category: "Men Fashion",
        //     subCategory: "Shoes",
        //     name: "Adidas Men's CF Lite Racer Byd",
        //     rating: 5,
        //     price: 5475,
        //     discount: 1,
        //     shortDescription: "Two tone stretch mesh upper with sock like construction",
        //     longDescription: [
        //         "100% Other fibers",
        //         'Imported',
        //         "Synthetic sole",
        //         "Shaft measures approximately 6-12 inches from arch"
        //     ],
        //     image: "https://m.media-amazon.com/images/I/81YzhFF9siL._AC_UX500_.jpg",
        //     colors: [
        //         "black",
        //         "graphite",
        //         "grey"
        //     ],
        //     sizes: [
        //         6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12
        //     ],
        //     brand: "Adidas",
        //     stock: 20
        // },
        // {
        //     id: 12,
        //     category: "Men Fashion",
        //     subCategory: "Watches",
        //     name: "Fossil Gen 5 Carlyle Stainless Steel Touchscreen Smartwatch with Speaker, Heart Rate, GPS, Contactless Payments, and Smartphone Notifications",
        //     rating: 5,
        //     price: 12775,
        //     discount: 3,
        //     shortDescription: "Qualcomm Snapdragon Wear 3100 platform helps deliver high performance",
        //     longDescription: [
        //         "This smart watch has always on display with thousands of watch faces to personalize your look and always see the time.",
        //         '24 Hr plus multi day extended mode Varies based on usage and after updates install.',
        //         "Heart Rate & Activity Tracking using Google Fit; Built-in GPS for distance tracking; Swimproof design 3ATM",
        //         "Stay connected with notifications for calls, texts, apps and automatic time, time zone and calendar syncing."
        //     ],
        //     image: "https://m.media-amazon.com/images/I/71XWG48C-NL._AC_UX679_.jpg",
        //     colors: [
        //         "black",
        //         "brown",
        //         "grey"
        //     ],
        //     brand: "Fossil",
        //     stock: 20
        // },
        // {
        //     id: 13,
        //     category: "Women Fashion",
        //     subCategory: "Clothing",
        //     name: "Chandrakala's Women's Cotton Silk Blend Indian Ethnic Banarasi Saree with unstitched Blousepiece(1105)",
        //     rating: 4,
        //     price: 4015,
        //     discount: 2,
        //     shortDescription: "Perfect for: Wedding,Party Wear,Festival,Bridal | Best Gift For Your Loved Ones",
        //     longDescription: [
        //         "Machine Wash",
        //         'Saree Fabric: Cotton Silk Blend | Blouse Fabric: Cotton Silk Blend',
        //         "Wash Care:First Wash Dry Clean recommended thereafter Machine Wash(Fast Colours)|Do not Bleach.",
        //         "There might be slight variation in the colour or design of the product due to regular manufacturing process."
        //     ],
        //     image: "https://m.media-amazon.com/images/I/71uVRKOWLGL._AC_UY500_.jpg",
        //     colors: [
        //         "black",
        //         "beige",
        //         "gold",
        //         "pink",
        //         "orange",
        //         "purple",
        //         "red"
        //     ],
        //     brand: "Chandrakala",
        //     stock: 20
        // },
        // {
        //     id: 14,
        //     category: "Women Fashion",
        //     subCategory: "Clothing",
        //     name: "Lehenga Choli Digital Print Lengha Skirt Women's Ethnic Wedding Party Wear",
        //     rating: 4,
        //     price: 6205,
        //     discount: 2,
        //     shortDescription: "Occasion:- Ceremony,Wedding Occasions,Party, Festival,Family Functions",
        //     longDescription: [
        //         "Dhupian",
        //         'Self Tie closure',
        //         "Dry Clean Only",
        //         "Top (Choli) is unstitched . Choli can be stitched upto 42 inches bust"
        //     ],
        //     image: "https://m.media-amazon.com/images/I/71xqUHOaA0L._AC_UY500_.jpg",
        //     colors: [
        //         "black"
        //     ],
        //     brand: "Mad Over Shopping",
        //     stock: 20
        // },
        // {
        //     id: 15,
        //     category: "Women Fashion",
        //     subCategory: "Handbags",
        //     name: "Fossil Women's Ryder Leather Satchel Purse Handbag",
        //     rating: 5,
        //     price: 18104,
        //     discount: 5,
        //     shortDescription: "Meet the Ryder Satchel — the everyday, everywhere essential with extra appeal.",
        //     longDescription: [
        //         "100% Leather",
        //         'Imported',
        //         'Measurements: 12"L x 6"W x 10"H; 1 Adjustable & Detachable Shoulder Strap, 2 5.5" Handles'
        //     ],
        //     image: "https://m.media-amazon.com/images/I/81AXxYRLjQL._AC_UY500_.jpg",
        //     colors: [
        //         "black",
        //         "brown"
        //     ],
        //     brand: "Fossil",
        //     stock: 20
        // },
        // {
        //     id: 16,
        //     category: "Women Fashion",
        //     subCategory: "Watches",
        //     name: "SAMSUNG Galaxy Watch 4 44mm Smartwatch with ECG Monitor Tracker for Health Fitness Running Sleep Cycles GPS Fall Detection Bluetooth US Version, Green",
        //     rating: 5,
        //     price: 20440,
        //     discount: 2,
        //     shortDescription: "Get ready to crush your wellness goals with body readings right on your wrist.",
        //     longDescription: [
        //         "Better Sleep Starts Here: Wake up feeling refreshed and recharged with advanced sleep tracking",
        //         'Make Every Workout Count: Get the most out of every exercise session with advanced workout tracking that recognizes 6 popular activities',
        //         'Go the Extra Mile: Improve your runs with advanced running coaching technology'
        //     ],
        //     image: "https://m.media-amazon.com/images/I/61T0N58UJiS._AC_SX679_.jpg",
        //     colors: [
        //         "black",
        //         "gold",
        //         "silver",
        //         "green"
        //     ],
        //     brand: "Samsung",
        //     stock: 20
        // },
        // {
        //     id: 17,
        //     category: "Kid Fashion",
        //     subCategory: "Clothing",
        //     name: "The Children's Place boys Short Sleeve Pique Polo",
        //     rating: 3,
        //     price: 1825,
        //     discount: 1,
        //     shortDescription: "Styled with a half-button placket, flat-knit collar, short sleeves and side vents at hem",
        //     longDescription: [
        //         "Imported",
        //         'Pull On closure',
        //         'Machine Wash',
        //         'Stock up on daily essentials with this pack of ten tops; perfect for throwing on with jeans or shorts'
        //     ],
        //     image: "https://m.media-amazon.com/images/I/81wFJrOOfxS._AC_UX466_.jpg",
        //     colors: [
        //         "black",
        //         "grey",
        //         "white",
        //         "blue"
        //     ],
        //     sizes: [
        //         "2-4Y", "4-5Y", "6-8Y", "8-10Y", "10-12Y"
        //     ],
        //     brand: "The Children's Place",
        //     stock: 20
        // },
        // {
        //     id: 18,
        //     category: "Kid Fashion",
        //     subCategory: "Clothing",
        //     name: "MdnMd Toddler Girls Ballet Dance Leotards with Skirt Ballerina Outfit Dress Short Sleeve",
        //     rating: 5,
        //     price: 1387,
        //     discount: 1,
        //     shortDescription: "Ballerina ballet dress outfit selected high quality cotton fabric has a superior stretch and recovery",
        //     longDescription: [
        //         "Material: 92% Cotton, 8% Spandex, Skirt: 100% Polyester",
        //         'MdnMd classic short sleeve ballet leotard with glass yarn skirt for toddler girls',
        //         'With a cute bow on the waist, Scoop neckline front and back, perfect fit',
        //         'Exclusively designed leotards for dance ballet, class, gymnastic, stage perform, party and daily wear'
        //     ],
        //     image: "https://m.media-amazon.com/images/I/61vl4-RPZdL._AC_UY500_.jpg",
        //     colors: [
        //         "black",
        //         "pink",
        //         "purple",
        //         "blue"
        //     ],
        //     sizes: [
        //         "2-4Y", "4-5Y", "6-8Y", "8-10Y", "10-12Y"
        //     ],
        //     brand: "MdnMd",
        //     stock: 20
        // },
        // {
        //     id: 19,
        //     category: "Kid Fashion",
        //     subCategory: "Shoes",
        //     name: "Crocs Kid's Classic Tie Dye Clog",
        //     rating: 4,
        //     price: 5110,
        //     discount: 2,
        //     shortDescription: "Heel measures approximately 0.33",
        //     longDescription: [
        //         "100% Croslite",
        //         'Imported',
        //         'Ethylene Vinyl Acetate sole',
        //         'Heel measures approximately 0.33"'
        //     ],
        //     image: "https://m.media-amazon.com/images/I/71PiCN2b-ZL._AC_UX500_.jpg",
        //     colors: [
        //         "black",
        //         "pink",
        //         "purple",
        //         "blue"
        //     ],
        //     sizes: [
        //         "2-4Y", "4-5Y", "6-8Y", "8-10Y", "10-12Y"
        //     ],
        //     brand: "MdnMd",
        //     stock: 20
        // },
        // {
        //     id: 20,
        //     category: "Kid Fashion",
        //     subCategory: "Shoes",
        //     name: "Nike Kyrie Flytrap Iii (ps) Causal Basketball Fashion Shoes Little Kids Bq5621-007 Size",
        //     rating: 5,
        //     price: 7300,
        //     discount: 5,
        //     shortDescription: "Traditional tongue connects to footbed to help keep it from slipping during play",
        //     longDescription: [
        //         "Rubber sole",
        //         'Swoosh designs are embroidered into the collar, including thick stitching that resembles the seam lines on a basketball',
        //         'Internal heel counter provides stability and a locked-in feel',
        //         'Embossed “11” on the heel'
        //     ],
        //     image: "https://m.media-amazon.com/images/I/71tH3BnzREL._AC_UX500_.jpg",
        //     colors: [
        //         "black",
        //         "grey",
        //         "red",
        //         "white"
        //     ],
        //     sizes: [
        //         "1 Little Kid", "1.5 Little Kid", "2 Little Kid", "3 Little Kid", "11 Little Kid", "12 Little Kid"
        //     ],
        //     brand: "Nike",
        //     stock: 20
        // },
    ]
}

export default data;