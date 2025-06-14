import { toast } from 'sonner'
import Button from '~/components/Button'

export const Route = createFileRoute({
  component: Root,
})

function Root() {
  return (
    <h1>
      <Button
        onClick={() => {
          toast.success('Hello World')
        }}
      >
        Hello
      </Button>
    </h1>
  )
}

export default Root
