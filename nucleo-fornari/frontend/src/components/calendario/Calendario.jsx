import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Event } from './Event';

const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];
const monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

const Calendario = ({ fullHeight = false, onClick, setDate, events, handleClickEvent, setEvents }) => {
  const eventsForDay = Array.isArray(events) ? events : [];

  const today = new Date();
  const dayRefs = useRef([]);
  const [year, setYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(0);
  const monthOptions = monthNames.map((month, index) => ({ name: month, value: `${index}` }));

  const scrollToDay = (monthIndex, dayIndex) => {
    const targetDayIndex = dayRefs.current.findIndex(
      (ref) => ref && ref.getAttribute('data-month') === `${monthIndex}` && ref.getAttribute('data-day') === `${dayIndex}`,
    );

    const targetElement = dayRefs.current[targetDayIndex];

    if (targetDayIndex !== -1 && targetElement) {
      const container = document.querySelector('.calendar-container');
      const elementRect = targetElement.getBoundingClientRect();
      const is2xl = window.matchMedia('(min-width: 1536px)').matches;
      const offsetFactor = is2xl ? 3 : 2.5;

      if (container) {
        const containerRect = container.getBoundingClientRect();
        const offset = elementRect.top - containerRect.top - (containerRect.height / offsetFactor) + (elementRect.height / 2);

        container.scrollTo({
          top: container.scrollTop + offset,
          behavior: 'smooth',
        });
      } else {
        const offset = window.scrollY + elementRect.top - (window.innerHeight / offsetFactor) + (elementRect.height / 2);

        window.scrollTo({
          top: offset,
          behavior: 'smooth',
        });
      }
    }
  };

  const handlePrevYear = () => setYear((prevYear) => prevYear - 1);
  const handleNextYear = () => setYear((prevYear) => prevYear + 1);

  const handleMonthChange = (event) => {
    const monthIndex = parseInt(event.target.value, 10);
    setSelectedMonth(monthIndex);
    scrollToDay(monthIndex, 1);
  };

  const handleTodayClick = () => {
    setYear(today.getFullYear());
    scrollToDay(today.getMonth(), today.getDate());
  };
  const handleDayClick = (day, month, year) => {
    const date = new Date(year, month, day).setHours(0, 0, 0, 0);
    setDate(new Date(year, month, day));

    // Garante que `eventsForDay` é definido no momento do clique
    const eventsClicked = Array.isArray(events)
      ? events.filter(event => {
        const eventJson = new Date(event.data).setHours(0, 0, 0, 0);
        return date === eventJson; // Compara os timestamps normalizados
      })
      : [];

    // Passa os eventos filtrados
    handleClickEvent(eventsClicked);

    // Verifica se a função `onClick` foi fornecida
    if (onClick) {
      if (month < 0) {
        onClick(day, 11, year - 1, eventsClicked);
      } else {
        onClick(day, month, year, eventsClicked);
      }
    }
  };

  const generateCalendar = useMemo(() => {
    const daysOfYear = () => {
      const days = [];
      const startDayOfWeek = new Date(year, 0, 1).getDay();

      // Dias fictícios do mês anterior
      if (startDayOfWeek < 6) {
        for (let i = 0; i < startDayOfWeek; i++) {
          days.push({ month: -1, day: 32 - startDayOfWeek + i, isPlaceholder: true });
        }
      }

      // Dias reais do ano
      for (let month = 0; month < 12; month++) {
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        for (let day = 1; day <= daysInMonth; day++) {
          days.push({ month, day });
        }
      }

      return days;
    };

    const calendarDays = daysOfYear();

    const calendar = calendarDays.map(({ month, day, isPlaceholder }, index) => {
      const isNewMonth = index === 0 || calendarDays[index - 1].month !== month;
      const isToday =
        today.getMonth() === month &&
        today.getDate() === day &&
        today.getFullYear() === year;

      const eventsForDay = Array.isArray(events)
        ? events.filter(event => {
          const eventDate = new Date(event.data).setHours(0, 0, 0, 0);
          const currentDate = new Date(year, month, day).setHours(0, 0, 0, 0);

          return currentDate === eventDate;
        })
        : [];

      return (
        <div
          key={`${month}-${day}`}
          ref={(el) => { dayRefs.current[index] = el; }}
          data-month={month}
          data-day={day}
          onClick={() => handleDayClick(day, month, year)}
          className={`relative z-10 m-[-0.5px] aspect-square w-full grow cursor-pointer rounded-xl border font-medium transition-all hover:z-20 hover:border-cyan-400 sm:-m-px sm:size-20 sm:rounded-2xl sm:border-2 lg:size-28 lg:rounded-3xl 2xl:size-40 text-center flex flex-col items-start justify-between px-2 py-2 ${isPlaceholder ? 'bg-gray-100 cursor-not-allowed' : ''
            }`}
        >
          {
            !isPlaceholder && eventsForDay.length > 0 ? (
              <span className={`w-full h-fit flex flex-col items-start text-xs lg:text-base ${month < 0 ? 'text-slate-400' : 'text-slate-800'}`}>
                <p className={`${isToday ? 'bg-blue-500 font-semibold text-white-ice' : ''} px-2 rounded-full`}>
                  {day}
                </p>
                <div className="w-full flex flex-col gap-1 relative">
                  {eventsForDay.map(event => (
                    <Event
                      key={event.id}
                      event={event}
                      titulo={event.titulo}
                    />
                  ))}
                </div>
              </span>
            ) : (
              <span className={`w-full h-fit flex justify-between rounded-full text-xs lg:text-base ${month < 0 ? 'text-slate-400' : 'text-slate-800'} px-2 rounded-full`}>
                <p className={`${isToday ? 'bg-blue-500 font-semibold text-white-ice' : ''} px-1 rounded-full`}>
                  {day}
                </p>
              </span>
            )
          }

          {isNewMonth && (
            <span className="w-full truncate px-1.5 text-sm font-semibold text-slate-300 lg:-mb-1 lg:px-0 lg:text-lg 2xl:mb-[-4px] 2xl:text-2xl right-0 text-end">
              {monthNames[month]}
            </span>
          )}
        </div>
      );
    });

    return calendar;
  }, [year, eventsForDay]);


  useEffect(() => {
    const root = document.querySelector('.calendar-container') || document;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const month = parseInt(entry.target.getAttribute('data-month'), 10);
            setSelectedMonth(month);
          }
        });
      },
      {
        root,
        rootMargin: '-75% 0px -25% 0px',
        threshold: 0,
      },
    );

    dayRefs.current.forEach((ref) => {
      if (ref && ref.getAttribute('data-day') === '15') {
        observer.observe(ref);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div className={`bg-[#FFF] rounded-2xl bg-white pb-10 text-slate-800 ${fullHeight ? '' : 'calendar-container h-full overflow-y-scroll'}`}>
        <div className="sticky -top-px z-50 w-full bg-white px-5 sm:px-10 bg-[#FFF]">
          <div className="mb-4 flex w-full flex-wrap items-center justify-between gap-6">
            <div className="flex flex-wrap gap-2 sm:gap-3">

              <Select name="" value={`${selectedMonth}`} options={monthOptions} onChange={handleMonthChange} />

              <button onClick={handleTodayClick} type="button" className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-900 hover:bg-gray-100 sm:rounded-xl lg:px-5 lg:py-2.5">
                Hoje
              </button>

            </div>
            <div className="flex w-fit items-center justify-between">
              <button
                onClick={handlePrevYear}
                className="rounded-full border border-slate-300 p-1 transition-cors hover:bg-slate-100 sm:p-2"
              >
                <svg className="h-6 w-6 text-gray-800 transition-transform duration-200 ease-in-out hover:text-cyan-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 19L8 12l7-7"
                  />
                </svg>
              </button>

              <h1 className="min-w-16 text-center text-lg font-semibold sm:min-w-20 sm:text-xl">{year}</h1>

              <button
                onClick={handleNextYear}
                className="rounded-full border border-slate-300 p-1 transition-cors hover:bg-slate-100 sm:p-2"
              >
                <svg className="h-6 w-6 text-slate-800 transition-transform duration-200 ease-in-out hover:text-cyan-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>

              </button>
            </div>
          </div>

          <div className="grid w-full grid-cols-7 justify-between text-slate-500">
            {daysOfWeek.map((day, index) => (
              <div key={index} className="w-full border-b border-slate-200 py-2 text-center font-semibold">
                {day}
              </div>
            ))}
          </div>

        </div>
        <div className="grid w-full grid-cols-7 px-5 pt-4 sm:px-10 sm:pt-6">
          {generateCalendar}
        </div>
      </div>
    </>
  );
};

const Select = ({ name, value, label, options = [], onChange, className }) => (
  <div className={`relative ${className}`}>
    {label && (
      <label htmlFor={name} className="mb-2 block font-medium text-slate-800">
        {label}
      </label>
    )}
    <select
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className="cursor-pointer rounded-lg border border-gray-300 bg-white py-1.5 pl-2 pr-6 text-sm font-medium text-gray-900 hover:bg-gray-100 sm:rounded-xl sm:py-2.5 sm:pl-3 sm:pr-8"
      required
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
    <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-1 sm:pr-2">
      <svg className="size-5 text-slate-600" viewBox="0 0 20 20" fill="currentcor" aria-hidden="true">
        <path fillRule="evenodd" d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z" clipRule="evenodd" />
      </svg>
    </span>
  </div>
);

export default Calendario;