using ProAtividade.Domain.Entities;
using ProAtividade.Domain.Interfaces.Repositories;
using ProAtividade.Domain.Interfaces.Services;
using System;
using System.Threading.Tasks;

namespace ProAtividade.Domain.Services
{
    public class AtividadeService : IAtividadeService
    {
        private readonly IAtividadeRepo _atividadeRepo;

        public AtividadeService(IAtividadeRepo atividadeRepo)
        {
            _atividadeRepo = atividadeRepo;
        }

        public async Task<Atividade> AdicionarAtividade(Atividade model)
        {
            if (await _atividadeRepo.GetAtividadeByTituloAsync(model.Titulo) != null)
                throw new Exception("Já existe uma atividade com esse titulo");

            if (await _atividadeRepo.GetAtividadeByIdAsync(model.Id) == null)
            {
                _atividadeRepo.Adicionar(model);
                if (await _atividadeRepo.SalvarMudancasAsync())
                    return model;
            }

            return null;
        }

        public async Task<Atividade> AtualizarAtividade(Atividade model)
        {
            if (model.DataConclusao != null)
                throw new Exception("Não é possível alterar atividade já concluida");

            if (await _atividadeRepo.GetAtividadeByIdAsync(model.Id) != null)
            {
                _atividadeRepo.Atualizar(model);
                if (await _atividadeRepo.SalvarMudancasAsync())
                    return model;
            }

            return null;
        }

        public async Task<bool> ConcluirAtividade(Atividade model)
        {
            if (model != null)
            {
                model.Concluir();
                _atividadeRepo.Atualizar<Atividade>(model);
                return await _atividadeRepo.SalvarMudancasAsync();
            }

            return false;
        }

        public async Task<bool> DeletarAtividade(int atividadeId)
        {
            var atividade = await _atividadeRepo.GetAtividadeByIdAsync(atividadeId);
            if (atividade == null)
                throw new Exception("Atividade não existe!");

            _atividadeRepo.Deletar<Atividade>(atividade);
            return await _atividadeRepo.SalvarMudancasAsync();
        }

        public async Task<Atividade[]> ListarTodasAtividadeAsync()
        {
            try
            {
                var atividades = await _atividadeRepo.GetAtividadesAsync();
                if (atividades == null) return null;

                return atividades;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<Atividade> SelecionarAtividadePorIdAsync(int atividadeId)
        {
            try
            {
                var atividade = await _atividadeRepo.GetAtividadeByIdAsync(atividadeId);
                if (atividade == null) return null;

                return atividade;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}