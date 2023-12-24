/* eslint-disable react/prop-types */
import { useState } from "react"

const initialFriends = [
  {
    id: crypto.randomUUID(),
    name: 'Henrique',
    amount: -7,
    img: `/imgs/friends/henrique-48.jpg`
  },
  {
    id: crypto.randomUUID(),
    name: 'Renata',
    amount: 20,
    img: `/imgs/friends/renata-48.jpg`
  },
  {
    id: crypto.randomUUID(),
    name: 'Antonio',
    amount: 0,
    img: `/imgs/friends/antonio-48.jpg`
  }
]

const getMsgInfo = amount => amount < 0 ?
  { message: `você deve ${Math.abs(amount)} reais`, color: 'red-debit' } :
  amount > 0 ?
    { message: `te devo ${amount} reais`, color: 'green-credit' } :
    { message: 'Estamos quites', color: 'white-neutral' }

const Logo = () => (
  <header className="header">
    <img src="logo-racha-conta.png" alt="Logo e Titulo: Racha a conta" />
  </header>
)

const ListOfItens = ({ friends, selectFriend, onClickFriend }) => (
  <ul>
    {
      friends.map(friend => {
        const { color, message } = getMsgInfo(friend.amount)
        const isSelectFriend = friend.id === selectFriend?.id
        return (
          <li key={friend.id}>
            <img src={friend.img} alt={`Foto de ${friend.name}`} />
            <h3>{friend.name}</h3>
            <p className={color}>{message}</p>
            <button
              onClick={() => onClickFriend(friend)}
              className={`button ${isSelectFriend ? 'button-close' : ''}`}
            >
              {
                isSelectFriend ? 'Fechar' : 'Selecionar'
              }
            </button>
          </li>
        )
      })
    }
  </ul>
)

const App = () => {
  const [friends, setFriends] = useState(initialFriends)
  const [selectFriend, setSelectFriend] = useState(null)
  const [totalBill, setTotalBill] = useState('')
  const [mySend, setMySend] = useState('')
  const [whoWillPay, setWhoWillPay] = useState('you')
  const [showFormAddFriend, setShowFormAddFriend] = useState(false)
  const [nameOfFriend, setNameOfFriend] = useState('')
  const [imgOfFriend, setImgOfFriend] = useState('')

  const handleClickAddFriend = () => setShowFormAddFriend(b => !b)
  const handleClickFriend = friend => setSelectFriend(p => p?.id === friend.id ? null : friend)
  const handleChangeBill = e => setTotalBill(e.target.value)
  const handleChangeMySend = e => setMySend(e.target.value)
  const handleChangeWhoWillPay = e => setWhoWillPay(e.target.value)
  const handleChangeNameOfFriend = e => setNameOfFriend(e.target.value)
  const handleChangeImgOfFriend = e => setImgOfFriend(e.target.value)

  const handleSubmitShareBill = e => {
    e.preventDefault()
    setFriends(prev => prev.map(friend => selectFriend.id === friend.id ?
      {
        ...friend,
        amount: whoWillPay === 'you' ?
          friend.amount + (+totalBill - +mySend) :
          friend.amount - +mySend
      } : friend
    ))
    setSelectFriend(null)
    setTotalBill('')
    setMySend('')
    setWhoWillPay('you')
  }

  const handleSubmitAddFriend = e => {
    e.preventDefault()

    setFriends(prev => [
      ...prev,
      {
        id: crypto.randomUUID,
        name: nameOfFriend,
        amount: 0,
        img: imgOfFriend
      }
    ])

    setNameOfFriend('')
    setImgOfFriend('')
    setShowFormAddFriend(false)
  }

  return (
    <>
      <Logo />
      <main className="app">
        <div className="sidebar">
          <ListOfItens
            friends={friends}
            selectFriend={selectFriend}
            onClickFriend={handleClickFriend}
          />


          {showFormAddFriend && <form className="form-split-bill" onSubmit={handleSubmitAddFriend}>
            <label>
              👥 Nome
              <input value={nameOfFriend} onChange={handleChangeNameOfFriend} />
            </label>
            <label>
              📸 Foto
              <input value={imgOfFriend} onChange={handleChangeImgOfFriend} />
            </label>
            <button className="button" >
              Adicionar
            </button>
          </form>
          }

          <button
            className={`button ${showFormAddFriend ? 'button-close' : ''}`}
            onClick={handleClickAddFriend}
          >
            {showFormAddFriend ? 'Fechar' : 'Adicionar Amigo(a)'}
          </button>
        </div>

        {selectFriend &&
          <div>
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
          </div>
        }
      </main>
    </>
  )
}

export { App }
