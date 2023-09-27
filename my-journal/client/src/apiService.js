const BASE_URL = 'https://localhost:443';

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
apiService.addJournal = (newJournal) => {
  return fetch(`${BASE_URL}/journal`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
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
    headers: {
      'Content-Type': 'application/json',
    },
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

//update single journal entry
apiService.updateSingleJournalEntry = (entryId, updatedEntry) => {
  return fetch(`${BASE_URL}/entry/${entryId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
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
  return fetch(`${BASE_URL}/favorites`) 
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
