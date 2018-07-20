import { Request, Response } from 'express'
import accountDao from './accountDao'

const listAccounts = (req: Request, res: Response) => {
  return accountDao.getAccounts().then(accounts =>
    res.render('accounts', { title: 'List of Accounts', accounts })
  )
}

const createAccount = (req: Request, res: Response) => {
  return accountDao.insertAccount(req.body)
    .then(() => res.redirect('/'))
}

export default { listAccounts, createAccount }
