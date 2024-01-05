import React from 'react'
import Atividade from "./Atividade";

export default function AtividadeLista(props) {
    return (
        <div className="mt-3">
            <h3 className="mb-3">Lista de atividades</h3>
            {props.atividades.map((atividade) => (
                <Atividade
                    key={atividade.id}
                    atividade={atividade}
                    delAtividade={props.delAtividade}
                    getAtividade={props.getAtividade}
                />
            ))}
        </div>
    )
}
