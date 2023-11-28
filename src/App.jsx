import { useState } from "react"

const friends = [
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

const App = () => {
  const [selectFriend, setSelectFriend] = useState(null)

  const handleClickFriend = friend => setSelectFriend(friend)

  return (
    <>
      <header className="header">
        <img src="logo-racha-conta.png" alt="Logo e Titulo: Racha a conta" />
      </header>
      <main className="app">
        <div className="sidebar">
          <ul>
            {
              friends.map(friend => {
                const { color, message } = getMsgInfo(friend.amount)
                return (
                  <li key={friend.id}>
                    <img src={friend.img} alt={`Foto de ${friend.name}`} />
                    <h3>{friend.name}</h3>
                    <p className={color}>{message}</p>
                    <button
                      onClick={() => handleClickFriend(friend)}
                      className="button"
                    >
                      Selecionar
                    </button>
                  </li>
                )
              })
            }
          </ul>
          <button className="button">Adicionar Amigo(a)</button>
        </div>
        <div>
          <form className="form-split-bill">
            <h2>
              {
                selectFriend ?
                  `Rache a conta com ${selectFriend.name}` :
                  `Rache a conta com um amigo`
              }
            </h2>
            <label>
              💰 Valor total
              <input type="number" defaultValue={100} />
            </label>
            <label>
              🤸‍♂️ Seus gastos
              <input type="number" defaultValue={50} />
            </label>
            <label>
              🤑 Quem vai pagar
              <select>
                <option value="you">Você</option>
                <option value={selectFriend}>{selectFriend && selectFriend.name}</option>
              </select>
            </label>
            <button className="button">Rachar conta</button>
          </form>
        </div>
      </main>
    </>
  )
}

export { App }
