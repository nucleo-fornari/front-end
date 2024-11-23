export function Event({ event, titulo }) {
    return(
      <div style={{ backgroundColor: 'green' }} data-titulo={event.titulo} className=" w-full min-w-5 min-h-5 truncate border-[1px] rounded-lg hover:brightness-90 text-white-ice">
        {titulo}
      </div>
    )
  }