import { Card, CardBody, Tab } from '@heroui/react'
import { useLocation, useNavigate } from '@tanstack/react-router'
import Tabs from '~/components/Tabs'
import ChangePassword from './ChangePassword'
import PassKeys from './PassKeys'
import Profile from './Profile'
import Sessions from './Sessions'
import TwoFactorAuth from './TwoFactorAuth'

function AccountSettings() {
  const { hash } = useLocation()
  const navigate = useNavigate()

  return (
    <div className="max-w-xl mx-auto px-6 mt-20">
      <h1 className="text-3xl mb-4">Account Settings</h1>
      {hash ? (
        <Tabs
          isVertical
          aria-label="Account Settings"
          classNames={{ tab: 'justify-start' }}
          selectedKey={hash}
          onSelectionChange={(k) =>
            navigate({ to: '.', hash: k as string, replace: !hash })
          }
        >
          <Tab key="profile" title="Profile" className="w-full">
            <Card>
              <CardBody>
                <Profile />
              </CardBody>
            </Card>
          </Tab>
          <Tab key="sessions" title="Sessions" className="w-full">
            <Card>
              <CardBody>
                <Sessions />
              </CardBody>
            </Card>
          </Tab>
          <Tab key="change-password" title="Change Password" className="w-full">
            <Card>
              <CardBody>
                <ChangePassword />
              </CardBody>
            </Card>
          </Tab>
          <Tab key="2fa" title="Two-Factor Authentication" className="w-full">
            <Card>
              <CardBody>
                <TwoFactorAuth />
              </CardBody>
            </Card>
          </Tab>
          <Tab key="pass-keys" title="Pass Keys" className="w-full">
            <Card>
              <CardBody>
                <PassKeys />
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      ) : null}
    </div>
  )
}
export default AccountSettings
