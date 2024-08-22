import style from './NoProducts.module.css'
export default function NoProducts() {


  return (<>

    <section className='h-lvh flex items-center'>
      <div className="container flex items-center justify-center">
        <h1 className='text-red-600 text-4xl'>There are no products available at the moment !</h1>
      </div>
    </section>

  </>
  )
}
