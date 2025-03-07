import {
  Navbar as HeroNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from '@heroui/navbar'
import ThemeSwitcher from '~/ui/ThemeSwitcher'

function Navbar() {
  return (
    <HeroNavbar>
      <NavbarBrand>
        <p className="font-bold text-inherit">AI Job Search</p>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem>
          <ThemeSwitcher />
        </NavbarItem>
      </NavbarContent>
    </HeroNavbar>
  )
}

export default Navbar
