import { useState, useEffect } from 'react';
import { IAtividade, Prioridade } from '../../model/atividade';
import { IAtividadeFormPropos } from '../../model/atividadesProps';

const atividadeInicial: IAtividade = {
    id: 0,
    titulo: '',
    prioridade: Prioridade.NaoDefinido,
    descricao: ''
}

const AtividadeForm: React.FC<IAtividadeFormPropos> = ({ selAtividade, updAtificade, addAtividade, cancelAtividade}: IAtividadeFormPropos) => {
    const [atividade, setAtividade] = useState<IAtividade>(atividadeAtual());

    useEffect(() => {
        if (selAtividade.id !== 0) {
            setAtividade(selAtividade);
        }
    }, [selAtividade]);

    const handleValue = (e: any) => {
        const { name, value } = e.target;

        setAtividade({ ...atividade, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (selAtividade.id !== 0) {
            updAtificade(atividade);
        } else {
            addAtividade(atividade);
        }

        setAtividade(atividadeInicial);
    }

    const handleCancelar = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();

        cancelAtividade();

        setAtividade(atividadeInicial);
    }

    function atividadeAtual(): IAtividade {
        if (selAtividade.id !== 0) {
            return selAtividade;
        }
        else {
            return atividadeInicial;
        }
    }

    return (
        <>
            <form className="row g-3" onSubmit={handleSubmit}>
                <div className="col-9">
                    <label className="form-label"><strong>Título</strong></label>
                    <input name="titulo" id="titulo" className="form-control" onChange={handleValue} value={atividade.titulo} />
                </div>
                <div className="col-3">
                    <label className="form-label"><strong>Prioridade</strong></label>
                    <select className="form-select" name="prioridade" id="prioridade" onChange={handleValue} value={atividade.prioridade} >
                        <option value="NaoDefinido">Selecionar...</option>
                        <option value="Baixa">Baixa</option>
                        <option value="Normal">Normal</option>
                        <option value="Alta">Alta</option>
                    </select>
                </div>
                <div className="col-12">
                    <label className="form-label"><strong>Descrição</strong></label>
                    <textarea name="descricao" id="descricao" className="form-control" onChange={handleValue} value={atividade.descricao} />
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
                                <button className="btn btn-warning ms-2" onClick={handleCancelar}>
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

export default AtividadeForm;