import { useState, useEffect, React } from 'react';

const atividadeInicial = {
    id: 0,
    titulo: '',
    prioridade: 'NaoDefinido',
    descricao: ''
}

export default function AtividadeForm(props) {
    const [atividade, setAtividade] = useState(atividadeAtual());

    useEffect(() => {
        if (props.selAtividade.id !== 0) {
            setAtividade(props.selAtividade);
        }
    }, [props.selAtividade]);

    const inputTextHandler = (e) => {
        const { name, value } = e.target;

        setAtividade({ ...atividade, [name]: value });
    };

    const handlerSubmit = (e) => {
        e.preventDefault();

        if (props.selAtividade.id !== 0) {
            props.updAtificade(atividade);
        } else {
            props.addAtividade(atividade);
        }

        setAtividade(atividadeInicial);
    }

    const handlerCancelar = (e) => {
        e.preventDefault();

        props.cancelAtividade();

        setAtividade(atividadeInicial);
    }

    function atividadeAtual() {
        if (props.selAtividade.id !== 0) {
            return props.selAtividade;
        }
        else {
            return atividadeInicial;
        }
    }

    return (
        <>
            <form className="row g-3" onSubmit={handlerSubmit}>
                <div className="col-9">
                    <label className="form-label"><strong>Título</strong></label>
                    <input type="text" name="titulo" id="titulo" className="form-control"
                        onChange={inputTextHandler}
                        value={atividade.titulo}
                        required
                    />
                </div>
                <div className="col-3">
                    <label className="form-label"><strong>Prioridade</strong></label>
                    <select className="form-select" name="prioridade" id="prioridade"
                        onChange={inputTextHandler}
                        value={atividade.prioridade}
                        required
                    >
                        <option value="NaoDefinido">Selecionar...</option>
                        <option value="Baixa">Baixa</option>
                        <option value="Normal">Normal</option>
                        <option value="Alta">Alta</option>
                    </select>
                </div>
                <div className="col-12">
                    <label className="form-label"><strong>Descrição</strong></label>
                    <textarea rows="3" name="descricao" id="descricao" className="form-control"
                        onChange={inputTextHandler}
                        value={atividade.descricao}
                        required
                    />
                </div>
                <div className="col-12 d-flex justify-content-between">
                    {atividade.id === 0 ?
                        (
                            <button type="submit" className="btn btn-success float-end">
                                <i className="me-1 fa-solid fa-floppy-disk"></i>Salvar
                            </button>
                        ) : (
                            <>
                                <button type="submit" className="btn btn-success me-2">
                                    <i className="me-1 fa-solid fa-floppy-disk"></i>Salvar
                                </button>
                                <button className="btn btn-secondary ms-2" onClick={handlerCancelar}>
                                    <i className="me-1 fa-solid fa-ban"></i>Cancelar
                                </button>
                            </>
                        )
                    }
                </div>
            </form>
        </>
    )
}