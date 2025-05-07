import {
  DropdownItem,
  DropdownMenu,
  Navbar as HeroNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from '@heroui/react'
import { useNavigate } from '@tanstack/react-router'
import { auth } from '~/libs/auth'
import ThemeSwitcher from '~/ui/theme-switcher'
import Avatar from '../Avatar'
import Button from '../Button'
import Dropdown, { DropdownTrigger } from '../Dropdown'
import Link from '../Link'

function Navbar() {
  const navigate = useNavigate()
  const { data } = auth.useSession()

  const handleLogout = () => {
    auth.signOut()
    navigate({ to: '/' })
  }

  return (
    <HeroNavbar maxWidth="xl">
      <NavbarBrand>
        <Link href="/" className="font-bold text-inherit">
          TanStack Start
        </Link>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem className="flex items-center gap-2">
          <ThemeSwitcher />
          {data?.user ? (
            <Dropdown backdrop="blur">
              <DropdownTrigger>
                <Button className="min-w-0 p-0 bg-none!">
                  <Avatar
                    size="sm"
                    src={data?.user?.image as string}
                    {...(!data?.user?.image
                      ? {
                          name:
                            data?.user?.name?.slice(0, 1)?.toUpperCase?.() ??
                            '',
                        }
                      : {})}
                  />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem
                  key="logout"
                  className="text-red-500"
                  onPress={handleLogout}
                >
                  Sign Out
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
