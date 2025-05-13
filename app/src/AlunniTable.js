export default function AlunniTable(props){
    const alunni = props.myArray; 
    return(
        <table border = "1">
          {alunni.map(a => 
            <tr>
              <td>{a.id}</td>
              <td>{a.nome}</td>
              <td>{a.cognome}</td>
            </tr>  
          )}
        </table>
    );
}