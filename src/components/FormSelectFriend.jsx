import { useEffect, useState } from 'react'

const FormSelectFriend = ({ selectFriend, onSubmitShareBill }) => {
  const [totalBill, setTotalBill] = useState('')
  const [mySend, setMySend] = useState('')
  const [whoWillPay, setWhoWillPay] = useState('you')

  useEffect(() => {
    document.title = `${selectFriend.name} foi selecionado(a)`
    return () => (document.title = 'Racha a conta')
  }, [selectFriend.name])

  const handleChangeBill = (e) => setTotalBill(e.target.value)
  const handleChangeMySend = (e) => setMySend(e.target.value)
  const handleChangeWhoWillPay = (e) => setWhoWillPay(e.target.value)

  const handleSubmitShareBill = (e) => {
    e.preventDefault()
    onSubmitShareBill({
      ...selectFriend,
      amount:
        whoWillPay === 'you'
          ? selectFriend.amount + (+totalBill - +mySend)
          : selectFriend.amount - +mySend,
    })
    setTotalBill('')
    setMySend('')
    setWhoWillPay('you')
  }

  return (
    <form className="form-split-bill" onSubmit={handleSubmitShareBill}>
      <h2>{`Rache a conta com ${selectFriend?.name}`}</h2>
      <label>
        💰 Valor total
        <input type="number" value={totalBill} onChange={handleChangeBill} />
      </label>
      <label>
        🤸‍♂️ Seus gastos
        <input type="number" value={mySend} onChange={handleChangeMySend} />
      </label>
      <label>
        🤑 Quem vai pagar
        <select value={whoWillPay} onChange={handleChangeWhoWillPay}>
          <option value="you">Você</option>
          <option value={selectFriend}>{selectFriend?.name}</option>
        </select>
      </label>
      <button className="button">Rachar conta</button>
    </form>
  )
}
export { FormSelectFriend }
