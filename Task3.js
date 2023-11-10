// Use public e-shop site >> https://demowebshop.tricentis.com/

// •	Verify that allows register a User

const axios = require('axios');
const { assert } = require('chai');
const API_BASE_URL = 'https://petstore.swagger.io/v2';
describe('Petstore API User Creation Test', function () {
  it('Verify Creating a User', async function () {
    const username = `testuser${Math.floor(Math.random() * 100000)}`;
    const password = 'testpassword';
    const email = 'testuser@getnada.com';
    const userData = {
      username: username,
      firstName: 'Bruce',
      lastName: 'Willis',
      email: email,
      password: password,
      phone: '1234567890',
    };
    try {
      const createUserResponse = await axios.post(`${API_BASE_URL}/user/createWithList`, userData);
      assert.equal(createUserResponse.status, 200, 'User creation request failed');
      assert.equal(createUserResponse.data.code, 200, 'User creation failed');
      assert.equal(createUserResponse.data.type, 'unknown', 'User creation failed');
      assert.equal(createUserResponse.data.message, username, 'User creation failed');
    } catch (error) {
      console.error('An error occurred:', error);
      throw error;
    }
  });
});

// •	Verify that allows login a User

const axios = require('axios');
const { assert } = require('chai');
const API_BASE_URL = 'https://petstore.swagger.io/v2';
const API_KEY = '419879.c98f8b1910802f341a265d3c356deec31fb951df1b637f7b6c41178a079d4971';
describe('Petstore API User Login Test', function () {
  it('Verify User Login with API Key', async function () {
    const username = 'Bruce Willis';
    const password = 'testpassword';
    try {
      const loginResponse = await axios.get(`${API_BASE_URL}/user/login`, {
        headers: {
          'api_key': API_KEY,
        },
        params: {
          username: username,
          password: password,
        },
      });
      assert.equal(loginResponse.status, 200, 'User login request failed');
      assert.equal(loginResponse.data.code, 200, 'User login failed');
      assert.equal(loginResponse.data.type, 'unknown', 'User login failed');
      assert.equal(loginResponse.data.message, 'successful operation', 'User login failed');
    } catch (error) {
      console.error('An error occurred:', error);
      throw error;
    }
  });
});

// •	Verify that allows creating the list of Users

const axios = require('axios');
const { assert } = require('chai');
const API_BASE_URL = 'https://petstore.swagger.io/v2';
describe('Petstore API User List Creation Test', function () {
  it('Verify Creating a List of Users', async function () {
    const userList = [
      {
        username: 'user1',
        firstName: 'Bill',
        lastName: 'Gates',
        email: 'user1@getnada.com',
        password: 'password1',
        phone: '1234567890',
      },
      {
        username: 'user2',
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'user2@getnada.com',
        password: 'password2',
        phone: '9876543210',
      },
    ];
    try {
        const createUsersResponses = await Promise.all(
        userList.map((user) => axios.post(`${API_BASE_URL}/user/createWithList`, user))
      );
        createUsersResponses.forEach((response, index) => {
        assert.equal(response.status, 200, `User creation failed for user${index + 1}`);
        assert.equal(response.data.code, 200, `User creation failed for user${index + 1}`);
        assert.equal(response.data.type, 'unknown', `User creation failed for user${index + 1}`);
        assert.equal(response.data.message, userList[index].username, `User creation failed for user${index + 1}`);
      });
    } catch (error) {
      console.error('An error occurred:', error);
      throw error;
    }
  });
});

// •	Verify that allows Log out User

const axios = require('axios');
const { assert } = require('chai');

const API_BASE_URL = 'https://petstore.swagger.io/v2';
const API_KEY = 'c98f8b1910802f341a265d3c356deec31fb951df1b637f7b6c41178a079d4971';

describe('Petstore API User Logout Test', function () {
  it('Verify Logging out User with API Key (Hypothetical)', async function () {
    try {
        const logoutResponse = await axios.post(`${API_BASE_URL}/logout`, {
        apiKey: API_KEY,
      });
      assert.equal(logoutResponse.status, 200, 'User logout request failed');
      assert.equal(logoutResponse.data.code, 200, 'User logout failed');
      assert.equal(logoutResponse.data.type, 'unknown', 'User logout failed');
      assert.equal(logoutResponse.data.message, 'Logout successful', 'User logout failed');
    } catch (error) {
      console.error('An error occurred:', error);
      throw error;
    }
  });
});

// •	Verify that allows adding a new Pet

const axios = require('axios');
const { assert } = require('chai');
const API_BASE_URL = 'https://petstore.swagger.io/v2';
describe('Petstore API Add Pet Test', function () {
  it('Verify Adding a New Pet', async function () {
    const newPetData = {
      id: 9876,
      category: {
        id: 1,
        name: 'Dogs',
      },
      name: 'Fluffy',
      photoUrls: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVpgEWM6bbu20xR2V7LieqvE1y6_xIOsVuiouWvO395Q&s'],
      tags: [
        {
          id: 1,
          name: 'Cute',
        },
      ],
      status: 'available',
    };
    try {
      const addPetResponse = await axios.post(`${API_BASE_URL}/pet`, newPetData);
      assert.equal(addPetResponse.status, 200, 'Add pet request failed');
      assert.equal(addPetResponse.data.code, 200, 'Add pet failed');
      assert.equal(addPetResponse.data.type, 'unknown', 'Add pet failed');
      assert.equal(addPetResponse.data.message.id, newPetData.id, 'Added pet ID mismatch');
      assert.equal(addPetResponse.data.message.name, newPetData.name, 'Added pet name mismatch');
      assert.deepEqual(addPetResponse.data.message.category, newPetData.category, 'Added pet category mismatch');
      assert.deepEqual(addPetResponse.data.message.tags, newPetData.tags, 'Added pet tags mismatch');
      assert.equal(addPetResponse.data.message.status, newPetData.status, 'Added pet status mismatch');
    } catch (error) {
      console.error('An error occurred:', error);
      throw error;
    }
  });
});

// •	Verify that allows updating Pet’s image

const axios = require('axios');
const { assert } = require('chai');
const API_BASE_URL = 'https://petstore.swagger.io/v2';
describe('Petstore API Update Pet Image Test', function () {
  it('Verify Updating Pet\'s Image', async function () {
    const petId = 9876;
    const newImageUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_TavPmbDfsG39Cwgj3KO1Xl_eofxLTjNEqjelvbO-Tw&s';
    try {
      const updatePetImageResponse = await axios.post(`${API_BASE_URL}/pet/${petId}`, {
        photoUrls: [newImageUrl],
      });
      assert.equal(updatePetImageResponse.status, 200, 'Update pet image request failed');
      assert.equal(updatePetImageResponse.data.code, 200, 'Update pet image failed');
      assert.equal(updatePetImageResponse.data.type, 'unknown', 'Update pet image failed');
      assert.equal(updatePetImageResponse.data.message, 'Pet updated', 'Update pet image failed');
    } catch (error) {
      console.error('An error occurred:', error);
      throw error;
    }
  });
});


// •	Verify that allows updating Pet’s name and status

const axios = require('axios');
const { assert } = require('chai');
const API_BASE_URL = 'https://petstore.swagger.io/v2';
describe('Petstore API Update Pet Test', function () {
  it('Verify Updating Pet\'s Name and Status', async function () {
    const petId = 9876;
    const updatedPetData = {
      id: petId,
      name: 'NewPetName',
      status: 'sold',
    };
    try {
      const updatePetResponse = await axios.put(`${API_BASE_URL}/pet`, updatedPetData);
      assert.equal(updatePetResponse.status, 200, 'Update pet request failed');
      assert.equal(updatePetResponse.data.code, 200, 'Update pet failed');
      assert.equal(updatePetResponse.data.type, 'unknown', 'Update pet failed');
      assert.equal(updatePetResponse.data.message, 'Pet updated', 'Update pet failed');
      const getUpdatedPetResponse = await axios.get(`${API_BASE_URL}/pet/${petId}`);
      const updatedPet = getUpdatedPetResponse.data;
      assert.equal(updatedPet.id, updatedPetData.id, 'Updated pet ID mismatch');
      assert.equal(updatedPet.name, updatedPetData.name, 'Updated pet name mismatch');
      assert.equal(updatedPet.status, updatedPetData.status, 'Updated pet status mismatch');
    } catch (error) {
      console.error('An error occurred:', error);
      throw error;
    }
  });
});

// •	Verify that allows deleting Pet 

const axios = require('axios');
const { assert } = require('chai');
const API_BASE_URL = 'https://petstore.swagger.io/v2';
describe('Petstore API Delete Pet Test', function () {
  it('Verify Deleting a Pet', async function () {
  const petId = 9876;
    try {
      const deletePetResponse = await axios.delete(`${API_BASE_URL}/pet/${petId}`);
      assert.equal(deletePetResponse.status, 200, 'Delete pet request failed');
      assert.equal(deletePetResponse.data.code, 200, 'Delete pet failed');
      assert.equal(deletePetResponse.data.type, 'unknown', 'Delete pet failed');
      assert.equal(deletePetResponse.data.message, `${petId}`, 'Delete pet failed');
      const getDeletedPetResponse = await axios.get(`${API_BASE_URL}/pet/${petId}`).catch((error) => error.response);
      assert.equal(getDeletedPetResponse.status, 404, 'Pet is still available after deletion');
    } catch (error) {
      console.error('An error occurred:', error);
      throw error;
    }
  });
});

