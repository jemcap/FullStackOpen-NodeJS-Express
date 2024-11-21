import { useState, useEffect } from "react";

import Form from "./components/Form";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import phonebookUsers from "./services/phonebook";

const App = () => {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState("");
  const [number, setNumber] = useState("");
  const [filteredName, setfilteredName] = useState("");
  const [notification, setNotification] = useState({
    success: true,
    message: null,
  });

  useEffect(() => {
    phonebookUsers.getAllPhonebook().then((users) => setPersons(users));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPerson = {
      name: newName,
      number: number,
    };
    const isExistingEntry = persons.find(
      (element) => element.name === newName || element.number === number
    );
    console.log(isExistingEntry);

    // Exercise 2.15*
    if (isExistingEntry) {
      const id = isExistingEntry.id;
      if (
        confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        console.log("Saved");

        console.log(id);
        phonebookUsers
          .updateNumber(id, newPerson)
          .then((user) =>
            setPersons(
              persons.map((person) => (person.id === id ? user : person))
            )
          )
          // Exercise 2.17*
          .catch((error) => {
            console.log(error.status);
            if (error.status === 404) {
              setNotification({
                success: false,
                message: `Information of ${newName} has already been removed from the server`,
              });
              setTimeout(() => {
                setNotification({
                  success: null,
                  message: null,
                });
              }, 3000);
              return;
            }
          });
        setNewName("");
        setNumber("");
      }
      return;
    }
    // Exercise 2.16
    phonebookUsers.addPerson(newPerson).then((response) => {
      setPersons(persons.concat(response));
      setNotification({
        success: true,
        message: `${newName} successfully added`,
      });
      setTimeout(() => {
        setNotification({
          success: null,
          message: null,
        });
      }, 3000);
      setNewName("");
      setNumber("");
    });

    console.log(newName);
  };

  const handleDeleteUser = (id) => {
    phonebookUsers.deletePerson(id).then((_) => {
      console.log(id);
      setPersons(persons.filter((person) => person.id !== id));
    });
  };

  let result = persons.filter((person) =>
    person.name.toLowerCase().includes(filteredName.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filteredName={filteredName} filterFn={setfilteredName} />
      <Notification
        message={notification.message}
        isSuccessful={notification.success}
      />
      <h3>Add a new</h3>
      <Form
        submitFn={handleSubmit}
        name={newName}
        setNewName={setNewName}
        number={number}
        setNumber={setNumber}
      />
      <h3>Numbers</h3>
      <Persons result={result} onDelete={handleDeleteUser} />
    </div>
  );
};

export default App;
