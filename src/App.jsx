/* eslint-disable react/prop-types */
import { useState } from "react"
import { Logo } from "./components/Logo"
import { ListOfItens } from "./components/ListOfItens"
import { FormAddFriend } from "./components/FormAddFriend"
import { FormSelectFriend } from "./components/FormSelectFriend"

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
        <aside className="sidebar">
          <ListOfItens
            friends={friends}
            selectFriend={selectFriend}
            onClickFriend={handleClickFriend}
          />

          <FormAddFriend
            showFormAddFriend={showFormAddFriend}
            nameOfFriend={nameOfFriend}
            imgOfFriend={imgOfFriend}
            onCHangeNameOfFriends={handleChangeNameOfFriend}
            onChangeImgOfFriends={handleChangeImgOfFriend}
            onSubmitAddFriend={handleSubmitAddFriend}
          />

          <button
            className={`button ${showFormAddFriend ? 'button-close' : ''}`}
            onClick={handleClickAddFriend}
          >
            {showFormAddFriend ? 'Fechar' : 'Adicionar Amigo(a)'}
          </button>
        </aside>

        <FormSelectFriend
          selectFriend={selectFriend}
          totalBill={totalBill}
          mySend={mySend}
          whoWillPay={whoWillPay}
          onChangeBill={handleChangeBill}
          onChangeMySend={handleChangeMySend}
          onChangeWhoWillPay={handleChangeWhoWillPay}
          onSubmitShareBill={handleSubmitShareBill}
        />
      </main>
    </>
  )
}

export { App }
