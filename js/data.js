if (!localStorage.getItem('rooms')) {
    const initialRooms = [
        {
            id: 1,
            name: "Standard Suite",
            description: "Уютный номер для двоих с современным интерьером и всем необходимым для комфортного отдыха.",
            price_per_night: 15000,
            capacity: 2,
            amenities: ["Wi-Fi", "Кондиционер", "Телевизор"],
            images: ["https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800"]
        },
        {
            id: 2,
            name: "Business Lux",
            description: "Просторный номер с рабочей зоной и панорамным видом на город. Идеально для деловых поездок.",
            price_per_night: 35000,
            capacity: 3,
            amenities: ["Wi-Fi", "Рабочий стол", "Завтрак"],
            images: ["https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800"]
        },
        {
            id: 3,
            name: "Royal Presidential",
            description: "Вершина роскоши. Огромная площадь, персональный сервис и эксклюзивный дизайн.",
            price_per_night: 85000,
            capacity: 4,
            amenities: ["Wi-Fi", "Джакузи", "Терраса"],
            images: ["https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800"]
        }
    ];
    localStorage.setItem('rooms', JSON.stringify(initialRooms));
}

if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify([{id: 1, email: "admin@mail.ru", password: "admin", name: "Admin", role: "admin"}]));
}

function getRooms() { return JSON.parse(localStorage.getItem('rooms')) || []; }
function getBookings() { return JSON.parse(localStorage.getItem('bookings')) || []; }