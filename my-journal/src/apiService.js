const BASE_URL = 'http://localhost:3001';

const apiService = {};

apiService.getAllJournals = () => {
  return fetch(`${BASE_URL}/journals`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .catch((error) => {
      console.error('Error getting journals:', error);
      throw error;
    });
};

export default apiService;
