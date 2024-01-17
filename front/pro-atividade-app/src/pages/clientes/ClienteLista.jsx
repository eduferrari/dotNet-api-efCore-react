import { useState } from "react";
import { Button, FormControl, InputGroup } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import TitlePage from "../../components/TitlePage";

const clientes = [
	{
		id: 1,
		nome: "Microsoft",
		responsavel: "Satya Nadella",
		contato: "(46) 99999-0001",
		situacao: "Ativo",
	},
	{
		id: 2,
		nome: "Amazon",
		responsavel: "Jeff Bezzos",
		contato: "(46) 99999-0002",
		situacao: "Ativo",
	},
	{
		id: 3,
		nome: "Google",
		responsavel: "Sergey Brin",
		contato: "(46) 99999-0003",
		situacao: "Ativo",
	},
	{
		id: 4,
		nome: "Facebook",
		responsavel: "Mark Zuckerberg",
		contato: "(46) 99999-0004",
		situacao: "Ativo",
	},
	{
		id: 5,
		nome: "Twitter",
		responsavel: "Elon Musk",
		contato: "(46) 99999-0005",
		situacao: "Ativo",
	},
];

export default function ClienteLista() {
	const [termoBusca, setTermpoBusca] = useState("");
	const history = useHistory();

	const handleInputChange = (e) => {
		setTermpoBusca(e.target.value);
	};

	const clientesFiltrados = clientes.filter((cliente) => {
		return Object.values(cliente)
			.join(" ")
			.toLowerCase()
			.includes(termoBusca.toLowerCase());
	});

	const addCliente = () => {
		history.push("/cliente/detalhe");
	};

	return (
		<>
			<TitlePage title="Lista de clientes">
				<Button variant="outline-secondary" onClick={addCliente}>
					<i className="fas fa-user-plus me-2"></i>Novo cliente
				</Button>
			</TitlePage>

			<InputGroup className="mb-3 mt-3">
				<InputGroup.Text>Buscar: </InputGroup.Text>
				<FormControl
					onChange={handleInputChange}
					placeholder="Buscar por nome do cliente"
				/>
			</InputGroup>

			<table className="table table-hover table-fixed">
				<thead className="table-dark mt-3">
					<tr>
						<th scope="col">#</th>
						<th scope="col">Nome</th>
						<th scope="col">Responsavel</th>
						<th scope="col">Contato</th>
						<th scope="col">Situacao</th>
						<th className="text-center" scope="col">
							Opções
						</th>
					</tr>
				</thead>
				<tbody>
					{clientesFiltrados.map((cliente) => (
						<tr key={cliente.id}>
							<th scope="row">{cliente.id}</th>
							<td>{cliente.nome}</td>
							<td>{cliente.responsavel}</td>
							<td>{cliente.contato}</td>
							<td>{cliente.situacao}</td>
							<th scope="row">
								<div className="text-center">
									<button className="btn btn-sm btn-outline-primary me-2" onClick={() => history.push(`/cliente/detalhe/${cliente.id}`)}>
										<i className="fas fa-user-edit me-2"></i>
										Editar
									</button>
									<button className="btn btn-sm btn-outline-danger">
										<i className="fas fa-user-times me-2"></i>
										Desativar
									</button>
								</div>
							</th>
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
}