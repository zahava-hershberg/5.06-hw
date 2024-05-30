using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CheesecakeOrders.Data
{
    public class CheesecakeRepo
    {
        private readonly string _connectionString;
        public CheesecakeRepo(string connectionString)
        {
            _connectionString = connectionString;
        }
        public List<Cheesecake> GetAll()
        {
            using var context = new CheesecakeDataContext(_connectionString);
            return context.Cheesecakes.ToList();
        }
        public void Add(Cheesecake cheesecake)
        {
            using var context = new CheesecakeDataContext(_connectionString);
            context.Cheesecakes.Add(cheesecake);
            context.SaveChanges();
        }
        public Cheesecake GetById(int id)
        {
            using var context = new CheesecakeDataContext(_connectionString);
            return context.Cheesecakes.FirstOrDefault(c => c.Id == id);
        }
    }
}
