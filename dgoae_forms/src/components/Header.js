import React from 'react'
import "./Header.css"
import {IconButton} from "@material-ui/core"
import formimage from "../images/google-forms-logo-icon.png"
import SearchIcon from "@material-ui/icons/Search"
import AppsIcon from "@material-ui/icons/Apps"
import { Avatar } from '@material-ui/core'
import avatarimage from "../images/user.jpg"
import TemporaryDrawer from './TemporaryDrawer'

import {useAuth0} from '@auth0/auth0-react'
import { LogoutButton } from '../auth/Logout'

function Header() {

  
  const {user, isAuthenticated, isLoading} = useAuth0();

  return (
    <div className='header'>
        <div className='header_info'>
          <TemporaryDrawer/>
            <img src={formimage} alt="no img" width="auto" height="30px" className='form_image'/>
            <div className='info'>
              DGOAE-FORMS
          </div>
        </div>
        <div className='header_search'>
          <IconButton><SearchIcon/></IconButton>
            <input type="text" name="search" placeholder='busca ' /> 
          
        </div>
        <div className='header_right'>
          <IconButton>
            <AppsIcon/>
          </IconButton>
          <LogoutButton />
          <IconButton>
            <Avatar src={user.picture}/>
          </IconButton>
        </div>

    </div>
  )
}

export default Header;