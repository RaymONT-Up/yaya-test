import React, { useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import type { DateSelectArg } from '@fullcalendar/core'
import { Modal } from '@/shared/ui/Modal/Modal'
import { CreateSchedule } from '@/features/schedule/CreateSchedule'
// import { useSchedule } from '@/entities/schedule';
import { parseScheduleEvents } from '@/shared/libs/parseScheduleEvents'
import { DuplicateSchedule } from '@/features/schedule/DuplicateSchedule'

// Мок данные пока cors ошибку кидает
const res = {
  events: [
    {
      id: 685830,
      lesson: {
        id: 5941,
        name: 'ляляленд',
        center_id: 712,
        min_age_str: '6л.',
        max_age_str: '13л.'
      },
      start_timestamp: '2025-04-10T15:29:50+05:00',
      end_timestamp: '2025-04-10T16:29:51+05:00',
      places: 28,
      booked_counts: 0,
      trainer: 'Тотося | Ребенок'
    },
    {
      id: 685839,
      lesson: {
        id: 5930,
        name: 'Рисовальня',
        center_id: 712,
        min_age_str: '0м',
        max_age_str: '17л.'
      },
      start_timestamp: '2025-04-13T13:30:00+05:00',
      end_timestamp: '2025-04-13T14:30:00+05:00',
      places: 6,
      booked_counts: 0,
      trainer: 'Ляля Тополя | Ген директор'
    },
    {
      id: 685838,
      lesson: {
        id: 5925,
        name: 'Доказать',
        center_id: 712,
        min_age_str: '0м',
        max_age_str: '16л.'
      },
      start_timestamp: '2025-04-12T12:00:00+05:00',
      end_timestamp: '2025-04-12T13:00:00+05:00',
      places: 4,
      booked_counts: 0,
      trainer: 'Чиловый парень | Чил'
    },
    {
      id: 685840,
      lesson: {
        id: 5935,
        name: 'New section',
        center_id: 712,
        min_age_str: '3г. 5м.',
        max_age_str: '5л. 5м.'
      },
      start_timestamp: '2025-04-12T14:30:00+05:00',
      end_timestamp: '2025-04-12T15:00:00+05:00',
      places: 5,
      booked_counts: 0,
      trainer: 'Dilya Trener | Dancer'
    },
    {
      id: 685841,
      lesson: {
        id: 5919,
        name: 'Тест',
        center_id: 712,
        min_age_str: '0м',
        max_age_str: '16л.'
      },
      start_timestamp: '2025-04-13T12:30:00+05:00',
      end_timestamp: '2025-04-13T13:00:00+05:00',
      places: 5,
      booked_counts: 0,
      trainer: 'Dilya Trener | Dancer'
    },
    {
      id: 720139,
      lesson: {
        id: 5941,
        name: 'ляляленд',
        center_id: 712,
        min_age_str: '6л.',
        max_age_str: '13л.'
      },
      start_timestamp: '2025-04-19T22:30:00+05:00',
      end_timestamp: '2025-04-19T23:30:00+05:00',
      places: 2,
      booked_counts: 0,
      trainer: ''
    },
    {
      id: 720146,
      lesson: {
        id: 5940,
        name: 'Тестик рестик',
        center_id: 712,
        min_age_str: '4г. 7м.',
        max_age_str: '16л.'
      },
      start_timestamp: '2025-04-18T14:30:00+05:00',
      end_timestamp: '2025-04-18T15:30:00+05:00',
      places: 3,
      booked_counts: 0,
      trainer: ''
    },
    {
      id: 727081,
      lesson: {
        id: 5935,
        name: 'New section',
        center_id: 712,
        min_age_str: '3г. 5м.',
        max_age_str: '5л. 5м.'
      },
      start_timestamp: '2025-04-21T12:00:00+05:00',
      end_timestamp: '2025-04-21T13:00:00+05:00',
      places: 3,
      booked_counts: 0,
      trainer: ''
    },
    {
      id: 727082,
      lesson: {
        id: 5935,
        name: 'New section',
        center_id: 712,
        min_age_str: '3г. 5м.',
        max_age_str: '5л. 5м.'
      },
      start_timestamp: '2025-04-22T12:00:00+05:00',
      end_timestamp: '2025-04-22T13:00:00+05:00',
      places: 3,
      booked_counts: 0,
      trainer: ''
    },
    {
      id: 727083,
      lesson: {
        id: 5940,
        name: 'Тестик рестик',
        center_id: 712,
        min_age_str: '4г. 7м.',
        max_age_str: '16л.'
      },
      start_timestamp: '2025-04-22T12:00:00+05:00',
      end_timestamp: '2025-04-22T13:00:00+05:00',
      places: 3,
      booked_counts: 0,
      trainer: ''
    },
    {
      id: 727084,
      lesson: {
        id: 5940,
        name: 'Тестик рестик',
        center_id: 712,
        min_age_str: '4г. 7м.',
        max_age_str: '16л.'
      },
      start_timestamp: '2025-04-25T11:29:50+05:00',
      end_timestamp: '2025-04-25T12:29:51+05:00',
      places: 5,
      booked_counts: 0,
      trainer: ''
    },
    {
      id: 727085,
      lesson: {
        id: 5941,
        name: 'ляляленд',
        center_id: 712,
        min_age_str: '6л.',
        max_age_str: '13л.'
      },
      start_timestamp: '2025-04-24T12:55:00+05:00',
      end_timestamp: '2025-04-24T13:55:00+05:00',
      places: 3,
      booked_counts: 0,
      trainer: ''
    },
    {
      id: 727086,
      lesson: {
        id: 1482,
        name: 'Длинное название секции для проверки размера карточки',
        center_id: 712,
        min_age_str: '2г. 5м.',
        max_age_str: '10л.'
      },
      start_timestamp: '2025-04-25T09:00:00+05:00',
      end_timestamp: '2025-04-25T09:50:00+05:00',
      places: 4,
      booked_counts: 0,
      trainer: 'Тотося | Ребенок'
    },
    {
      id: 727087,
      lesson: {
        id: 5941,
        name: 'ляляленд',
        center_id: 712,
        min_age_str: '6л.',
        max_age_str: '13л.'
      },
      start_timestamp: '2025-04-25T10:00:00+05:00',
      end_timestamp: '2025-04-25T11:00:00+05:00',
      places: 6,
      booked_counts: 0,
      trainer: ''
    },
    {
      id: 727088,
      lesson: {
        id: 1482,
        name: 'Длинное название секции для проверки размера карточки',
        center_id: 712,
        min_age_str: '2г. 5м.',
        max_age_str: '10л.'
      },
      start_timestamp: '2025-04-26T11:00:00+05:00',
      end_timestamp: '2025-04-26T17:00:00+05:00',
      places: 10,
      booked_counts: 0,
      trainer: 'Толтый Кот | Повар Путина4'
    },
    {
      id: 727089,
      lesson: {
        id: 1482,
        name: 'Длинное название секции для проверки размера карточки',
        center_id: 712,
        min_age_str: '2г. 5м.',
        max_age_str: '10л.'
      },
      start_timestamp: '2025-04-26T11:00:00+05:00',
      end_timestamp: '2025-04-26T13:00:00+05:00',
      places: 10,
      booked_counts: 0,
      trainer: 'Толтый Кот | Повар Путина4'
    },
    {
      id: 727090,
      lesson: {
        id: 1482,
        name: 'Длинное название секции для проверки размера карточки',
        center_id: 712,
        min_age_str: '2г. 5м.',
        max_age_str: '10л.'
      },
      start_timestamp: '2025-04-27T11:00:00+05:00',
      end_timestamp: '2025-04-27T15:00:00+05:00',
      places: 10,
      booked_counts: 0,
      trainer: 'Толтый Кот | Повар Путина4'
    },
    {
      id: 727091,
      lesson: {
        id: 1482,
        name: 'Длинное название секции для проверки размера карточки',
        center_id: 712,
        min_age_str: '2г. 5м.',
        max_age_str: '10л.'
      },
      start_timestamp: '2025-04-27T09:00:00+05:00',
      end_timestamp: '2025-04-27T10:00:00+05:00',
      places: 15,
      booked_counts: 0,
      trainer: 'Dilya Trener | Dancer'
    },
    {
      id: 727092,
      lesson: {
        id: 1482,
        name: 'Длинное название секции для проверки размера карточки',
        center_id: 712,
        min_age_str: '2г. 5м.',
        max_age_str: '10л.'
      },
      start_timestamp: '2025-04-27T11:00:00+05:00',
      end_timestamp: '2025-04-27T13:00:00+05:00',
      places: 15,
      booked_counts: 0,
      trainer: 'Тотося | Ребенок'
    },
    {
      id: 727093,
      lesson: {
        id: 5935,
        name: 'New section',
        center_id: 712,
        min_age_str: '3г. 5м.',
        max_age_str: '5л. 5м.'
      },
      start_timestamp: '2025-04-25T10:20:00+05:00',
      end_timestamp: '2025-04-25T10:20:00+05:00',
      places: 4,
      booked_counts: 0,
      trainer: ''
    },
    {
      id: 727094,
      lesson: {
        id: 5940,
        name: 'Тестик рестик',
        center_id: 712,
        min_age_str: '4г. 7м.',
        max_age_str: '16л.'
      },
      start_timestamp: '2025-04-25T17:30:00+05:00',
      end_timestamp: '2025-04-25T18:30:00+05:00',
      places: 3,
      booked_counts: 1,
      trainer: ''
    }
  ],
  notes: []
}
export const ScheduleCalendar: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [duplicateModalOpen, setDuplicateModalOpen] = useState(false)
  const [range, setRange] = useState<{ start: string; end: string } | null>(null)

  // const today = new Date();
  // const startDate = new Date(today.getFullYear(), today.getMonth(), 1).toISOString().slice(0, 10);
  // const endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0).toISOString().slice(0, 10);

  // const { data, isLoading, isError, } = useSchedule({
  //   startDate,
  //   endDate,
  // });

  // const parsedEvents = data ? parseScheduleEvents(data.events) : [];

  const handleSelect = (arg: DateSelectArg) => {
    const start = arg.startStr.slice(0, 16)
    const end = arg.endStr.slice(0, 16)
    setRange({ start, end })
    setModalOpen(true)
  }

  // const handleDateChange = (newRange: { start: string; end: string }) => {
  //   setRange(newRange);
  // };

  // const handleDatesSet = (arg:{startStr:string,endStr:string}) => {
  //   const newStartDate = arg.startStr.slice(0, 10);
  //   const newEndDate = arg.endStr.slice(0, 10);

  //   if (newStartDate !== startDate || newEndDate !== endDate) {
  //     handleDateChange({ start: newStartDate, end: newEndDate });
  //   }
  // };

  // if (isLoading) return <p>Загрузка...</p>;
  // if (isError) return <p>Ошибка загрузки расписания</p>;

  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        selectable={true}
        select={handleSelect}
        headerToolbar={{
          left: 'prev,next today ',
          center: 'title schedule',
          right: 'timeGridWeek,timeGridDay,'
        }}
        // events={parsedEvents}
        events={parseScheduleEvents(res.events)}
        allDaySlot={false}
        // datesSet={handleDatesSet}
        customButtons={{
          schedule: {
            text: 'Дублировать',
            click: () => {
              setDuplicateModalOpen(true)
            }
          }
        }}
      />

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        {range && (
          <CreateSchedule start={range.start} end={range.end} onClose={() => setModalOpen(false)} />
        )}
      </Modal>
      <Modal isOpen={duplicateModalOpen} onClose={() => setDuplicateModalOpen(false)}>
        <DuplicateSchedule onSubmit={() => setDuplicateModalOpen(false)} />
      </Modal>
    </>
  )
}
