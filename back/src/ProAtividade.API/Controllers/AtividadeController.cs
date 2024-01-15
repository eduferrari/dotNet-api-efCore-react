using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ProAtividade.Domain.Entities;
using ProAtividade.Domain.Interfaces.Services;

namespace ProAtividade.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AtividadeController : ControllerBase
    {
        private readonly IAtividadeService _atividadeService;

        public AtividadeController(IAtividadeService atividadeService)
        {
            _atividadeService = atividadeService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var atividades = await _atividadeService.ListarTodasAtividadeAsync();
                if (!atividades.Any()) return NoContent();

                return Ok(atividades);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro ao tentar recuperar atividades. Problema: {ex.Message}");
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                var atividade = await _atividadeService.SelecionarAtividadePorIdAsync(id);
                if (atividade == null) return NoContent();

                return Ok(atividade);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro ao tentar recuperar atividade. Problema: {ex.Message}");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post(Atividade model)
        {
            try
            {
                var atividade = await _atividadeService.AdicionarAtividade(model);
                if (atividade == null) return NoContent();

                return Ok(atividade);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro ao tentar adicionar atividade. Problema: {ex.Message}");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, Atividade model)
        {
            try
            {
                if (model.Id != id) return StatusCode(409, $"Não existe uma atividade com essa informação!");

                var atividade = await _atividadeService.AtualizarAtividade(model);
                if (atividade == null) return NoContent();

                return Ok(atividade);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro ao tentar atualizar atividade. Problema: {ex.Message}");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var atividade = await _atividadeService.SelecionarAtividadePorIdAsync(id);
                if (atividade == null) return StatusCode(409, $"Não existe uma atividade com essa informação!");

                if (!await _atividadeService.DeletarAtividade(atividade.Id)) return BadRequest("Erro ao tentar deletar atividade!");

                return Ok(new { message = "Deletado" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro ao tentar deletar atividade. Problema: {ex.Message}");
            }
        }
    }
}