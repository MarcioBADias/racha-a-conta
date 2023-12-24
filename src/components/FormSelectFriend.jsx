/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react"

const FormSelectFriend = ({
    selectFriend,
    totalBill,
    mySend,
    whoWillPay,
    onChangeBill,
    onChangeMySend,
    onChangeWhoWillPay,
    onSubmitShareBill
}) => selectFriend &&
    <form className="form-split-bill" onSubmit={onSubmitShareBill}>
        <h2>{`Rache a conta com ${selectFriend?.name}`}</h2>
        <label>
            💰 Valor total
            <input type="number" value={totalBill} onChange={onChangeBill} />
        </label>
        <label>
            🤸‍♂️ Seus gastos
            <input type="number" value={mySend} onChange={onChangeMySend} />
        </label>
        <label>
            🤑 Quem vai pagar
            <select value={whoWillPay} onChange={onChangeWhoWillPay}>
                <option value="you">Você</option>
                <option value={selectFriend}>{selectFriend?.name}</option>
            </select>
        </label>
        <button className="button">Rachar conta</button>
    </form>

export { FormSelectFriend }