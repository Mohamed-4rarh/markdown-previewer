import './App.css';
import React, {useEffect, useState} from 'react';
import {marked} from 'marked'
import { useLocalStorage } from './useLocalStorage';

const App = () => {
  const [code, setCode] = useLocalStorage('mark_down', '## Hello') // to push and retrive data from the localStorage
  const [compiled, setCompiled] = useLocalStorage('compiled_preview', '<h2 id="hello">Hello</h2>') // storing the data in the localStorage after parsing to html elements
  const [docs, setDocs] = useState([]) 
  
  //states to handling the "<textarea />" content
  const [markDown, setMarkDown] = useState(true)
  const [preview, setPreview] = useState(false)
  const [doc, setDoc] = useState(false)

  // useEffect(() => {
  //   async function getDocs () {
  //     try {
  //       const response = await fetch('https://www.markdownguide.org/api/v1/basic-syntax.json')
  //       setDocs(response.json())
  //     } catch (error) {
  //       console.error(error)
  //     }
  //   }
  //   getDocs()
  // }, [])
  //
  // the previous block of code is the async function fetching the data from the api endpoint but it keeps giving me the network error with code 200
  // means the requist state is "OK and success" but there is something blocking me out or rejecting the requist to be fulfilled
  // I tested the endpoints on "postman" and it's responsing with the data but doesn't work on my machine
  //i found in some articles that it's maybe blocked because of the localhost:3000
  //but the rest of the project is too much easy, 
  //get the data from api and arranging it to html elements with some styles with css it will be greate,

  const openMD = () => {
    setMarkDown(true)
    setPreview(false)
    setDoc(false)
  }

  const openPreview = () => {
    setMarkDown(false)
    setPreview(true)
    setDoc(false)
  }

  const openDocs = () => {
    setMarkDown(false)
    setPreview(false)
    setDoc(true)
  }

  const handleChange = (e) => {
    setCode(e.target.value)
    setCompiled(marked.parse(e.target.value))
  }

  return (
    <>
      <h1>MarkDown Previewer React App</h1>
      <div className="container">
        <div className="btns">
          <button onClick={openMD} className="btn">MarkDown</button>
          <button onClick={openPreview}>Preview</button>
          <button onClick={openDocs}>DOCS</button>
        </div>
        {markDown && <div><textarea onChange={handleChange} value={code} /></div> }
        {preview && <div><textarea value={compiled} /></div> }
        {doc && <div><textarea value={docs} /></div> }
      </div>
    </>
  )
}


export default App;
