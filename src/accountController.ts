import { Request, Response } from 'express'
import accountDao from './accountDao'

export default {
  listAccounts: (req: Request, res: Response) => {
    res.render('accounts', {
      title: 'List of Accounts',
      accounts: accountDao.getAccounts()
    })
  }
}
