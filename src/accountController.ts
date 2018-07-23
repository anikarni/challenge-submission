import { Request, Response } from 'express'
import uuid from 'uuid/v4'
import accountDao from './accountDao'
import Account from './account'

const handlesError = cb => (req: Request, res: Response) => {
  try {
    return cb(req, res)
  } catch (error) {
    return renderPage(res, error.message)
  }
}

const renderPage = (res: Response, error: string = '') => {
  return accountDao.getAccounts().then(accounts => {
    res.render('accounts', { title: 'Accounts', accounts, error })
  })
}

const listAccounts = handlesError((req: Request, res: Response) => {
  return renderPage(res)
})

const createAccount = handlesError((req: Request, res: Response) => {
  const account = new Account(uuid(), req.body.email)
  return accountDao.insertAccount(account).then(() => res.redirect('/'))
})

const deleteAccount = handlesError((req: Request, res: Response) => {
  return accountDao.deleteAccount(req.params.id).then(() => res.redirect('/'))
})

const updateAccount = handlesError((req: Request, res: Response) => {
  const account = new Account(req.params.id, req.body.email)
  return accountDao.updateAccount(account).then(() => res.redirect('/'))
})

export default { listAccounts, createAccount, deleteAccount, updateAccount }
