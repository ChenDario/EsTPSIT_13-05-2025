import './App.css';
import {useState} from 'react';
import AlunniTable from "./AlunniTable";

function App() {
  const [alunni, setAlunni] = useState([]);
  const [caricamento, setCaricamento] = useState(false);
  const [elimina, setElimina] = useState(false);
  const [inserisci, setInserisci] = useState(false);
  async function caricaAlunni(){
    /*
    //FETCH Operatore assincrono
    //              URL                 Oggetto Key-Value
    fetch("http://localhost:8080/alunni", {method:"GET"})
    //Per dire cosa fare dopo
    .then((data) => {
        data.json().then((mieiDati)=>{
          console.log(mieiDati);
        });
      }
    );
    console.log("ciccio");
    */
    setCaricamento(true);
    const data = await fetch("http://localhost:8080/alunni", {method:"GET"});
    const mieiDati = await data.json();
    setCaricamento(false);
    setAlunni(mieiDati);
  }
  async function salvaAlunno(){
    const data = await fetch("http://localhost:8080/alunni", {
      method:"POST", 
      header:{'Content-type':'application/json'}, 
      body: JSON.stringify({nome:"dario", cognome:"chen"})
    });
  }

  return (
    <div className="App">
      {alunni.length > 0 ? (
        <div>
          <AlunniTable myArray={alunni} />
          {inserisci ? (
            <div> 
              <div>
                <h5>Name:</h5> 
                <input type="text"></input>
              </div>
              <div>
                <h5>Surname:</h5>
                <input type="text"></input>
              </div>
              <br />
              <button onClick={salvaAlunno}> Salva </button>
              <br />
              <button onClick={() => setInserisci(false)}> Annulla </button>
            </div>
          ) : (
            <button onClick={() => setInserisci(true)}> Inserisci new Alunno </button>

          )}
        </div>
      ) : ( <div>
        {caricamento ? (
          <div>Caricamento in corso</div>
        )  : (  <button onClick={caricaAlunni}> Carica Alunni</button>
        )}
        </div>
      )}
    </div>
  );
}

export default App;