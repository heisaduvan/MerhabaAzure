using Core.Utilities.Results;
using Entities.Concrete;
using System;
using System.Collections.Generic;
using System.Text;

namespace Business.Abstract
{
    public interface IAppUserService
    {
        IDataResult<AppUser> GetById(int appUserId);
        IDataResult<List<AppUser>> GetList();
        IResult Add(AppUser appUser);
        IResult Delete(AppUser appUser);
        IResult Update(AppUser appUser);

        IResult TransactionalOperation(AppUser appUser);
    }
}
