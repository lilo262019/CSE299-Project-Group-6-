const axios = require('axios');

// Create a test user for login testing
async function createTestUser() {
    try {
        console.log('Creating test user...');
        
        const userData = {
            username: "testuser",
            email: "test@example.com", 
            password: "password123",
            location: "Dhaka"
        };
        
        const response = await axios.post('http://localhost:3000/api/register', userData);
        console.log('✅ Test user created successfully:', response.data);
        console.log('\nYou can now test login with:');
        console.log('Email: test@example.com');
        console.log('Password: password123');
        
    } catch (error) {
        if (error.response) {
            console.log('❌ Error creating user:', error.response.data);
        } else {
            console.log('❌ Network error:', error.message);
        }
    }
}

createTestUser();
