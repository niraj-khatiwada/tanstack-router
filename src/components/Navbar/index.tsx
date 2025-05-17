import {
  DropdownItem,
  DropdownMenu,
  Navbar as HeroNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from '@heroui/react'
import { useQuery } from '@tanstack/react-query'
import { userControllerGetCurrentUserOptions } from '~/api/gen/@tanstack/react-query.gen'
import useCurrentSession from '~/hooks/useCurrentSession'
import ThemeSwitcher from '~/ui/theme-switcher'
import Avatar from '../Avatar'
import Button from '../Button'
import Dropdown, { DropdownTrigger } from '../Dropdown'
import Link from '../Link'

function Navbar() {
  const { data: currentSession } = useCurrentSession()

  const getCurrentUserOptions = userControllerGetCurrentUserOptions()
  const { data: user } = useQuery({
    ...getCurrentUserOptions,
    enabled: Boolean(currentSession),
  })

  return (
    <HeroNavbar maxWidth="xl">
      <NavbarBrand>
        <Link href="/" className="font-bold text-inherit">
          Ultimate Nest.js Boilerplate ⚡
        </Link>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem className="flex items-center gap-2">
          <ThemeSwitcher />
          {user ? (
            <Dropdown backdrop="blur">
              <DropdownTrigger>
                <Button className="min-w-0 p-0 bg-none!">
                  <Avatar size="sm" src={user?.image as string} />
                </Button>
              </DropdownTrigger>
              <DropdownMenu variant="light">
                <DropdownItem key="account-settings" className="p-0 m-1">
                  <Link
                    to="/account/settings"
                    className="text-unset text-sm w-full h-full"
                  >
                    Account Settings
                  </Link>
                </DropdownItem>
                <DropdownItem key="logout" className="p-0 m-1">
                  <Link to="/logout" className="text-red-500 text-sm w-full">
                    Sign Out
                  </Link>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <Button as={Link} href="/signin" variant="light">
              Sign In
            </Button>
          )}
        </NavbarItem>
      </NavbarContent>
    </HeroNavbar>
  )
}

export default Navbar
