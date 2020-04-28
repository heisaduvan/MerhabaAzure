using Business.Abstract;
using Core.Utilities.Results;
using DataAccess.Abstract;
using Entities.Concrete;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Business.Concrete
{
    public class AppUserManager : IAppUserService
    {
        private IAppUserDal _appUserDal;
        public AppUserManager(IAppUserDal appUserDal)
        {
            _appUserDal = appUserDal;
        }
        public IResult Add(AppUser appUser)
        {
            throw new NotImplementedException();
        }

        public IResult Delete(AppUser appUser)
        {
            throw new NotImplementedException();
        }

        public IDataResult<AppUser> GetById(int appUserId)
        {
            throw new NotImplementedException();
        }

        public IDataResult<List<AppUser>> GetList()
        
        {
            return new SuccessDataResult<List<AppUser>>(_appUserDal.GetList().ToList());
        }

        public IResult TransactionalOperation(AppUser appUser)
        {
            throw new NotImplementedException();
        }

        public IResult Update(AppUser appUser)
        {
            throw new NotImplementedException();
        }
    }
}
