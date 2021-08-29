import React, { useState } from 'react'
import { View, Text, Image, StyleSheet, FlatList, Alert } from 'react-native'
import { v4 as uuid } from 'uuid';
import Header from './components/Header';
import ListView from './components/ListView'
import AddItem from './components/AddItem';
import { ItemContext } from './Contexts/ItemContext';


const App = () => {
  const [items, setItems] = useState([
    {
      id: uuid(),
      text: 'Eggs'
    },
    {
      id: uuid(),
      text: 'Ground nut'
    },
    {
      id: uuid(),
      text: 'Chocolates'
    },
    {
      id: uuid(),
      text: 'Ice cream'
    },
  ])

  const deleteItem = (id) => {
    setItems(prevItems => {
      return prevItems.filter((item) => item.id != id)
    })
  }

  const addItem = (text) => {
    if (!text) {
      Alert.alert('Error', 'Please enter an item' ,[{text: 'Ok'}])
    } else {
      setItems(prevItems => {
        return [{ id: uuid(), text }, ...prevItems]
      })
    }
  }

  return (
    <View style={styles.container}>
      <Header />
      <ItemContext.Provider value = {{items,setItems,addItem}}>
      <AddItem/>
      <FlatList
        data={items}
        renderItem={
          ({ item }) => <ListView item={item} deleteItem={deleteItem}></ListView>
        }
      />
      </ItemContext.Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default App;