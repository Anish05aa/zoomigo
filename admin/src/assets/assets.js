// import appointment_img from './appointment_img.png'
// import about_image from './about_image.png'
// import arrow_icon from './arrow_icon.svg'
// import chats_icon from './chats_icon.svg'
import add_icon from './add_icon.svg'
import booking_icon from './appointment_icon.svg'
import contact_image from './contact_image.png'
import cross_icon from './cross_icon.png'
import dropdown_icon from './dropdown_icon.svg'
import group_profiles from './group_profiles.png'
import header_img from './header_img.png'
import home_icon from './home_icon.svg'
import info_icon from './info_icon.svg'
import logo from './logo.png'
import menu_icon from './menu_icon.svg'
import users_icon from './people_icon.svg'
import profile_pic from './profile_pic.png'
import razorpay_logo from './razorpay_logo.png'
import stripe_logo from './stripe_logo.png'
import upload_icon from './upload_icon.png'
import verified_icon from './verified_icon.svg'


/////////////////////////////////////
import veh9 from './HondaActiva.png'
import veh2 from './HondaCivic.png'
import veh7 from './HyundaiCreta.png'
import veh8 from './KtmDuke.png'
import veh10 from './MahindraThar.png'
import veh15 from './MercedesSprinter.png'
import veh4 from './Pulsar.png'
import veh3 from './RoyalEnfield.png'
import veh11 from './SuzukiEeco.png'
import veh13 from './Tesla.png'
import veh1 from './ToyotaCorolla.png'
import veh6 from './ToyotaFortuner.png'
import veh5 from './TvsJupiter.png'
import veh14 from './VolkswagenPolo.png'
import veh12 from './YamahaR15.png'
import Bikes from './bike.png'
import Cars from './car.jpg'
import car1 from './car1.png'
import car_top from './car_top.png'
// import clock from './clock.png'
// import homepage_video from './homepage_video.mp4'
import img1 from './img1.png'
import img10 from './img10.png'
import img2 from './img2.png'
import img3 from './img3.png'
import img4 from './img4.png'
import img5 from './img5.png'
import img6 from './img6.png'
import img7 from './img7.png'
import img8 from './img8.png'
import img9 from './img9.png'
import pointing_man from './man-pointing.png'
import payment from './payment.png'
import Scooters from './scooter.jpg'
import SportsBikes from './sportsbike.png'
import SUVs from './suv.png'
import tree from './tree.png'
import Vans from './van.png'
import woman from './woman.png'




export const assets = {
    // appointment_img,
    header_img,
    group_profiles,
    logo,
    add_icon,
    booking_icon,
    // chats_icon,
    verified_icon,
    info_icon,
    profile_pic,
    users_icon,
    // arrow_icon,
    contact_image,
    // about_image,
    menu_icon,
    cross_icon,
    dropdown_icon,
    upload_icon,
    home_icon,
    users_icon,
    stripe_logo,
    razorpay_logo,
    ////////////////////
    car_top,
    car1,
    img1,
    img2,
    img3,
    img4,
    img5,
    img6,
    img7,
    img8,
    img9,
    img10,
    pointing_man,
    // homepage_video,
    woman
}


export const premiumServices = [
    // {
    //     image: clock,
    //     title: "Available 24/7",
    //     description: "Round-the-clock vehicle access with instant booking confirmation and emergency roadside assistance"
    // },
    {
        image: tree,
        title: "Eco-Friendly",
        description: "Low-emission hybrid and electric vehicles to reduce your environmental impact"
    },
    {
        image: car1,
        title: "Well-Maintained Fleet",
        description: "Regularly serviced vehicles with comprehensive safety checks before every rental"
    },
    {
        image: payment,
        title: "Secure Payment",
        description: "Encrypted transactions with multiple payment options and fraud protection"
    }
]




export const typeData = [
    {
        type: 'Car',
        image: Cars
    },
    {
        type: 'Bike',
        image: Bikes
    },
    {
        type: 'Suv',
        image: SUVs
    },
    {
        type: 'Scooter',
        image: Scooters
    },
    {
        type: 'Sports Bike',
        image: SportsBikes
    },
    {
        type: 'Van',
        image: Vans
    }
];

export const vehicles = [
    {
        _id: "veh1",
        name: "Toyota Corolla",
        image: veh1,
        type: "Car",
        stars: 4,
        seats: 5,
        gear: "Automatic",
        fuel: "Petrol",
        fees: 500,
        about: "The Toyota Corolla is a legendary sedan renowned for its reliability and fuel efficiency. With a comfortable ride, low maintenance costs, and advanced safety features, it's the perfect choice for both families and daily commuters."
    },
    {
        _id: "veh2",
        name: "Honda Civic",
        image: veh2,
        type: "Car",
        stars: 3,
        seats: 5,
        gear: "Automatic",
        fuel: "Petrol",
        fees: 700,
        about: "The Honda Civic blends sporty aesthetics with cutting-edge technology. Its responsive handling, premium interior, and fuel-efficient engine make it a standout in the compact sedan segment."
    },
    {
        _id: "veh3",
        name: "Royal Enfield Classic 350",
        image: veh3,
        type: "Bike",
        stars: 4,
        seats: 2,
        gear: "Manual",
        fuel: "Petrol",
        fees: 900,
        about: "A timeless icon, the Royal Enfield Classic 350 delivers a thumping engine note and retro charm. Its relaxed ergonomics and sturdy build make it ideal for leisurely rides and long journeys."
    },
    {
        _id: "veh4",
        name: "Bajaj Pulsar NS200",
        image: veh4,
        type: "Sports bike",
        stars: 4,
        seats: 2,
        gear: "Manual",
        fuel: "Petrol",
        fees: 400,
        about: "The Pulsar NS200 is a performance beast with a liquid-cooled engine and aggressive styling. Designed for thrill-seekers, it offers sharp handling and explosive acceleration."
    },
    {
        _id: "veh5",
        name: "TVS Jupiter",
        image: veh5,
        type: "Scooter",
        stars: 4,
        seats: 2,
        gear: "Automatic",
        fuel: "Petrol",
        fees: 300,
        about: "Practical and stylish, the TVS Jupiter excels in urban commutes with its excellent mileage, spacious storage, and hassle-free automatic transmission."
    },
    {
        _id: "veh6",
        name: "Toyota Fortuner",
        image: veh6,
        type: "Suv",
        stars: 4,
        seats: 7,
        gear: "Automatic",
        fuel: "Diesel",
        fees: 1000,
        about: "The Fortuner is a rugged yet luxurious SUV that dominates both city roads and off-road trails. With its powerful engine and premium cabin, it’s built for adventure and comfort."
    },
    {
        _id: "veh7",
        name: "Hyundai Creta",
        image: veh7,
        type: "Suv",
        stars: 3,
        seats: 5,
        gear: "Automatic",
        fuel: "Petrol",
        fees: 900,
        about: "The Hyundai Creta combines bold design with futuristic features. Its plush interiors, smooth ride, and advanced tech make it a top-tier compact SUV."
    },
    {
        _id: "veh8",
        name: "KTM Duke 390",
        image: veh8,
        type: "Sports bike",
        stars: 4,
        seats: 2,
        gear: "Manual",
        fuel: "Petrol",
        fees: 700,
        about: "The Duke 390 is a streetfighter with a lightweight chassis and explosive power. Designed for aggressive riding, it’s a favorite among performance enthusiasts."
    },
    {
        _id: "veh9",
        name: "Honda Activa 6G",
        image: veh9,
        type: "Scooter",
        stars: 3,
        seats: 2,
        gear: "Automatic",
        fuel: "Petrol",
        fees: 400,
        about: "India's best-selling scooter, the Activa 6G offers unmatched reliability, smooth acceleration, and a comfortable ride for daily commutes."
    },
    {
        _id: "veh10",
        name: "Mahindra Thar",
        image: veh10,
        type: "Suv",
        stars: 4,
        seats: 4,
        gear: "Manual",
        fuel: "Diesel",
        fees: 1100,
        about: "The Thar is a rugged off-roader with retro-modern styling. Its go-anywhere capability and open-top design make it a symbol of adventure."
    },
    {
        _id: "veh11",
        name: "Maruti Suzuki Eeco",
        image: veh11,
        type: "Van",
        stars: 3,
        seats: 7,
        gear: "Manual",
        fuel: "CNG",
        fees: 300,
        about: "A budget-friendly people-carrier, the Eeco offers unmatched practicality with its spacious cabin and ultra-low running costs."
    },
    {
        _id: "veh12",
        name: "Yamaha R15 V4",
        image: veh12,
        type: "Sports bike",
        stars: 4,
        seats: 2,
        gear: "Manual",
        fuel: "Petrol",
        fees: 500,
        about: "The R15 V4 is a track-inspired bike with a high-revving engine and aerodynamic design. Perfect for riders craving sporty performance."
    },
    {
        _id: "veh13",
        name: "Tesla Model S",
        image: veh13,
        type: "Car",
        stars: 4,
        seats: 5,
        gear: "Automatic",
        fuel: "Electric",
        fees: 1000,
        about: "A marvel of electric innovation, the Model S offers blistering acceleration, futuristic tech, and a luxurious zero-emission driving experience."
    },
    {
        _id: "veh14",
        name: "Volkswagen Polo",
        image: veh14,
        type: "Car",
        stars: 3,
        seats: 5,
        gear: "Manual",
        fuel: "Petrol",
        fees: 700,
        about: "The Polo is a German-engineered hatchback known for its solid build quality, fun-to-drive dynamics, and premium feel."
    },
    {
        _id: "veh15",
        name: "Mercedes-Benz Sprinter",
        image: veh15,
        type: "Van",
        stars: 4,
        seats: 12,
        gear: "Automatic",
        fuel: "Diesel",
        fees: 1200,
        about: "The Sprinter redefines luxury in the van segment with its spacious interior, advanced safety systems, and refined diesel engine."
    }
];

