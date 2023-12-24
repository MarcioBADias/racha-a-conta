/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";

const FormAddFriend = ({ showFormAddFriend, onSubmitAddFriend }) => {

    const [nameOfFriend, setNameOfFriend] = useState('')
    const [imgOfFriend, setImgOfFriend] = useState('')

    const handleChangeNameOfFriend = e => setNameOfFriend(e.target.value)
    const handleChangeImgOfFriend = e => setImgOfFriend(e.target.value)

    const handleSubmitAddFriend = e => {
        e.preventDefault()
        const newFriend = {
            id: crypto.randomUUID,
            name: nameOfFriend,
            amount: 0,
            img: imgOfFriend
        }
        onSubmitAddFriend(newFriend)
        setNameOfFriend('')
        setImgOfFriend('')
    }
    return showFormAddFriend &&
        <form className="form-split-bill" onSubmit={handleSubmitAddFriend}>
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
export { FormAddFriend }