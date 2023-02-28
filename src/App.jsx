import React, {useState} from 'react';
import './App.css';
import contacts from "./contacts.json"

function App() {
  const [contactsList, setContacts] = useState(contacts.slice(0, 5));
  
  const handleAddRandomContact = () => {
    let randomIndex = Math.floor(Math.random() * contacts.length);
    if (
      contactsList.some((contact) => contact.id === contacts[randomIndex].id)
    ) {
      handleAddRandomContact();
    } else {
      setContacts([...contactsList, contacts[randomIndex]]);
    }
  };

  const handleSortByName = () => {
    const sortedByName = [...contactsList].sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
    setContacts(sortedByName);
  };

  const handleSortByPopularity = () => {
    const sortedByPopularity = [...contactsList].sort(
      (a, b) => b.popularity - a.popularity
    );
    setContacts(sortedByPopularity);
  };

  const handleDeleteCelebrity = (id) => {
    const filtered = [...contactsList].filter((contact) => {
      return contact.id !== id;
    });
    setContacts(filtered);
  };
  return (
    <div className="App">
      <h3>IronContacts</h3>
      <div className="btn">
        <button onClick={handleAddRandomContact}>Add Random Celebrity</button>
        <button onClick={handleSortByName}>Sort by name</button>
        <button onClick={handleSortByPopularity}>Sort by popularity</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>Won an Oscar</th>
            <th>Won an Emmy</th>
          </tr>
        </thead>
        <tbody>
          {contactsList.map((elem) => {
            return (
              <tr key={elem.id}>
                <td>
                  <img src={elem.pictureUrl} alt={elem.name} />
                </td>
                <td>{elem.name}</td>
                <td>{elem.popularity.toFixed(2)}</td>
                <td>{elem.wonOscar && "🏆"}</td>
                <td>{elem.wonEmmy && "🏆"}</td>
                <td>
                <div className="btn">
                  <button className="btn" onClick={() => handleDeleteCelebrity(elem.id)}>
                    Delete
                  </button>
                </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
