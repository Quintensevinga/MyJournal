const BASE_URL = 'http://localhost:3001';

const apiService = {};

const authToken = localStorage.getItem('authToken');

const getHeaders = () => {
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${authToken}`,
  };
};

apiService.register = (username, password) => {
  return fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({username, password})
  })
    .then((response) => {
      if (!response.ok) {
      throw new Error('Registration failed')
      }
      return response.json()
    })
    .catch((error) => {
      throw error;
    })
}

apiService.login = (username, password) => {
  return fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ username, password })
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Login failed')
      }
      return response.json()
    })
    .catch((error) => {
      throw error;
    })
}

apiService.getAllJournals = () => {
  return fetch(`${BASE_URL}/journals`, {
    headers: getHeaders(),
  })
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

apiService.getJournalData = (journalId) => {
  return fetch(`${BASE_URL}/journal/${journalId}`, {
    headers: getHeaders(),
  })
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

apiService.addJournal = (newJournal) => {
  console.log('add journal called');
  return fetch(`${BASE_URL}/journal`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(newJournal)
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

apiService.addJournalEntry = (journalId, newEntry) => {
  return fetch(`${BASE_URL}/journalEntry/${journalId}`, {
    method: 'POST',
    headers: getHeaders(),
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

apiService.updateJournalEntry = (journalId, entryId, updatedData) => {
  return fetch(`${BASE_URL}/journal/${journalId}/entry/${entryId}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(updatedData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .catch((error) => {
      console.error('Error updating journal entry:', error);
    });
};

apiService.updateJournal = (journalId, updatedJournal) => {
  console.log(updatedJournal);
  return fetch(`${BASE_URL}/updateJournal/${journalId}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(updatedJournal),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .catch((error) => {
      console.error('Error updating journal:', error);
    });
};

apiService.updateSingleJournalEntry = (entryId, updatedEntry) => {
  return fetch(`${BASE_URL}/entry/${entryId}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(updatedEntry),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .catch((error) => {
      console.error('Error updating journal entry:', error);
    });
};

apiService.getAllFavoriteEntries = () => {
  return fetch(`${BASE_URL}/favorites`, {
    headers: getHeaders(),
  }) 
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .catch((error) => {
      console.error('Error getting favorite entries:', error);
      throw error;
    });
};

apiService.deleteJournalEntry = (journalId, entryId) => {
  return fetch(`${BASE_URL}/journal/${journalId}/entry/${entryId}`, {
    method: 'DELETE',
    headers: getHeaders(),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    })
    .catch((error) => {
      console.error('Error deleting journal entry:', error);
      throw error;
    });
};

apiService.deleteJournal = (journalId) => {
  console.log(journalId);
  return fetch(`${BASE_URL}/deleteJournal/${journalId}`, {
    method: 'DELETE',
    headers: getHeaders(),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    })
    .catch((error) => {
      console.error('Error deleting journal:', error);
      throw error;
    });
};

export default apiService;
