import { createFileRoute } from '@tanstack/react-router'
import { FormEvent, useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import Button from '~/components/Button'
import { env } from '~/utils/env'
import { protectRoute } from '~/utils/route'

export const Route = createFileRoute('/chat/')({
  component: Chat,
  beforeLoad: protectRoute,
})

const socket = io(env.VITE_API_URL, { withCredentials: true })

const MESSAGE_CHANNEL = 'message'

function Chat() {
  const [messages, setMessages] = useState<
    { text: string; isServer: boolean }[]
  >([])
  const [message, setMessage] = useState('')

  useEffect(() => {
    socket.on(MESSAGE_CHANNEL, (msg) => {
      setMessages((prev) => [...prev, { isServer: true, text: msg }])
    })
    return () => {
      socket.off(MESSAGE_CHANNEL)
    }
  }, [])

  const handleSend = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (message.trim()) {
      socket.emit(MESSAGE_CHANNEL, { isServer: false, text: message })
      setMessages((prev) => [...prev, { isServer: false, text: message }])
      setMessage('')
    }
  }

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-md rounded-2xl shadow-lg p-6">
        <div className="flex flex-col h-[80vh]">
          <div className="flex-1 overflow-y-auto space-y-2 mb-4 p-2 border rounded-xl">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`p-2 rounded-lg ${msg.isServer ? 'text-left' : 'bg-blue-900 w-fit ml-auto text-right'}`}
              >
                <p>{msg.text}</p>
              </div>
            ))}
          </div>
          <form onSubmit={handleSend} className="flex gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 px-4 py-2 border rounded-xl focus:outline-none focus:ring"
              placeholder="Type a message..."
            />
            <Button type="submit" isDisabled={message.length === 0}>
              Send
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
