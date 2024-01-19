import { IAtividade } from "./atividade";

export interface IAtividadeItemPropos {
    ativ: IAtividade;
	getAtividade: (id: number) => void;
	handleDeleteModal: (id: number) => void;
}

export interface IAtividadeListaPropos {
    atividades: IAtividade[];
    getAtividade: (id: number) => void;
	handleDeleteModal: (id: number) => void;
}

export interface IAtividadeFormPropos {
    selAtividade: IAtividade;
    updAtificade: (atividade: IAtividade) => void;
    addAtividade: (atividade: IAtividade) => void;
    cancelAtividade: () => void;
}