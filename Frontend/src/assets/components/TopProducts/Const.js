import CLT1 from "./Images/Clothes/1.png";
import CLT2 from "./Images/Clothes/2.png";
import CLT3 from "./Images/Clothes/3.png";
import CLT4 from "./Images/Clothes/4.png";
import CLT5 from "./Images/Clothes/5.png";
import CLT6 from "./Images/Clothes/6.png";
import CLT7 from "./Images/Clothes/7.png";
import CLT8 from "./Images/Clothes/8.png";
import CLT9 from "./Images/Clothes/9.png";
import CLT10 from "./Images/Clothes/10.png";
import CLT11 from "./Images/Clothes/11.png";
import CLT12 from "./Images/Clothes/12.png";
import SUPP1 from "./Images/Supplements/1.png";
import SUPP2 from "./Images/Supplements/2.png";
import SUPP3 from "./Images/Supplements/3.png";
import SUPP4 from "./Images/Supplements/4.png";
import SUPP5 from "./Images/Supplements/5.png";
import SUPP6 from "./Images/Supplements/6.png";
import SUPP7 from "./Images/Supplements/7.png";
import SUPP8 from "./Images/Supplements/8.png";
import SUPP9 from "./Images/Supplements/9.png";
import SUPP10 from "./Images/Supplements/10.png";
import SUPP11 from "./Images/Supplements/11.png";
import SUPP12 from "./Images/Supplements/12.png";
import Wei1 from "./Images/Weights/1.png";
import Wei2 from "./Images/Weights/2.png";
import Wei3 from "./Images/Weights/3.png";
import Wei4 from "./Images/Weights/4.png";
import Wei5 from "./Images/Weights/5.png";
import Wei6 from "./Images/Weights/6.png";
import Wei7 from "./Images/Weights/7.png";
import Wei8 from "./Images/Weights/8.png";
import Wei9 from "./Images/Weights/9.png";
import Wei10 from "./Images/Weights/10.png";
import Wei11 from "./Images/Weights/11.png";
import Wei12 from "./Images/Weights/12.png";




const Clothes = [
    { id: 1, img: CLT1, title: "Compression spider shirt men", price:200 , description: "This black compression shirt for men features a sleek spider design, providing both style and performance. Made from high-quality materials, it offers excellent support and flexibility for any workout." },
    { id: 2, img: CLT2, title: "Workout short women", price:150 , description: "These workout shorts for women are designed for maximum comfort and mobility. They are made from breathable fabric that keeps you cool and dry during intense exercise sessions." },
    { id: 3, img: CLT3, title: "Compression shirt white man", price:300 , description: "A white compression shirt for men that combines functionality and comfort. It enhances blood flow and supports muscles, making it ideal for high-intensity workouts and recovery." },
    { id: 4, img: CLT4, title: "Compression shirt women", price:400 , description: "This black compression shirt for women offers a snug fit that supports muscles and reduces fatigue. It's perfect for both training and competition, providing durability and comfort." },
    { id: 5, img: CLT5, title: "Compression shirt black man", price:340 , description: "A versatile black compression shirt for men, designed to improve athletic performance. It features moisture-wicking fabric that keeps you dry and comfortable throughout your workout." },
    { id: 6, img: CLT6, title: "Workout short man", price:320 , description: "Men's workout shorts that are built for endurance and agility. They feature a lightweight design with an elastic waistband for a secure fit, ideal for running, gym sessions, and sports." },
    { id: 7, img: CLT7, title: "Workout short man", price:110 , description: "These men's workout shorts offer both style and functionality. Made from durable materials, they ensure long-lasting performance and comfort during any physical activity." },
    { id: 8, img: CLT8, title: "Full zip jacket women", price:200 , description: "A full zip jacket for women that provides warmth and versatility. It's perfect for outdoor workouts or casual wear, featuring a modern design and breathable fabric." },
    { id: 9, img: CLT9, title: "Workout berserk short man", price:230 , description: "Berserk-themed workout shorts for men, designed to inspire intensity and focus. They offer a comfortable fit and are made from quick-drying fabric to keep you cool." },
    { id: 10, img: CLT10, title: "Workout berserk short man", price:270 , description: "Men's workout shorts with a bold berserk design, crafted for high performance. These shorts are lightweight and breathable, ensuring maximum comfort during exercise." },
    { id: 11, img: CLT11, title: "Workout snake short man", price:300 , description: "Snake-themed workout shorts for men, combining style and practicality. They feature a unique design and are made from stretchable fabric for unrestricted movement." },
    { id: 12, img: CLT12, title: "Compression shirt white man", price:380 , description: "A white compression shirt for men, ideal for enhancing workout performance. It offers muscle support, reduces soreness, and is made from breathable, moisture-wicking material." },
];

const Supplements = [
    { id: 1, img: SUPP1, title: "Test booster", price:200 , description: "Enhance your performance with this powerful test booster. It helps increase testosterone levels, improve muscle mass, and boost overall strength." },
    { id: 2, img: SUPP2, title: "Biotin", price:120 , description: "Biotin supports healthy hair, skin, and nails. This supplement is essential for metabolic functions and promotes overall wellness." },
    { id: 3, img: SUPP3, title: "Nitro tech", price:300 , description: "Nitro Tech is a high-quality protein supplement that aids in muscle growth and recovery. It provides essential nutrients to support your workout regime." },
    { id: 4, img: SUPP4, title: "Vitamin D3", price:200 , description: "Vitamin D3 is crucial for bone health and immune function. This supplement helps maintain healthy levels of calcium and phosphorus in the body." },
    { id: 5, img: SUPP5, title: "Rhino", price:170 , description: "Rhino is a powerful pre-workout supplement that boosts energy and endurance. It helps you power through intense workouts with ease." },
    { id: 6, img: SUPP6, title: "Magnesium", price:300 , description: "Magnesium supports muscle and nerve function, as well as energy production. This supplement is vital for maintaining overall health and well-being." },
    { id: 7, img: SUPP7, title: "Creatine", price:120 , description: "Creatine enhances muscle strength, power, and size. It's a staple for athletes looking to improve their performance and gain muscle mass." },
    { id: 8, img: SUPP8, title: "Preworkout", price:200 , description: "This pre-workout supplement increases energy, focus, and endurance. It's designed to help you maximize your workout potential." },
    { id: 9, img: SUPP9, title: "Zinc", price:120 , description: "Zinc is essential for immune function, protein synthesis, and DNA production. This supplement supports overall health and recovery." },
    { id: 10, img: SUPP10, title: "C4", price:300 , description: "C4 is a popular pre-workout supplement known for its explosive energy and performance benefits. It helps you push through your most challenging workouts." },
    { id: 11, img: SUPP11, title: "BCAA", price:200 , description: "BCAAs (Branched-Chain Amino Acids) support muscle recovery and growth. They help reduce muscle soreness and improve exercise performance." },
    { id: 12, img: SUPP12, title: "Preworkout", price:200 , description: "This pre-workout supplement boosts energy, enhances focus, and increases endurance, helping you achieve your fitness goals." },
];

const Weights = [
    { id: 1, img: Wei1, title: "Jumping rope", price:200 , description: "This jumping rope is perfect for cardio workouts and improving agility. It's lightweight and durable, making it ideal for both beginners and advanced users." },
    { id: 2, img: Wei2, title: "AB wheel", price:110 , description: "The AB wheel is an effective tool for strengthening your core muscles. It helps improve balance, stability, and overall abdominal strength." },
    { id: 3, img: Wei3, title: "Water bottle", price:120 , description: "Stay hydrated during your workouts with this convenient water bottle. It's leak-proof, BPA-free, and designed for easy carrying." },
    { id: 4, img: Wei4, title: "Adjustable dumbbells", price:250 , description: "Adjustable dumbbells allow you to customize your workout intensity. They are space-saving and versatile, offering a wide range of weight options." },
    { id: 5, img: Wei5, title: "Adjustable weights", price:230 , description: "These adjustable weights are perfect for strength training exercises. They offer versatility and convenience, allowing you to adjust the resistance according to your fitness level." },
    { id: 6, img: Wei6, title: "Dumbbell", price:300 , description: "A single dumbbell for various strength training exercises. It's made from durable materials and features a comfortable grip for effective workouts." },
    { id: 7, img: Wei7, title: "Boxing gloves", price:200 , description: "Protect your hands during boxing or martial arts training with these high-quality boxing gloves. They offer excellent padding and wrist support for maximum comfort and safety." },
    { id: 8, img: Wei8, title: "AB wheel", price:190 , description: "The AB wheel is an effective tool for strengthening your core muscles. It helps improve balance, stability, and overall abdominal strength." },
    { id: 9, img: Wei9, title: "Workout ball", price:180 , description: "This workout ball is perfect for core strengthening and stability exercises. It's made from anti-burst material and can support up to 2000 pounds of weight." },
    { id: 10, img: Wei10, title: "Yoga mat", price:300 , description: "A high-quality yoga mat for comfortable and safe yoga practice. It provides cushioning and traction, helping you maintain stability and focus during your workouts." },
    { id: 11, img: Wei11, title: "Dumbbell", price:200 , description: "A versatile dumbbell for strength training exercises. Its compact design makes it easy to store and transport, perfect for home workouts." },
    { id: 12, img: Wei12, title: "Forearm grips", price:200 , description: "Strengthen your grip and forearm muscles with these forearm grips. They are adjustable and ergonomic, providing a comfortable and effective workout experience." },
];

export { Clothes, Supplements, Weights };


