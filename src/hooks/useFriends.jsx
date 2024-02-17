import { useEffect, useState } from 'react'
import localforage from 'localforage'
const useFriends = () => {
  const [friends, setFriends] = useState([])
  const [selectFriend, setSelectFriend] = useState(null)
  const [showFormAddFriend, setShowFormAddFriend] = useState(false)

  useEffect(() => {
    localforage
      .setItem('friends', friends)
      .catch((error) => alert(error.message))
  }, [friends])

  useEffect(() => {
    localforage
      .getItem('friends')
      .then((data) => {
        if (data) {
          setFriends(data)
        }
      })
      .catch((error) => alert(error.message))
  }, [])

  const handleClickAddFriend = () => setShowFormAddFriend((b) => !b)
  const handleClickFriend = (friend) =>
    setSelectFriend((p) => (p?.id === friend.id ? null : friend))

  const handleSubmitShareBill = (friend) => {
    setFriends((prev) => prev.map((p) => (friend.id === p.id ? friend : p)))
    setSelectFriend(null)
  }

  const handleSubmitAddFriend = (friend) => {
    setFriends((prev) => [...prev, friend])
    setShowFormAddFriend(false)
  }

  return {
    friends,
    selectFriend,
    showFormAddFriend,
    setFriends,
    setSelectFriend,
    setShowFormAddFriend,
    handleClickAddFriend,
    handleClickFriend,
    handleSubmitShareBill,
    handleSubmitAddFriend,
  }
}

export { useFriends }
