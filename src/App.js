import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";
import AddItem from "./AddItem";
import SearchItem from "./SearchItem";
import React, { useState, useEffect } from 'react';
import apiRequest from "./apiRequest";

function App() {
  const API_URL = 'http://localhost:3500/items'
  const [items, setItems] = useState( []
    // [
    //   { id: 1, checked: true, item: 'Practice Coding' },
    //   { id: 2, checked: false, item: 'Play Cricket' },
    //   { id: 3, checked: true, item: 'Read about AI' }
    // ]
  );
  const [newItem, setNewItem] = useState('')
  const [search, setSearch] = useState('') 
  const [fetchError, setFetchError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect (() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL)
        if (!response.ok) throw Error("Data Not Found")
        const listItems = await response.json()
        setItems(listItems)
        setFetchError(null)
      } catch (err){
        setFetchError(err.message)
      } finally {
        setIsLoading(false)
      }
    } 
    setTimeout(()=> {
      (async () => await fetchItems())()
    }, 2000)
  }, [])

  const addItem = async (item) => {
    const id = items.length ? Number(items[items.length -1].id) +1:1;
    const addNewItem = {id, checked:false, item}
    const listItems = [...items, addNewItem]
    setItems(listItems)
    localStorage.setItem('todo_list', JSON.stringify(listItems))

    const postOptions ={
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(addNewItem)
    }
    const result = await apiRequest(API_URL, postOptions)
    if (result)setFetchError(result)
  } // create operation in CRUD

  const handleCheck = async (id) => {
    const listItems = items.map((item)=>
    item.id===id? {...item, checked:!item.checked}:item) // without giving this ... that will excute all the things 
    setItems(listItems)
    
    const myItem = listItems.filter((item) => item.id===id)
    const updateOptions ={
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({checked:myItem[0].checked}) //for only updating the 'checked' place
    }
    const reqUrl = `${API_URL}/${id}`
    const result = await apiRequest(reqUrl, updateOptions)
    if (result)  setFetchError(result)
  }  

  const handleDelete = async (id) => {
    const listItems = items.filter((item)=>
    item.id!==id) 
    setItems(listItems)

    const deleteOptions = { method: 'DELETE' }
    
    const reqUrl = `${API_URL}/${id}`
    const result = await apiRequest(reqUrl, deleteOptions)
    if (result)setFetchError(result) // delete the list in json file through the user output
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!newItem) return;
    console.log(newItem)
    addItem(newItem)
    setNewItem('')
  }

  return(
    <div className="App">
      <Header title = 'ToDo List'/>
      <AddItem
        newItem = {newItem}
        setNewItem = {setNewItem}
        handleSubmit = {handleSubmit}/>
      <SearchItem
        search = {search}
        setSearch = {setSearch}/>
      <main>
        {isLoading && <p>Loading items...</p>}
        {fetchError && <p> {`Error: ${fetchError}`}</p> }
        {!isLoading && !fetchError && <Content
          items = {items.filter(item => ((item.item).toLowerCase()).includes(search.toLowerCase()))}
          handleCheck = {handleCheck}
          handleDelete = {handleDelete} />}
      </main>
      <Footer
        length = {items.length} 
      /> 
    </div>
  );
}

export default App;
