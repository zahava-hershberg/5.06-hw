using CheesecakeOrders.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CheesecakeOrders.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CheesecakeController : ControllerBase
    {
        private readonly string _connectionString;
        public CheesecakeController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }
        [HttpGet]
        [Route("getall")]
        public List<Cheesecake> GetAll()
        {
            var repo = new CheesecakeRepo(_connectionString);
            return repo.GetAll();
        }
        [Route("add")]
        [HttpPost]
        public void Add(Cheesecake cheesecake)
        {
            var repo = new CheesecakeRepo(_connectionString);
            repo.Add(cheesecake);
        }
        [Route("getbyid")]
        [HttpGet]
        public Cheesecake GetById(int id)
        {
            var repo = new CheesecakeRepo(_connectionString);
            return repo.GetById(id);
        }
    }
}
