using ProAtividade.Domain.Entities;
using System.Threading.Tasks;

namespace ProAtividade.Domain.Interfaces.Repositories
{
    public interface IAtividadeRepo : IGeralRepo
    {
        Task<Atividade[]> GetAtividadesAsync();
        Task<Atividade> GetAtividadeByIdAsync(int atividadeId);
        Task<Atividade> GetAtividadeByTituloAsync(string titulo);
    }
}
