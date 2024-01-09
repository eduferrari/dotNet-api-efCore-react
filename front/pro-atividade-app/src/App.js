import { useEffect, useState } from "react";
import "./App.css";
import AtividadeForm from "./components/AtividadeForm";
import AtividadeLista from './components/AtividadeLista';

function App() {
  const [index, setIndex] = useState(0);
  const [atividades, setAtividades] = useState([]);
  const [atividade, setAtividade] = useState({ id: 0 });

  useEffect(() => {
    atividades.length <= 0 ? setIndex(1) : setIndex(Math.max.apply(Math, atividades.map((item) => item.id)) + 1);
  }, [atividades]);

  function addAtividade(ativ) {
    setAtividades([...atividades, { ...ativ, id: index }]);
  }

  function getAtividade(id) {
    const atividade = atividades.filter((atividade) => atividade.id === id);
    setAtividade(atividade[0]);
  }

  function updAtificade(ativ) {
    setAtividades(atividades.map(item => item.id === ativ.id ? ativ : item));
    setAtividade({ id: 0 });
  }

  function delAtividade(id) {
    const atividadeFiltrada = atividades.filter((atividade) => atividade.id !== id);
    setAtividades([...atividadeFiltrada]);
  }

  function cancelAtividade() {
    setAtividade({ id: 0 });
  }

  return (
    <>
      <AtividadeForm
        atividades={atividades}
        addAtividade={addAtividade}
        updAtificade={updAtificade}
        cancelAtividade={cancelAtividade}
        selAtividade={atividade}
      />

      <AtividadeLista
        atividades={atividades}
        delAtividade={delAtividade}
        getAtividade={getAtividade}
      />
    </>
  );
}

export default App;