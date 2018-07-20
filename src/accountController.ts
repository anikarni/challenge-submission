import { Request, Response } from 'express'
import accountDao from './accountDao'

const listAccounts = (req: Request, res: Response) => {
  return accountDao
    .getAccounts()
    .then(accounts =>
      res.render('accounts', { title: 'List of Accounts', accounts }),
    )
}

const createAccount = (req: Request, res: Response) => {
  return accountDao.insertAccount(req.body.email).then(() => res.redirect('/'))
}

const deleteAccount = (req: Request, res: Response) => {
  return accountDao.deleteAccount(req.params.id).then(() => res.redirect('/'))
}

export default { listAccounts, createAccount, deleteAccount }
