import {Button} from 'components/button'
import {IconSearch} from 'components/icon'
import {useAuth} from 'contexts/auth-context'
import {getAuth, signOut} from 'firebase/auth'
import React from 'react'
import {NavLink} from 'react-router-dom'
import styled from 'styled-components'

const menuLink = [
  {
    url: '/',
    title: 'Home',
  },
  {
    url: '/block',
    title: 'Block',
  },
  {
    url: '/contact',
    title: 'Contact',
  },
]

const HeaderStyle = styled.div`
  .header-main {
    display: flex;
    align-items: center;
    padding-top: 30px;
  }
  .logo {
    display: block;
    max-width: 50px;
  }
  .menu {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-left: 40px;
    & li {
      list-style: none;
    }
  }
  .header-right {
    margin-left: auto;
  }
  .search {
    padding: 10px;
    border: 1px solid #eee;
    border-radius: 8px;
    width: 100%;
    max-width: 320px;
    margin-left: auto;
    display: flex;
    align-items: center;
    position: relative;
    margin-right: 20px;
  }
  .search-input {
    flex: 1;
    padding-left: 5px;
    padding-right: 45px;
  }
  .search-icon {
    position: absolute;
    top: 50%;
    right: 5%;
    transform: translateY(-50%);
  }
`

const Header = () => {
  const {userInfo} = useAuth()
  const auth = getAuth()

  const getLastName = (name) => {
    if (!name) return 'User'

    const length = name.split(' ')
    return length[length.length - 1]
  }

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log('Sign out !!!')
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <HeaderStyle>
      <div className="container">
        <div className="header-main">
          <NavLink to={'/'}>
            <img
              className="logo"
              srcSet="logo.png 2x"
              alt="monkey-blogging"
            />
          </NavLink>
          <ul className="menu">
            {menuLink.map((item) => {
              return (
                <li
                  className="menu-item"
                  key={item.title}
                >
                  <NavLink to={item.url}>{item.title}</NavLink>
                </li>
              )
            })}
          </ul>
          <div className="search">
            <input
              type="text"
              className="search-input"
              placeholder="search post..."
            />
            <span className="search-icon">
              <IconSearch></IconSearch>
            </span>
          </div>
          {!userInfo ? (
            <Button
              type="button"
              to="/sign-in"
              className="header-button"
              style={{height: '46px'}}
            >
              {' '}
              Sign up
            </Button>
          ) : (
            <div className="header-auth">
              <span>Welcome back, </span>
              <strong>{getLastName(userInfo?.displayName)}</strong>
            </div>
          )}
        </div>
      </div>
      <button onClick={handleSignOut}>Sign out</button>
    </HeaderStyle>
  )
}

export default Header
