import React from 'react'
import AtividadeItem from "./AtividadeItem";
import { IAtividadeListaPropos } from '../../model/atividadesProps';

const AtividadeLista: React.FC<IAtividadeListaPropos> = ({
        atividades, 
        getAtividade, 
        handleDeleteModal
    }: IAtividadeListaPropos) => {
    return (
        <div className="mt-3">
            {atividades.map((ativ) => (
                <AtividadeItem
                    key={ativ.id}
                    ativ={ativ}
                    getAtividade={getAtividade}
                    handleDeleteModal={handleDeleteModal}
                />
            ))}
        </div>
    )
}

export default AtividadeLista;