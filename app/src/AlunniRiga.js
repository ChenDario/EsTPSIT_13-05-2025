import { useState } from 'react';

export default function AlunniRiga(props) {
  const a = props.alunno; 
  const caricaAlunni = props.caricaAlunni;
  //Nel case true basta usare la function caricaAlunni()
  const [conferma, setConferma] = useState(false);
  const [cancel, setCancel] = useState(false);

  async function deleteAlunno() {
    try {
      const response = await fetch(`http://localhost:8080/alunni/${a.id}`, { method: "DELETE" });
      if (response.ok) {
        setCancel(true); // After successful deletion, hide the row
      } else {
        console.error("Failed to delete student");
      }
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  }

  return (
    <>
      {!cancel && (
        <tr>
          <td>{a.id}</td>
          <td>{a.nome}</td>
          <td>{a.cognome}</td>
          <td>
            {conferma ? (
              <div> 
                Sei sicuro? 
                <button onClick={() => deleteAlunno()}> Si </button>
                <button onClick={() => setConferma(false)}> No </button>
              </div>
            ) : (
              <button onClick={() => setConferma(true)}>Delete</button>
            )}
          </td>
        </tr>  
      )}
    </>
  );
}
