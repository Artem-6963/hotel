document.addEventListener('DOMContentLoaded', () => {
    // Поиск на главной
    const searchBtn = document.getElementById('searchBtn');
    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            const checkIn = document.getElementById('checkIn').value;
            const checkOut = document.getElementById('checkOut').value;
            const guests = document.getElementById('guests').value;
            if (!checkIn || !checkOut) {
                alert("Выберите даты заезда и выезда");
                return;
            }
            localStorage.setItem('searchParams', JSON.stringify({ checkIn, checkOut, guests }));
            window.location.href = 'catalog.html';
        });
        
        // Установка минимальной даты (сегодня)
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('checkIn').min = today;
        document.getElementById('checkOut').min = today;
    }
    
    // Отображение популярных на главной
    const popularDiv = document.getElementById('popularRooms');
    if (popularDiv) {
        const rooms = getRooms();
        popularDiv.innerHTML = rooms.slice(0, 3).map(room => `
            <div class="room-card">
                <img src="${room.images[0]}" class="room-img" onerror="this.src='https://via.placeholder.com/400x220?text=Фото+номера'">
                <div class="room-info">
                    <h3 class="room-title">${room.name}</h3>
                    <p>${room.description.substring(0, 80)}...</p>
                    <div class="room-price">${room.price_per_night} ₽ / ночь</div>
                    <div class="amenities">${room.amenities.map(a => `<span class="amenity">${a}</span>`).join('')}</div>
                    <a href="room.html?id=${room.id}" class="btn" style="display:inline-block;margin-top:15px;">Подробнее</a>
                </div>
            </div>
        `).join('');
    }
});