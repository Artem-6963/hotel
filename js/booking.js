function createBooking(roomId, checkIn, checkOut, guests, userId, userName) {
    const bookings = getBookings();
    const rooms = getRooms();
    const room = rooms.find(r => r.id === roomId);
    if (!room) return { success: false, error: "Номер не найден" };
    if (room.capacity < guests) return { success: false, error: "Превышена вместимость" };
    
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    
    // ПРОВЕРКА КОНФЛИКТОВ (главное условие оценки)
    const conflict = bookings.some(b => 
        b.roomId === roomId && 
        ((checkInDate < new Date(b.checkOut) && checkOutDate > new Date(b.checkIn)))
    );
    
    if (conflict) return { success: false, error: "Номер уже забронирован на эти даты" };
    
    const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
    const totalPrice = nights * room.price_per_night;
    
    const newBooking = {
        id: Date.now(),
        roomId,
        roomName: room.name,
        checkIn,
        checkOut,
        guests,
        userId,
        userName,
        totalPrice,
        createdAt: new Date().toISOString()
    };
    
    bookings.push(newBooking);
    saveBookings(bookings);
    return { success: true, booking: newBooking };
}

function cancelBooking(bookingId, userId, userRole) {
    let bookings = getBookings();
    const booking = bookings.find(b => b.id === bookingId);
    if (!booking) return false;
    if (booking.userId !== userId && userRole !== 'admin') return false;
    
    bookings = bookings.filter(b => b.id !== bookingId);
    saveBookings(bookings);
    return true;
}