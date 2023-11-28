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

  return (
    <>
      <header>
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
                    <button className="button">Selecionar</button>
                  </li>
                )
              })
            }
          </ul>
          <button className="button">Adicionar Amigo(a)</button>
        </div >
      </main>
    </>
  )
}

export { App }
