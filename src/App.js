import './App.css';
import React,{Component} from 'react';
import Form from './component/Form';
import Notes from './component/Notes';

class App extends Component {

  render() {
    return (
      <div>
        <h1 className='text-center'>Note making App</h1>
        <Form />
        <Notes/>
      </div>
      
    );
  }
  
}

export default App;
