using Microsoft.EntityFrameworkCore;
using ProAtividade.Data.Context;
using ProAtividade.Domain.Entities;
using ProAtividade.Domain.Interfaces.Repositories;
using System.Linq;
using System.Threading.Tasks;

namespace ProAtividade.Data.Repositories
{
    public class AtividadeRepo : GeralRepo, IAtividadeRepo
    {
        private readonly DataContext _context;

        public AtividadeRepo(DataContext context) : base(context)
        {
            _context = context;
        }

        public async Task<Atividade> GetAtividadeByIdAsync(int atividadeId)
        {
            IQueryable<Atividade> query = _context.Atividades.AsNoTracking().Where(x => x.Id == atividadeId);
            return await query.FirstOrDefaultAsync();
        }

        public async Task<Atividade> GetAtividadeByTituloAsync(string titulo)
        {
            IQueryable<Atividade> query = _context.Atividades.AsNoTracking().Where(x => x.Titulo == titulo);
            return await query.FirstOrDefaultAsync();
        }

        public async Task<Atividade[]> GetAtividadesAsync()
        {
            IQueryable<Atividade> query = _context.Atividades.AsNoTracking().OrderByDescending(x => x.Id);
            return await query.ToArrayAsync();
        }
    }
}