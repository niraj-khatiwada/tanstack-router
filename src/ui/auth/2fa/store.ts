import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

type _2faState = {
  verificationNeeded: boolean
}

type _2faStore = {
  state: _2faState
  setState(newState: Partial<_2faState>): _2faState
  onVerificationComplete(_: () => void): () => void
  fireVerificationComplete(): void
}

const verificationCallbacks: Set<() => void> = new Set()

export const use2faStore = create<_2faStore>()(
  subscribeWithSelector((set, get) => ({
    state: { verificationNeeded: false },
    setState(newState) {
      set((store) => ({ ...store, state: { ...store.state, ...newState } }))
      return get().state
    },
    onVerificationComplete(cb) {
      verificationCallbacks.add(cb)
      return () => {
        verificationCallbacks.delete(cb)
      }
    },
    fireVerificationComplete() {
      verificationCallbacks.forEach((cb) => cb())
    },
  })),
)
