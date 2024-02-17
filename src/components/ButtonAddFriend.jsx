import React from 'react'

const ButtonAddFriend = ({ showFormAddFriend, onClickAddFriend }) => (
  <button
    className={`button ${showFormAddFriend ? 'button-close' : ''}`}
    onClick={onClickAddFriend}
  >
    {showFormAddFriend ? 'Fechar' : 'Adicionar Amigo(a)'}
  </button>
)

export { ButtonAddFriend }
