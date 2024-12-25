// На сторінці index.html знаходяться поля зазначені коментарем Task2
// При введені імені користувача в поле #userNameInput та натиску на кнопку
// #getUserButton потрібно зробити запит Fetch за посиланням - https://jsonplaceholder.typicode.com/users
// Віднайти користувача із введеним ім'ям, отримати місто його проживанння та
// відобразити у тезі #userCity
// Запустити програму потрібно за допомогою Live Server
// Перевірити правильність програми - команда node tests/task2.test.js
document.addEventListener("DOMContentLoaded", () => {
    const userNameInput = document.getElementById('userNameInput');
    const getUserButton = document.getElementById('getUserButton');
    const userCity = document.getElementById('userCity');

    
    async function fetchUserCity(userName) {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const users = await response.json();
            
            const user = users.find(user => user.name.toLowerCase() === userName.toLowerCase());
            
            
            if (user) {
                userCity.textContent = user.address.city;
            } else {
                userCity.textContent = 'User not found';
            }
        } catch (error) {
            console.error('Error fetching users:', error);
            userCity.textContent = 'Error fetching data';
        }
    }

    
    getUserButton.addEventListener('click', () => {
        const userName = userNameInput.value.trim();
        if (userName) {
            fetchUserCity(userName);
        } else {
            userCity.textContent = 'Please enter a user name';
        }
    });
});
