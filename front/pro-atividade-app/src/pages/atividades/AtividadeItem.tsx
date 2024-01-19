import React from 'react'
import { IAtividadeItemPropos } from '../../model/atividadesProps';
import { Prioridade } from '../../model/atividade';

function prioridadeConfig(prioridadeValue: Prioridade) {
    switch (prioridadeValue) {
        case Prioridade.Baixa:
            return {
                Label: "Baixa",
                Icon: "smile",
                Color: "success",
            };
        case Prioridade.Normal:
            return {
                Label: "Normal",
                Icon: "meh",
                Color: "primary",
            };
        case Prioridade.Alta:
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

const AtividadeItem: React.FC<IAtividadeItemPropos> = ({ ativ, getAtividade, handleDeleteModal }: IAtividadeItemPropos) => {
	return (
		<div className={"card mb-2 shadow-sm border-" + prioridadeConfig(ativ.prioridade).Color}>
			<div className="card-body">
				<div className="d-flex justify-content-between">
					<h5 className="card-title">
						<span className="badge me-1 text-bg-secondary">
							{ativ.id}
						</span>
						- {ativ.titulo}
					</h5>
					<h6>
						Prioridade:
						<span className={"text-" + prioridadeConfig(ativ.prioridade).Color}>
							<span className={"ms-1 text-" + prioridadeConfig(ativ.prioridade).Color}>
								<i className={"me-1 fa-regular fa-face-" + prioridadeConfig(ativ.prioridade).Icon}></i>
							</span>
							{prioridadeConfig(ativ.prioridade).Label}
						</span>
					</h6>
				</div>
				<p className="card-text">{ativ.descricao}</p>
				<div className="d-flex justify-content-end pt-2 m-0 border-top">
					<button className="btn btn-sm btn-outline-primary me-2" onClick={() => getAtividade(ativ.id)}>
						<i className="me-1 fa-solid fa-pen"></i>Editar
					</button>
					<button className="btn btn-sm btn-outline-danger" onClick={() => handleDeleteModal(ativ.id)}>
						<i className="me-1 fa-regular fa-trash-can"></i>
						Deletar
					</button>
				</div>
			</div>
		</div>
	);
};

export default AtividadeItem;