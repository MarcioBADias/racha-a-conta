import { useEffect, useReducer } from 'react'
import localforage from 'localforage'

const reduce = (state, action) =>
  ({
    get_friends: {
      ...state,
      friends: action.payload?.length > 0 ? action.payload : [],
    },
    set_form_add_friends: {
      ...state,
      showFormAddFriend: !state.showFormAddFriend,
    },
    set_select_friend: {
      ...state,
      selectFriend:
        state.selectFriend?.id === action.payload?.id ? null : action.payload,
    },
    set_friends: {
      ...state,
      friends: state.friends.map((p) =>
        action.payload?.id === p.id ? action.payload : p,
      ),
    },
    add_friend: {
      ...state,
      friends: [...state.friends, action.payload],
    },
  })[action.type] ?? state

const useFriends = () => {
  const [state, dispatch] = useReducer(reduce, {
    friends: [],
    selectFriend: null,
    showFormAddFriend: false,
  })

  useEffect(() => {
    localforage
      .setItem('friends', state.friends)
      .catch((error) => alert(error.message))
  }, [state.friends])

  useEffect(() => {
    localforage
      .getItem('friends')
      .then((data) => {
        if (data) {
          dispatch({ type: 'get_friends', payload: data })
        }
      })
      .catch((error) => alert(error.message))
  }, [])

  const handleClickAddFriend = () => dispatch({ type: 'set_form_add_friends' })
  const handleClickFriend = (friend) =>
    dispatch({ type: 'set_select_friend', payload: friend })

  const handleSubmitShareBill = (friend) => {
    dispatch({ type: 'set_friends', payload: friend })
    dispatch({ type: 'set_select_friend', payload: friend })
  }

  const handleSubmitAddFriend = (friend) => {
    dispatch({ type: 'add_friend', payload: friend })
    dispatch({ type: 'set_form_add_friends' })
  }

  return {
    friends: state.friends,
    selectFriend: state.selectFriend,
    showFormAddFriend: state.showFormAddFriend,
    handleClickAddFriend,
    handleClickFriend,
    handleSubmitShareBill,
    handleSubmitAddFriend,
  }
}

export { useFriends }
