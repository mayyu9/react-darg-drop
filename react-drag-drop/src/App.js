import React, {useReducer} from 'react';
import logo from './logo.svg';
import './App.css';
import DragAndDrop from './DragAndDrop';

function App() {

  const initialState = {
    dropDepth: 0,
    inDropZone: false,
    fileList: []
  };

  const reducer = (state= initialState, action) => {
    switch(action.type) {
      case 'SET_DROP_DEPTH':
        return {...state, dropDepth: action.dropDepth}
      case 'SET_IN_DROP_ZONE':
        return {...state, inDropZone: action.inDropZone}
      case 'ADD_FILE_TO_LIST':
        return {...state, fileList: state.fileList.concat(action.files)};
      case 'DELETE_FILE':
        return {...state, fileList: action.newFilelist};
      default:
        return state;
    }
  };

  const [data, dispatch] = useReducer(reducer, initialState);

  const deleteHandler = (e, name) => {
    const existingFiles = data.fileList;
    let newFilelist = existingFiles.filter(item => item.name !== name);
    dispatch({ type: 'DELETE_FILE', newFilelist });
  };

  return (
    <div className="App">
      <h1>React drag and drop component example</h1>
      <DragAndDrop  data={data} dispatch={dispatch} />
      {
        data.fileList.length > 0 ?
        ( <ol className="dropped-files">
        {data.fileList.map(f => {
          return (
            <div class="w3-large"><li style={{float: 'left'}} key={f.name}>{f.name}</li><i onClick={e => deleteHandler(e, f.name)} class="fas fa-trash"></i>
            </div>
          )
        })}
      </ol>)
        : null
      }
     
    </div>
  );
}

export default App;
