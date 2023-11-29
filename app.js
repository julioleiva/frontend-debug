document.getElementById('reserveButton').addEventListener('click', function() {
    const ticketCount = parseInt(document.getElementById('ticketCount').value, 10);
    if (_.isInteger(ticketCount) && ticketCount > 0) {
        alert(`Has reservado ${ticketCount} tickets.`);
    } else {
        alert('Por favor, ingresa un número válido de tickets.');
    }
});
