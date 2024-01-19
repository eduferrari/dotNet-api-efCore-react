import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import AtividadeForm from './AtividadeForm';
import AtividadeLista from './AtividadeLista';
import api from "../../api/atividade";
import TitlePage from "../../components/TitlePage";
import { IAtividade, Prioridade } from "../../model/atividade";

const atividadeInicial: IAtividade = {
    id: 0,
    titulo: '',
    prioridade: Prioridade.NaoDefinido,
    descricao: ''
}

const Atividade = () => {
	const [showAtividadeModal, setShowAtividadeModal] = useState(false);
	const [smShowDeleteModal, setSmShowDeleteModal] = useState(false);
	
	const [atividades, setAtividades] = useState<IAtividade[]>([]);
	const [atividade, setAtividade] = useState<IAtividade>(atividadeInicial);

	const handleAtividadeModal = () => setShowAtividadeModal(!showAtividadeModal);

	const handleDeleteModal = (id: number) => {
		if (id !== 0 && id !== undefined) {
			const atividade = atividades.filter(
				(atividade) => atividade.id === id
			);
			setAtividade(atividade[0]);
		} else {
			setAtividade(atividadeInicial);
		}
		setSmShowDeleteModal(!smShowDeleteModal);
	};

	const pegaTodasAtividades = async () => {
		const response = await api.get("atividade");
		return response.data;
	};

	useEffect(() => {
		const getAtividades = async () => {
			const todasAtividades = await pegaTodasAtividades();
			if (todasAtividades) setAtividades(todasAtividades);
		};
		getAtividades();
	}, []);

	const newAtividade = () => {
		handleAtividadeModal();
		setAtividade(atividadeInicial);
	};

	const addAtividade = async (ativ: IAtividade) => {
		handleAtividadeModal();
		const response = await api.post("atividade", ativ);
		setAtividades([...atividades, response.data]);
	};

	const getAtividade = async (id: number) => {
		const atividade = atividades.filter(
			(atividade) => atividade.id === id
		);
		setAtividade(atividade[0]);
		handleAtividadeModal();
	};

	const updAtividade = async (ativ: IAtividade) => {
		handleAtividadeModal();
		const response = await api.put(`atividade/${ativ.id}`, ativ);
		const { id } = response.data;
		setAtividades(
			atividades.map((item) => (item.id === id ? response.data : item))
		);
		setAtividade(atividadeInicial);
	};

	const delAtividade = async (id: number) => {
		handleDeleteModal(0);
		if (await api.delete(`atividade/${id}`)) {
			const atividadeFiltrada = atividades.filter(
				(atividade) => atividade.id !== id
			);
			setAtividades([...atividadeFiltrada]);
		}
	};

	const cancelAtividade = () => {
		handleAtividadeModal();
		setAtividade(atividadeInicial);
	};

	return (
		<>
			<TitlePage title={"Atividade " + (atividade.id !== 0 ? atividade.id : "")}>
				<Button variant="outline-secondary" onClick={newAtividade}>
					<i className="fas fa-plus"></i>
				</Button>
			</TitlePage>

			<AtividadeLista
				atividades={atividades}
				getAtividade={getAtividade}
				handleDeleteModal={handleDeleteModal}
			/>

			<Modal show={showAtividadeModal} onHide={handleAtividadeModal}>
				<Modal.Header closeButton>
					<Modal.Title>
						Atividade {atividade.id !== 0 ? atividade.id : ""}
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<AtividadeForm
						addAtividade={addAtividade}
						updAtificade={updAtividade}
						cancelAtividade={cancelAtividade}
						selAtividade={atividade}
					/>
				</Modal.Body>
			</Modal>

			<Modal size="sm" show={smShowDeleteModal} onHide={() => handleDeleteModal}>
				<Modal.Header closeButton>
					<Modal.Title>Excluir Atividade</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					Você tem certeza que deseja excluir a atividade{" "}
					<strong>{atividade.id}</strong>?<br />
					Esta ação <strong>não poderá</strong> ser desfeita!
				</Modal.Body>
				<Modal.Footer className="d-flex justify-content-between">
					<button className="btn btn-secondary me-2" onClick={() => handleDeleteModal(0)}>
						<i className="me-1 fa-solid fa-ban"></i>Cancelar
					</button>
					<button className="btn btn-danger ms-2" onClick={() => delAtividade(atividade.id)}>
						<i className="me-1 fa-solid fa-check"></i>
						Confirmar
					</button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

export default Atividade;