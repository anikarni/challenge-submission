import { Request, Response } from 'express'
import accountDao from './accountDao'

export default {
  listAccounts: (req: Request, res: Response) => {
    return accountDao.getAccounts().then(accounts =>
      res.render('accounts', { title: 'List of Accounts', accounts })
    )
  }
}
