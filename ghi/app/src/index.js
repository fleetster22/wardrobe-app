import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

<<<<<<< HEAD
export async function loadShoesandHats(){
  const responseShoes = await fetch('http://localhost:8080/api/shoes/');
  const responseHats = await fetch('http://localhost:8090/api/hats/');
  if (responseShoes.ok && responseHats.ok) {
    const dataShoes = await responseShoes.json();
    const dataHats = await responseHats.json();
    root.render(
      <React.StrictMode>
        <App shoes={dataShoes.shoes} hats={dataHats.hats}/>
=======
async function loadShoes() {
  const response = await fetch("http://localhost:8080/api/shoes/");
  if (response.ok) {
    const shoeData = await response.json();
    root.render(
      <React.StrictMode>
        <App shoes={shoeData.shoes} />
>>>>>>> main
      </React.StrictMode>
    )
  }
  else {
    console.error(responseShoes); console.error(responseHats);
  }
}

loadShoesandHats();
