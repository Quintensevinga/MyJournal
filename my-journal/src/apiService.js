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

// get specific journal
apiService.getJournalData = (journalId) => {
  return fetch(`${BASE_URL}/journal/${journalId}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .catch((error) => {
      console.error('Error getting journal:', error);
      throw error;
    });
};


// add a journal

// add a new entry to specific journal 
apiService.addJournalEntry = (journalId, newEntry) => {
  return fetch(`${BASE_URL}/journalEntry/${journalId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newEntry)
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .catch((error) => {
      console.error('Error sending data:', error);
    });
}

// update a journal entry
apiService.updateJournalEntry = (journalId, entryId, updatedData) => {
  return fetch(`${BASE_URL}/journal/${journalId}/entry/${entryId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      console.log(updatedData);
      return response.json();
    })
    .catch((error) => {
      console.error('Error updating journal entry:', error);
    });
};


export default apiService;
