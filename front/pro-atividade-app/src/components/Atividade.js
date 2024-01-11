import React from 'react'

function prioridadeConfig(prioridadeValue) {
    switch (prioridadeValue) {
        case "Baixa":
            return {
                Label: "Baixa",
                Icon: "smile",
                Color: "success",
            };
        case "Normal":
            return {
                Label: "Normal",
                Icon: "meh",
                Color: "primary",
            };
        case "Alta":
            return {
                Label: "Alta",
                Icon: "frown",
                Color: "warning",
            };
        default:
            return {
                Label: "Não definido",
                Icon: "meh-blank",
                Color: "secondary",
            };
    }
}

export default function Atividades(props) {
    return (
        <div key={props.atividade.id} className={"card mb-2 shadow-sm border-" + prioridadeConfig(props.atividade.prioridade).Color}>
            <div className="card-body">
                <div className="d-flex justify-content-between">
                    <h5 className="card-title">
                        <span className="badge me-1 text-bg-secondary">{props.atividade.id}</span>
                        - {props.atividade.titulo}
                    </h5>
                    <h6>
                        Prioridade:
                        <span className={"text-" + prioridadeConfig(props.atividade.prioridade).Color}>
                            <span className={"ms-1 text-" + prioridadeConfig(props.atividade.prioridade).Color}>
                                <i className={"me-1 fa-regular fa-face-" + prioridadeConfig(props.atividade.prioridade).Icon}></i>
                            </span>
                            {prioridadeConfig(props.atividade.prioridade).Label}
                        </span>
                    </h6>
                </div>
                <p className="card-text">{props.atividade.descricao}</p>
                <div className="d-flex justify-content-end pt-2 m-0 border-top">
                    <button className="btn btn-sm btn-outline-secondary me-2" onClick={() => props.getAtividade(props.atividade.id)}>
                        <i className="me-1 fa-solid fa-pen"></i>Editar
                    </button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => props.handleDeleteModal(props.atividade.id)}>
                        <i className="me-1 fa-regular fa-trash-can"></i>Deletar
                    </button>
                </div>
            </div>
        </div>
    )
}