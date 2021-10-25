import React from 'react';
import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import ListItems from './ListItems'
import Pagination from './pagination'
library.add(faTrash)

class App extends React.Component {
  
  constructor(props){
  
    super(props);
  
    this.state = {
      items:[],
      usersList:[],
      isLoaded:false,
      currentItem:{
        text:'',
        key:''
      },
      pagination:{
         start:0,
      }

    }
    this.addItem = this.addItem.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.setUpdate = this.setUpdate.bind(this);
    this.UserList = this.UserList.bind(this);

  }
   
  
 
  addItem(e){
    e.preventDefault();
    const newItem = this.state.currentItem;
    if(newItem.text !==""){
      const items = [...this.state.items, newItem];
    this.setState({
      items: items,
      currentItem:{
        text:'',
        key:''
      }
    })
    }
  }
  handleInput(e){
    this.setState({
      currentItem:{
        text: e.target.value,
        key: Date.now()
      }
    })
  }
  deleteItem(key){
    const filteredItems= this.state.items.filter(item =>
      item.key!==key);
    this.setState({
      items: filteredItems
    })

  }
  setUpdate(text,key){
    console.log("items:"+this.state.items);
    const items = this.state.items;
    items.map(item=>{      
      if(item.key===key){
        console.log(item.key +"    "+key)
        item.text= text;
      }
    })
    this.setState({
      items: items
    })
  }

  componentDidMount() {
    this.UserList(1);
  }

  UserList(pageNo) {
    console.log("pagenO app.js",pageNo)
  fetch(`https://reqres.in/api/users?page=${pageNo}`).then(data => data.json()).then(res =>{
     this.setState(() =>{
       const ar = res.data
       return {
        usersList: ar         
       }
     })
    })
  }

 render(){
  const {isLoaded, usersList}=this.state;
  console.log("userList",this.state.usersList.length)

  if(isLoaded){
     return <div>Loading...</div>
  }

  else{
    return (
      <div className="App">
        <header>
          <form id="to-do-form"  onSubmit={this.addItem}>
            <input type="text" placeholder="Enter to add Task" value= {this.state.currentItem.text} onChange={this.handleInput}></input>
            <button type="submit">Add</button>
          </form>
          <p>{this.state.items.text}</p>
          
            <ListItems style={{ alignItems:'left' }} items={this.state.items} deleteItem={this.deleteItem} setUpdate={this.setUpdate}/>
          
        </header>
     

    <div className="container py-4">
        <div className="row">
          {usersList.slice(this.state.pagination.start,this.state.usersList.length).map((user) => (
            <div className="col-md-3 mb-3" key={user.id}>
              <div className="card">
                <div className="card-body">
                <img className="user" src={user.avatar}/>
          <p>Name:  {user.first_name} {user.last_name}</p>
          <h5>Email:{user.email}</h5>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Pagination pageChange={this.UserList}/>
      </div>

      </div>
    );
  }
 
 }
}


export default App;
