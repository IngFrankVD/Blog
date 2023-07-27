import Navbar from '../Layouts/Navbar'
import Footer from '../Components/Footer';

const navigation = [
  { name: 'Product', href: '#' },
  { name: 'Features', href: '#' },
  { name: 'Marketplace', href: '#' },
  { name: 'Company', href: '#' },
]
const post = [
    { id: '', title: 'Montañas bonitas', desc: '#', img: 'https://images.pexels.com/photos/12358219/pexels-photo-12358219.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', created_at: '', updated_at: '', user_id: '', cat: '' },
    { id: '', title: 'Barquito', desc: '#', img: 'https://images.pexels.com/photos/16222199/pexels-photo-16222199/free-photo-of-ciudad-barcos-canal-urbano.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', created_at: '', updated_at: '', user_id: '', cat: '' },
    { id: '', title: 'Landscape', desc: '#', img: 'https://images.pexels.com/photos/17293238/pexels-photo-17293238/free-photo-of-nieve-amanecer-paisaje-puesta-de-sol.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', created_at: '', updated_at: '', user_id: '', cat: '' },
    { id: '', title: 'Autos B/N', desc: '#', img: 'https://images.pexels.com/photos/11734225/pexels-photo-11734225.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', created_at: '', updated_at: '', user_id: '', cat: '' },
    { id: '', title: 'Moto', desc: '#', img: 'https://images.pexels.com/photos/15663496/pexels-photo-15663496/free-photo-of-casas-casa-vehiculo-puerta.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', created_at: '', updated_at: '', user_id: '', cat: '' },
  ]
  const callouts = [
    {
      name: 'Desk and Office',
      description: 'Work from home accessories',
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-01.jpg',
      imageAlt: 'Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug.',
      href: '#',
    },
    {
      name: 'Self-Improvement',
      description: 'Journals and note-taking',
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-02.jpg',
      imageAlt: 'Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant.',
      href: '#',
    },
    {
      name: 'Travel',
      description: 'Daily commute essentials',
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-03.jpg',
      imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
      href: '#',
    },
  ]

export default function Home() {

  return (
    <>
    <Navbar/>

      <div style={{'--image-url': `url(${post[0].img})`}}  className='bg-[image:var(--image-url)] bg-cover relative isolate px-6 pt-14 lg:px-8"'>
        <div
            
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
        <div className=" mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              {post[0].title}
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              {post[0].desc}
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="write"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Escribir tu Blog
              </a>
              <a href="#" className="rounded-md bg-zinc-100 px-3.5 py-2.5 text-sm font-semibold text-slate-950 shadow-sm hover:bg-zinc-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Ver Post completo <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
      </div>



    <div className="bg-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
          <h2 className="text-2xl font-bold text-gray-900">Popular Blogs</h2>

          <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
            {callouts.map((callout) => (
              <div key={callout.name} className="group relative">
                <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                  <img
                    src={callout.imageSrc}
                    alt={callout.imageAlt}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <h3 className="mt-6 text-sm text-gray-500">
                  <a href={callout.href}>
                    <span className="absolute inset-0" />
                    {callout.name}
                  </a>
                </h3>
                <p className="text-base font-semibold text-gray-900">{callout.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>





      <Footer/>
    </>
  )
}
