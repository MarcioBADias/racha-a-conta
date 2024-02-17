import { useFriends } from './hooks/useFriends'
import { Logo } from './components/Logo'
import { ListOfItens } from './components/ListOfItens'
import { FormAddFriend } from './components/FormAddFriend'
import { FormSelectFriend } from './components/FormSelectFriend'
import { ButtonAddFriend } from './components/ButtonAddFriend'

const App = () => {
  const state = useFriends()
  return (
    <>
      <Logo />
      <main className="app">
        <aside className="sidebar">
          <ListOfItens
            friends={state.friends}
            selectFriend={state.selectFriend}
            onClickFriend={state.handleClickFriend}
          />
          {state.showFormAddFriend && (
            <FormAddFriend onSubmitAddFriend={state.handleSubmitAddFriend} />
          )}
          <ButtonAddFriend
            showFormAddFriend={state.showFormAddFriend}
            onClickAddFriend={state.handleClickAddFriend}
          />
        </aside>
        {state.selectFriend && (
          <FormSelectFriend
            selectFriend={state.selectFriend}
            onSubmitShareBill={state.handleSubmitShareBill}
          />
        )}
      </main>
    </>
  )
}

export { App }
