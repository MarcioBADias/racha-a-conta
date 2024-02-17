import React from 'react'

const getMsgInfo = (amount) =>
  amount < 0
    ? { message: `você deve ${Math.abs(amount)} reais`, color: 'red-debit' }
    : amount > 0
    ? { message: `te devo ${amount} reais`, color: 'green-credit' }
    : { message: 'Estamos quites', color: 'white-neutral' }

const ListOfItens = ({ friends, selectFriend, onClickFriend }) => (
  <ul>
    {friends.map((friend) => {
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
            {isSelectFriend ? 'Fechar' : 'Selecionar'}
          </button>
        </li>
      )
    })}
  </ul>
)

export { ListOfItens }
