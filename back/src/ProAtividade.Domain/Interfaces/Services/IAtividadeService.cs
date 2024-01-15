using ProAtividade.Domain.Entities;
using System.Threading.Tasks;

namespace ProAtividade.Domain.Interfaces.Services
{
    public interface IAtividadeService
    {
        Task<Atividade> AdicionarAtividade(Atividade model);
        Task<Atividade> AtualizarAtividade(Atividade model);
        Task<bool> DeletarAtividade(int atividadeId);
        Task<bool> ConcluirAtividade(Atividade model);
        Task<Atividade[]> ListarTodasAtividadeAsync();
        Task<Atividade> SelecionarAtividadePorIdAsync(int atividadeId);
    }
}
