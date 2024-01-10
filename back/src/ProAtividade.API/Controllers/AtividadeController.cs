using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using ProAtividade.API.Data;
using ProAtividade.API.Models;

namespace ProAtividade.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AtividadeController : ControllerBase
    {
        private readonly DataContext _context;

        public AtividadeController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IEnumerable<Atividade> Get()
        {
            return _context.Atividades;
        }

        [HttpGet("{id}")]
        public Atividade Get(int id)
        {
            return _context.Atividades.FirstOrDefault(x => x.Id == id);
        }

        [HttpPost]
        public IEnumerable<Atividade> Post(Atividade atividade)
        {
            _context.Atividades.Add(atividade);
            if (_context.SaveChanges() <= 0) throw new Exception("Atividade não adicionada!");

            return _context.Atividades;
        }

        [HttpPut("{id}")]
        public Atividade Put(int id, Atividade atividade)
        {
            if (atividade.Id != id) throw new Exception("Não existe uma atividade com essa informação!");

            _context.Atividades.Update(atividade);
            if (_context.SaveChanges() <= 0) throw new Exception("Atividade não atualizada!");

            return _context.Atividades.FirstOrDefault(x => x.Id == id);
        }

        [HttpDelete("{id}")]
        public bool Delete(int id)
        {
            var atividade = _context.Atividades.FirstOrDefault(x => x.Id == id);
            if (atividade.Id != id) throw new Exception("Não existe uma atividade com essa informação!");

            _context.Atividades.Remove(atividade);
            return _context.SaveChanges() > 0;
        }
    }
}