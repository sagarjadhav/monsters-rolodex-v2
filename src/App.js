import React, { useState, useEffect } from 'react';

import SearchBox from './components/search-box/search-box.component';
import CardList from './components/card-list/card-list.component';
import './App.css';

const App = () => {
  const [searchField, setSearchFiled] = useState(''); // [value, setvalue]
  const [monsters, setMonsters] = useState([]);
  const [filteredMonsters, setFilteredMonsters] = useState(monsters);

  useEffect(()=>{
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response)=> response.json())
      .then((users) => setMonsters(users))
  }, []);

  useEffect(()=>{
    const newFilteredMonsters = monsters.filter((monster)=>{
      return monster.name.toLowerCase().includes(searchField);
    });

    setFilteredMonsters(newFilteredMonsters);
  }, [monsters, searchField]);

  const onSearchChange = (event)=>{
    const searchFieldString = event.target.value.toLowerCase();
    setSearchFiled(searchFieldString);
  }

  return(
    <div className="app">
      <h1 className="app-title">Monster Rolodex</h1>
      <SearchBox 
        onChangeHandler={onSearchChange} 
        className="search-box" 
        placeholder="Search Monsters"
      />
      <CardList monsters={filteredMonsters} />
    </div>
  )
}

export default App;
