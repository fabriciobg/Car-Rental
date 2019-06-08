import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import WelcomeScreen from '../screens/WelcomeScreen'
import MenuScreen from '../screens/MenuScreen'
import ColorForm from '../screens/ColorForm'
import BrandForm from '../screens/BrandForm'
import RegisterMenuScreen from '../screens/RegisterMenuScreen'
import CustomerForm from '../screens/CustomerForm'
import CarForm from '../screens/CarForm'
import ColorIndex from '../screens/ColorIndex'
import RentForm from '../screens/RentForm'
import ConsultMenuScreen from '../screens/ConsultMenuScreen'
import ColorEdit from '../screens/ColorEdit'
import BrandIndex from '../screens/BrandIndex'
import BrandEdit from '../screens/BrandEdit'
import CustomerIndex from '../screens/CustomerIndex'
import CustomerEdit from '../screens/CustomerEdit'
import CarIndex from '../screens/CarIndex'
import CarEdit from '../screens/CarEdit'
import RentIndex from '../screens/RentIndex'
import RentEdit from '../screens/RentEdit'

export default createAppContainer(createSwitchNavigator(
  {
    Welcome: WelcomeScreen,
    Menu: MenuScreen,
    ColorForm: ColorForm,
    BrandForm: BrandForm,
    RegisterMenu: RegisterMenuScreen,
    CustomerForm: CustomerForm,
    CarForm: CarForm,
    ColorIndex: ColorIndex,
    RentForm: RentForm,
    ConsultMenu: ConsultMenuScreen,
    ColorEdit: ColorEdit,
    BrandIndex: BrandIndex,
    BrandEdit: BrandEdit,
    CustomerIndex: CustomerIndex,
    CustomerEdit: CustomerEdit,
    CarIndex: CarIndex,
    CarEdit: CarEdit,
    RentIndex: RentIndex,
    RentEdit: RentEdit
  },
  {
    initialRouteName: 'Welcome',
  }
));