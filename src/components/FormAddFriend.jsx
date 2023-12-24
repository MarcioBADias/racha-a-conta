/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";

const FormAddFriend = ({ nameOfFriend, imgOfFriend, onSubmitAddFriend, onCHangeNameOfFriends, onChangeImgOfFriends }) => (
    <form className="form-split-bill" onSubmit={onSubmitAddFriend}>
        <label>
            👥 Nome
            <input value={nameOfFriend} onChange={onCHangeNameOfFriends} />
        </label>
        <label>
            📸 Foto
            <input value={imgOfFriend} onChange={onChangeImgOfFriends} />
        </label>
        <button className="button" >
            Adicionar
        </button>
    </form>
)

export { FormAddFriend }