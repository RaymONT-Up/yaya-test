import { Button, ButtonSize, ButtonVariant } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Input/Input'
import { ScheduleCalendar } from '@/widgets/scheduleCalendar'
import { FC } from 'react'

export const MainPage: FC = () => {
  return (
    <div>
      {/* UI Kit */}
      <Button size={ButtonSize.Small}>Button Primary small</Button>
      <Button size={ButtonSize.Small} disabled>
        Button Primary small
      </Button>
      <Button size={ButtonSize.Small} loading>
        Button Primary small
      </Button>
      <hr />
      <Button size={ButtonSize.Medium}> Button Primary</Button>
      <Button size={ButtonSize.Medium} disabled>
        {' '}
        Button Primary disabled
      </Button>
      <hr />

      <Button variant={ButtonVariant.Neutral}>Button Neutral</Button>
      <Button variant={ButtonVariant.Neutral} disabled>
        {' '}
        Button Neutral disabled
      </Button>

      <hr />

      <Button variant={ButtonVariant.Subtle}>Button Subtle</Button>
      <Button variant={ButtonVariant.Subtle} disabled>
        Button Subtle
      </Button>
      <Button variant={ButtonVariant.Subtle} loading>
        Button Subtle
      </Button>
      <hr />

      <Button variant={ButtonVariant.Text}>Button Text</Button>
      <Button variant={ButtonVariant.Text} loading>
        Button Text
      </Button>
      <Button variant={ButtonVariant.Text} disabled>
        Button Text
      </Button>
      <hr />

      <Button loading>Button loading</Button>
      <hr />
      <Input placeholder="Input" label="Label" />
      <Input placeholder="disabled" label="Label" disabled />
      <Input placeholder="Error" label="Label" error={'Error'} />
      <hr />
      <ScheduleCalendar />
    </div>
  )
}
