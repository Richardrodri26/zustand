import { useShallow } from 'zustand/react/shallow';
import { WhiteCard } from '../../components';
import { useBearsStore } from '../../stores';

export const BearPage = () => {

  return (
    <>
      <h1>Contador de Osos</h1>
      <p>Manejo de estado simple de Zustand</p>
      <hr />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">

        <BlackBears />

        <PolarBears />

        <PandaBears />

        <BearsDisplay />

      </div>

    </>
  );
};


export const BlackBears = () => {
  const blackBears = useBearsStore((state) => state.blackBears)
  const increaseBlackBears = useBearsStore((state) => state.increaseBlackBears)

  return (
    <WhiteCard centered>
      <h2>Osos Negros</h2>

      <div className="flex flex-col md:flex-row">
        <button onClick={() => { increaseBlackBears(1) }}> +1</button>
        <span className="text-3xl mx-2 lg:mx-10"> {blackBears} </span>
        <button onClick={() => { increaseBlackBears(-1) }}>-1</button>
      </div>

    </WhiteCard>
  )
}
export const PolarBears = () => {
  const polarBears = useBearsStore((state) => state.polarBears)
  const increasePolarBears = useBearsStore((state) => state.increasePolarBears)

  return (
    <WhiteCard centered>
      <h2>Osos Polares</h2>

      <div className="flex flex-col md:flex-row">
        <button onClick={() => { increasePolarBears(1) }}> +1</button>
        <span className="text-3xl mx-2 lg:mx-10"> {polarBears} </span>
        <button onClick={() => { increasePolarBears(-1) }}>-1</button>
      </div>

    </WhiteCard>
  )
}
export const PandaBears = () => {
  const pandaBears = useBearsStore((state) => state.pandaBears)
  const increasePandaBears = useBearsStore((state) => state.increasePandaBears)

  return (
    <WhiteCard centered>
      <h2>Osos Pandas</h2>

      <div className="flex flex-col md:flex-row">
        <button onClick={() => { increasePandaBears(1) }}> +1</button>
        <span className="text-3xl mx-2 lg:mx-10"> {pandaBears} </span>
        <button onClick={() => { increasePandaBears(-1) }}>-1</button>
      </div>

    </WhiteCard>
  )
}


export const BearsDisplay = () => {
  const bears = useBearsStore( useShallow( state => state.bears ) )
  const doNothing = useBearsStore(state => state.doNothing)
  const addBear = useBearsStore(state => state.addBear)
  const clearBears = useBearsStore(state => state.clearBears)

  return (
    <WhiteCard centered>
      <h1>Osos</h1>
      <button onClick={doNothing}>Do Nothing</button>
      <button className='mt-2' onClick={addBear}>Agregar oso</button>
      <button className='mt-2' onClick={clearBears}>Borrar osos</button>

      <pre>
        { JSON.stringify(bears, null, 1) }
      </pre>
    </WhiteCard>
  )
}
