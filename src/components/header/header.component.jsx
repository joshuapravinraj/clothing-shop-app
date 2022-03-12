import React from 'react';
import { ReactComponent as Logo } from '../../assets/crown.svg';
import { useSelector } from 'react-redux';
import { auth } from '../../firebase/firebase.utils';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { 
   HeaderContainer,
   LogoContainer,
   OptionsContainer,
   OptionLink,
} from './header.styles';

const Header = () => {
   const currentUser = useSelector(selectCurrentUser)
   const hidden = useSelector(selectCartHidden)

   return (
      <HeaderContainer>
         <LogoContainer to="/">
            <Logo className='logo' />
         </LogoContainer>
         <OptionsContainer>
            <OptionLink to='/shop'>SHOP</OptionLink>
            <OptionLink to='/shop'>CONTACT</OptionLink>
            {
               currentUser ?
                  <OptionLink as='div' onClick={() => auth.signOut()}>SIGN OUT</OptionLink>
                  : 
                  <OptionLink to="/signin">SIGN IN</OptionLink>
            }
            <CartIcon />
         </OptionsContainer>
         { hidden ? null : <CartDropdown /> }
    </HeaderContainer>
   )
}

export default Header;