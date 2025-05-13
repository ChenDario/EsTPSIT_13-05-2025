import './App.css';
import {useState} from 'react';
import AlunniTable from "./AlunniTable";

function App() {
  const [alunni, setAlunni] = useState([]);
  const [caricamento, setCaricamento] = useState(false);
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

  return (
    <div className="App">
      {alunni.length > 0 ? (
        <AlunniTable myArray={alunni} />
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